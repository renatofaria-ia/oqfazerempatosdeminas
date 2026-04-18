import Image from "next/image";
import { Calendar, MapPin, Tag, Ticket } from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getLocalDay, getLocalMonthShort } from "@/lib/date-utils";


function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Evento {
  id: string;
  titulo: string;
  categoria: string[];
  descricao_curta: string;
  data_inicio: string;
  data_termino?: string;
  horario_inicio: string;
  local_nome: string;
  capa_url: string;
  tipo_ingresso: string;
}

interface EventCardProps {
  evento: Evento;
}

export default function EventCard({ evento }: EventCardProps) {
  // Formatar data: 15 MAI
  const dia = getLocalDay(evento.data_inicio);
  const mes = getLocalMonthShort(evento.data_inicio);


  return (
    <Link href={`/evento/${evento.id}`} className="group relative flex flex-col bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Imagem com Overlay */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={evento.capa_url}
          alt={evento.titulo}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Badge de Data */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-2 min-w-[50px] text-center shadow-lg transform transition-transform group-hover:scale-105">
          <div className="text-xl font-bold text-primary leading-none">{dia}</div>
          <div className="text-[10px] font-black tracking-widest text-foreground/80">{mes}</div>
        </div>

        {/* Categorias */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 pr-4">
          {evento.categoria?.map((cat, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-xl mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {evento.titulo}
        </h3>
        
        <p className="text-sm text-foreground/80 mb-4 line-clamp-2 flex-1">
          {evento.descricao_curta}
        </p>

        <div className="space-y-2 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-foreground/75">
            <MapPin className="w-3.5 h-3.5 text-primary/90" />
            <span className="line-clamp-1">{evento.local_nome}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-foreground/75">
              <Ticket className="w-3.5 h-3.5 text-secondary" />
              <span>{evento.tipo_ingresso}</span>
            </div>
            
            <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group/btn">
              Ver detalhes
              <span className="transform transition-transform group-hover/btn:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
