"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);

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
      {/* TopNavBar (Shared Component) - Overridden for Brutalist Theme */}
      <header className="fixed top-0 w-full z-[100] bg-black border-b-4 border-brand-orange flex justify-between items-center pr-6 md:pr-16 h-20">
        <Link href="/" className="font-extrabold tracking-normal text-2xl md:text-3xl border-r-4 border-brand-orange px-6 md:px-16 h-full flex items-center select-none cursor-pointer">
          MASS SESSIONS
        </Link>
        <nav className="hidden md:flex items-center gap-8 h-full justify-end ml-auto">
          <Link href="/" className="font-bold uppercase tracking-wider text-sm h-full flex items-center px-2 border-b-4 border-brand-orange text-brand-orange">
            HOME
          </Link>
          <Link href="/sessions" className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-4 border-transparent hover:border-brand-accent hover:text-brand-accent">
            SESSIONS
          </Link>
          <button 
            onClick={() => setInfoOpen(true)}
            className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-4 border-transparent hover:border-brand-accent hover:text-brand-accent cursor-pointer"
          >
            INFO
          </button>
          <button 
            onClick={() => setTicketModalOpen(true)}
            className="opacity-70 hover:opacity-100 font-bold uppercase tracking-wider text-sm transition-opacity h-full flex items-center px-2 border-b-4 border-transparent hover:border-brand-accent hover:text-brand-accent cursor-pointer"
          >
            EMAIL
          </button>
        </nav>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-20 min-h-screen flex flex-col">
        
        {/* Hero Section - Massive Background Image & Text */}
        <section 
          className="relative w-full h-[calc(100vh-5rem)] min-h-[500px] border-b-4 border-brand-orange flex flex-col justify-end p-6 md:p-16 bg-img-gritty bg-cover bg-center" 
          style={{ backgroundImage: 'url("/hero.jpg")' }}
        >
          {/* Overlay Text */}
          <div className="z-10 relative select-none">
            <h1 className="text-[12vw] sm:text-[9vw] md:text-[8vw] leading-none uppercase font-extrabold tracking-normal mix-blend-difference break-words text-brand-orange">
              MASS<br />
              <span className="text-stroke">SESSIONS</span>
            </h1>
            <p className="font-semibold text-sm sm:text-base md:text-xl max-w-none mt-4 bg-black py-4 px-6 border-4 border-brand-orange inline-block sm:whitespace-nowrap">
              NO COMPROMISE. HIGH FIDELITY HOUSE MUSIC IN THE RAWEST ENVIRONMENTS.
            </p>
          </div>

          {/* Absolute brutalist elements */}
          <div className="absolute top-8 right-8 border-4 border-brand-orange p-4 bg-black/90 backdrop-blur-sm transform rotate-3 select-none hidden sm:block">
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
            <div className="w-full md:w-1/3 bg-black border-b-4 md:border-b-0 md:border-r-4 border-brand-orange p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="z-10">
                <h2 className="text-4xl font-extrabold uppercase mb-4 tracking-tighter">NEXT<br />SESSION</h2>
                <div className="font-mono text-xs font-semibold bg-brand-orange text-black inline-block px-3 py-1 mb-6">
                  DATE: 10.24.2024
                </div>
                <p className="text-sm uppercase opacity-85 max-w-xs font-semibold">
                  Location coordinates will be released to ticket holders 2 hours before start.
                </p>
              </div>

              <button 
                onClick={() => setTicketModalOpen(true)}
                className="mt-12 bg-transparent border-4 border-brand-orange text-brand-orange px-8 py-4 font-bold text-lg uppercase hover:bg-brand-accent hover:border-brand-accent hover:text-black transition-colors w-full text-left flex justify-between items-center group-hover:neon-glow-brutalist z-10 cursor-pointer bg-black"
              >
                SECURE ACCESS
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
              </button>

              {/* Decorative background texture */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            </div>

            {/* Middle Image Block */}
            <div 
              className="w-full md:w-1/3 border-b-4 md:border-b-0 md:border-r-4 border-brand-orange min-h-[400px] relative bg-img-gritty filter grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer flex flex-col justify-between p-4"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBVoTVe-1HLc45UMAYLECL2h4Nn3n1OSwVbNVtXoEBd-lmc_GeYbW8FWePBnHm42IMbB3VJanpgbSL0WpBQenCs04uHY4coOYfa3L6FqTI2N4bGqB-kD2h6a-cexJSm_KLG7jrkaL6WEznkBMECMaHtctMuCiM5hl4mpCKy19xhMdPPgWTAOGhpjmygDdcikbqsGw2hNB7SlWAvnXH3Ljb_w2Kq94ZDfu28HNKRxvCAv8bUYQbU3Ylgy1_3SV5jQmEEzmEjfFgLTQw")' }}
            >
              <div></div>
              <div className="bg-brand-orange text-black font-mono text-xs px-2 py-1 uppercase font-semibold self-start z-10 select-none">
                GEAR PORN
              </div>
            </div>

            {/* Right Block List */}
            <div className="w-full md:w-1/3 bg-black p-0 flex flex-col justify-center select-none">
              <Link href="/sessions?autoplay=dvs1" className="w-full border-b-4 border-brand-orange p-6 hover:bg-brand-orange/10 transition-colors cursor-pointer group flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-extrabold uppercase mb-1 tracking-tight">DVS1</h3>
                  <p className="font-mono text-xs opacity-60 font-medium">MINNEAPOLIS / 3HR SET</p>
                </div>
                <span className="material-symbols-outlined text-4xl opacity-0 group-hover:opacity-100 group-hover:text-brand-accent transition-colors">play_circle</span>
              </Link>

              <Link href="/sessions?autoplay=rodhad" className="w-full border-b-4 border-brand-orange p-6 hover:bg-brand-orange/10 transition-colors cursor-pointer group flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-extrabold uppercase mb-1 tracking-tight">RØDHÅD</h3>
                  <p className="font-mono text-xs opacity-60 font-medium">BERLIN / CLOSING</p>
                </div>
                <span className="material-symbols-outlined text-4xl opacity-0 group-hover:opacity-100 group-hover:text-brand-accent transition-colors">play_circle</span>
              </Link>

              <Link href="/sessions?autoplay=blawan" className="w-full border-b-4 border-brand-orange p-6 hover:bg-brand-orange/10 transition-colors cursor-pointer group flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-extrabold uppercase mb-1 tracking-tight">BLAWAN</h3>
                  <p className="font-mono text-xs opacity-60 font-medium">LONDON / LIVE MODULAR</p>
                </div>
                <span className="material-symbols-outlined text-4xl opacity-0 group-hover:opacity-100 group-hover:text-brand-accent transition-colors">play_circle</span>
              </Link>
            </div>

          </div>
        </section>

        {/* Massive Text Divider Section */}
        <section className="w-full bg-brand-orange text-black border-t-4 border-b-4 border-brand-orange p-16 md:p-32 overflow-hidden relative flex items-center justify-center min-h-[40vh]">
          <h2 className="text-[8vw] font-black uppercase text-center leading-none tracking-tighter mix-blend-multiply opacity-15 absolute inset-0 flex items-center justify-center whitespace-nowrap pointer-events-none select-none">
            SOUND SYSTEM CULTURE
          </h2>
          <div className="relative z-10 max-w-none mx-auto text-center px-4">
            <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-black uppercase tracking-tight leading-tight select-none sm:whitespace-nowrap">
              We construct environments where sound is a physical force. Enter the void.
            </p>
          </div>
        </section>

      </main>

      {/* Footer (Shared Component) - Overridden for Brutalist */}
      <footer className="bg-black text-brand-orange w-full py-12 border-t-4 border-brand-orange pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center justify-center gap-6 text-center">
          <div className="text-2xl font-extrabold tracking-widest border-4 border-brand-orange p-2 select-none inline-block">
            MASS SESSIONS
          </div>
          <p className="font-mono text-xs uppercase opacity-80 select-none">
            © 2026 SONIC PULSE. HIGH FIDELITY HOUSE MUSIC.
          </p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-[101] bg-black border-t-4 border-brand-orange flex items-center justify-around h-20 select-none">
        <Link href="/sessions" className="text-brand-orange flex flex-col items-center gap-1 opacity-70 hover:opacity-100 p-2">
          <span className="material-symbols-outlined text-2xl">graphic_eq</span>
          <span className="font-mono text-[9px] uppercase font-bold">Sessions</span>
        </Link>
        <button onClick={() => setInfoOpen(true)} className="text-brand-orange flex flex-col items-center gap-1 opacity-70 hover:opacity-100 p-2">
          <span className="material-symbols-outlined text-2xl">info</span>
          <span className="font-mono text-[9px] uppercase font-bold">Info</span>
        </button>
        <button onClick={() => setTicketModalOpen(true)} className="text-brand-orange flex flex-col items-center gap-1 opacity-70 hover:opacity-100 p-2">
          <span className="material-symbols-outlined text-2xl">mail</span>
          <span className="font-mono text-[9px] uppercase font-bold">Tickets</span>
        </button>
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
              <p className="border-l-4 border-brand-orange pl-3">1. No cellphones on the dancefloor. Experience the sound directly.</p>
              <p className="border-l-4 border-brand-orange pl-3">2. Constructing high-fidelity setups in brutalist, raw warehouses.</p>
              <p className="border-l-4 border-brand-orange pl-3">3. Respect the space, respect the artists, respect the bass.</p>
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
