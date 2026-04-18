'use client'

import Image from "next/image"
import { Calendar, MapPin, Ticket, Check, X, User, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { atualizarStatusEvento } from "@/app/actions/eventos"
import { parseLocalDate } from "@/lib/date-utils"


interface CuradoriaCardProps {
  evento: any
}

export default function CuradoriaCard({ evento }: CuradoriaCardProps) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'PENDENTE' | 'PUBLICADO' | 'REPROVADO'>(evento.status)

  const handleAction = async (novoStatus: 'PUBLICADO' | 'REPROVADO') => {
    setLoading(true)
    const result = await atualizarStatusEvento(evento.id, novoStatus)
    if (result.success) {
      setStatus(novoStatus)
    } else {
      alert("Erro ao atualizar evento: " + result.message)
    }
    setLoading(false)
  }

  if (status !== 'PENDENTE') return null
  const dataFormatada = parseLocalDate(evento.data_inicio).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass border border-white/20 rounded-3xl overflow-hidden flex flex-col md:flex-row gap-6 p-4 hover:border-white/40 transition-colors shadow-xl"
    >
      {/* Thumbnail Area */}
      <div className="relative w-full md:w-64 h-48 md:h-full min-h-[180px] rounded-2xl overflow-hidden shadow-inner">
        <Image
          src={evento.capa_url}
          alt={evento.titulo}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {evento.categoria?.map((cat: string, i: number) => (
            <div key={i} className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] items-start w-fit font-bold uppercase tracking-wider">
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Info Area */}
      <div className="flex-1 flex flex-col justify-between py-2">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-2xl text-foreground leading-tight">{evento.titulo}</h3>
            <span className="text-xs font-mono text-foreground/40 px-2 py-1 rounded bg-white/5 border border-white/10 uppercase">
              {evento.formato}
            </span>
          </div>
          
          <p className="text-sm text-foreground/60 mb-6 line-clamp-2">{evento.descricao_curta}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
            <div className="flex items-center gap-2 text-foreground/70">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{dataFormatada} às {evento.horario_inicio}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/70">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="line-clamp-1">{evento.local_nome || "Online"}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/70">
              <Ticket className="w-4 h-4 text-secondary" />
              <span>{evento.tipo_ingresso}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/70">
              <User className="w-4 h-4 text-foreground/40" />
              <span className="line-clamp-1">{evento.organizador_nome}</span>
            </div>
          </div>
        </div>

        {/* Contact info revealed on hover or small section */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-[11px] text-foreground/40 font-medium">
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3" /> {evento.organizador_whatsapp}
          </div>
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" /> {evento.organizador_email}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
        <button
          onClick={() => handleAction('PUBLICADO')}
          disabled={loading}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50"
        >
          <Check className="w-5 h-5" />
          <span className="md:hidden lg:inline">Aprovar</span>
        </button>
        
        <button
          onClick={() => handleAction('REPROVADO')}
          disabled={loading}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-foreground/40 px-6 py-4 rounded-2xl font-bold transition-all active:scale-95 border border-white/5 disabled:opacity-50"
        >
          <X className="w-5 h-5" />
          <span className="md:hidden lg:inline">Recusar</span>
        </button>
      </div>
    </motion.div>
  )
}
