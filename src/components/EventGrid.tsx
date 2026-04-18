'use client'

import { useState, useMemo } from 'react'
import { SearchX, ChevronLeft, ChevronRight } from 'lucide-react'
import EventCard, { type Evento } from './EventCard'

const ITEMS_PER_PAGE = 30

interface EventGridProps {
  eventos: Evento[]
  searchQuery?: string
}

type FilterKey = 'todos' | 'hoje' | 'semana' | 'mes'

const filters: { label: string; key: FilterKey }[] = [
  { label: "Todos", key: "todos" },
  { label: "Hoje", key: "hoje" },
  { label: "Esta Semana", key: "semana" },


  { label: "Este Mês", key: "mes" },
]

/** Formata Date local como YYYY-MM-DD sem conversão UTC */
function toLocalDateStr(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Retorna a data efetiva de término (fallback para data_inicio se não houver data_termino) */
function getEndDate(evento: Evento): string {
  return evento.data_termino || evento.data_inicio
}

/** Retorna segunda-feira e domingo da semana atual (seg-dom) */
function getCurrentWeekRange(): [Date, Date] {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const day = now.getDay() // 0=dom, 1=seg, ..., 6=sab
  // Se domingo (0), a segunda foi 6 dias atrás
  const diffToMonday = day === 0 ? -6 : 1 - day
  const monday = new Date(now)
  monday.setDate(now.getDate() + diffToMonday)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  return [monday, sunday]
}

/** Checa se dois intervalos de data se sobrepõem */
function rangesOverlap(
  startA: string, endA: string,
  startB: string, endB: string
): boolean {
  return startA <= endB && endA >= startB
}

export default function EventGrid({ eventos, searchQuery }: EventGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('todos')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredEventos = useMemo(() => {
    if (activeFilter === 'todos') return eventos

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = toLocalDateStr(today)

    if (activeFilter === 'hoje') {
      return eventos.filter(e => {
        const start = e.data_inicio
        const end = getEndDate(e)
        return start <= todayStr && end >= todayStr
      })
    }

    if (activeFilter === 'semana') {
      const [monday, sunday] = getCurrentWeekRange()
      const monStr = toLocalDateStr(monday)
      const sunStr = toLocalDateStr(sunday)
      
      return eventos.filter(e =>
        rangesOverlap(e.data_inicio, getEndDate(e), monStr, sunStr)
      )
    }



    if (activeFilter === 'mes') {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      const firstStr = toLocalDateStr(firstDay)
      const lastStr = toLocalDateStr(lastDay)
      console.log('[DEBUG MES] Range:', firstStr, '->', lastStr)
      console.log('[DEBUG MES] Todos eventos recebidos:', eventos.map(e => ({
        titulo: e.titulo,
        data_inicio: e.data_inicio,
        data_termino: e.data_termino,
        endDate: getEndDate(e),
        overlap: rangesOverlap(e.data_inicio, getEndDate(e), firstStr, lastStr)
      })))
      return eventos.filter(e =>
        rangesOverlap(e.data_inicio, getEndDate(e), firstStr, lastStr)
      )
    }

    return eventos
  }, [eventos, activeFilter])

  // Reset page when filter changes
  const totalPages = Math.max(1, Math.ceil(filteredEventos.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedEventos = filteredEventos.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  const handleFilterChange = (key: FilterKey) => {
    setActiveFilter(key)
    setCurrentPage(1)
  }

  return (
    <section className="max-w-7xl mx-auto w-full px-6 py-20">
      {/* Título + Filtros */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            {searchQuery ? `Resultados para "${searchQuery}"` : "Eventos Ativos"}
          </h2>
          <p className="text-foreground/80">
            {searchQuery
              ? `${filteredEventos.length} eventos encontrados.`
              : activeFilter !== 'todos'
                ? `Mostrando eventos para: ${filters.find(f => f.key === activeFilter)?.label}`
                : "Os próximos destaques do nosso calendário. Aproveite!"
            }
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilterChange(filter.key)}
              className={`px-4 py-2 rounded-xl border transition-all text-xs font-semibold cursor-pointer ${
                activeFilter === filter.key
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                  : 'border-border bg-surface hover:border-primary text-foreground/70'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Eventos */}
      {paginatedEventos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedEventos.map((evento) => (
            <EventCard key={evento.id} evento={evento} />
          ))}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center text-center glass rounded-3xl border-dashed border-2 p-8">
          <SearchX className="w-12 h-12 text-foreground/20 mb-4" />
          <p className="text-foreground/70 font-medium text-xl">
            {searchQuery
              ? `Nenhum evento encontrado para "${searchQuery}"`
              : "Nenhum evento publicado para o período selecionado."
            }
          </p>
          <p className="text-sm text-foreground/60 mt-2 max-w-md">
            {searchQuery
              ? "Tente buscar por termos mais genéricos ou verifique a ortografia."
              : "Tente selecionar outro filtro de data."
            }
          </p>
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-border bg-surface font-semibold text-sm transition-all hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - safePage) <= 2)
              .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('...')
                acc.push(p)
                return acc
              }, [])
              .map((item, idx) =>
                item === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-foreground/40 text-sm">…</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setCurrentPage(item as number)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      safePage === item
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'border border-border bg-surface hover:border-primary text-foreground/70'
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={safePage >= totalPages}
            className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-border bg-surface font-semibold text-sm transition-all hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  )
}
