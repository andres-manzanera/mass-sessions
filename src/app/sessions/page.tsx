"use client";

import { useState, Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useAudio } from "@/context/AudioContext";
import { SESSIONS_DATA } from "@/data/sessions";

let hasLoadedGridInitially = false;

function SessionCard({ session, index, activeSession, isPlaying, playSession, isInitialGridLoad }: any) {
  const isCurrent = activeSession?.id === session.id;
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        } else {
          setIsInitialLoad(false);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  const animClass = isVisible 
    ? (isInitialLoad 
        ? (isInitialGridLoad ? "session-card-anim" : "session-card-page-anim") 
        : "session-card-scroll-anim")
    : "opacity-0";

  return (
    <div 
      id={session.id}
      ref={ref} 
      style={{ "--i": index } as React.CSSProperties} 
      tabIndex={0}
      className={`flex flex-col lg:flex-row lg:h-[200px] lg:hover:bg-surface-container transition-colors group border border-brand-orange bg-black/40 outline-none cursor-pointer ${animClass} ${index > 0 ? "lg:border-t-0" : ""}`}
    >
      
      {/* Image Column */}
      <div className="w-full lg:w-[200px] h-[300px] lg:h-full shrink-0 border-b lg:border-b-0 lg:border-r border-brand-orange relative overflow-hidden">
        <Image 
          alt={session.title} 
          className={`w-full h-full object-cover transition-all duration-500 lg:group-hover:scale-105 group-active:scale-105 group-focus:scale-105 ${isCurrent ? "grayscale-0" : "grayscale lg:group-hover:grayscale-0 group-active:grayscale-0 group-focus:grayscale-0"}`} 
          src={session.image}
          fill
          sizes="(max-width: 1024px) 100vw, 300px"
        />
      </div>

      {/* Info Column */}
      <div className="flex-grow p-6 flex flex-col justify-between lg:border-r border-brand-orange overflow-hidden">
        <div>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <h2 className={`font-sora text-2xl md:text-3xl font-bold uppercase transition-colors ${isCurrent ? "text-[#02E1EE]" : "text-white lg:group-hover:text-[#02E1EE] group-active:text-[#02E1EE] group-focus:text-[#02E1EE]"}`}>
                {session.title}
              </h2>
              {session.isNew && (
                <span className="border border-brand-accent text-brand-accent text-[10px] font-bold font-mono tracking-widest px-2 py-0.5 animate-pulse shrink-0 self-start mt-1.5 md:mt-2">NEW</span>
              )}
            </div>
            {isCurrent && isPlaying && (
              <div className="sound-wave select-none flex gap-1 items-end h-3">
                <div className="w-[2px] bg-brand-accent animate-sound-bounce" style={{ animationDelay: "0.1s", height: "100%" }}></div>
                <div className="w-[2px] bg-brand-accent animate-sound-bounce" style={{ animationDelay: "0.4s", height: "60%" }}></div>
                <div className="w-[2px] bg-brand-accent animate-sound-bounce" style={{ animationDelay: "0.2s", height: "80%" }}></div>
                <div className="w-[2px] bg-brand-accent animate-sound-bounce" style={{ animationDelay: "0.5s", height: "40%" }}></div>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-mono text-[10px] tracking-widest text-brand-orange">DATE</div>
            <div className={`font-mono text-sm mt-1 transition-colors ${isCurrent ? "text-brand-accent" : "text-white group-hover:text-brand-accent group-active:text-brand-accent group-focus:text-brand-accent"}`}>{session.date}</div>
          </div>
          <div className="text-right lg:text-left">
            <div className="font-mono text-[10px] tracking-widest text-brand-orange">TAGS</div>
            <div className="flex flex-wrap justify-end lg:justify-start gap-2 mt-1">
              {session.genres.map((g: string, idx: number) => (
                <span key={idx} className="font-mono text-[10px] text-brand-orange uppercase bg-transparent px-2 py-0.5 border border-brand-orange">
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Separator */}
      <div className="lg:hidden mx-6 border-t border-brand-orange"></div>

      {/* Technical / Action Column */}
      <div className="w-full lg:w-[250px] shrink-0 p-6 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between lg:flex-col lg:space-y-4">
          <div className="flex items-center gap-2 lg:justify-between lg:border-b lg:border-brand-orange lg:pb-2">
            <span className="font-mono text-[10px] tracking-widest text-brand-orange uppercase">BPM</span>
            <span className="font-mono text-sm text-brand-orange">124.00</span>
          </div>
          <div className="flex items-center gap-2 lg:justify-between lg:border-b lg:border-brand-orange lg:pb-2">
            <span className="font-mono text-[10px] tracking-widest text-brand-orange uppercase">DURATION</span>
            <span className="font-mono text-sm text-brand-orange">{session.duration}</span>
          </div>
        </div>
        
        <div className={`w-full mt-4 lg:mt-0 shrink-0 ${isCurrent && !isPlaying ? "animate-pulse" : ""}`}>
          <button 
            onClick={() => playSession(session.id)}
            style={{ 
              WebkitTapHighlightColor: "transparent",
              backgroundColor: isCurrent && isPlaying ? "#02E1EE" : "transparent",
              color: isCurrent && isPlaying ? "#000" : isCurrent && !isPlaying ? "#02E1EE" : "#F2F0EB",
              borderColor: isCurrent ? "#02E1EE" : "#F2F0EB"
            }}
            className={`w-full py-3 border text-[10px] font-mono uppercase tracking-widest cursor-pointer transition-colors ${
              !isCurrent ? "lg:hover:bg-brand-orange lg:hover:text-black" : isPlaying ? "lg:hover:bg-brand-accent/80 lg:hover:border-brand-accent/80" : ""
            }`}
          >
            {isCurrent && isPlaying ? "PAUSE SESSION" : "PLAY SESSION"}
          </button>
        </div>
      </div>
    </div>
  );
}

function GridContent() {
  const [activeYear, setActiveYear] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { activeSession, isPlaying, playSession } = useAudio();
  const searchParams = useSearchParams();
  const [isInitialGridLoad, setIsInitialGridLoad] = useState(!hasLoadedGridInitially);

  useEffect(() => {
    hasLoadedGridInitially = true;
    const t = setTimeout(() => setIsInitialGridLoad(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const autoplayId = searchParams.get("autoplay");
    if (autoplayId) {
      const sessionToPlay = SESSIONS_DATA.find(s => s.id === autoplayId);
      if (sessionToPlay) {
        const year = sessionToPlay.date.substring(0, 4);
        setActiveYear(year);
        // Ensure we only trigger play if it's not already playing this session
        if (activeSession?.id !== autoplayId) {
          // Add a tiny delay to ensure AudioContext can handle it after navigation
          setTimeout(() => {
            playSession(autoplayId);
            const el = document.getElementById(autoplayId);
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: "instant" });
            }
          }, 150);
        } else {
          // If already playing, just scroll to it
          setTimeout(() => {
            const el = document.getElementById(autoplayId);
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: "instant" });
            }
          }, 150);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Filter and sort sessions
  const filteredSessions = SESSIONS_DATA.filter((session) => {
    if (activeYear === "ALL") return true;
    return session.date.startsWith(activeYear);
  }).sort((a, b) => b.date.localeCompare(a.date));

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSessions = filteredSessions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-brand-bg-dark text-white font-sora min-h-screen flex flex-col pt-20 pb-20 md:pb-32 relative">
      
      {/* Existing Global Header */}
      <header className="fixed top-0 w-full z-[100] bg-black border-b-2 border-brand-orange flex justify-between items-center pr-0 md:pr-16 h-20">
        <Link href="/" aria-label="Ir a la página principal de Mass Sessions" className="font-extrabold tracking-normal text-2xl md:text-3xl border-r-2 border-brand-orange px-6 md:px-16 h-full flex items-center select-none cursor-pointer text-brand-orange whitespace-nowrap">
          MASS SESSIONS
        </Link>
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8 h-full justify-end ml-auto border-l-2 border-brand-orange pl-6 md:pl-16">
          <Link href="/" aria-label="Inicio" className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-2 border-transparent hover:border-brand-accent hover:text-brand-accent text-brand-orange">
            HOME
          </Link>
          <Link href="/sessions" aria-current="page" aria-label="Sesiones — página actual" className="font-bold uppercase tracking-wider text-sm h-full flex items-center px-2 border-b-2 border-brand-orange text-brand-orange">
            SESSIONS
          </Link>
          <Link href="/info" aria-label="Información sobre Mass Sessions" className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-2 border-transparent hover:border-brand-accent hover:text-brand-accent text-brand-orange">
            INFO
          </Link>
        </nav>
      </header>

      {/* Main Content (The Grid System Design) */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-16 pt-8 relative z-10">
        
        {/* Page Header */}
        <div className="mb-8 border border-brand-orange p-8 bg-black/40 session-tab-anim">
          <h1 className="font-sora text-[48px] font-extrabold tracking-wider text-white mb-2 leading-none uppercase">SESSIONS</h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <p className="text-lg text-brand-orange opacity-60 font-sora max-w-md">
              Synchronized archival of high-fidelity auditory experiences. Technical performance logs.
            </p>
            <div className="font-mono text-xs text-brand-orange">STATUS: ONLINE // VERSION 2.0.6</div>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="mb-8 flex flex-wrap bg-black/40 pl-[1px] pt-[1px] overflow-hidden">
          {["ALL", "2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2015", "2014"].map((year, idx) => (
            <button
              key={year}
              style={{ "--i": idx } as React.CSSProperties}
              onClick={() => {
                setActiveYear(year);
                setCurrentPage(1);
                const grid = document.getElementById("sessions-grid");
                if (grid) {
                  const y = grid.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: "instant" });
                }
              }}
              className={`cursor-pointer p-4 w-1/4 md:w-[calc(100%/7)] border border-brand-orange ml-[-1px] mt-[-1px] transition-colors font-mono text-sm ${
                activeYear === year
                  ? "bg-brand-orange text-black font-bold"
                  : "text-brand-orange hover:bg-white/10"
              } session-tab-anim`}
            >
              {year}
            </button>
          ))}
          <div style={{ "--i": 13 } as React.CSSProperties} className="flex-grow border border-brand-orange ml-[-1px] mt-[-1px] pointer-events-none session-tab-anim"></div>
        </div>

        {/* The Grid List */}
        <div id="sessions-grid" className="flex flex-col gap-6 lg:gap-0 lg:block">
          {paginatedSessions.length === 0 ? (
            <div style={{ "--i": 0 } as React.CSSProperties} className="p-16 text-center text-brand-orange/60 font-mono text-sm uppercase tracking-widest session-card-page-anim lg:border lg:border-brand-orange lg:bg-black/40">
              No sessions available for {activeYear} yet.
            </div>
          ) : (
            paginatedSessions.map((session, index) => (
              <SessionCard 
                key={session.id} 
                session={session} 
                index={index} 
                activeSession={activeSession} 
                isPlaying={isPlaying} 
                playSession={playSession} 
                isInitialGridLoad={isInitialGridLoad}
              />
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <nav aria-label="Paginación de sesiones" className="flex items-center justify-center gap-3 mt-12 select-none flex-wrap">
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                  const grid = document.getElementById("sessions-grid");
                  if (grid) {
                    const y = grid.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: "instant" });
                  }
                }
              }}
              disabled={currentPage === 1}
              className={`border-2 px-4 py-2 font-mono text-xs uppercase font-bold transition-all ${
                currentPage === 1
                  ? "border-brand-orange/20 text-brand-orange/20 cursor-not-allowed"
                  : "border-brand-orange text-brand-orange cursor-pointer hover:bg-brand-accent hover:border-brand-accent hover:text-black"
              }`}
            >
              PREV
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      const grid = document.getElementById("sessions-grid");
                      if (grid) {
                        const y = grid.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top: y, behavior: "instant" });
                      }
                    }}
                    className={`w-9 h-9 border-2 font-mono text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                      currentPage === pageNum
                        ? "border-brand-accent text-black bg-brand-accent"
                        : "border-brand-orange text-brand-orange hover:bg-brand-orange/10"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1);
                  const grid = document.getElementById("sessions-grid");
                  if (grid) {
                    const y = grid.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: "instant" });
                  }
                }
              }}
              disabled={currentPage === totalPages}
              className={`border-2 px-4 py-2 font-mono text-xs uppercase font-bold transition-all ${
                currentPage === totalPages
                  ? "border-brand-orange/20 text-brand-orange/20 cursor-not-allowed"
                  : "border-brand-orange text-brand-orange cursor-pointer hover:bg-brand-accent hover:border-brand-accent hover:text-black"
              }`}
            >
              NEXT
            </button>
          </nav>
        )}
      </main>

      {/* Unified Brutalist Mobile bottom menu */}
      <nav aria-label="Navegación móvil" className="md:hidden fixed bottom-0 left-0 w-full z-[110] bg-black border-t-2 border-brand-orange flex items-center justify-around h-20 select-none">
        <Link href="/" aria-label="Inicio" className="text-brand-orange flex flex-col items-center gap-1 opacity-70 hover:opacity-100 p-2">
          <span className="material-symbols-outlined text-2xl" aria-hidden="true">home</span>
          <span className="font-mono text-[9px] uppercase font-bold">Home</span>
        </Link>
        <Link href="/sessions" aria-current="page" aria-label="Sesiones — página actual" className="text-brand-orange flex flex-col items-center gap-1 p-2 border-t-2 border-brand-orange">
          <span className="material-symbols-outlined text-2xl font-bold" aria-hidden="true">graphic_eq</span>
          <span className="font-mono text-[9px] uppercase font-bold">Sessions</span>
        </Link>
        <Link href="/info" aria-label="Información" className="text-brand-orange flex flex-col items-center gap-1 opacity-70 hover:opacity-100 p-2">
          <span className="material-symbols-outlined text-2xl" aria-hidden="true">info</span>
          <span className="font-mono text-[9px] uppercase font-bold">Info</span>
        </Link>
      </nav>
    </div>
  );
}

export default function GridPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-orange"></div>
      </div>
    }>
      <GridContent />
    </Suspense>
  );
}
