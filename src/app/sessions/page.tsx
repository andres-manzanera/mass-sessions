"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Define the session types
interface Session {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  image: string;
  isNew?: boolean;
}

const SESSIONS_DATA: Session[] = [
  {
    id: "dvs1",
    title: "DEEP GROOVES VOL. 45",
    artist: "DVS1 (MINNEAPOLIS)",
    duration: "2h 15m",
    genre: "TECH HOUSE",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYyamzW5v9HQCbapGp22d9FK-IEfYmwfiTKHMUhR1a8VIRG6IYDhER0HULftUbfWHHBuPNugc0MYsQdr9_-7G5_xR_OVQTmw4JZF00DbrSVUeFZsM0sthY0VvcPdKM2cyymjqaEM3QTHzEaZn0eDm_9OtESoYY1LZSqgjlbyajGcG4vn23-GMaP1nsnM7cy_-cs0E-GUoiQF90ijPIuLszlvDqZ0IsGLBybUhoQYd8PavvEcjS1OFj8H_Ac2JRTYZYYNHAlm-9u2U"
  },
  {
    id: "rodhad",
    title: "SUNSET RHYTHMS",
    artist: "RØDHÅD (BERLIN)",
    duration: "1h 45m",
    genre: "DEEP HOUSE",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBofOGhwVylsTkvlBOh2Q6AuohfRke-nwuopVl3Adj_uCRJIZYmj5Nc7kgUqAz_OofjiXJ0uUs66qnjeuZDcQujHNKkqq1A9lKe3Da7MlTsOKK8_8m5Y6Lhsf2ywg-9k9BXhtmh86vraqPC5vj55XQEFaZlCIezSJSiskTrXjvJfadL-zzaROKF-gj7eECMURM84rIRS_t4lo11Y62yITum-aF5dXLSKLD1cjM-qPnxGedPfABELJcu8ufopVhaLx7mf0MROZDQyLc",
    isNew: true
  },
  {
    id: "blawan",
    title: "MIDNIGHT PULSE",
    artist: "BLAWAN (LONDON)",
    duration: "3h 00m",
    genre: "MINIMAL",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7rn6umUqDeD80yRVAVCUljvj30xyovwnN25tXekDZVrjJC12op5WsR66FC8-iEGktbBXf8tzeuj1N3BDk0IrigC4jPLjHLacdv5H_KkKxNs9sVl7h_g3hrgOs65M4-6ihPDr49SqMCH9-Aob97Cv5snNjAtUsgAtH1sYgAud7Wi1PBFbiIcyk_pJKV-EoKgp-ry6OyCxeQvFHvbs8YYou_XZzN_c69Rp7ZlU9tWV3e3XxW70Jgsr3jYXz9EzjkNjE0nyxxhZPEKE"
  }
];

