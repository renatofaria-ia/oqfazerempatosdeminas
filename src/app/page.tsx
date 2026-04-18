import { Evento } from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import EventGrid from "@/components/EventGrid";
import { createClient } from "@/lib/supabase/server";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function Home({ searchParams }: Props) {
  const { q } = await searchParams;
  const supabase = await createClient();

  // Data de hoje no fuso local (YYYY-MM-DD) — usar componentes locais para evitar shift UTC
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // Buscar eventos publicados e ativos (data_termino >= hoje OU data_termino IS NULL e data_inicio >= hoje)
  let query = supabase
    .from('eventos')
    .select('*')
    .eq('status', 'PUBLICADO')
    .or(`data_termino.gte.${todayStr},and(data_termino.is.null,data_inicio.gte.${todayStr})`);

  if (q) {
    query = query.or(`titulo.ilike.%${q}%,descricao_curta.ilike.%${q}%,local_nome.ilike.%${q}%`);
  }

  const { data: eventos, error } = await query.order('data_inicio', { ascending: true });

  if (error) {
    console.error('Erro ao buscar eventos:', error);
  }

  // DEBUG: Ver formato exato das datas que vêm do Supabase
  console.log('[DEBUG SERVER] todayStr:', todayStr)
  console.log('[DEBUG SERVER] Eventos retornados:', eventos?.map(e => ({
    titulo: (e as any).titulo,
    data_inicio: (e as any).data_inicio,
    data_termino: (e as any).data_termino,
    tipo_data_inicio: typeof (e as any).data_inicio,
  })))

  return (
    <main className="relative flex flex-col min-h-screen">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-20 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10" />

      {/* Navigation Header */}
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8 animate-float">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Agenda Oficial da Cidade
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1]">
          Descubra o melhor de <br />
          <span className="text-gradient">Patos de Minas</span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/85 max-w-2xl mb-12 leading-relaxed">
          O ponto de encontro para a cultura, o agronegócio e a inovação.
          Centralizamos o que acontece na Capital do Milho para você não perder nada.
        </p>

        {/* Search Bar Component */}
        <SearchBar />
      </section>

      {/* Agenda Section — Client Component com filtros dinâmicos e paginação */}
      <EventGrid
        eventos={(eventos || []) as unknown as Evento[]}
        searchQuery={q}
      />

      {/* Footer */}
      <footer className="py-20 flex flex-col items-center gap-6 border-t border-border/50">
        <div className="text-sm text-foreground/60">
          Realizado com carinho pela <span className="font-bold text-foreground/80">KONOK</span> • &copy; 2026
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
