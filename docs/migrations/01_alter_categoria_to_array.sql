-- Mude a coluna 'categoria' da tabela 'eventos' 
-- de um único valor enum para um array de enum
-- Esta operação utiliza o USING clause (ARRAY[categoria]) para migrar 
-- os dados existentes e preservar os eventos já cadastrados na plataforma.

ALTER TABLE public.eventos 
ALTER COLUMN categoria TYPE evento_categoria[] 
USING ARRAY[categoria];
