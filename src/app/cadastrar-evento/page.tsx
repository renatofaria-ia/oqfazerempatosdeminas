'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChevronLeft, Send, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import Link from 'next/link'
import { submeterEvento } from '../actions/eventos'
import { eventoSchema, type EventoFormData } from '@/lib/schemas/eventos'

// Local Types to match server action schema
const categories = ['Agro e Negócios', 'Cultura e Entretenimento', 'Esportes e Saúde', 'Educação e Inovação', 'Ação Social e Comunidade'] as const

export default function CadastrarEvento() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EventoFormData>({
    resolver: zodResolver(eventoSchema),
    defaultValues: {
      formato: 'Presencial',
      tipo_ingresso: 'Gratuito',
      termo_aceite: false,
      categoria: []
    }
  })

  const formato = watch('formato')

  const onSubmit = async (data: EventoFormData) => {
    setIsSubmitting(true)
    setError(null)

    const result = await submeterEvento(data)

    if (result.success) {
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setError(result.message || "Ocorreu um erro ao enviar seu evento.")
    }
    setIsSubmitting(false)
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-md w-full glass p-10 rounded-3xl text-center border-primary/20 shadow-2xl animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-serif text-3xl mb-4">Evento Enviado!</h1>
          <p className="text-foreground/60 mb-8 text-balance">
            Nossa equipe irá analisar as informações em até 48 horas úteis. Você receberá um retorno no e-mail informado.
          </p>
          <Link
            href="/"
            className="inline-block w-full py-4 bg-primary text-white rounded-2xl font-bold hover:brightness-110 transition-all active:scale-95"
          >
            Voltar para Ativos
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-20 relative">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent -z-10" />

      {/* Header Fixo Simples */}
      <nav className="p-6 max-w-7xl mx-auto flex items-center gap-4">
        <Link href="/" className="p-2 hover:bg-surface rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-serif text-2xl tracking-tight">Cadastrar Novo Evento</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-6 mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

          {/* SEÇÃO 1: O EVENTO */}
          <section className="glass p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
              <h2 className="font-bold text-lg">Sobre o Evento</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">Nome do Evento *</label>
                <input
                  {...register('titulo')}
                  placeholder="Ex: Fenamilho 2026"
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                />
                {errors.titulo && <span className="text-xs text-red-500">{errors.titulo.message}</span>}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold opacity-70">Categorias * (Selecione no mínimo uma)</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(c => (
                    <label key={c} className="cursor-pointer">
                      <input
                        type="checkbox"
                        value={c}
                        {...register('categoria')}
                        className="peer sr-only"
                      />
                      <div className="px-4 py-2 rounded-xl border border-border bg-surface-2 peer-checked:bg-primary/20 peer-checked:text-primary peer-checked:border-primary transition-all text-xs font-bold shadow-sm">
                        {c}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.categoria && <span className="text-xs text-red-500">{errors.categoria.message as string}</span>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold opacity-70">Descrição Curta *</label>
              <textarea
                {...register('descricao_curta')}
                placeholder="Uma breve frase que aparecerá nos cards de listagem (máx 160 caracteres)"
                rows={2}
                className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all resize-none"
              />
              {errors.descricao_curta && <span className="text-xs text-red-500">{errors.descricao_curta.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold opacity-70">Descrição Completa *</label>
              <textarea
                {...register('descricao_completa')}
                placeholder="Conte todos os detalhes: atrações, regulamento, avisos importantes..."
                rows={6}
                className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
              />
              {errors.descricao_completa && <span className="text-xs text-red-500">{errors.descricao_completa.message}</span>}
            </div>
          </section>

          {/* SEÇÃO 2: QUANDO */}
          <section className="glass p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
              <h2 className="font-bold text-lg">Quando</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">Data de Início *</label>
                <input
                  type="date"
                  {...register('data_inicio')}
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all cursor-pointer"
                />
                {errors.data_inicio && <span className="text-xs text-red-500 font-medium">{errors.data_inicio.message}</span>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">Data de Término</label>
                <input
                  type="date"
                  {...register('data_termino')}
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">Horário de Início *</label>
                <input
                  type="time"
                  {...register('horario_inicio')}
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all cursor-pointer"
                />
                {errors.horario_inicio && <span className="text-xs text-red-500 font-medium">{errors.horario_inicio.message}</span>}
              </div>
            </div>
          </section>

          {/* SEÇÃO 3: ONDE */}
          <section className="glass p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
              <h2 className="font-bold text-lg">Onde</h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                {['Presencial', 'Online', 'Híbrido'].map((opt) => (
                  <label key={opt} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      value={opt}
                      {...register('formato')}
                      className="peer sr-only"
                    />
                    <div className="w-full text-center py-3 rounded-xl border border-border bg-surface-2 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all font-semibold text-sm">
                      {opt}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {(formato === 'Presencial' || formato === 'Híbrido') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold opacity-70">Nome do Local *</label>
                  <input
                    {...register('local_nome')}
                    placeholder="Ex: Parque de Exposições"
                    className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold opacity-70">Endereço Completo *</label>
                  <input
                    {...register('endereco')}
                    placeholder="Rua, número, bairro..."
                    className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>
            )}

            {(formato === 'Online' || formato === 'Híbrido') && (
              <div className="space-y-2 animate-in slide-in-from-top-2">
                <label className="text-sm font-semibold opacity-70">Link da Transmissão</label>
                <input
                  type="url"
                  {...register('link_transmissao')}
                  placeholder="https://youtube.com/..."
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                />
              </div>
            )}
          </section>

          {/* SEÇÃO 4: MÍDIA E ACESSO */}
          <section className="glass p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">4</div>
              <h2 className="font-bold text-lg">Mídia e Acesso</h2>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold opacity-70">Link da Imagem de Capa (Banner) *</label>
              <input
                {...register('capa_url')}
                placeholder="https://linkdafoto.com/foto.jpg"
                className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
              />
              <p className="text-[10px] text-foreground/40 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Dica: Use links diretos do Google Drive, Imgur ou Unsplash.
              </p>
              {errors.capa_url && <span className="text-xs text-red-500">{errors.capa_url.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">Tipo de Ingresso *</label>
                <div className="flex gap-2">
                  {['Gratuito', 'Pago', 'Solidário'].map((type) => (
                    <label key={type} className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        value={type}
                        {...register('tipo_ingresso')}
                        className="peer sr-only"
                      />
                      <div className="text-center py-2.5 rounded-xl border border-border bg-surface-2 peer-checked:bg-primary/10 peer-checked:text-primary peer-checked:border-primary transition-all text-xs font-bold">
                        {type}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">Link Oficial / Ingressos</label>
                <input
                  type="url"
                  {...register('link_oficial')}
                  placeholder="https://sympla.com.br/..."
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                />
              </div>
            </div>
          </section>

          {/* SEÇÃO 5: ORGANIZADOR */}
          <section className="glass p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">5</div>
              <h2 className="font-bold text-lg">Dados do Organizador</h2>
            </div>
            <p className="text-xs text-foreground/50 italic mb-6">Estes dados são internos e não serão publicados.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">Seu Nome *</label>
                <input
                  {...register('organizador_nome')}
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                />
                {errors.organizador_nome && <span className="text-xs text-red-500">{errors.organizador_nome.message}</span>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">WhatsApp *</label>
                <input
                  {...register('organizador_whatsapp')}
                  placeholder="(34) 9..."
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                />
                {errors.organizador_whatsapp && <span className="text-xs text-red-500">{errors.organizador_whatsapp.message}</span>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">E-mail *</label>
                <input
                  type="email"
                  {...register('organizador_email')}
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                />
                {errors.organizador_email && <span className="text-xs text-red-500">{errors.organizador_email.message}</span>}
              </div>
            </div>
          </section>

          {/* SEÇÃO 6: TERMOS */}
          <section className="space-y-6">
            <label className="flex gap-4 p-6 bg-surface border border-border rounded-2xl cursor-pointer hover:bg-surface-2 transition-all">
              <input
                type="checkbox"
                {...register('termo_aceite')}
                className="w-6 h-6 rounded-lg accent-primary mt-1"
              />
              <div className="text-xs leading-relaxed opacity-60">
                Declaro que sou o organizador ou representante legal deste evento. Confirmo que as informações fornecidas são verdadeiras e me comprometo a informar ao site oquefazerempatosdeminas.com.br em caso de alterações. Autorizo a publicação gratuita do banner no portal e compreendo que o site oquefazerempatosdeminas.com.br atua apenas como canal de divulgação. Declaro ainda que possuo autorização todos os direitos autorais do evento.
              </div>
            </label>
            {errors.termo_aceite && <p className="text-xs text-red-500 font-bold ml-2">{errors.termo_aceite.message}</p>}

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar para Curadoria
                </>
              )}
            </button>
          </section>

        </form>
      </div>
    </main>
  )
}
