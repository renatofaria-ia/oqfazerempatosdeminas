'use server'

import { z } from 'zod'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

import { eventoSchema, type EventoFormData } from '@/lib/schemas/eventos'

export async function submeterEvento(formData: EventoFormData) {
  try {
    // 1. Validar dados no servidor
    const validatedData = eventoSchema.parse(formData)
    
    // 2. Conectar ao Supabase (Submissão pública usa Cliente Anon)
    const supabase = await createClient()
    
    // 3. Inserir dados (Status sempre entra como PENDENTE por padrão do banco)
    const { error } = await supabase
      .from('eventos')
      .insert([
        {
          ...validatedData,
          status: 'PENDENTE', // Forçar pendente independente do que venha do front
        }
      ])
      
    if (error) throw error
    
    revalidatePath('/')
    return { success: true }
    
  } catch (error: any) {
    console.error('Erro na submissão:', error)
    return { 
      success: false, 
      message: error.message || "Erro inesperado ao enviar evento." 
    }
  }
}

export async function listarEventosPorStatus(status?: 'PENDENTE' | 'PUBLICADO' | 'REPROVADO') {
  const supabase = await createAdminClient()
  
  let query = supabase
    .from('eventos')
    .select('*')
    .order('data_inicio', { ascending: false })
    
  if (status) {
    query = query.eq('status', status)
  }
    
  const { data, error } = await query
  
  if (error) {
    console.error(`Erro ao listar eventos (${status}):`, error)
    return []
  }
  
  return data
}

export async function buscarEventoPorId(id: string) {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('id', id)
    .single()
    
  if (error) {
    console.error('Erro ao buscar evento:', error)
    return null
  }
  
  return data
}

export async function salvarEdicaoEvento(id: string, dados: any) {
  try {
    const supabase = await createAdminClient()
    
    // 1. Sanitizar dados: remover campos que não devem ser atualizados manualmente
    const { 
      id: _id, 
      criado_em, 
      atualizado_at, 
      usuario_ip,
      ...dadosParaAtualizar 
    } = dados

    // 2. Executar o update com cliente Admin (ignora RLS)
    const { data, error } = await supabase
      .from('eventos')
      .update(dadosParaAtualizar)
      .eq('id', id)
      .select()
      
    if (error) {
      console.error('Erro retornado pelo Supabase:', error)
      throw error
    }
    
    // Verificar se algum registro foi realmente afetado
    if (!data || data.length === 0) {
      throw new Error("Permissão negada ou chave de serviço não configurada. Verifique se a variável SUPABASE_SERVICE_ROLE_KEY está no seu .env.local.")
    }

    console.log(`Evento ${id} atualizado com sucesso por Admin. Status: ${dadosParaAtualizar.status}`)
    
    // 3. Revalidar caminhos
    revalidatePath('/curadoria')
    revalidatePath('/')
    
    return { success: true }
    
  } catch (error: any) {
    console.error('Erro ao salvar edição Admin:', error)
    return { 
      success: false, 
      message: error.message || "Erro ao salvar as alterações." 
    }
  }
}

export async function atualizarStatusEvento(id: string, novoStatus: 'PENDENTE' | 'PUBLICADO' | 'REPROVADO') {
  return salvarEdicaoEvento(id, { status: novoStatus })
}

export async function buscarEstatisticasEventos() {
  const supabase = await createAdminClient()
  
  const { data, error } = await supabase
    .from('eventos')
    .select('status')
    
  if (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return { PENDENTE: 0, PUBLICADO: 0, REPROVADO: 0, TOTAL: 0 }
  }
  
  const stats = data.reduce((acc: any, curr: any) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1
    acc.TOTAL = (acc.TOTAL || 0) + 1
    return acc
  }, { PENDENTE: 0, PUBLICADO: 0, REPROVADO: 0, TOTAL: 0 })
  
  return stats
}
