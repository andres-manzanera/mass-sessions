"use client";

import React, { createContext, useContext, useState, useEffect, useRef, KeyboardEvent } from "react";
import { SESSIONS_DATA, Session } from "@/data/sessions";

interface AudioContextType {
  activeSession: Session | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  isMuted: boolean;
  playSession: (sessionId: string) => void;
  pauseSession: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  seekTo: (time: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  closePlayer: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeSession = SESSIONS_DATA.find((s) => s.id === activeSessionId) || null;

  // Initialize Audio
  useEffect(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      const dur = audio.duration || 0;
      if (dur > 0) {
        setProgress((audio.currentTime / dur) * 100);
      }
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      playNext();
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [activeSessionId]);

  // Handle source and autoplay on activeSessionId change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !activeSession) return;

    if (audio.src !== activeSession.audioUrl) {
      audio.src = activeSession.audioUrl;
      audio.load();
      audio.play().catch((err) => console.log("Playback failed:", err));
    }
  }, [activeSessionId]);

  const playSession = (sessionId: string) => {
    if (activeSessionId === sessionId) {
      togglePlay();
    } else {
      setActiveSessionId(sessionId);
    }
  };

  const pauseSession = () => {
    audioRef.current?.pause();
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !activeSessionId) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.log("Playback failed:", err));
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMute = !isMuted;
    audio.muted = nextMute;
    setIsMuted(nextMute);
  };

  const seekTo = (time: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = time;
    setCurrentTime(time);
    setProgress((time / duration) * 100);
  };

  const playNext = () => {
    if (!activeSessionId) return;
    const currentIndex = SESSIONS_DATA.findIndex((s) => s.id === activeSessionId);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % SESSIONS_DATA.length;
      setActiveSessionId(SESSIONS_DATA[nextIndex].id);
    }
  };

  const playPrevious = () => {
    if (!activeSessionId) return;
    const currentIndex = SESSIONS_DATA.findIndex((s) => s.id === activeSessionId);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + SESSIONS_DATA.length) % SESSIONS_DATA.length;
      setActiveSessionId(SESSIONS_DATA[prevIndex].id);
    }
  };

  const closePlayer = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = "";
    }
    setIsPlaying(false);
    setActiveSessionId(null);
    setProgress(0);
    setCurrentTime(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = clickX / width;
    seekTo(clickPercent * duration);
  };

  return (
    <AudioContext.Provider
      value={{
        activeSession,
        isPlaying,
        currentTime,
        duration,
        progress,
        isMuted,
        playSession,
        pauseSession,
        togglePlay,
        toggleMute,
        seekTo,
        playNext,
        playPrevious,
        closePlayer,
      }}
    >
      {children}

      {/* Global Floating Bottom Player */}
      {activeSession && (
        <div 
          role="region" 
          aria-label="Reproductor de audio"
          className="sticky bottom-0 left-0 w-full z-[120] bg-black/90 backdrop-blur-2xl border-t-2 border-brand-orange/80 py-4 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Thumbnail / Meta */}
          <div className="flex items-center gap-4 self-start md:self-center">
            <img 
              alt={`Portada de la sesión ${activeSession.title}`} 
              src={activeSession.image} 
              className="w-12 h-12 object-cover border border-white/20 rounded"
            />
            <div>
              <h4 className="font-extrabold text-sm uppercase tracking-tight text-white line-clamp-1 font-sora">
                {activeSession.title}
              </h4>
              <p className="font-mono text-[10px] text-brand-orange uppercase line-clamp-1">
                {activeSession.date}
              </p>
            </div>
          </div>

          {/* Controls / Progress */}
          <div className="flex flex-col items-center gap-2 flex-grow max-w-xl w-full">
            <div className="flex items-center gap-6">
              <button 
                onClick={playPrevious}
                aria-label="Sesión anterior"
                className="text-white/60 hover:text-white transition-colors cursor-pointer select-none"
              >
                <span className="material-symbols-outlined text-2xl">skip_previous</span>
              </button>
              <button 
                onClick={togglePlay}
                aria-label={isPlaying ? "Pausar reproducción" : "Iniciar reproducción"}
                className="bg-brand-orange text-black rounded-full p-2.5 hover:scale-105 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-2xl font-bold">
                  {isPlaying ? "pause" : "play_arrow"}
                </span>
              </button>
              <button 
                onClick={playNext}
                aria-label="Siguiente sesión"
                className="text-white/60 hover:text-white transition-colors cursor-pointer select-none"
              >
                <span className="material-symbols-outlined text-2xl">skip_next</span>
              </button>
            </div>

            {/* Timeline Progress Slider */}
            <div className="flex items-center gap-3 w-full font-mono text-[10px] text-white/50 select-none">
              <span>{formatTime(currentTime)}</span>
              <div 
                onClick={handleTimelineClick}
                onKeyDown={(e) => {
                  if (!duration) return;
                  if (e.key === "ArrowRight") {
                    seekTo(Math.min(currentTime + 5, duration));
                  } else if (e.key === "ArrowLeft") {
                    seekTo(Math.max(currentTime - 5, 0));
                  }
                }}
                tabIndex={0}
                role="slider"
                aria-label="Posición de reproducción"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration) || 100}
                aria-valuenow={Math.round(currentTime)}
                aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
                className="flex-grow h-1.5 bg-white/10 rounded-full overflow-hidden relative cursor-pointer group focus:outline-none focus:ring-1 focus:ring-brand-orange"
              >
                <div 
                  className="absolute left-0 top-0 h-full bg-brand-orange rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
                <div 
                  className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-white border border-black rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" 
                  style={{ left: `calc(${progress}% - 6px)` }}
                ></div>
              </div>
              <span>{formatTime(duration) !== "0:00" ? formatTime(duration) : activeSession.duration}</span>
            </div>
          </div>

          {/* Volume / Close */}
          <div className="flex items-center gap-4 self-end md:self-center select-none">
            <button 
              onClick={toggleMute}
              aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined">
                {isMuted ? "volume_off" : "volume_up"}
              </span>
            </button>
            <button 
              onClick={closePlayer}
              aria-label="Cerrar reproductor"
              className="text-white/40 hover:text-white/80 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>
      )}
    </AudioContext.Provider>
  );
};
