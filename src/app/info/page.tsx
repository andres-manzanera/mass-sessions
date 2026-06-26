"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { useEffect, useRef, useState } from "react";

export default function InfoPage() {
  const [isRulesVisible, setIsRulesVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const rulesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === rulesRef.current) setIsRulesVisible(true);
            if (entry.target === aboutRef.current) setIsAboutVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (rulesRef.current) observer.observe(rulesRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-brand-bg-dark text-white font-sora min-h-screen flex flex-col pt-20 pb-0 selection:bg-brand-orange selection:text-black relative">
      {/* Dots background texture with irregular masking */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ 
          backgroundImage: 'radial-gradient(#F2F0EB 1px, transparent 1px)', 
          backgroundSize: '20px 20px',
          opacity: 0.15,
          WebkitMaskImage: 'linear-gradient(120deg, black 10%, transparent 30%, black 50%, transparent 70%, black 90%)',
          maskImage: 'linear-gradient(120deg, black 10%, transparent 30%, black 50%, transparent 70%, black 90%)'
        }}
      />
      
      <Header />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-6 md:px-16 py-16 flex flex-col justify-center">
        {/* Page Title */}
        <div className="mb-12 border-b-2 border-brand-orange pb-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white select-none flex items-center flex-wrap">
            {"THE PHILOSOPHY".split("").map((char, index) => (
              <span 
                key={index} 
                className="char-typewriter"
                style={{ "--char-index": index } as React.CSSProperties}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <p className="font-mono text-sm text-brand-accent uppercase tracking-widest mt-2 info-subtitle-anim">
            MASS SESSIONS // RAW CONCEPT
          </p>
        </div>

        {/* Info Content Grid */}
        <div className="space-y-12">
          {/* Rules Block */}
          <div 
            ref={rulesRef}
            className={`transition-all duration-1000 ease-out delay-[800ms] ${
              isRulesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-6 tracking-tight text-white">
              THE RULES
            </h2>
            <div className="font-mono text-base leading-relaxed space-y-6 uppercase">
              <p className="border-l-2 border-brand-orange pl-4 py-1">
                1. No cellphones on the dancefloor. Experience the sound and connect directly.
              </p>
              <p className="border-l-2 border-brand-orange pl-4 py-1">
                2. We construct high-fidelity setups in brutalist, raw warehouses.
              </p>
              <p className="border-l-2 border-brand-orange pl-4 py-1">
                3. Respect the space, respect the artists, respect the bass.
              </p>
            </div>
          </div>

          {/* About Block */}
          <div 
            ref={aboutRef}
            className={`border-t-2 border-brand-orange pt-12 transition-all duration-1000 ease-out delay-[200ms] md:delay-[1200ms] ${
              isAboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-6 tracking-tight text-white">
              SOUND SYSTEM CULTURE
            </h2>
            <p className="text-lg leading-relaxed text-on-surface uppercase font-medium">
              We construct environments where sound is a physical force. Our mission is to strip club culture back to its essentials: high fidelity audio, raw architecture, and zero digital distractions. By removing mobile phones, we restore the communion between dancer, DJ, and system.
            </p>
            <div className="mt-8">
              <a 
                href="mailto:info@mass-sessions.com" 
                className="inline-block border-2 border-brand-orange text-brand-orange font-extrabold uppercase tracking-wider text-sm px-8 py-4 bg-transparent hover:bg-brand-orange hover:text-black transition-colors duration-300 select-none cursor-pointer"
              >
                CONTACT US
              </a>
            </div>
          </div>
        </div>
      </main>



      {/* Mobile Bottom Menu */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-[110] bg-black border-t-2 border-brand-orange flex items-center justify-around h-20 select-none">
        <Link href="/" className="text-brand-orange flex items-center p-2 opacity-70 hover:opacity-100 transition-colors">
          <span className="font-mono text-3xl font-light mr-1 opacity-0">[</span>
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-2xl font-bold">home</span>
            <span className="font-mono text-[9px] uppercase font-bold">Home</span>
          </div>
          <span className="font-mono text-3xl font-light ml-1 opacity-0">]</span>
        </Link>
        <Link href="/sessions" className="text-brand-orange flex items-center p-2 opacity-70 hover:opacity-100 transition-colors">
          <span className="font-mono text-3xl font-light mr-1 opacity-0">[</span>
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-2xl">graphic_eq</span>
            <span className="font-mono text-[9px] uppercase font-bold">Sessions</span>
          </div>
          <span className="font-mono text-3xl font-light ml-1 opacity-0">]</span>
        </Link>
        <Link href="/info" className="text-[#02E1EE] flex items-center p-2 transition-colors">
          <span className="font-mono text-3xl font-light mr-1">[</span>
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-2xl font-bold">info</span>
            <span className="font-mono text-[9px] uppercase font-bold">Info</span>
          </div>
          <span className="font-mono text-3xl font-light ml-1">]</span>
        </Link>
      </nav>
    </div>
  );
}
