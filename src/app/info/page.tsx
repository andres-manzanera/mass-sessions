"use client";

import Link from "next/link";

export default function InfoPage() {
  return (
    <div className="bg-brand-bg-dark text-white font-sora min-h-screen flex flex-col pt-20 pb-24 md:pb-0 selection:bg-brand-orange selection:text-black">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-[100] bg-black border-b-4 border-brand-orange flex justify-between items-center pr-6 md:pr-16 h-20">
        <Link href="/" className="font-extrabold tracking-normal text-2xl md:text-3xl border-r-4 border-brand-orange px-6 md:px-16 h-full flex items-center select-none cursor-pointer text-brand-orange">
          MASS SESSIONS
        </Link>
        <nav className="hidden md:flex items-center gap-8 h-full justify-end ml-auto">
          <Link href="/" className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-4 border-transparent hover:border-brand-accent hover:text-brand-accent text-brand-orange">
            HOME
          </Link>
          <Link href="/sessions" className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-4 border-transparent hover:border-brand-accent hover:text-brand-accent text-brand-orange">
            SESSIONS
          </Link>
          <Link href="/info" className="font-bold uppercase tracking-wider text-sm h-full flex items-center px-2 border-b-4 border-brand-orange text-brand-orange">
            INFO
          </Link>
          <Link href="/?tickets=true" className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-4 border-transparent hover:border-brand-accent hover:text-brand-accent text-brand-orange">
            CONTACT
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-6 md:px-16 py-16 flex flex-col justify-center">
        {/* Page Title */}
        <div className="mb-12 border-b-4 border-brand-orange pb-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white">
            THE PHILOSOPHY
          </h1>
          <p className="font-mono text-sm text-brand-accent uppercase tracking-widest mt-2">
            MASS SESSIONS // RAW CONCEPT
          </p>
        </div>

        {/* Info Content Grid */}
        <div className="space-y-12">
          {/* Rules Block */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-6 tracking-tight text-white">
              THE RULES
            </h2>
            <div className="font-mono text-base leading-relaxed space-y-6 uppercase">
              <p className="border-l-4 border-brand-orange pl-4 py-1">
                1. No cellphones on the dancefloor. Experience the sound and connect directly.
              </p>
              <p className="border-l-4 border-brand-orange pl-4 py-1">
                2. We construct high-fidelity setups in brutalist, raw warehouses.
              </p>
              <p className="border-l-4 border-brand-orange pl-4 py-1">
                3. Respect the space, respect the artists, respect the bass.
              </p>
            </div>
          </div>

          {/* About Block */}
          <div className="border-t-4 border-brand-orange pt-12">
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-6 tracking-tight text-white">
              SOUND SYSTEM CULTURE
            </h2>
            <p className="text-lg leading-relaxed text-on-surface uppercase font-medium">
              We construct environments where sound is a physical force. Our mission is to strip club culture back to its essentials: high fidelity audio, raw architecture, and zero digital distractions. By removing mobile phones, we restore the communion between dancer, DJ, and system.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-brand-orange w-full py-12 border-t-4 border-brand-orange pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center justify-center gap-6 text-center">
          <div className="text-2xl font-extrabold tracking-widest border-4 border-brand-orange p-2 select-none inline-block">
            MASS SESSIONS
          </div>
          <p className="font-mono text-xs uppercase opacity-80 select-none">
            © 2026 ALL RIGHTS RESERVED. HIGH FIDELITY HOUSE MUSIC.
          </p>
        </div>
      </footer>

      {/* Mobile Bottom Menu */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-[110] bg-black border-t-4 border-brand-orange flex items-center justify-around h-20 select-none">
        <Link href="/" className="text-brand-orange flex flex-col items-center gap-1 opacity-70 hover:opacity-100 p-2">
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="font-mono text-[9px] uppercase font-bold">Home</span>
        </Link>
        <Link href="/sessions" className="text-brand-orange flex flex-col items-center gap-1 opacity-70 hover:opacity-100 p-2">
          <span className="material-symbols-outlined text-2xl">graphic_eq</span>
          <span className="font-mono text-[9px] uppercase font-bold">Sessions</span>
        </Link>
        <Link href="/info" className="text-brand-orange flex flex-col items-center gap-1 p-2 border-t-4 border-brand-orange">
          <span className="material-symbols-outlined text-2xl font-bold">info</span>
          <span className="font-mono text-[9px] uppercase font-bold">Info</span>
        </Link>
      </nav>
    </div>
  );
}
