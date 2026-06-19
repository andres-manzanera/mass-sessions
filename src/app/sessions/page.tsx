"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useAudio } from "@/context/AudioContext";
import { SESSIONS_DATA } from "@/data/sessions";

// JSON-LD schema for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicPlaylist",
  "name": "Mass Sessions — Archive",
  "description": "Curated mixes, live recordings & deep sets from Mass Sessions. High fidelity house music in the rawest environments.",
  "url": "https://mass-sessions.vercel.app/sessions",
  "track": SESSIONS_DATA.map((session) => ({
    "@type": "MusicRecording",
    "name": session.title,
    "byArtist": {
      "@type": "MusicGroup",
      "name": session.artist,
    },
    "genre": session.genres.join(", "),
    "duration": session.duration,
    "datePublished": session.date,
    "contentUrl": session.audioUrl,
    "image": `https://mass-sessions.vercel.app${session.image}`,
  })),
};

function SessionsContent() {
  const searchParams = useSearchParams();
  const [activeYear, setActiveYear] = useState("ALL");
  const [animKey, setAnimKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { activeSession, isPlaying, playSession } = useAudio();

  // Filter and sort sessions
  const filteredSessions = SESSIONS_DATA.filter((session) => {
    if (activeYear === "ALL") return true;
    return session.date.startsWith(activeYear);
  }).sort((a, b) => b.date.localeCompare(a.date));

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  
  // Slice sessions for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSessions = filteredSessions.slice(startIndex, startIndex + itemsPerPage);

  // Handle autoplay and auto-scroll if coming from the homepage links
  useEffect(() => {
    const autoplay = searchParams.get("autoplay");
    if (autoplay && SESSIONS_DATA.some((s) => s.id === autoplay)) {
      const session = SESSIONS_DATA.find((s) => s.id === autoplay);
      if (session) {
        // Set the active year filter to the session's specific year
        const sessionYear = session.date.substring(0, 4);
        setActiveYear(sessionYear);
        
        // Find the page this session is on within that specific year filter
        const filteredAll = SESSIONS_DATA.filter((s) => s.date.startsWith(sessionYear))
                                         .sort((a, b) => b.date.localeCompare(a.date));
        const sessionIndex = filteredAll.findIndex((s) => s.id === autoplay);
        if (sessionIndex !== -1) {
          const targetPage = Math.ceil((sessionIndex + 1) / itemsPerPage);
          setCurrentPage(targetPage);
        }
      }

      const timer = setTimeout(() => {
        playSession(autoplay);
        // Scroll to the active session card and center it in viewport
        const element = document.getElementById(`session-${autoplay}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <div className="bg-brand-bg-dark text-white font-sora min-h-screen flex flex-col pt-20 pb-0 selection:bg-brand-orange selection:text-black relative">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Dots background texture */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(#F2F0EB 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Dark "eraser" blobs that cover/fade the dots in irregular patches */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-[5%] left-[25%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full blur-[40px]"
          style={{ background: "radial-gradient(circle, #111317 30%, transparent 80%)", opacity: 0.95 }}
        />
        <div
          className="absolute top-[35%] right-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full blur-[50px]"
          style={{ background: "radial-gradient(circle, #111317 30%, transparent 80%)", opacity: 0.9 }}
        />
        <div
          className="absolute bottom-[30%] left-[5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-[45px]"
          style={{ background: "radial-gradient(circle, #111317 30%, transparent 80%)", opacity: 0.95 }}
        />
        <div
          className="absolute bottom-[5%] right-[15%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full blur-[35px]"
          style={{ background: "radial-gradient(circle, #111317 30%, transparent 80%)", opacity: 0.9 }}
        />
      </div>

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

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-16 pt-12 pb-20 md:pt-20 md:pb-32 relative z-10">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-sora text-[48px] font-extrabold tracking-wider text-white mb-2 leading-none uppercase">SESSIONS</h1>
          <p className="text-lg text-on-surface-variant font-sora">
            Curated mixes, live recordings &amp; deep sets.
          </p>
        </div>

        {/* Filters */}
        <div role="group" aria-label="Filtrar sesiones por año" className="flex flex-wrap gap-2 mb-8 select-none">
          {["ALL", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"].map((year, i) => (
            <button
              key={year}
              onClick={() => { setActiveYear(year); setCurrentPage(1); setAnimKey((k) => k + 1); }}
              aria-pressed={activeYear === year}
              aria-label={year === "ALL" ? "Mostrar todas las sesiones" : `Filtrar sesiones del año ${year}`}
              className={`session-tab-anim text-sm px-4 py-2 rounded-full cursor-pointer hover:border-brand-orange transition-all duration-300 font-sora ${
                activeYear === year
                  ? "border-orange-500 text-black bg-orange-500 font-extrabold"
                  : "glass-panel text-on-surface-variant hover:text-white"
              }`}
              style={{ "--i": i } as React.CSSProperties}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="flex flex-col gap-6" role="list" aria-label="Lista de sesiones">
          {(() => {
            if (paginatedSessions.length === 0) {
              return (
                <div role="status" className="text-center py-16 border-2 border-dashed border-brand-orange/20 rounded-xl text-on-surface-variant uppercase font-mono select-none">
                  No recordings cataloged for {activeYear}.
                </div>
              );
            }

            return paginatedSessions.map((session, i) => {
              const isCurrent = activeSession?.id === session.id;
              return (
                <article
                  key={`${animKey}-${currentPage}-${session.id}`}
                  id={`session-${session.id}`}
                  role="listitem"
                  aria-label={`Sesión: ${session.title} por ${session.artist}`}
                  className={`session-card-anim glass-panel session-card rounded-xl overflow-hidden group hover:bg-surface-elevated transition-colors duration-300 relative ${
                    isCurrent && isPlaying ? "neon-border-orange" : ""
                  }`}
                  style={{ "--i": Math.min(i, 8) } as React.CSSProperties}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Card Image */}
                    <div className="w-full md:w-[226px] h-48 md:h-[226px] relative overflow-hidden flex-shrink-0">
                      <Image
                        alt={`Portada de ${session.title} por ${session.artist}`}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        src={session.image}
                        fill
                        sizes="(max-width: 768px) 100vw, 226px"
                      />
                      <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
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
                                <div className="sound-wave select-none" aria-label="Reproduciendo ahora" title="Reproduciendo ahora">
                                  <div className="sound-wave-bar" style={{ animationDelay: "0.1s" }}></div>
                                  <div className="sound-wave-bar" style={{ animationDelay: "0.4s" }}></div>
                                  <div className="sound-wave-bar" style={{ animationDelay: "0.2s" }}></div>
                                  <div className="sound-wave-bar" style={{ animationDelay: "0.5s" }}></div>
                                  <div className="sound-wave-bar" style={{ animationDelay: "0.3s" }}></div>
                                </div>
                              )}
                            </div>
                            <p className="text-sm font-semibold opacity-80 text-on-surface-variant font-sora mt-1 uppercase">
                              {session.date}
                            </p>
                          </div>
                          {session.isNew && (
                            <div aria-label="Sesión nueva" className="flex items-center gap-2 text-brand-orange bg-brand-orange/10 px-3 py-1 border border-brand-orange rounded font-bold text-xs select-none animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" aria-hidden="true"></span>
                              NEW
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-brand-orange-light flex items-center gap-2 mt-2 font-sora">
                          <span className="material-symbols-outlined text-base" aria-hidden="true">schedule</span>
                          <span>{session.duration}</span>
                        </p>
                      </div>

                      <div className="flex justify-between items-end mt-8">
                        <div className="flex flex-col md:flex-row gap-2 select-none items-start md:items-center" aria-label="Géneros">
                          {session.genres.map((g, idx) => (
                            <span key={idx} className="bg-surface-container-high px-2 py-1 rounded-sm font-sora text-xs text-on-surface border-l-2 border-l-brand-orange uppercase">
                              {g}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => playSession(session.id)}
                          aria-label={isCurrent && isPlaying ? `Pausar ${session.title}` : `Reproducir ${session.title} de ${session.artist}`}
                          aria-pressed={isCurrent && isPlaying}
                          className={`play-session-btn text-[11px] tracking-wider flex items-center justify-center min-w-[140px] ${
                            isCurrent && isPlaying ? "play-btn-playing" : ""
                          }`}
                        >
                          {isCurrent && isPlaying ? (
                            <span className="material-symbols-outlined text-base" aria-hidden="true">pause</span>
                          ) : (
                            "PLAY SESSION"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            });
          })()}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <nav aria-label="Paginación de sesiones" className="flex items-center justify-center gap-3 mt-16 select-none flex-wrap">
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
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
                      window.scrollTo({ top: 0, behavior: "smooth" });
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
                  window.scrollTo({ top: 0, behavior: "smooth" });
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
