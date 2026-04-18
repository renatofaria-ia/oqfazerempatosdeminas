import { Evento } from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import ExpiredEventGrid from "@/components/ExpiredEventGrid";
import { createClient } from "@/lib/supabase/server";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Eventos Expirados | O que fazer em Patos de Minas",
  description: "Confira os eventos que já aconteceram em Patos de Minas.",
};

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function EventosExpirados({ searchParams }: Props) {
  const { q } = await searchParams;
  const supabase = await createClient();
  
  // Data de hoje (YYYY-MM-DD) — usar componentes locais para evitar shift UTC
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // Eventos expirados: data_termino < hoje (ou data_termino IS NULL e data_inicio < hoje)
  let query = supabase
    .from('eventos')
    .select('*')
    .eq('status', 'PUBLICADO')
    .or(`and(data_termino.lt.${todayStr},data_termino.not.is.null),and(data_termino.is.null,data_inicio.lt.${todayStr})`);

  if (q) {
    query = query.or(`titulo.ilike.%${q}%,descricao_curta.ilike.%${q}%,local_nome.ilike.%${q}%`);
  }

  // Ordem decrescente por data_termino (mais recentes primeiro)
  const { data: eventos, error } = await query.order('data_termino', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('Erro ao buscar eventos expirados:', error);
  }

  return (
    <main className="relative flex flex-col min-h-screen">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-20 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10" />

      {/* Navigation Header */}
      <Header />

      {/* Mini Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-16 pb-8 text-center max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/60 text-xs font-bold uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
          Arquivo de Eventos
        </div>
        
        <h1 className="font-serif text-4xl md:text-5xl mb-6 leading-[1.1]">
          Eventos <span className="text-foreground/50">Expirados</span>
        </h1>
        
        <p className="text-base text-foreground/70 max-w-xl mb-8 leading-relaxed">
          Reveja os eventos que já aconteceram em Patos de Minas. 
          Um acervo da vida cultural e produtiva da cidade.
        </p>

        {/* Search Bar */}
        <SearchBar placeholder="Buscar em eventos expirados..." />
      </section>

      {/* Grid de Eventos Expirados */}
      <ExpiredEventGrid
        eventos={(eventos || []) as unknown as Evento[]}
        searchQuery={q}
      />

      {/* Footer */}
      <footer className="py-20 flex flex-col items-center gap-6 border-t border-border/50">
        <div className="text-sm text-foreground/60">
          Realizado com carinho pela <span className="font-bold text-foreground/80">ADESP</span> • &copy; 2026
        </div>
        
        <Link 
          href="/curadoria" 
          className="flex items-center gap-2 text-xs font-bold text-foreground/40 hover:text-primary transition-colors py-2 px-4 rounded-full hover:bg-primary/5 border border-transparent hover:border-primary/10"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Painel de Curadoria
        </Link>
      </footer>
    </main>
  );
}
