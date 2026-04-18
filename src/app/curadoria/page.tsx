import { listarEventosPorStatus, buscarEstatisticasEventos } from "@/app/actions/eventos"
import AdminDashboard from "@/components/Admin/AdminDashboard"
import { ShieldCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function CuradoriaPage() {
  // Buscar dados iniciais no servidor
  const [initialEvents, stats] = await Promise.all([
    listarEventosPorStatus('PENDENTE'),
    buscarEstatisticasEventos()
  ])

  return (
    <div className="dark min-h-screen bg-[#050505] text-white selection:bg-primary/30 antialiased">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl border-b border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <h1 className="font-bold text-lg flex items-center gap-2 tracking-tight">
                Gestão de Eventos
                <ShieldCheck className="w-4 h-4 text-primary" />
              </h1>
              <p className="text-[10px] text-white/60 uppercase font-black tracking-widest">Painel Administrativo v1.0</p>
            </div>
          </div>

          <button className="hidden sm:flex px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all items-center gap-2">
            Configurações
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="font-serif text-4xl leading-tight">Painel do Curador</h2>
            <p className="text-white/70 max-w-lg">
              Gerencie todo o fluxo de eventos de Patos de Minas em um único lugar.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
              <span className="text-[10px] font-black uppercase opacity-60">Total de Eventos</span>
              <span className="text-2xl font-bold text-primary">{stats.TOTAL}</span>
            </div>
          </div>
        </div>

        {/* COMPONENTE PRINCIPAL DO DASHBOARD */}
        <AdminDashboard initialEvents={initialEvents} initialStats={stats} />

      </main>

      <footer className="py-20 text-center">
        <p className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-black">
          O Que Fazer Em Patos de Minas &bull;
        </p>
      </footer>
    </div>
  )
}
