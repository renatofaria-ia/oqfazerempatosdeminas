"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, CalendarDays } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  
  const isHome = pathname === "/";
  const isExpirados = pathname === "/eventos-expirados";
  const isOther = !isHome && !isExpirados;

  return (
    <nav className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl glass rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300 border border-white/10 shadow-xl">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">P</div>
          <span className="font-bold tracking-tight text-xl hidden lg:block">
            O que fazer em <span className="text-primary">Patos de Minas / MG?</span>
          </span>
          <span className="font-bold tracking-tight text-xl hidden sm:block lg:hidden">
            O que fazer em <span className="text-primary">Patos</span>
          </span>
        </Link>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden md:flex items-center gap-2 font-medium">
          {(isExpirados || isOther) && (
            <Link 
              href="/" 
              className="group flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-all px-4 py-2 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/10"
            >
              <CalendarDays className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Ativos</span>
            </Link>
          )}

          {(isHome || isOther) && (
            <Link 
              href="/eventos-expirados" 
              className="group flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-all px-4 py-2 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/10"
            >
              <History className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Expirados</span>
            </Link>
          )}
        </div>
        
        <Link href="/cadastrar-evento" className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center gap-2">
          <span className="hidden sm:inline">+ Cadastrar Evento</span>
          <span className="sm:hidden">+ Evento</span>
        </Link>
      </div>
    </nav>
  );
}
