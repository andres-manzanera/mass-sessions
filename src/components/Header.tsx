"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-[100] bg-black border-b-2 border-brand-orange flex justify-between items-center transition-all duration-300 ${isScrolled ? "h-12" : "h-20"} ${className}`}
    >
      <Link 
        href="/" 
        aria-label="Ir a la página principal de Mass Sessions" 
        className={`font-extrabold tracking-normal border-r-2 border-brand-orange px-8 h-full flex items-center select-none cursor-pointer text-brand-orange whitespace-nowrap transition-all duration-300 ${isScrolled ? "text-xl md:text-xl" : "text-2xl md:text-3xl"}`}
      >
        MASS SESSIONS
      </Link>
      <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8 h-full justify-end ml-auto lg:border-l-2 border-brand-orange px-8">
        <Link 
          href="/" 
          aria-current={pathname === "/" ? "page" : undefined} 
          className={`font-bold uppercase tracking-wider text-sm h-full flex items-center px-2 transition-colors ${pathname === "/" ? "text-[#02E1EE]" : "text-brand-orange opacity-70 hover:opacity-100 hover:text-[#02E1EE]"}`}
        >
          <span className={pathname === "/" ? "" : "opacity-0"}>[ </span>HOME<span className={pathname === "/" ? "" : "opacity-0"}> ]</span>
        </Link>
        <Link 
          href="/sessions" 
          aria-current={pathname === "/sessions" ? "page" : undefined} 
          className={`font-bold uppercase tracking-wider text-sm h-full flex items-center px-2 transition-colors ${pathname === "/sessions" ? "text-[#02E1EE]" : "text-brand-orange opacity-70 hover:opacity-100 hover:text-[#02E1EE]"}`}
        >
          <span className={pathname === "/sessions" ? "" : "opacity-0"}>[ </span>ARCHIVE<span className={pathname === "/sessions" ? "" : "opacity-0"}> ]</span>
        </Link>
        <Link
          href="/info"
          aria-current={pathname === "/info" ? "page" : undefined} 
          className={`font-bold uppercase tracking-wider text-sm h-full flex items-center px-2 transition-colors ${pathname === "/info" ? "text-[#02E1EE]" : "text-brand-orange opacity-70 hover:opacity-100 hover:text-[#02E1EE]"}`}
        >
          <span className={pathname === "/info" ? "" : "opacity-0"}>[ </span>INFO<span className={pathname === "/info" ? "" : "opacity-0"}> ]</span>
        </Link>
      </nav>
    </header>
  );
}
