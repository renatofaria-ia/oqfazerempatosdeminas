import { z } from 'zod'

export const eventoSchema = z.object({
  titulo: z.string().min(5, "Título muito curto").max(60, "Máximo 60 caracteres"),
  categoria: z.array(z.enum(['Agro e Negócios', 'Cultura e Entretenimento', 'Esportes e Saúde', 'Educação e Inovação', 'Ação Social e Comunidade'])).min(1, "Selecione pelo menos uma categoria"),
  descricao_curta: z.string().min(10, "Descrição muito curta").max(160, "Máximo 160 caracteres"),
  descricao_completa: z.string().min(50, "Mínimo 50 caracteres para a descrição completa"),
  
  data_inicio: z.string().min(1, "Data de início é obrigatória"),
  data_termino: z.string().optional(),
  horario_inicio: z.string().min(1, "Horário de início é obrigatório"),
  
  formato: z.enum(['Presencial', 'Online', 'Híbrido']),
  local_nome: z.string().optional(),
  endereco: z.string().optional(),
  link_transmissao: z.string().url("Link inválido").optional().or(z.literal('')),
  
  capa_url: z.string().url("URL da imagem é obrigatória"),
  tipo_ingresso: z.enum(['Gratuito', 'Pago', 'Solidário']),
  link_oficial: z.string().url("Link inválido").optional().or(z.literal('')),
  
  organizador_nome: z.string().min(3, "Nome completo obrigatório"),
  organizador_whatsapp: z.string().min(10, "WhatsApp inválido"),
  organizador_email: z.string().email("E-mail inválido"),
  
  termo_aceite: z.boolean().refine(val => val === true, "Você deve aceitar os termos"),
}).refine(
  (data) => {
    if (!data.data_termino || data.data_termino === '') return true
    const inicio = new Date(data.data_inicio)
    const termino = new Date(data.data_termino)
    // data_termino deve ser >= data_inicio
    if (termino < inicio) return false
    // data_termino deve ser <= data_inicio + 45 dias
    const maxDate = new Date(inicio)
    maxDate.setDate(maxDate.getDate() + 45)
    return termino <= maxDate
  },
  {
    message: "A data de término deve ser no máximo 45 dias após a data de início.",
    path: ["data_termino"],
  }
)

export type EventoFormData = z.infer<typeof eventoSchema>
