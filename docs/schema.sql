-- PROJETO: oqfazerempatosdeminas
-- DESCRIÇÃO: Schema inicial para gestão de eventos com RLS

-- 1. DEFINIÇÃO DE TIPOS E ENUMS
CREATE TYPE evento_status AS ENUM ('PENDENTE', 'PUBLICADO', 'REPROVADO');
CREATE TYPE evento_categoria AS ENUM ('Agro e Negócios', 'Cultura e Entretenimento', 'Esportes e Saúde', 'Educação e Inovação', 'Ação Social e Comunidade');

-- 2. CRIAÇÃO DA TABELA DE EVENTOS
CREATE TABLE IF NOT EXISTS public.eventos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Seção 1: O Evento
    titulo TEXT NOT NULL,
    categoria evento_categoria[] NOT NULL,
    descricao_curta VARCHAR(160) NOT NULL,
    descricao_completa TEXT NOT NULL,
    
    -- Seção 2: Quando
    data_inicio DATE NOT NULL,
    data_termino DATE,
    horario_inicio TIME NOT NULL,
    
    -- Seção 3: Onde
    formato TEXT NOT NULL CHECK (formato IN ('Presencial', 'Online', 'Híbrido')),
    local_nome TEXT,
    endereco TEXT,
    link_transmissao TEXT,
    
    -- Seção 4: Mídia e Acesso
    capa_url TEXT NOT NULL,
    tipo_ingresso TEXT NOT NULL CHECK (tipo_ingresso IN ('Gratuito', 'Pago', 'Solidário')),
    link_oficial TEXT,
    
    -- Seção 5: Dados do Organizador (Privado)
    organizador_nome TEXT NOT NULL,
    organizador_whatsapp TEXT NOT NULL,
    organizador_email TEXT NOT NULL,
    
    -- Controle e Auditoria
    status evento_status NOT NULL DEFAULT 'PENDENTE',
    motivo_reprovacao TEXT,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    usuario_ip TEXT, -- Auditoria conforme item 6.3 do PRD
    termo_aceite BOOLEAN NOT NULL DEFAULT FALSE
);

-- 3. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;

-- 4. POLÍTICAS DE SEGURANÇA (ADMIN = Papel de Curadoria no Supabase)

-- Política: Público pode ver eventos publicados
CREATE POLICY "Public can view published events" 
ON public.eventos 
FOR SELECT 
USING (status = 'PUBLICADO');

-- Política: Público pode submeter novos eventos (Formulário Aberto)
CREATE POLICY "Public can submit new events" 
ON public.eventos 
FOR INSERT 
WITH CHECK (status = 'PENDENTE');

-- Política: Curadoria (Admin) tem controle total
CREATE POLICY "Admins have full access" 
ON public.eventos 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 5. TRIGGER PARA ATUALIZAR TIMESTAMP
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.eventos
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();
