import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Clock, Ticket, Info, User, Mail, MessageCircle } from "lucide-react";
import { buscarEventoPorId } from "@/app/actions/eventos";
import { parseLocalDate, getLocalDay, getLocalMonthShort } from "@/lib/date-utils";


// Força a página a ser server-rendered por conta do acesso ao banco baseado em ID
export const dynamic = 'force-dynamic';

export default async function EventoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const evento = await buscarEventoPorId(id);

  // Se não existir ou não estiver aprovado, redirecionamos para NotFound 
  if (!evento || evento.status !== 'PUBLICADO') {
    notFound();
  }

  const dataStart = parseLocalDate(evento.data_inicio);


  return (
    <main className="relative flex flex-col min-h-screen pb-20">
      {/* Decorative Background - Premium Glassmorphism Vibe */}
      <div className="fixed top-0 left-0 w-full h-full bg-surface/50 -z-20" />
      <div className="fixed top-0 -left-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-20 -right-20 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Navegação Topo */}
      <nav className="w-full mx-auto max-w-7xl px-4 sm:px-6 py-6 z-10 flex items-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-primary transition-all bg-surface/60 border border-border/50 backdrop-blur-md px-5 py-2.5 rounded-full hover:shadow-lg hover:-translate-y-0.5"
        >
          <span className="text-lg leading-none transform -translate-y-[1px]">←</span>
          Voltar para Eventos
        </Link>
      </nav>

      {/* Hero Section (Banner) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="relative w-full h-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/50 group">
          <Image 
            src={evento.capa_url} 
            alt={evento.titulo} 
            fill 
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            priority
          />
          {/* Overlay gradiente inferior */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
          
          {/* Categorias Badges */}
          <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
            {evento.categoria?.map((cat: string, i: number) => (
              <span key={i} className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-widest border border-white/20 shadow-md">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Esquerda: Conteúdo Principal */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          <div className="flex flex-col gap-4 border-b border-border/40 pb-10">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[4rem] text-foreground leading-[1.1] tracking-tight">
              {evento.titulo}
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed font-medium mt-2">
              {evento.descricao_curta}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert prose-p:text-foreground/80 prose-headings:font-serif prose-a:text-primary max-w-none pb-12">
            <h2 className="flex items-center gap-3 text-3xl font-serif mb-6 text-foreground">
              <Info className="w-7 h-7 text-primary" />
              Sobre o Evento
            </h2>
            <div className="whitespace-pre-wrap leading-relaxed text-lg">
              {evento.descricao_completa}
            </div>
          </div>
          
        </div>

        {/* Direita: Sidebar Fixa */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-6 flex flex-col gap-6">
            
            {/* Card Info Principal */}
            <div className="glass bg-surface/80 border border-border/60 shadow-2xl rounded-[2rem] p-8 flex flex-col gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              
              <div className="flex items-center gap-5 border-b border-border/40 pb-6 relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex flex-col items-center justify-center text-primary border border-primary/20 shadow-inner">
                  <span className="text-2xl font-black leading-none">{getLocalDay(evento.data_inicio)}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest mt-1">{getLocalMonthShort(evento.data_inicio)}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">Data e Hora</h3>
                  <div className="text-sm font-medium text-foreground/70 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary/70" />
                    {evento.horario_inicio} {evento.data_termino ? `até ${parseLocalDate(evento.data_termino).toLocaleDateString('pt-BR')}` : ''}
                  </div>
                </div>

              </div>

              <div className="flex items-start gap-4 border-b border-border/40 pb-6 relative z-10">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary border border-secondary/20 shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">{evento.formato === 'Online' ? 'Evento Online' : evento.local_nome || 'Local a definir'}</h3>
                  {(evento.endereco || evento.formato === 'Presencial' || evento.formato === 'Híbrido') && (
                     <p className="text-sm font-medium text-foreground/60 leading-relaxed">
                       {evento.endereco || 'Endereço não informado'}
                     </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-5 pb-2 relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shrink-0">
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-0.5">Ingresso</h3>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mt-1">
                    {evento.tipo_ingresso}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2 relative z-10">
                {evento.link_oficial && evento.link_oficial.trim() !== '' && (
                  <a 
                    href={evento.link_oficial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 bg-primary text-white rounded-2xl font-bold text-center transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Info className="w-5 h-5" />
                    Saiba Mais
                  </a>
                )}
                
                {evento.link_transmissao && evento.link_transmissao.trim() !== '' && (
                  <a 
                    href={evento.link_transmissao}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 bg-secondary text-white rounded-2xl font-bold text-center transition-all hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-1"
                  >
                    Acessar Transmissão
                  </a>
                )}
              </div>
            </div>

            {/* Organizador Card */}
            <div className="bg-surface/40 backdrop-blur-md border border-border/40 rounded-[2rem] p-8 shadow-sm">
              <h3 className="flex items-center gap-2 font-bold mb-5 text-foreground/90 text-lg">
                <User className="w-5 h-5 text-primary/80" />
                Dúvidas?
              </h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-1">Organizador</span>
                  <p className="text-base font-semibold">{evento.organizador_nome}</p>
                </div>
                
                {evento.organizador_whatsapp && (
                  <a 
                    href={`https://wa.me/55${evento.organizador_whatsapp.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-colors group p-3 rounded-xl bg-surface/50 border border-border/50 hover:border-primary/30"
                  >
                    <div className="bg-[#25D366]/10 text-[#25D366] p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    {evento.organizador_whatsapp}
                  </a>
                )}
                
                {evento.organizador_email && (
                  <a 
                    href={`mailto:${evento.organizador_email}`} 
                    className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-colors group p-3 rounded-xl bg-surface/50 border border-border/50 hover:border-primary/30"
                  >
                    <div className="bg-primary/10 text-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    {evento.organizador_email}
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
