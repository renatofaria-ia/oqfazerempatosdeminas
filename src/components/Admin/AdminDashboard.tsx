'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Tag, ChevronRight, Filter, Search, Loader2 } from 'lucide-react'
import { listarEventosPorStatus, buscarEstatisticasEventos } from '@/app/actions/eventos'
import EditEventModal from './EditEventModal'

type Status = 'PENDENTE' | 'PUBLICADO' | 'REPROVADO'

export default function AdminDashboard({ initialEvents, initialStats }: { initialEvents: any[], initialStats: any }) {
  const [activeTab, setActiveTab] = useState<Status>('PENDENTE')
  const [events, setEvents] = useState(initialEvents)
  const [stats, setStats] = useState(initialStats)
  const [loading, setLoading] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Atualizar lista quando a aba muda
  useEffect(() => {
    fetchEvents(activeTab)
  }, [activeTab])

  const fetchEvents = async (status: Status) => {
    setLoading(true)
    const [data, newStats] = await Promise.all([
      listarEventosPorStatus(status),
      buscarEstatisticasEventos()
    ])
    setEvents(data)
    setStats(newStats)
    setLoading(false)
  }

  const filteredEvents = events.filter(e => 
    e.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.organizador_nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const tabs: { id: Status; label: string; color: string }[] = [
    { id: 'PENDENTE', label: 'Pendentes', color: 'bg-amber-500' },
    { id: 'PUBLICADO', label: 'Publicados', color: 'bg-emerald-500' },
    { id: 'REPROVADO', label: 'Reprovados', color: 'bg-red-500' },
  ]

  return (
    <div className="space-y-8">
      {/* Tabs & Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex p-1.5 bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id ? 'text-white' : 'text-white/70 hover:text-white/90'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] bg-white/20 text-white/80`}>
                  {stats[tab.id] || 0}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${tab.color}`} />
              </span>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative group max-w-sm w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 group-focus-within:text-primary transition-colors" />
          <input 
            type="text"
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/5 rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:border-primary/50 focus:bg-black/60 transition-all text-sm"
          />
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4 text-white/40">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="font-mono text-xs uppercase tracking-widest">Carregando eventos...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                onClick={() => setSelectedEvent(event)}
                className="group glass border-white/5 hover:border-white/20 p-5 cursor-pointer transition-all flex items-center gap-6"
              >
                {/* Visual indicator of date */}
                <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors">
                  <span className="text-xl font-bold leading-none text-foreground">
                    {new Date(event.data_inicio).getDate() + 1}
                  </span>
                  <span className="text-[10px] uppercase font-black text-foreground/60">
                    {new Date(event.data_inicio).toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] uppercase font-bold text-primary transition-colors">
                      {event.categoria}
                    </span>
                    <span className="text-[10px] text-foreground/60 font-mono">• {event.formato}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary group-hover:translate-x-1 transition-all truncate">
                    {event.titulo}
                  </h3>
                  <p className="text-sm text-foreground/70 line-clamp-1">{event.descricao_curta}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                   <div className="flex items-center gap-1 text-xs font-bold text-foreground/80 group-hover:text-primary transition-colors">
                      Gerenciar <ChevronRight className="w-4 h-4" />
                   </div>
                   <span className="text-[10px] text-foreground/40 font-mono">
                     {new Date(event.criado_em).toLocaleDateString()}
                   </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-32 text-center glass border-dashed border-2 border-white/10 rounded-[40px]">
              <p className="text-foreground/60 font-serif text-xl italic">Nenhum evento encontrado para esta categoria.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Edit Modal */}
      {selectedEvent && (
        <EditEventModal 
          evento={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSuccess={() => fetchEvents(activeTab)}
        />
      )}
    </div>
  )
}