function SessionsContent() {
  const searchParams = useSearchParams();
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeYear, setActiveYear] = useState("2026");

  // Handle autoplay if coming from the homepage links
  useEffect(() => {
    const autoplay = searchParams.get("autoplay");
    if (autoplay && SESSIONS_DATA.some(s => s.id === autoplay)) {
      setActiveSessionId(autoplay);
      setIsPlaying(true);
    }
  }, [searchParams]);

  // Simulate audio track progress timeline
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && activeSessionId) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeSessionId]);

  const handlePlayToggle = (sessionId: string) => {
    if (activeSessionId === sessionId) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveSessionId(sessionId);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const getActiveSession = () => {
    return SESSIONS_DATA.find(s => s.id === activeSessionId) || null;
  };

  const activeSession = getActiveSession();

  return (
    <div className="bg-brand-bg-dark text-white font-sora min-h-screen flex flex-col pt-20 pb-24 md:pb-0 selection:bg-brand-orange selection:text-black">
      {/* TopNavBar (Web Only) - Unified Brutalist Header */}
      <header className="fixed top-0 w-full z-[100] bg-black border-b-4 border-brand-orange flex justify-between items-center px-6 md:px-16 h-20">
        <Link href="/" className="font-extrabold tracking-tighter text-2xl md:text-3xl border-r-4 border-brand-orange pr-6 h-full flex items-center select-none cursor-pointer text-brand-orange">
          MASS SESSIONS
        </Link>
        <nav className="hidden md:flex items-center gap-8 h-full justify-end ml-auto">
          <Link href="/sessions" className="font-bold uppercase tracking-wider text-sm h-full flex items-center px-2 border-b-4 border-brand-orange text-brand-orange">
            SESSIONS
          </Link>
          <Link href="/" className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-4 border-transparent hover:border-brand-orange text-brand-orange">
            INFO
          </Link>
          <Link href="/" className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-4 border-transparent hover:border-brand-orange text-brand-orange">
            EMAIL
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-16 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-sora text-[48px] font-extrabold tracking-tighter text-white mb-2 leading-none uppercase">SESSIONS</h1>
          <p className="text-lg text-on-surface-variant font-sora">
            Curated mixes, live recordings & sets.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 select-none">
          {["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"].map((year) => (
            <button 
              key={year}
              onClick={() => setActiveYear(year)}
              className={`glass-panel text-sm px-4 py-2 rounded-full cursor-pointer hover:border-brand-orange transition-all duration-300 font-sora ${
                activeYear === year 
                  ? "border-brand-orange text-brand-orange bg-brand-orange/10 font-bold" 
                  : "text-on-surface-variant hover:text-white"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="flex flex-col gap-6">
          {SESSIONS_DATA.map((session) => {
            const isCurrent = activeSessionId === session.id;
            return (
              <div 
                key={session.id}
                className={`glass-panel session-card rounded-xl overflow-hidden group hover:bg-surface-elevated transition-colors duration-300 relative ${
                  isCurrent && isPlaying ? "neon-border-orange" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Card Image */}
                  <div className="w-full md:w-48 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
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
                          <p className="text-sm font-semibold opacity-80 text-on-surface-variant font-sora mt-1">
                            BY {session.artist}
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
                      <div className="flex gap-2 select-none">
                        <span className="bg-surface-container-high px-2 py-1 rounded-sm font-sora text-xs text-on-surface border-l-2 border-l-brand-orange">
                          {session.genre}
                        </span>
                      </div>
                      <button 
                        onClick={() => handlePlayToggle(session.id)}
                        className={`neon-border text-xs px-6 py-2 rounded-lg font-sora font-semibold tracking-wider cursor-pointer active:scale-95 transition-all duration-300 flex items-center justify-center min-w-[140px] ${
                          isCurrent && isPlaying
                            ? "play-btn-playing" 
                            : "border-brand-orange text-brand-orange hover:bg-brand-orange/10"
                        }`}
                      >
                        {isCurrent && isPlaying ? (
                          <span className="material-symbols-outlined text-base">play_arrow</span>
                        ) : (
                          "PLAY SESSION"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
                onClick={() => setIsPlaying(!isPlaying)}
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
              <span>0:00</span>
              <div className="flex-grow h-1.5 bg-white/10 rounded-full overflow-hidden relative cursor-pointer group">
                <div 
                  className="absolute left-0 top-0 h-full bg-brand-orange rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-white border border-black rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: `calc(${progress}% - 6px)` }}></div>
              </div>
              <span>{activeSession.duration}</span>
            </div>
          </div>

          {/* Volume / Extra buttons */}
          <div className="flex items-center gap-4 self-end md:self-center select-none">
            <button className="text-white/60 hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined">volume_up</span>
            </button>
            <button 
              onClick={() => {
                setIsPlaying(false);
                setActiveSessionId(null);
              }}
              className="text-white/40 hover:text-white/80 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Unified Brutalist Footer */}
      <footer className="bg-black text-brand-orange w-full py-12 border-t-4 border-brand-orange pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center justify-between gap-6 md:flex-row text-center md:text-left">
          <div className="text-2xl font-extrabold tracking-widest border-4 border-brand-orange p-2 select-none inline-block">
            MASS SESSIONS
          </div>
          <p className="font-mono text-xs uppercase opacity-80 select-none">
            © 2026 SONIC PULSE. HIGH FIDELITY HOUSE MUSIC.
          </p>
        </div>
      </footer>

      {/* Unified Brutalist Mobile bottom menu */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-[110] bg-black border-t-4 border-brand-orange flex items-center justify-around h-20 select-none">
        <Link href="/" className="text-brand-orange flex flex-col items-center gap-1 opacity-70 hover:opacity-100 p-2">
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="font-mono text-[9px] uppercase font-bold">Home</span>
        </Link>
        <Link href="/sessions" className="text-brand-orange flex flex-col items-center gap-1 p-2 border-t-4 border-brand-orange">
          <span className="material-symbols-outlined text-2xl font-bold">graphic_eq</span>
          <span className="font-mono text-[9px] uppercase font-bold">Sessions</span>
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
