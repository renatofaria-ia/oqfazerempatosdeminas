-- SEED DATA PARA oqfazerempatosdeminas
-- Eventos fictícios/reais para teste do layout premium

INSERT INTO public.eventos (
    titulo, categoria, descricao_curta, descricao_completa, 
    data_inicio, data_termino, horario_inicio, formato, 
    local_nome, endereco, capa_url, tipo_ingresso, 
    organizador_nome, organizador_whatsapp, organizador_email, status, termo_aceite
) VALUES 
(
    'Fenamilho 2026', 
    'Agro e Negócios', 
    'A maior festa do interior de Minas está de volta com grandes shows e o melhor do agronegócio.', 
    'A Festa Nacional do Milho (Fenamilho) é o evento mais aguardado de Patos de Minas. Contando com rodeio profissional, praça de alimentação, feira de agronegócios e os maiores artistas nacionais. Uma experiência completa para toda a família e oportunidades únicas para o setor rural.', 
    '2026-05-15', '2026-05-24', '18:00:00', 'Presencial', 
    'Parque de Exposições Sebastião Vicente de Castro', 'Av. J K, 2500 - Novo Horizonte, Patos de Minas - MG', 
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2070', 
    'Pago', 
    'Sindicato Rural', '(34) 99999-0001', 'contato@fenamilho.com', 'PUBLICADO', true
),
(
    'Fenapraça 2026', 
    'Cultura e Entretenimento', 
    'Nove dias de arte, música e gastronomia no coração de Patos de Minas.', 
    'A Fenapraça transforma o centro da cidade em um vibrante festival cultural. Shows de artistas locais e regionais, barracas de comidas típicas, artesanato e apresentações de dança na Praça do Coreto e arredores. Entrada totalmente franca para a população.', 
    '2026-04-30', '2026-05-09', '19:00:00', 'Presencial', 
    'Praça do Coreto / Avenida Getúlio Vargas', 'Centro, Patos de Minas - MG', 
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2070', 
    'Gratuito', 
    'Secretaria de Cultura', '(34) 99999-0002', 'cultura@patosdeminas.mg.gov.br', 'PUBLICADO', true
),
(
    'Workshop: O Futuro do Agro', 
    'Educação e Inovação', 
    'Palestra magna sobre tecnologias sustentáveis aplicada à região do Cerrado.', 
    'Um encontro entre produtores, acadêmicos e entusiastas da tecnologia para discutir drones, sensores de solo e o novo mercado de crédito de carbono para o pequeno e médio produtor de Patos de Minas.', 
    '2026-06-15', NULL, '08:30:00', 'Híbrido', 
    'Centro de Convenções UNIPAM', 'Rua Major Gote, 808 - Caiçaras', 
    'https://images.unsplash.com/photo-1461280360983-bd93eaa50517?auto=format&fit=crop&q=80&w=2070', 
    'Pago', 
    'ADESP / UNIPAM', '(34) 99999-0003', 'inovacao@adesp.com.br', 'PUBLICADO', true
),
(
    'Corrida do Milho', 
    'Esportes e Saúde', 
    'Prepare o seu tênis para a corrida mais tradicional da cidade.', 
    'Percursos de 5km e 10km pelas principais avenidas de Patos de Minas. Medalhas para todos os participantes e premiação em dinheiro para os vencedores das categorias profissionais.', 
    '2026-05-17', NULL, '07:30:00', 'Presencial', 
    'Largada na Orla da Lagoa Grande', 'Centro, Patos de Minas - MG', 
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070', 
    'Solidário', 
    'Prefeitura Municipal', '(34) 99999-0004', 'esportes@patosdeminas.mg.gov.br', 'PUBLICADO', true
);
