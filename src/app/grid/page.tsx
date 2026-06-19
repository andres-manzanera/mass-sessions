"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAudio } from "@/context/AudioContext";
import { SESSIONS_DATA } from "@/data/sessions";

function GridContent() {
  const [activeYear, setActiveYear] = useState("ALL");
  const { activeSession, isPlaying, playSession } = useAudio();

  // Filter and sort sessions
  const filteredSessions = SESSIONS_DATA.filter((session) => {
    if (activeYear === "ALL") return true;
    return session.date.startsWith(activeYear);
  }).sort((a, b) => b.date.localeCompare(a.date));

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
          <Link href="/grid" aria-current="page" aria-label="Grid — página actual" className="font-bold uppercase tracking-wider text-sm h-full flex items-center px-2 border-b-2 border-brand-orange text-brand-orange">
            THE GRID
          </Link>
          <Link href="/sessions" aria-label="Sesiones" className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-2 border-transparent hover:border-brand-accent hover:text-brand-accent text-brand-orange">
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
        <div className="mb-8 border border-brand-orange p-8 bg-black/40">
          <h1 className="font-sora text-[48px] font-extrabold tracking-wider text-white mb-2 leading-none uppercase">SESSIONS</h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-lg text-on-surface-variant font-sora max-w-md">
              Synchronized archival of high-fidelity auditory experiences. Technical performance logs.
            </p>
            <div className="font-mono text-xs text-brand-orange">STATUS: ONLINE // VERSION 2.0.6</div>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="mb-8 grid grid-cols-4 md:grid-cols-7 border border-brand-orange bg-black/40">
          {["ALL", "2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"].map((year, i) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`p-4 border-brand-orange transition-colors font-mono text-sm ${
                activeYear === year
                  ? "bg-brand-orange text-black font-bold"
                  : "text-brand-orange hover:bg-surface-container"
              } border-r ${i % 4 === 3 || i === 13 ? "border-r-0" : ""} ${i % 7 === 6 ? "md:border-r-0" : "md:border-r"} ${i >= 12 ? "col-span-2 md:col-span-1" : ""} border-b ${i >= 12 ? "border-b-0" : ""} ${i >= 7 ? "md:border-b-0" : "md:border-b"}`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* The Grid List */}
        <div className="border border-brand-orange bg-black/40">
          {filteredSessions.length === 0 ? (
            <div className="p-16 text-center text-on-surface-variant font-mono uppercase">
              No sessions found in the archive for {activeYear}.
            </div>
          ) : (
            filteredSessions.map((session, index) => {
              const isCurrent = activeSession?.id === session.id;
              
              return (
                <div key={session.id} className={`flex flex-col lg:flex-row hover:bg-surface-container transition-colors group ${index > 0 ? "border-t border-brand-orange" : ""}`}>
                  
                  {/* Image Column */}
                  <div className="w-full lg:w-[200px] h-[300px] lg:h-[200px] shrink-0 border-b lg:border-b-0 lg:border-r border-brand-orange relative overflow-hidden">
                    <Image 
                      alt={session.title} 
                      className={`w-full h-full object-cover transition-all duration-500 ${isCurrent && isPlaying ? "grayscale-0" : "grayscale group-hover:grayscale-0"}`} 
                      src={session.image}
                      fill
                      sizes="(max-width: 1024px) 100vw, 300px"
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/80 font-mono text-[10px] text-brand-orange border border-brand-orange">
                      {session.id}.RAW
                    </div>
                    {session.isNew && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-brand-accent text-black font-mono text-[10px] uppercase font-bold animate-pulse">
                        New_Record
                      </div>
                    )}
                  </div>

                  {/* Info Column */}
                  <div className="flex-grow p-6 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-brand-orange">
                    <div>
                      <div className="font-mono text-[10px] tracking-widest text-brand-orange mb-2 uppercase">
                        {session.id} // {session.title}
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <h2 className="font-sora text-2xl md:text-3xl font-bold uppercase text-white">
                          {session.title}
                        </h2>
                        {isCurrent && isPlaying && (
                          <div className="sound-wave select-none flex gap-1 items-end h-3">
                            <div className="w-[2px] bg-brand-orange animate-pulse" style={{ animationDelay: "0.1s", height: "100%" }}></div>
                            <div className="w-[2px] bg-brand-orange animate-pulse" style={{ animationDelay: "0.4s", height: "60%" }}></div>
                            <div className="w-[2px] bg-brand-orange animate-pulse" style={{ animationDelay: "0.2s", height: "80%" }}></div>
                            <div className="w-[2px] bg-brand-orange animate-pulse" style={{ animationDelay: "0.5s", height: "40%" }}></div>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-mono text-[10px] tracking-widest text-brand-orange">DATE</div>
                          <div className="font-mono text-sm mt-1">{session.date}</div>
                        </div>
                        <div>
                          <div className="font-mono text-[10px] tracking-widest text-brand-orange">TAGS</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {session.genres.map((g, idx) => (
                              <span key={idx} className="font-mono text-xs text-on-surface-variant uppercase bg-surface-elevated px-2 py-0.5 border border-brand-orange/30">
                                {g}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technical / Action Column */}
                  <div className="w-full lg:w-[250px] shrink-0 p-6 md:p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-brand-orange pb-2">
                        <span className="font-mono text-[10px] tracking-widest text-brand-orange uppercase">BPM</span>
                        <span className="font-mono text-sm text-brand-orange">124.00</span>
                      </div>
                      <div className="flex justify-between border-b border-brand-orange pb-2">
                        <span className="font-mono text-[10px] tracking-widest text-brand-orange uppercase">DURATION</span>
                        <span className="font-mono text-sm text-brand-orange">{session.duration}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => playSession(session.id)}
                      className={`w-full mt-8 py-3 border text-xs font-mono transition-all uppercase tracking-widest ${
                        isCurrent && isPlaying
                          ? "border-brand-accent text-black bg-brand-accent hover:bg-brand-accent/80"
                          : "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-black"
                      }`}
                    >
                      {isCurrent && isPlaying ? "PAUSE_PLAYBACK" : "INITIALIZE_PLAYBACK"}
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Unified Brutalist Mobile bottom menu */}
      <nav aria-label="Navegación móvil" className="md:hidden fixed bottom-0 left-0 w-full z-[110] bg-black border-t-2 border-brand-orange flex items-center justify-around h-20 select-none">
        <Link href="/" aria-label="Inicio" className="text-brand-orange flex flex-col items-center gap-1 opacity-70 hover:opacity-100 p-2">
          <span className="material-symbols-outlined text-2xl" aria-hidden="true">home</span>
          <span className="font-mono text-[9px] uppercase font-bold">Home</span>
        </Link>
        <Link href="/grid" aria-current="page" aria-label="Grid — página actual" className="text-brand-orange flex flex-col items-center gap-1 p-2 border-t-2 border-brand-orange">
          <span className="material-symbols-outlined text-2xl font-bold" aria-hidden="true">grid_view</span>
          <span className="font-mono text-[9px] uppercase font-bold">Grid</span>
        </Link>
        <Link href="/sessions" aria-label="Sesiones" className="text-brand-orange flex flex-col items-center gap-1 opacity-70 hover:opacity-100 p-2">
          <span className="material-symbols-outlined text-2xl" aria-hidden="true">graphic_eq</span>
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
