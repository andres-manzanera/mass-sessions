import Link from 'next/link';
import { SESSIONS_DATA } from '@/data/sessions';

export default function HomeTest() {
  // Get 3 most recent sessions
  const recentSessions = [...SESSIONS_DATA]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#EAEAEA] font-mono relative overflow-hidden selection:bg-[#E61919] selection:text-white pb-20">
      
      {/* CRT Scanline Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-50 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)'
        }}
        aria-hidden="true"
      />

      {/* Mechanical Noise / Texture (SVG Filter Base) */}
      <svg className="pointer-events-none absolute inset-0 z-40 opacity-[0.03] h-full w-full" aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
      </svg>

      {/* The Blueprint Grid Container */}
      <div className="max-w-[1400px] mx-auto p-4 md:p-8 relative z-10">
        
        {/* Top Telemetry Header */}
        <header className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#EAEAEA] border border-[#EAEAEA] mb-8">
          <div className="bg-[#0A0A0A] p-4 flex flex-col justify-between">
            <span className="text-[#E61919] text-[10px] tracking-widest">[ SYS.OP ]</span>
            <span className="text-sm tracking-wider mt-4">LOCAL TERMINAL ONLINE</span>
          </div>
          <div className="bg-[#0A0A0A] p-4 flex flex-col justify-between text-center md:border-l-0">
            <span className="text-[#EAEAEA] opacity-50 text-[10px] tracking-widest">>>> CONNECTION.SECURE</span>
            <span className="text-sm tracking-wider mt-4">EST. 2014 // MAD</span>
          </div>
          <div className="bg-[#0A0A0A] p-4 flex flex-col justify-between text-right">
            <span className="text-[#E61919] text-[10px] tracking-widest">[ DATA.STREAM ]</span>
            <span className="text-sm tracking-wider mt-4">V.2.0.6 // ACTIVE</span>
          </div>
        </header>

        {/* Macro-Typography Title */}
        <section className="mb-12 border-y-2 border-[#E61919] py-8">
          <h1 
            className="font-black leading-[0.85] uppercase tracking-[-0.04em] text-center"
            style={{ fontSize: 'clamp(4rem, 12vw, 12rem)' }}
          >
            MASS<br/>SESSIONS
          </h1>
        </section>

        {/* Data Heavy Grid: Latest Sessions */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-[1px] bg-[#EAEAEA] border border-[#EAEAEA]">
          
          {/* Side Panel */}
          <aside className="lg:col-span-3 bg-[#0A0A0A] p-6 flex flex-col justify-between">
            <div>
              <div className="text-[10px] tracking-widest text-[#E61919] mb-4">/// DIRECTORY.ROOT</div>
              <p className="text-xs leading-[1.4] tracking-wide opacity-80 mb-8">
                ARCHIVE OF HIGH-FIDELITY AUDITORY EXPERIENCES. 
                STRICTLY ELECTRONIC. NO COMPROMISE.
              </p>
            </div>
            <Link 
              href="/sessions"
              className="border border-[#EAEAEA] px-4 py-3 text-xs tracking-widest uppercase hover:bg-[#EAEAEA] hover:text-[#0A0A0A] transition-colors inline-block text-center"
            >
              [ ACCESS FULL ARCHIVE ]
            </Link>
          </aside>

          {/* Sessions List */}
          <div className="lg:col-span-9 bg-[#0A0A0A] grid grid-cols-1 gap-[1px] bg-[#EAEAEA]">
            <div className="bg-[#0A0A0A] p-4 border-b border-[#EAEAEA] hidden md:grid grid-cols-12 gap-4 text-[10px] text-[#E61919] tracking-widest">
              <div className="col-span-2">ID</div>
              <div className="col-span-4">DESIGNATION</div>
              <div className="col-span-2">DATE</div>
              <div className="col-span-4 text-right">ACTION</div>
            </div>
            
            {recentSessions.map((session, i) => (
              <div key={session.id} className="bg-[#0A0A0A] p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center group hover:bg-[#121212] transition-colors cursor-crosshair">
                <div className="col-span-2 text-xs tracking-widest opacity-50">
                  #{String(i + 1).padStart(3, '0')}
                </div>
                <div className="col-span-4 text-sm font-bold tracking-wider text-[#EAEAEA]">
                  {session.title.toUpperCase()}
                  {session.isNew && <span className="ml-2 text-[#E61919] text-[10px] border border-[#E61919] px-1">[NEW]</span>}
                </div>
                <div className="col-span-2 text-xs opacity-70">
                  {session.date}
                </div>
                <div className="col-span-4 text-left md:text-right">
                  <Link 
                    href={`/sessions?autoplay=${session.id}`}
                    className="text-[#4AF626] text-xs tracking-widest hover:bg-[#4AF626] hover:text-[#0A0A0A] px-2 py-1 transition-colors"
                  >
                    &#62; EXECUTE_PLAY
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
