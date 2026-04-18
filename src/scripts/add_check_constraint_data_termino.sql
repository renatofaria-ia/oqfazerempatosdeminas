-- Migration: Adicionar CHECK constraint para data_termino <= data_inicio + 45 dias
-- Também garante que data_termino >= data_inicio quando preenchido.
-- Executa no Supabase SQL Editor.

-- 1. Para dados existentes que violam a regra, corrigir truncando data_termino
UPDATE eventos
SET data_termino = data_inicio + INTERVAL '45 days'
WHERE data_termino IS NOT NULL 
  AND data_termino > data_inicio + INTERVAL '45 days';

-- 2. Para dados existentes onde data_termino < data_inicio, corrigir
UPDATE eventos
SET data_termino = data_inicio
WHERE data_termino IS NOT NULL 
  AND data_termino < data_inicio;

-- 3. Adicionar a CHECK constraint
ALTER TABLE eventos
ADD CONSTRAINT chk_data_termino_max_45_dias
CHECK (
  data_termino IS NULL 
  OR (
    data_termino >= data_inicio 
    AND data_termino <= data_inicio + INTERVAL '45 days'
  )
);
