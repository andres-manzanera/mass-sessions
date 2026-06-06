"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Define the session types
interface Session {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genres: string[];
  image: string;
  audioUrl: string;
  date: string;
  isNew?: boolean;
}

const SESSIONS_DATA: Session[] = [
  {
    id: "dvs1",
    title: "DEEP GROOVES",
    artist: "DVS1 (MINNEAPOLIS)",
    duration: "1h 09m",
    genres: ["DEEP HOUSE"],
    image: "/session_dvs1_pattern.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/11/2018-06.mp3",
    date: "2018-06"
  },
  {
    id: "rodhad",
    title: "SUNSET RHYTHMS",
    artist: "RØDHÅD (BERLIN)",
    duration: "48m 12s",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_rodhad_pattern.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2025/01/2025-01.mp3",
    date: "2025-01",
    isNew: true
  },
  {
    id: "blawan",
    title: "MIDNIGHT PULSE",
    artist: "BLAWAN (LONDON)",
    duration: "1h 12m",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_blawan_pattern.jpg",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/11/2017-08.mp3",
    date: "2017-08"
  },
  {
    id: "kerri",
    title: "RAW VIBRATIONS",
    artist: "KERRI CHANDLER (NEW YORK)",
    duration: "1h 00m",
    genres: ["DEEP HOUSE", "HOUSE"],
    image: "/session_kerri_pattern.png",
    audioUrl: "https://mass-sessions.and7pm.com/wp-content/uploads/2024/01/2024-01.mp3",
    date: "2024-01",
    isNew: true
  }
];

