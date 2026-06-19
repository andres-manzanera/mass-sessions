import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black text-brand-orange w-full py-12 border-t-2 border-brand-orange pb-32 md:pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center justify-center gap-6 text-center">
        <div className="text-2xl font-extrabold tracking-widest border-2 border-brand-orange p-2 select-none inline-block">
          MASS SESSIONS
        </div>
        <p className="font-mono text-xs uppercase opacity-80 select-none">
          © 2026 ALL RIGHTS RESERVED. <br className="md:hidden" />HIGH FIDELITY HOUSE MUSIC.
        </p>
      </div>
    </footer>
  );
}
