"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  // If loading screen was already shown this session, skip hero animations
  const [skipAnim, setSkipAnim] = useState(false);
  const [activeTouchSession, setActiveTouchSession] = useState<number | null>(null);
  const [soundBgActive, setSoundBgActive] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("ms_loading_shown");
    // The key is set BEFORE the timers start in LoadingScreen, so if it exists
    // AND the page was already visited (we check a second key), skip animations.
    const alreadyVisited = sessionStorage.getItem("ms_hero_visited");
    if (alreadyVisited) {
      setSkipAnim(true);
    } else {
      // Mark that hero animation has played once
      setTimeout(() => {
        sessionStorage.setItem("ms_hero_visited", "1");
      }, 7500);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !parallaxRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const distanceFromCenter = sectionCenter - viewportHeight / 2;
      // Direct style mutation avoids React re-renders, keeping the scroll fluid
      parallaxRef.current.style.transform = `translateY(${-0.15 * distanceFromCenter}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const timeoutId = setTimeout(handleScroll, 50);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("info") === "true") {
        setInfoOpen(true);
      }
      if (urlParams.get("tickets") === "true") {
        setTicketModalOpen(true);
      }
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
        setTicketModalOpen(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-black text-brand-orange font-sora min-h-screen selection:bg-brand-orange selection:text-black">
      <LoadingScreen />
      <header className={`fixed top-0 w-full z-[100] bg-black border-b-2 border-brand-orange flex justify-between items-center pr-0 md:pr-16 h-20${skipAnim ? "" : " hero-navbar"}`}>
        <Link href="/" className="font-extrabold tracking-normal text-2xl md:text-3xl border-r-2 border-brand-orange px-6 md:px-16 h-full flex items-center select-none cursor-pointer">
          MASS SESSIONS
        </Link>
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8 h-full justify-end ml-auto border-l-2 border-brand-orange pl-6 md:pl-16">
          <Link href="/" aria-current="page" aria-label="Inicio — página actual" className="font-bold uppercase tracking-wider text-sm h-full flex items-center px-2 border-b-2 border-brand-orange text-brand-orange">
            HOME
          </Link>
          <Link href="/sessions" aria-label="Ver sesiones" className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-2 border-transparent hover:border-brand-accent hover:text-brand-accent">
            SESSIONS
          </Link>
          <Link
            href="/info"
            aria-label="Ver información sobre Mass Sessions"
            className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-2 border-transparent hover:border-brand-accent hover:text-brand-accent"
          >
            INFO
          </Link>
        </nav>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-20 min-h-screen flex flex-col">
        
        {/* Hero Section - Massive Background Image & Text */}
        <section className="relative w-full h-[calc(100vh-5rem)] min-h-[500px] border-b-2 border-brand-orange flex flex-col justify-end p-6 pb-24 md:p-16 overflow-hidden">
          {/* Zooming background image wrapper */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <Image
              src="/hero.jpg"
              alt="Mass Sessions — Sesión de música house en directo en un espacio industrial"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center animate-hero-zoom-out"
            />
            {/* Static dark overlay */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none" aria-hidden="true" />
          </div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none z-0"></div>

          {/* Overlay Text */}
          <div className="z-10 relative select-none">
            <h1 className="text-[12vw] sm:text-[9vw] md:text-[8vw] leading-none uppercase font-extrabold tracking-normal mix-blend-difference break-words text-brand-orange">
              <span className={skipAnim ? undefined : "hero-mass"}>MASS</span><br />
              <span className={skipAnim ? undefined : "hero-sessions"}><svg 
                viewBox="0 0 384 60" 
                className="h-[0.95em] w-auto inline-block overflow-visible align-bottom select-none"
              >
                <path
                  d="M24.05 73.44Q16.70 73.44 11.70 71.14Q6.70 68.83 4.14 64.84Q1.58 60.84 1.58 55.66L14.54 55.66Q14.54 58.54 16.88 60.44Q19.22 62.35 24.05 62.35Q28.22 62.35 30.56 60.77Q32.90 59.18 32.90 56.52Q32.90 54.22 30.96 52.96Q29.02 51.70 24.41 51.34L21.02 51.05Q12.89 50.33 8.06 45.94Q3.24 41.54 3.24 34.27Q3.24 26.57 8.57 22.21Q13.90 17.86 22.82 17.86Q29.30 17.86 33.80 20.02Q38.30 22.18 40.68 26.10Q43.06 30.02 43.06 35.21L30.10 35.21Q30.10 32.62 28.19 30.78Q26.28 28.94 22.82 28.94Q19.51 28.94 17.86 30.46Q16.20 31.97 16.20 34.27Q16.20 36.29 17.57 37.73Q18.94 39.17 22.32 39.46L25.70 39.74Q31.61 40.25 36.14 42.30Q40.68 44.35 43.27 47.88Q45.86 51.41 45.86 56.52Q45.86 61.63 43.24 65.45Q40.61 69.26 35.75 71.35Q30.89 73.44 24.05 73.44M86.47 72L52.78 72L52.78 19.44L86.04 19.44L86.04 30.38L65.74 30.38L65.74 39.82L84.96 39.82L84.96 50.76L65.74 50.76L65.74 61.06L86.47 61.06L86.47 72M113.83 73.44Q106.49 73.44 101.48 71.14Q96.48 68.83 93.92 64.84Q91.37 60.84 91.37 55.66L104.33 55.66Q104.33 58.54 106.67 60.44Q109.01 62.35 113.83 62.35Q118.01 62.35 120.35 60.77Q122.69 59.18 122.69 56.52Q122.69 54.22 120.74 52.96Q118.80 51.70 114.19 51.34L110.81 51.05Q102.67 50.33 97.85 45.94Q93.02 41.54 93.02 34.27Q93.02 26.57 98.35 22.21Q103.68 17.86 112.61 17.86Q119.09 17.86 123.59 20.02Q128.09 22.18 130.46 26.10Q132.84 30.02 132.84 35.21L119.88 35.21Q119.88 32.62 117.97 30.78Q116.06 28.94 112.61 28.94Q109.30 28.94 107.64 30.46Q105.98 31.97 105.98 34.27Q105.98 36.29 107.35 37.73Q108.72 39.17 112.10 39.46L115.49 39.74Q121.39 40.25 125.93 42.30Q130.46 44.35 133.06 47.88Q135.65 51.41 135.65 56.52Q135.65 61.63 133.02 65.45Q130.39 69.26 125.53 71.35Q120.67 73.44 113.83 73.44M161.28 73.44Q153.94 73.44 148.93 71.14Q143.93 68.83 141.37 64.84Q138.82 60.84 138.82 55.66L151.78 55.66Q151.78 58.54 154.12 60.44Q156.46 62.35 161.28 62.35Q165.46 62.35 167.80 60.77Q170.14 59.18 170.14 56.52Q170.14 54.22 168.19 52.96Q166.25 51.70 161.64 51.34L158.26 51.05Q150.12 50.33 145.30 45.94Q140.47 41.54 140.47 34.27Q140.47 26.57 145.80 22.21Q151.13 17.86 160.06 17.86Q166.54 17.86 171.04 20.02Q175.54 22.18 177.91 26.10Q180.29 30.02 180.29 35.21L167.33 35.21Q167.33 32.62 165.42 30.78Q163.51 28.94 160.06 28.94Q156.74 28.94 155.09 30.46Q153.43 31.97 153.43 34.27Q153.43 36.29 154.80 37.73Q156.17 39.17 159.55 39.46L162.94 39.74Q168.84 40.25 173.38 42.30Q177.91 44.35 180.50 47.88Q183.10 51.41 183.10 56.52Q183.10 61.63 180.47 65.45Q177.84 69.26 172.98 71.35Q168.12 73.44 161.28 73.44M203.54 72L190.15 72L190.15 19.44L203.54 19.44L203.54 72M240.12 73.44Q232.92 73.44 227.59 70.96Q222.26 68.47 218.74 64.40Q215.21 60.34 213.48 55.58Q211.75 50.83 211.75 46.37L211.75 44.78Q211.75 39.82 213.55 35.03Q215.35 30.24 218.95 26.35Q222.55 22.46 227.84 20.16Q233.14 17.86 240.12 17.86Q247.03 17.86 252.32 20.16Q257.62 22.46 261.22 26.35Q264.82 30.24 266.65 35.03Q268.49 39.82 268.49 44.78L268.49 46.37Q268.49 50.83 266.72 55.58Q264.96 60.34 261.43 64.40Q257.90 68.47 252.58 70.96Q247.25 73.44 240.12 73.44M240.12 60.91Q244.73 60.91 248.04 58.90Q251.35 56.88 253.15 53.42Q254.95 49.97 254.95 45.65Q254.95 41.04 253.15 37.62Q251.35 34.20 248 32.29Q244.66 30.38 240.12 30.38Q233.28 30.38 229.28 34.60Q225.29 38.81 225.29 45.65Q225.29 49.97 227.09 53.42Q228.89 56.88 232.20 58.90Q235.51 60.91 240.12 60.91M288.94 72L276.55 72L276.55 19.44L298.51 19.44L316.01 61.34L317.09 61.34L317.09 19.44L329.62 19.44L329.62 72L307.51 72L290.02 30.10L288.94 30.10L288.94 72M358.99 73.44Q351.65 73.44 346.64 71.14Q341.64 68.83 339.08 64.84Q336.53 60.84 336.53 55.66L349.49 55.66Q349.49 58.54 351.83 60.44Q354.17 62.35 358.99 62.35Q363.17 62.35 365.51 60.77Q367.85 59.18 367.85 56.52Q367.85 54.22 365.90 52.96Q363.96 51.70 359.35 51.34L355.97 51.05Q347.83 50.33 343.01 45.94Q338.18 41.54 338.18 34.27Q338.18 26.57 343.51 22.21Q348.84 17.86 357.77 17.86Q364.25 17.86 368.75 20.02Q373.25 22.18 375.62 26.10Q378.29 30.02 378.29 35.21L365.33 35.21Q365.33 32.62 363.13 30.78Q361.22 28.94 357.77 28.94Q354.46 28.94 352.80 30.46Q351.14 31.97 351.14 34.27Q351.14 36.29 352.51 37.73Q353.88 39.17 357.26 39.46L360.65 39.74Q366.55 40.25 371.09 42.30Q375.62 44.35 378.22 47.88Q380.81 51.41 380.81 56.52Q380.81 61.63 378.18 65.45Q375.55 69.26 370.69 71.35Q365.83 73.44 358.99 73.44"
                  transform="translate(-1, -17)"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg></span>
            </h1>
            <p className={`font-semibold text-sm sm:text-base md:text-xl max-w-none mt-4 bg-black py-4 px-6 border-2 border-brand-orange inline-block sm:whitespace-nowrap${skipAnim ? "" : " hero-tagline"}`}>
              NO COMPROMISE. HIGH FIDELITY HOUSE MUSIC IN THE RAWEST ENVIRONMENTS.
            </p>
          </div>

          {/* Absolute brutalist elements */}
          <div className="absolute top-8 right-8 border-2 border-brand-orange p-4 bg-black/90 backdrop-blur-sm transform rotate-3 select-none hidden sm:block z-10">
            <span className="material-symbols-outlined text-4xl text-brand-orange">warning</span>
            <p className="font-mono text-xs uppercase tracking-widest mt-2">Volume Warning</p>
          </div>
        </section>

        {/* Marquee Divider */}
        <div className="marquee-container">
          <div className="marquee-content select-none">
            // UNDERGROUND SESSIONS // NO PHONES ON THE DANCEFLOOR // FEEL THE BASS // RESPECT THE SPACE // SONIC PULSE // &nbsp;
            // UNDERGROUND SESSIONS // NO PHONES ON THE DANCEFLOOR // FEEL THE BASS // RESPECT THE SPACE // SONIC PULSE // &nbsp;
          </div>
        </div>

        {/* Dense Grid Section */}
        <section className="w-full">
          <div className="flex flex-col md:flex-row w-full min-h-[60vh]">
            
            {/* Left Block */}
            <div className="w-full md:w-1/3 bg-black border-b-2 md:border-b-0 md:border-r-2 border-brand-orange p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="z-10">
                <h2 className="text-4xl font-extrabold uppercase mb-4 tracking-tighter">NEXT<br />SESSION</h2>
                <div className="font-mono text-xs font-semibold bg-brand-orange text-black inline-block px-3 py-1 mb-6">
                  DATE: 08.24.2026
                </div>
                <p className="text-sm uppercase opacity-85 max-w-xs font-semibold">
                  Explore our full catalog of raw high-fidelity recordings and live sets.
                </p>
              </div>

              <Link 
                href="/sessions"
                className="mt-12 bg-transparent border-2 border-brand-orange text-brand-orange px-8 py-4 font-bold text-lg uppercase hover:bg-brand-accent hover:border-brand-accent hover:text-black transition-colors w-full text-left flex justify-between items-center group-hover:neon-glow-brutalist z-10 cursor-pointer bg-black"
              >
                SECURE ACCESS
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
              </Link>

              {/* Decorative background texture */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F2F0EB 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            </div>

            {/* Middle Image Block */}
            <div
              className="w-full md:w-1/3 border-b-2 md:border-b-0 md:border-r-2 border-brand-orange min-h-[400px] relative overflow-hidden transition-all duration-500 flex flex-col justify-between p-4 animate-intermittent-grayscale"
              aria-label="Gear Porn — imágenes de equipamiento de sonido"
            >
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVoTVe-1HLc45UMAYLECL2h4Nn3n1OSwVbNVtXoEBd-lmc_GeYbW8FWePBnHm42IMbB3VJanpgbSL0WpBQenCs04uHY4coOYfa3L6FqTI2N4bGqB-kD2h6a-cexJSm_KLG7jrkaL6WEznkBMECMaHtctMuCiM5hl4mpCKy19xhMdPPgWTAOGhpjmygDdcikbqsGw2hNB7SlWAvnXH3Ljb_w2Kq94ZDfu28HNKRxvCAv8bUYQbU3Ylgy1_3SV5jQmEEzmEjfFgLTQw"
                alt="Equipamiento de sonido de alta fidelidad — mesa de mezclas y reproductores analógicos"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
                unoptimized
              />
              {/* Dark gritty overlay */}
              <div className="absolute inset-0 bg-black/60 mix-blend-multiply pointer-events-none" aria-hidden="true" />
              <div></div>
              <div className="bg-brand-orange text-black font-mono text-xs px-2 py-1 uppercase font-semibold self-start z-10 select-none relative">
                GEAR PORN
              </div>
            </div>

            {/* Right Block List */}
            <div className="w-full md:w-1/3 bg-black p-0 flex flex-col justify-center select-none">
              <Link 
                href="/sessions?autoplay=rodhad" 
                onTouchStart={() => setActiveTouchSession(0)}
                onTouchEnd={() => setActiveTouchSession(null)}
                onTouchCancel={() => setActiveTouchSession(null)}
                className={`relative w-full border-b-2 border-brand-orange py-6 px-6 bg-black transition-all duration-300 ease-in-out cursor-pointer group flex justify-between items-center z-0 ${
                  activeTouchSession === 0 
                    ? "z-10 py-9 bg-[#18181b] shadow-[0_10px_30px_rgba(0,0,0,0.8)]" 
                    : ""
                } hover:z-10 hover:py-9 hover:bg-[#18181b] hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]`}
              >
                {/* Dots background texture on hover */}
                <div 
                  className={`absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none ${
                    activeTouchSession === 0 ? "opacity-10" : ""
                  } group-hover:opacity-10`}
                  style={{ backgroundImage: 'radial-gradient(#F2F0EB 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />
                <div className={`transition-transform duration-300 ease-in-out origin-left z-10 ${
                  activeTouchSession === 0 ? "scale-105" : ""
                } group-hover:scale-105`}>
                  <h3 className={`text-2xl font-extrabold uppercase mb-1 tracking-tight transition-colors ${
                    activeTouchSession === 0 ? "text-brand-accent" : ""
                  } group-hover:text-brand-accent`}>SUNSET RHYTHMS</h3>
                  <p className={`font-mono text-xs opacity-60 font-medium transition-opacity ${
                    activeTouchSession === 0 ? "opacity-90" : ""
                  } group-hover:opacity-90`}>2025-01</p>
                </div>
                <span className={`material-symbols-outlined text-4xl opacity-0 transition-colors z-10 ${
                  activeTouchSession === 0 ? "opacity-100 text-brand-accent" : ""
                } group-hover:opacity-100 group-hover:text-brand-accent`}>play_circle</span>
              </Link>

              <Link 
                href="/sessions?autoplay=kerri" 
                onTouchStart={() => setActiveTouchSession(1)}
                onTouchEnd={() => setActiveTouchSession(null)}
                onTouchCancel={() => setActiveTouchSession(null)}
                className={`relative w-full border-b-2 border-brand-orange py-6 px-6 bg-black transition-all duration-300 ease-in-out cursor-pointer group flex justify-between items-center z-0 ${
                  activeTouchSession === 1 
                    ? "z-10 py-9 bg-[#18181b] shadow-[0_10px_30px_rgba(0,0,0,0.8)]" 
                    : ""
                } hover:z-10 hover:py-9 hover:bg-[#18181b] hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]`}
              >
                {/* Dots background texture on hover */}
                <div 
                  className={`absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none ${
                    activeTouchSession === 1 ? "opacity-10" : ""
                  } group-hover:opacity-10`}
                  style={{ backgroundImage: 'radial-gradient(#F2F0EB 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />
                <div className={`transition-transform duration-300 ease-in-out origin-left z-10 ${
                  activeTouchSession === 1 ? "scale-105" : ""
                } group-hover:scale-105`}>
                  <h3 className={`text-2xl font-extrabold uppercase mb-1 tracking-tight transition-colors ${
                    activeTouchSession === 1 ? "text-brand-accent" : ""
                  } group-hover:text-brand-accent`}>RAW VIBRATIONS</h3>
                  <p className={`font-mono text-xs opacity-60 font-medium transition-opacity ${
                    activeTouchSession === 1 ? "opacity-90" : ""
                  } group-hover:opacity-90`}>2024-01</p>
                </div>
                <span className={`material-symbols-outlined text-4xl opacity-0 transition-colors z-10 ${
                  activeTouchSession === 1 ? "opacity-100 text-brand-accent" : ""
                } group-hover:opacity-100 group-hover:text-brand-accent`}>play_circle</span>
              </Link>

              <Link 
                href="/sessions?autoplay=blawan" 
                onTouchStart={() => setActiveTouchSession(2)}
                onTouchEnd={() => setActiveTouchSession(null)}
                onTouchCancel={() => setActiveTouchSession(null)}
                className={`relative w-full border-b-2 border-brand-orange py-6 px-6 bg-black transition-all duration-300 ease-in-out cursor-pointer group flex justify-between items-center z-0 ${
                  activeTouchSession === 2 
                    ? "z-10 py-9 bg-[#18181b] shadow-[0_10px_30px_rgba(0,0,0,0.8)]" 
                    : ""
                } hover:z-10 hover:py-9 hover:bg-[#18181b] hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]`}
              >
                {/* Dots background texture on hover */}
                <div 
                  className={`absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none ${
                    activeTouchSession === 2 ? "opacity-10" : ""
                  } group-hover:opacity-10`}
                  style={{ backgroundImage: 'radial-gradient(#F2F0EB 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />
                <div className={`transition-transform duration-300 ease-in-out origin-left z-10 ${
                  activeTouchSession === 2 ? "scale-105" : ""
                } group-hover:scale-105`}>
                  <h3 className={`text-2xl font-extrabold uppercase mb-1 tracking-tight transition-colors ${
                    activeTouchSession === 2 ? "text-brand-accent" : ""
                  } group-hover:text-brand-accent`}>BLAWAN</h3>
                  <p className={`font-mono text-xs opacity-60 font-medium transition-opacity ${
                    activeTouchSession === 2 ? "opacity-90" : ""
                  } group-hover:opacity-90`}>LONDON / LIVE MODULAR</p>
                </div>
                <span className={`material-symbols-outlined text-4xl opacity-0 transition-colors z-10 ${
                  activeTouchSession === 2 ? "opacity-100 text-brand-accent" : ""
                } group-hover:opacity-100 group-hover:text-brand-accent`}>play_circle</span>
              </Link>
            </div>

          </div>
        </section>

        {/* Massive Text Divider Section */}
        <section 
          ref={sectionRef}
          onClick={() => setSoundBgActive(!soundBgActive)}
          className="w-full text-brand-orange border-t-2 border-b-2 border-brand-orange p-16 md:p-32 overflow-hidden relative flex items-center justify-center min-h-[40vh] group cursor-pointer"
        >
          {/* Zooming background image wrapper with parallax */}
          <div 
            ref={parallaxRef}
            className="absolute inset-0 w-full h-[140%] -top-[20%] pointer-events-none z-0 overflow-hidden"
            style={{ 
              willChange: 'transform'
            }}
          >
            <Image
              src="/sound-bg.jpg"
              alt="Fondo de alta fidelidad — tocadiscos y sistema de sonido en sala oscura"
              fill
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-700 ease-out ${
                soundBgActive ? "scale-105" : "scale-100"
              } group-hover:scale-105`}
            />
          </div>
          {/* Dark overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none z-10" />

          <h2 className="text-[8vw] font-black uppercase text-center leading-none tracking-tighter mix-blend-overlay opacity-10 absolute inset-0 flex items-center justify-center whitespace-nowrap pointer-events-none select-none z-20">
            ANALOG ARCHITECTURE
          </h2>
          <div className="relative z-20 max-w-none mx-auto text-center px-4">
            <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-black uppercase tracking-tight leading-tight select-none sm:whitespace-nowrap">
              High-fidelity sound designed for dark rooms and open minds.
            </p>
          </div>
        </section>

      </main>

      {/* Footer (Shared Component) - Overridden for Brutalist */}
      <footer className="bg-black text-brand-orange w-full py-12 border-t-2 border-brand-orange pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center justify-center gap-6 text-center">
          <div className="text-2xl font-extrabold tracking-widest border-2 border-brand-orange p-2 select-none inline-block">
            MASS SESSIONS
          </div>
          <p className="font-mono text-xs uppercase opacity-80 select-none">
            © 2026 ALL RIGHTS RESERVED. <br className="md:hidden" />HIGH FIDELITY HOUSE MUSIC.
          </p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-[101] bg-black border-t-2 border-brand-orange flex items-center justify-around h-20 select-none">
        <Link href="/" className="text-brand-orange flex flex-col items-center gap-1 p-2 border-t-2 border-brand-orange">
          <span className="material-symbols-outlined text-2xl font-bold">home</span>
          <span className="font-mono text-[9px] uppercase font-bold">Home</span>
        </Link>
        <Link href="/sessions" className="text-brand-orange flex flex-col items-center gap-1 opacity-70 hover:opacity-100 p-2">
          <span className="material-symbols-outlined text-2xl">graphic_eq</span>
          <span className="font-mono text-[9px] uppercase font-bold">Sessions</span>
        </Link>
        <Link href="/info" className="text-brand-orange flex flex-col items-center gap-1 opacity-70 hover:opacity-100 p-2">
          <span className="material-symbols-outlined text-2xl">info</span>
          <span className="font-mono text-[9px] uppercase font-bold">Info</span>
        </Link>
      </nav>

      {/* Modal - Info */}
      {infoOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4">
          <div className="border-4 border-brand-orange bg-black w-full max-w-lg p-8 relative">
            <button 
              onClick={() => setInfoOpen(false)}
              className="absolute top-4 right-4 text-brand-orange font-bold hover:scale-110 cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            <h3 className="text-3xl font-extrabold uppercase mb-4 tracking-tighter">THE RULES</h3>
            <div className="font-mono text-sm leading-relaxed space-y-4 uppercase">
              <p className="border-l-2 border-brand-orange pl-3">1. No cellphones on the dancefloor. Experience the sound directly.</p>
              <p className="border-l-2 border-brand-orange pl-3">2. Constructing high-fidelity setups in brutalist, raw warehouses.</p>
              <p className="border-l-2 border-brand-orange pl-3">3. Respect the space, respect the artists, respect the bass.</p>
            </div>
            <button 
              onClick={() => setInfoOpen(false)}
              className="mt-8 w-full border-4 border-brand-orange bg-brand-orange text-black font-bold uppercase py-3 hover:bg-black hover:text-brand-orange transition-colors cursor-pointer"
            >
              ACKNOWLEDGE
            </button>
          </div>
        </div>
      )}

      {/* Modal - Ticket/Email Form */}
      {ticketModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4">
          <div className="border-4 border-brand-orange bg-black w-full max-w-lg p-8 relative">
            <button 
              onClick={() => setTicketModalOpen(false)}
              className="absolute top-4 right-4 text-brand-orange font-bold hover:scale-110 cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            <h3 className="text-3xl font-extrabold uppercase mb-4 tracking-tighter">SECURE ACCESS</h3>
            {submitted ? (
              <div className="border-4 border-brand-orange p-4 bg-brand-orange text-black font-bold uppercase text-center animate-pulse">
                ACCESS SECURED. VERIFICATION MAIL SENT.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-6">
                <p className="font-mono text-sm uppercase opacity-80 leading-relaxed">
                  Enter your email address to receive secret session coordinates.
                </p>
                <div className="flex flex-col gap-2">
                  <input 
                    type="email" 
                    required 
                    placeholder="EMAIL@DOMAIN.COM"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border-4 border-brand-orange p-3 font-mono text-brand-orange focus:outline-none uppercase focus:ring-0 focus:border-brand-orange-light placeholder:opacity-50 placeholder:text-brand-orange"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full border-4 border-brand-orange bg-brand-orange text-black font-bold uppercase py-3 hover:bg-black hover:text-brand-orange transition-colors cursor-pointer"
                >
                  REQUEST ACCESS PASS
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