function SessionsContent() {
  const searchParams = useSearchParams();
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeYear, setActiveYear] = useState("ALL");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  // Increments each time the year filter changes, forcing card re-animation
  const [animKey, setAnimKey] = useState(0);

  // Initialize audio element on client side
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      const playHandler = () => setIsPlaying(true);
      const pauseHandler = () => setIsPlaying(false);
      const timeUpdateHandler = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          const dur = audioRef.current.duration || 0;
          if (dur > 0) {
            setProgress((audioRef.current.currentTime / dur) * 100);
          }
        }
      };
      const loadedMetadataHandler = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration || 0);
        }
      };
      const endedHandler = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      };

      audioRef.current.addEventListener("play", playHandler);
      audioRef.current.addEventListener("pause", pauseHandler);
      audioRef.current.addEventListener("timeupdate", timeUpdateHandler);
      audioRef.current.addEventListener("loadedmetadata", loadedMetadataHandler);
      audioRef.current.addEventListener("ended", endedHandler);
    }

    return () => {
      // Don't pause on cleanup of other effects, but cleanup on unmount
    };
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const handlePlayToggle = (sessionId: string) => {
    const session = SESSIONS_DATA.find(s => s.id === sessionId);
    if (!session || !audioRef.current) return;

    if (activeSessionId === sessionId) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Playback error:", err));
      }
    } else {
      setActiveSessionId(sessionId);
      setProgress(0);
      setCurrentTime(0);
      audioRef.current.src = session.audioUrl || "";
      audioRef.current.load();
      audioRef.current.play().catch(err => console.log("Playback error:", err));
    }
  };

  // Handle autoplay if coming from the homepage links
  useEffect(() => {
    const autoplay = searchParams.get("autoplay");
    if (autoplay && SESSIONS_DATA.some(s => s.id === autoplay)) {
      const timer = setTimeout(() => {
        handlePlayToggle(autoplay);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleVolumeToggle = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    audioRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percentage * 100);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return "0:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const formattedSecs = secs < 10 ? `0${secs}` : secs;

    if (hrs > 0) {
      const formattedMins = mins < 10 ? `0${mins}` : mins;
      return `${hrs}:${formattedMins}:${formattedSecs}`;
    }
    return `${mins}:${formattedSecs}`;
  };

  const getActiveSession = () => {
    return SESSIONS_DATA.find(s => s.id === activeSessionId) || null;
  };

  const activeSession = getActiveSession();

  return (
    <div className="bg-brand-bg-dark text-white font-sora min-h-screen flex flex-col pt-20 pb-24 md:pb-0 selection:bg-brand-orange selection:text-black relative">
      {/* Dots background texture */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'radial-gradient(#F2F0EB 1px, transparent 1px)', 
          backgroundSize: '20px 20px'
        }}
      />

      {/* Dark "eraser" blobs that cover/fade the dots in irregular patches */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute top-[5%] left-[25%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full blur-[40px]"
          style={{ background: 'radial-gradient(circle, #111317 30%, transparent 80%)', opacity: 0.95 }}
        />
        <div 
          className="absolute top-[35%] right-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full blur-[50px]"
          style={{ background: 'radial-gradient(circle, #111317 30%, transparent 80%)', opacity: 0.9 }}
        />
        <div 
          className="absolute bottom-[30%] left-[5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-[45px]"
          style={{ background: 'radial-gradient(circle, #111317 30%, transparent 80%)', opacity: 0.95 }}
        />
        <div 
          className="absolute bottom-[5%] right-[15%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full blur-[35px]"
          style={{ background: 'radial-gradient(circle, #111317 30%, transparent 80%)', opacity: 0.9 }}
        />
      </div>

      <header className="fixed top-0 w-full z-[100] bg-black border-b-2 border-brand-orange flex justify-between items-center pr-0 md:pr-16 h-20">
        <Link href="/" className="font-extrabold tracking-normal text-2xl md:text-3xl border-r-2 border-brand-orange px-6 md:px-16 h-full flex items-center select-none cursor-pointer text-brand-orange">
          MASS SESSIONS
        </Link>
        <nav className="hidden md:flex items-center gap-8 h-full justify-end ml-auto border-l-2 border-brand-orange pl-6 md:pl-16">
          <Link href="/" className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-2 border-transparent hover:border-brand-accent hover:text-brand-accent text-brand-orange">
            HOME
          </Link>
          <Link href="/sessions" className="font-bold uppercase tracking-wider text-sm h-full flex items-center px-2 border-b-2 border-brand-orange text-brand-orange">
            SESSIONS
          </Link>
          <Link href="/info" className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-2 border-transparent hover:border-brand-accent hover:text-brand-accent text-brand-orange">
            INFO
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-16 pt-12 pb-20 md:pt-20 md:pb-32 relative z-10">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-sora text-[48px] font-extrabold tracking-tighter text-white mb-2 leading-none uppercase">SESSIONS</h1>
          <p className="text-lg text-on-surface-variant font-sora">
            Curated mixes, live recordings & sets.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 select-none">
          {["ALL", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"].map((year, i) => (
            <button 
              key={year}
              onClick={() => { setActiveYear(year); setAnimKey(k => k + 1); }}
              className={`session-tab-anim glass-panel text-sm px-4 py-2 rounded-full cursor-pointer hover:border-brand-orange transition-all duration-300 font-sora ${
                activeYear === year 
                  ? "border-brand-orange text-brand-orange bg-brand-orange/10 font-bold" 
                  : "text-on-surface-variant hover:text-white"
              }`}
              style={{ "--i": i } as React.CSSProperties}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="flex flex-col gap-6">
          {(() => {
            const filteredSessions = SESSIONS_DATA
              .filter((session) => {
                if (activeYear === "ALL") return true;
                return session.date.startsWith(activeYear);
              })
              .sort((a, b) => b.date.localeCompare(a.date));

            if (filteredSessions.length === 0) {
              return (
                <div className="text-center py-16 border-2 border-dashed border-brand-orange/20 rounded-xl text-on-surface-variant uppercase font-mono select-none">
                  No recordings cataloged for {activeYear}.
                </div>
              );
            }

            return filteredSessions.map((session, i) => {
              const isCurrent = activeSessionId === session.id;
              return (
                <div 
                  key={`${animKey}-${session.id}`}
                  className={`session-card-anim glass-panel session-card rounded-xl overflow-hidden group hover:bg-surface-elevated transition-colors duration-300 relative ${
                    isCurrent && isPlaying ? "neon-border-orange" : ""
                  }`}
                  style={{ "--i": Math.min(i, 8) } as React.CSSProperties}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Card Image */}
                    <div className="w-full md:w-[226px] h-48 md:h-[226px] relative overflow-hidden flex-shrink-0">
                      <img 
                        alt={session.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        src={session.image}
                      />
                      <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-4">
                              <h2 className="text-xl md:text-3xl font-extrabold uppercase tracking-tight text-white font-sora">
                                {session.title}
                              </h2>
                              {isCurrent && isPlaying && (
                                <div className="sound-wave select-none" title="Playing Now">
                                  <div className="sound-wave-bar" style={{ animationDelay: "0.1s" }}></div>
                                  <div className="sound-wave-bar" style={{ animationDelay: "0.4s" }}></div>
                                  <div className="sound-wave-bar" style={{ animationDelay: "0.2s" }}></div>
                                  <div className="sound-wave-bar" style={{ animationDelay: "0.5s" }}></div>
                                  <div className="sound-wave-bar" style={{ animationDelay: "0.3s" }}></div>
                                </div>
                              )}
                            </div>
                            {/* Styled Artist subtext */}
                            <p className="text-sm font-semibold opacity-80 text-on-surface-variant font-sora mt-1 uppercase">
                              {session.date}
                            </p>
                          </div>
                          {session.isNew && (
                            <div className="flex items-center gap-2 text-brand-orange bg-brand-orange/10 px-3 py-1 border border-brand-orange rounded font-bold text-xs select-none animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                              NEW
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-brand-orange-light flex items-center gap-2 mt-2 font-sora">
                          <span className="material-symbols-outlined text-base">schedule</span>
                          {session.duration}
                        </p>
                      </div>

                      <div className="flex justify-between items-end mt-8">
                        <div className="flex flex-col md:flex-row gap-2 select-none items-start md:items-center">
                          {session.genres.map((g, idx) => (
                            <span key={idx} className="bg-surface-container-high px-2 py-1 rounded-sm font-sora text-xs text-on-surface border-l-2 border-l-brand-orange uppercase">
                              {g}
                            </span>
                          ))}
                        </div>
                        <button 
                          onClick={() => handlePlayToggle(session.id)}
                          className={`play-session-btn text-[11px] tracking-wider flex items-center justify-center min-w-[140px] ${
                            isCurrent && isPlaying ? "play-btn-playing" : ""
                          }`}
                        >
                          {isCurrent && isPlaying ? (
                            <span className="material-symbols-outlined text-base">pause</span>
                          ) : (
                            "PLAY SESSION"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </main>

      {/* Floating Bottom Media Player (when audio is active) */}
      {activeSession && (
        <div className="fixed bottom-0 left-0 w-full z-[120] bg-black/90 backdrop-blur-2xl border-t-2 border-brand-orange/80 py-4 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Thumbnail / Meta */}
          <div className="flex items-center gap-4 self-start md:self-center">
            <img 
              alt={activeSession.title} 
              src={activeSession.image} 
              className="w-12 h-12 object-cover border border-white/20 rounded"
            />
            <div>
              <h4 className="font-extrabold text-sm uppercase tracking-tight text-white line-clamp-1 font-sora">
                {activeSession.title}
              </h4>
              <p className="font-mono text-[10px] text-brand-orange uppercase line-clamp-1">
                {activeSession.artist}
              </p>
            </div>
          </div>

          {/* Controls / Progress */}
          <div className="flex flex-col items-center gap-2 flex-grow max-w-xl w-full">
            <div className="flex items-center gap-6">
              <button className="text-white/60 hover:text-white transition-colors cursor-pointer select-none">
                <span className="material-symbols-outlined text-2xl">skip_previous</span>
              </button>
              <button 
                onClick={() => {
                  if (audioRef.current) {
                    if (isPlaying) {
                      audioRef.current.pause();
                    } else {
                      audioRef.current.play().catch(err => console.log("Playback error:", err));
                    }
                  }
                }}
                className="bg-brand-orange text-black rounded-full p-2.5 hover:scale-105 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-2xl font-bold">
                  {isPlaying ? "pause" : "play_arrow"}
                </span>
              </button>
              <button className="text-white/60 hover:text-white transition-colors cursor-pointer select-none">
                <span className="material-symbols-outlined text-2xl">skip_next</span>
              </button>
            </div>
            {/* Timeline Progress Slider */}
            <div className="flex items-center gap-3 w-full font-mono text-[10px] text-white/50 select-none">
              <span>{formatTime(currentTime)}</span>
              <div 
                onClick={handleTimelineClick}
                className="flex-grow h-1.5 bg-white/10 rounded-full overflow-hidden relative cursor-pointer group"
              >
                <div 
                  className="absolute left-0 top-0 h-full bg-brand-orange rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-white border border-black rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: `calc(${progress}% - 6px)` }}></div>
              </div>
              <span>{formatTime(duration) !== "0:00" ? formatTime(duration) : activeSession.duration}</span>
            </div>
          </div>

          {/* Volume / Extra buttons */}
          <div className="flex items-center gap-4 self-end md:self-center select-none">
            <button 
              onClick={handleVolumeToggle}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined">
                {isMuted ? "volume_off" : "volume_up"}
              </span>
            </button>
            <button 
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.src = "";
                }
                setIsPlaying(false);
                setActiveSessionId(null);
                setProgress(0);
                setCurrentTime(0);
              }}
              className="text-white/40 hover:text-white/80 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Unified Brutalist Footer */}
      <footer className="relative z-10 bg-black text-brand-orange w-full py-12 border-t-2 border-brand-orange pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center justify-center gap-6 text-center">
          <div className="text-2xl font-extrabold tracking-widest border-2 border-brand-orange p-2 select-none inline-block">
            MASS SESSIONS
          </div>
          <p className="font-mono text-xs uppercase opacity-80 select-none">
            © 2026 ALL RIGHTS RESERVED. <br className="md:hidden" />HIGH FIDELITY HOUSE MUSIC.
          </p>
        </div>
      </footer>

      {/* Unified Brutalist Mobile bottom menu */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-[110] bg-black border-t-2 border-brand-orange flex items-center justify-around h-20 select-none">
        <Link href="/" className="text-brand-orange flex flex-col items-center gap-1 opacity-70 hover:opacity-100 p-2">
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="font-mono text-[9px] uppercase font-bold">Home</span>
        </Link>
        <Link href="/sessions" className="text-brand-orange flex flex-col items-center gap-1 p-2 border-t-2 border-brand-orange">
          <span className="material-symbols-outlined text-2xl font-bold">graphic_eq</span>
          <span className="font-mono text-[9px] uppercase font-bold">Sessions</span>
        </Link>
        <Link href="/info" className="text-brand-orange flex flex-col items-center gap-1 opacity-70 hover:opacity-100 p-2">
          <span className="material-symbols-outlined text-2xl">info</span>
          <span className="font-mono text-[9px] uppercase font-bold">Info</span>
        </Link>
      </nav>
    </div>
  );
}

export default function SessionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-orange"></div>
      </div>
    }>
      <SessionsContent />
    </Suspense>
  );
}
