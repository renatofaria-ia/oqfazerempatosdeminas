'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, Save, AlertCircle, Info, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { salvarEdicaoEvento } from '@/app/actions/eventos'
import { type EventoFormData } from '@/lib/schemas/eventos'

interface EditEventModalProps {
  evento: any
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function EditEventModal({ evento, isOpen, onClose, onSuccess }: EditEventModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      ...evento,
      // Garantir formatos de data corretos para inputs
      data_inicio: evento.data_inicio ? new Date(evento.data_inicio).toISOString().split('T')[0] : '',
      data_termino: evento.data_termino ? new Date(evento.data_termino).toISOString().split('T')[0] : '',
    }
  })

  const formato = watch('formato')

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Garantir que campos vazios opcionais sejam transformados em null ou strings vazias conforme o banco espera
      const formattedData = {
        ...data,
        data_termino: data.data_termino || null,
        local_nome: data.local_nome || null,
        endereco: data.endereco || null,
        link_transmissao: data.link_transmissao || null,
        link_oficial: data.link_oficial || null,
      }

      const result = await salvarEdicaoEvento(evento.id, formattedData)
      
      if (result.success) {
        onSuccess()
        onClose()
      } else {
        setError(result.message || "Erro ao salvar as alterações.")
      }
    } catch (err: any) {
      setError("Ocorreu um erro inesperado ao salvar.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-surface border border-border rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden text-foreground"
            >
            {/* Header */}
            <div className="p-6 border-b border-border/50 flex items-center justify-between bg-surface">
              <div>
                <h2 className="text-2xl font-serif">Editar Evento</h2>
                <p className="text-xs text-foreground/70 font-mono uppercase tracking-widest mt-1">ID: {evento.id.split('-')[0]}...</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-surface-2 flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Body */}
            <form id="edit-event-form" onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-10 custom-scrollbar">
              
              {/* STATUS QUICK TOGGLE */}
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-bold uppercase tracking-wider">Status Atual</span>
                </div>
                <div className="flex p-1 bg-black/10 dark:bg-white/10 rounded-xl border border-black/5">
                  {['PENDENTE', 'PUBLICADO', 'REPROVADO'].map((s) => (
                    <label key={s} className="cursor-pointer">
                      <input 
                        type="radio" 
                        value={s} 
                        {...register('status')} 
                        className="peer sr-only"
                      />
                      <div className="px-4 py-2 rounded-lg text-xs font-bold transition-all peer-checked:bg-surface peer-checked:shadow-sm peer-checked:text-primary text-foreground/50 peer-checked:text-foreground group-hover:text-foreground/80">
                        {s}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Informações Básicas */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-primary">
                  <Info className="w-5 h-5" />
                  <h3 className="font-bold underline underline-offset-4 decoration-2">Informações Gerais</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/60 uppercase tracking-tighter">Título do Evento</label>
                    <input {...register('titulo')} className="admin-input" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/60 uppercase tracking-tighter">Categoriass</label>
                    <div className="flex flex-wrap gap-2">
                      {['Agro e Negócios', 'Cultura e Entretenimento', 'Esportes e Saúde', 'Educação e Inovação', 'Ação Social e Comunidade'].map(c => (
                        <label key={c} className="cursor-pointer">
                          <input 
                            type="checkbox" 
                            value={c} 
                            {...register('categoria')}
                            className="peer sr-only"
                          />
                          <div className="px-3 py-1.5 rounded-lg border border-border bg-surface peer-checked:bg-primary/20 peer-checked:text-primary peer-checked:border-primary transition-all text-xs font-bold">
                            {c}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/60 uppercase tracking-tighter">Descrição Curta</label>
                  <textarea {...register('descricao_curta')} rows={2} className="admin-input resize-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/60 uppercase tracking-tighter">Descrição Completa</label>
                  <textarea {...register('descricao_completa')} rows={5} className="admin-input" />
                </div>
              </div>

              {/* Data e Local */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h3 className="font-bold text-secondary flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    Quando
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-foreground/60 font-bold uppercase">Início</label>
                      <input type="date" {...register('data_inicio')} className="admin-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-foreground/60 font-bold uppercase">Término</label>
                      <input type="date" {...register('data_termino')} className="admin-input" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-foreground/60 font-bold uppercase">Horário</label>
                    <input type="time" {...register('horario_inicio')} className="admin-input" />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bold text-primary flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Onde
                  </h3>
                  <div className="space-y-2">
                    <label className="text-xs text-foreground/60 font-bold uppercase">Formato</label>
                    <select {...register('formato')} className="admin-input">
                      {['Presencial', 'Online', 'Híbrido'].map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                  {(formato === 'Presencial' || formato === 'Híbrido') && (
                    <div className="space-y-4">
                      <input {...register('local_nome')} placeholder="Nome do Local" className="admin-input" />
                      <input {...register('endereco')} placeholder="Endereço" className="admin-input" />
                    </div>
                  )}
                  {(formato === 'Online' || formato === 'Híbrido') && (
                    <input {...register('link_transmissao')} placeholder="Link da Transmissão" className="admin-input" />
                  )}
                </div>
              </div>

              {/* Mídia e Ingressos */}
              <div className="space-y-6 pt-4 border-t border-border/50">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs text-foreground/60 font-bold uppercase tracking-widest">URL da Imagem Capa</label>
                      <input {...register('capa_url')} className="admin-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs opacity-80 font-bold uppercase tracking-widest">Tipo Ingressos</label>
                      <select {...register('tipo_ingresso')} className="admin-input">
                        {['Gratuito', 'Pago', 'Solidário'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                 </div>
              </div>

              {/* Dados Organizador (Visualização) */}
              <div className="bg-surface-2 p-6 rounded-3xl border border-border">
                <h4 className="text-xs font-black uppercase tracking-widest text-foreground/60 mb-4">Contato do Organizador</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase text-foreground/60">Nome</p>
                    <input {...register('organizador_nome')} className="bg-transparent border-none p-0 font-bold text-sm w-full outline-none" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase text-foreground/60">WhatsApp</p>
                    <input {...register('organizador_whatsapp')} className="bg-transparent border-none p-0 font-bold text-sm w-full outline-none" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase text-foreground/60">E-mail</p>
                    <input {...register('organizador_email')} className="bg-transparent border-none p-0 font-bold text-sm w-full outline-none" />
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}
            </form>

            {/* Footer / Actions */}
            <div className="p-6 border-t border-border/50 bg-surface/50 backdrop-blur-md flex items-center justify-between">
              <button 
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-bold hover:bg-surface-2 transition-all"
              >
                Cancelar
              </button>
              
              <div className="flex gap-4">
                <button 
                  form="edit-event-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Salvar Alterações
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
