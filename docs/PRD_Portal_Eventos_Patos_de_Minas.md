# PRD — oqfazerempatosdeminas
**Mantido pela ADESP | Versão 1.2 | Abril de 2026**
**Metodologia de Desenvolvimento:** BMAD-CIS (Creative Intelligence System)

---

## 1. Visão Geral do Produto

### 1.1 Nome e Propósito
**Nome do Portal:** `oqfazerempatosdeminas`
**Mantido por:** ADESP — Associação de Desenvolvimento de Patos de Minas/MG
**Propósito:** Portal institucional de utilidade pública, gratuito e sem fins comerciais, cujo objetivo é centralizar e divulgar os principais eventos culturais, esportivos, empresariais e sociais de Patos de Minas para moradores e visitantes.

### 1.2 Problema a Resolver
Hoje, as informações sobre o que acontece em Patos de Minas estão fragmentadas em perfis dispersos de redes sociais, grupos de WhatsApp e comunicações isoladas de cada organizador. Não existe um ponto de referência único, confiável e de fácil acesso para que a população saiba o que fazer — seja um show na Fenapraça, a Milkshow, o Renascer Natalino, o Clássico do Milho entre URT e Mamoré ou um workshop de negócios promovido por alguma entidade local.

### 1.3 Proposta de Valor
Ser a **fonte oficial e centralizada** da agenda da cidade, conectando quem promove eventos a quem busca experiências e oportunidades. A ADESP atua exclusivamente como curador e canal de divulgação — sem vínculo financeiro com as organizações e sem responsabilidade pela execução dos eventos.

### 1.4 Declaração de Escopo
- **Está no escopo:** Cadastro de eventos por formulário público, curadoria editorial pela ADESP, exibição de calendário filtrado por categoria e data, compartilhamento social.
- **Fora do escopo (MVP):** Venda de ingressos, autenticação de usuários, área logada para organizadores, comentários, avaliações, publicidade paga.

---

## 2. Personas e Público-Alvo

### Persona 1 — O Cidadão / Turista (Consumidor)
- **Objetivo:** Descobrir rapidamente o que acontece em Patos de Minas hoje, no fim de semana ou no mês.
- **Comportamento:** Acessa majoritariamente pelo celular, navega por imagens e usa filtros rápidos de data e categoria.
- **Dor atual:** Precisa consultar vários grupos de WhatsApp e perfis no Instagram para montar sua agenda.
- **Critério de sucesso:** Encontrar o evento desejado em menos de 30 segundos.

### Persona 2 — O Organizador / Promotor
- **Objetivo:** Divulgar seu evento de forma gratuita em um canal com credibilidade institucional.
- **Perfil:** Pode ser a Prefeitura Municipal, a Câmara de Dirigentes Lojistas (CDL), organização de feiras agropecuárias, produtores culturais, igrejas, universidades (UNIPAM), sindicatos ou associações de bairro.
- **Dor atual:** Falta de um canal centralizado e gratuito para a divulgação de eventos locais.
- **Critério de sucesso:** Conseguir cadastrar e publicar um evento em menos de 5 minutos, sem burocracia.

### Persona 3 — O Curador (Equipe ADESP)
- **Objetivo:** Receber os envios de eventos, revisar as informações e aprovar a publicação de forma ágil.
- **Dor atual:** Sem um sistema formal, o processo de divulgação é reativo e descentralizado.
- **Critério de sucesso:** Receber alertas automáticos dos novos envios e publicar eventos aprovados com poucos cliques, com SLA interno de até 48 horas.

---

## 3. Taxonomia de Categorias

As categorias devem refletir a vocação econômica e cultural de Patos de Minas. Cada evento pertence a **uma única categoria principal** (seleção única via dropdown ou radio button), garantindo a integridade dos filtros no frontend.

| Categoria | Ícone Sugerido | Exemplos de Eventos |
|---|---|---|
| **Agro e Negócios** | 🌾 | Milkshow, Fenamilho, Rodadas de Negócios, Workshops ADESP |
| **Cultura e Entretenimento** | 🎭 | Fenapraça, Renascer Natalino, Shows Locais, Exposições, Teatro |
| **Esportes e Saúde** | ⚽ | Clássico do Milho (URT x Mamoré), Corridas de Rua, Torneios |
| **Educação e Inovação** | 🎓 | Cursos UNIPAM, Congressos, Hackathons, Palestras |
| **Ação Social e Comunidade** | 🤝 | Quermesses, Campanhas de Arrecadação, Feiras de Adoção, Eventos da Prefeitura |

---

## 4. Escopo Funcional — MVP (Produto Mínimo Viável)

### 4.1 Funcionalidades Prioritárias

| Funcionalidade | Descrição | Prioridade |
|---|---|---|
| **Página Inicial (Discovery)** | Destaque para eventos em alta ("Destaques da Curadoria") + barra de busca por texto, data e categoria. | Alta |
| **Catálogo com Filtros** | Lista/grid de eventos com filtros por categoria, data (Hoje / Fim de Semana / Este Mês) e formato (Presencial / Online). | Alta |
| **Página do Evento** | Visão detalhada: banner, data, hora, local, mapa, descrição, link oficial e botões de compartilhamento. | Alta |
| **Formulário de Submissão Pública** | Página pública acessível a qualquer pessoa, sem necessidade de login, para cadastrar um evento. | Alta |
| **Painel de Curadoria (Backoffice)** | Área administrativa para a equipe ADESP visualizar envios pendentes, editar, aprovar ou reprovar. | Alta |
| **Notificação de Novos Envios** | Alerta automático (e-mail ou mensagem) para a equipe ADESP quando um novo evento for submetido. | Média |
| **Alerta de Evento Aprovado/Reprovado** | E-mail automático para o organizador informando o status do seu envio. | Média |
| **Botão "Reportar Erro"** | Link simples na página do evento para o público avisar sobre cancelamentos ou dados desatualizados. | Média |

---

## 5. Formulário de Submissão — Campos Exatos

O formulário é dividido em 5 seções lógicas para facilitar o preenchimento pelo organizador. Deve ser entregue em uma única página (sem paginação de etapas), com as seções claramente separadas por títulos visuais.

### Seção 1: O Evento

| Campo | Tipo | Status | Regra / Helper Text |
|---|---|---|---|
| Nome do Evento | Texto Curto | **Obrigatório** | Máx. 60 caracteres. Será o título principal do card e da página do evento. |
| Categoria | Dropdown (seleção única) | **Obrigatório** | As 5 categorias definidas no Item 3. Valor padrão: "Selecione uma categoria". |
| Descrição Curta | Área de Texto | **Obrigatório** | Máx. 160 caracteres. Aparece nos cards de listagem e em SEO (meta description). |
| Descrição Completa | Rich Text (HTML básico) | **Obrigatório** | Programação detalhada, atrações, avisos. Mínimo de 50 caracteres. |

### Seção 2: Quando

| Campo | Tipo | Status | Regra / Helper Text |
|---|---|---|---|
| Data de Início | Seletor de Data (Calendário) | **Obrigatório** | Bloquear datas retroativas (anteriores ao dia de hoje). |
| Data de Término | Seletor de Data (Calendário) | Opcional | Exibir com o helper: "Preencha apenas se o evento durar mais de um dia." |
| Horário de Início | Seletor de Hora (HH:MM) | **Obrigatório** | Horário de abertura dos portões ou início da programação. |

### Seção 3: Onde

| Campo | Tipo | Status | Regra / Helper Text |
|---|---|---|---|
| Formato do Evento | Radio Button | **Obrigatório** | Opções: Presencial / Online / Híbrido. |
| Nome do Local | Texto Curto | **Condicional** | Obrigatório se "Presencial" ou "Híbrido". Ex: "Parque de Exposições de Patos de Minas". |
| Endereço Completo | Texto Longo | **Condicional** | Obrigatório se "Presencial" ou "Híbrido". Rua, número, bairro. Usado para gerar o mapa. |
| Link de Transmissão | URL | **Condicional** | Obrigatório se "Online" ou "Híbrido". Ex: link do YouTube, Zoom ou Teams. |

### Seção 4: Mídia e Acesso

| Campo | Tipo | Status | Regra / Helper Text |
|---|---|---|---|
| Imagem de Capa (Banner) | Upload de Arquivo | **Obrigatório** | Aceitar apenas JPG ou PNG. Tamanho máximo: 2MB. Proporção ideal: 16:9 (horizontal). Exibir preview após upload. |
| Tipo de Ingresso | Radio Button | **Obrigatório** | Opções: Gratuito / Pago / Solidário (Ex: 1 kg de alimento). |
| Link Oficial do Evento | URL | Opcional | Site externo, link de compra de ingressos ou mais informações. Label: "Link oficial (site, Sympla, etc.)". |

### Seção 5: Dados do Organizador *(Privado — não será publicado)*

| Campo | Tipo | Status | Regra / Helper Text |
|---|---|---|---|
| Nome do Responsável | Texto Curto | **Obrigatório** | Dado interno para contato da ADESP. Label: "Seu nome completo (não será exibido publicamente)". |
| Telefone / WhatsApp | Numérico com Máscara | **Obrigatório** | Formato: (34) 9XXXX-XXXX. Dado interno para dúvidas na curadoria. |
| E-mail de Contato | E-mail | **Obrigatório** | Usado para enviar o retorno da curadoria (aprovado/reprovado). |

### Seção 6: Termos de Responsabilidade *(Compliance — Bloco de Conformidade)*

Este bloco é o último do formulário, imediatamente antes do botão de envio.

**Tipo de Entrada:** Checkbox único, de marcação obrigatória.

**Texto de Declaração (fixo, não editável pelo usuário):**

> *☐ Declaro que sou o organizador ou representante legal deste evento. Confirmo que as informações fornecidas são verdadeiras e me comprometo a informar a ADESP em caso de cancelamento, adiamento ou alteração de data, horário ou local. Declaro também que possuo os direitos autorais e de uso da imagem (banner) anexada, autorizando sua publicação gratuita no portal. Compreendo que a ADESP atua exclusivamente como canal de divulgação e não se responsabiliza pela execução do evento, pela venda de ingressos ou por eventuais prejuízos causados ao público.*

**Botão de Envio:** Label: `"Enviar para Curadoria"`.
- Estado INATIVO (cinza/desabilitado) enquanto qualquer campo obrigatório estiver vazio ou o checkbox não estiver marcado.
- Estado ATIVO (cor primária) somente após todos os campos obrigatórios preenchidos e o checkbox marcado.

**Mensagem de Confirmação Pós-Envio:** Substituir o formulário por um card de sucesso com a mensagem:
> *"Evento enviado com sucesso! Nossa equipe irá analisar as informações em até 48 horas úteis. Você receberá um retorno no e-mail informado."*

---

## 6. Regras de Negócio e Curadoria (Backoffice)

### 6.1 Fluxo de Status dos Eventos

```
[Envio pelo Organizador]
        ↓
[Status: PENDENTE] → Alerta automático para equipe ADESP
        ↓
[Revisão da Equipe ADESP]
        ↓ ─────────────────────────────────────────────
        ↓ APROVADO                         ↓ REPROVADO
        ↓                                   ↓
[Status: PUBLICADO]          [E-mail automático ao organizador
        ↓                     com o motivo da reprovação]
[Evento visível no portal]
```

### 6.2 Critérios de Reprovação (Diretrizes para a Curadoria)
A equipe ADESP tem autonomia para reprovar eventos nos seguintes casos:
- Informações incompletas ou contraditórias.
- Imagem de baixa qualidade (resolução insuficiente) ou com indícios de infração de direitos autorais.
- Conteúdo que não condiz com os valores institucionais da ADESP ou da cidade.
- Eventos com datas no passado.
- Conteúdo político-partidário, religioso excludente ou discriminatório.

### 6.3 Registro de Conformidade
O sistema deve registrar, para cada envio aprovado ou reprovado:
- **IP do usuário** no momento do preenchimento.
- **Data e hora exatas** em que o checkbox de Termos foi marcado.
- **Dados do responsável** (nome, e-mail, telefone).

Esses dados compõem o "recibo digital" do aceite e devem ser armazenados no banco de dados.

### 6.4 Fluxo de Atualização pelo Organizador
Como o organizador se comprometeu a manter os dados atualizados, o e-mail de "Evento Aprovado" deve conter as instruções:
> *"Para solicitar alterações (data, horário, local) ou cancelar o evento, envie um e-mail para: curadoria@adesp.com.br com o assunto: 'ATUALIZAÇÃO — [Nome do Evento]'."*

---

## 7. Arquitetura da Informação e Wireframe

### 7.1 Estrutura de Páginas (Sitemap)

```
/                          → Página Inicial (Home)
/eventos                   → Catálogo Completo (com filtros)
/eventos/[slug-do-evento]  → Página Individual do Evento
/cadastrar-evento          → Formulário de Submissão Pública
/sobre                     → Sobre o Portal e a ADESP
```

### 7.2 Wireframe — Página Inicial (Home)

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                          │
│  [Logo do Portal]  Início | Categorias | Sobre  [+ Cadastrar]   │
├─────────────────────────────────────────────────────────────────┤
│  HERO SECTION                                                    │
│  ───────────────────────────────────────────────────────        │
│  "Descubra o melhor de Patos de Minas"                          │
│  [Buscar evento...]  [Hoje|Fim de Semana|Mês]  [BUSCAR]         │
├─────────────────────────────────────────────────────────────────┤
│  DESTAQUES (Carrossel — Curated Picks)                          │
│  ───────────────────────────────────────────────────────        │
│  [Card Grande 1]  [Card Grande 2]  [Card Grande 3]              │
│  (Definidos pela curadoria ADESP via backoffice)                │
├─────────────────────────────────────────────────────────────────┤
│  NAVEGUE POR CATEGORIAS                                         │
│  ───────────────────────────────────────────────────────        │
│  [🌾 Agro e Negócios] [🎭 Cultura] [⚽ Esportes]               │
│  [🎓 Educação]        [🤝 Comunidade]                           │
├─────────────────────────────────────────────────────────────────┤
│  AGENDA COMPLETA (Feed Cronológico)                             │
│  ───────────────────────────────────────────────────────        │
│  [Card 1]  [Card 2]  [Card 3]                                   │
│  [Card 4]  [Card 5]  [Card 6]                                   │
│  [Card 7]  [Card 8]  [Card 9]                                   │
│             [Carregar mais eventos]                             │
├─────────────────────────────────────────────────────────────────┤
│  CTA CADASTRO                                                   │
│  ───────────────────────────────────────────────────────        │
│  "Tem um evento em Patos de Minas?"                             │
│  "Cadastre gratuitamente e alcance toda a cidade."              │
│                  [+ Cadastrar Meu Evento]                       │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                         │
│  Logo ADESP | Links | "Realizado com ♥ pela ADESP"             │
└─────────────────────────────────────────────────────────────────┘
```

### 7.3 Anatomia do Card de Evento

```
┌──────────────────────────┐
│ [IMAGEM 16:9]     [15 MAI]│  ← Badge de data flutuante
├──────────────────────────┤
│ 🎭 Cultura                │  ← Tag de categoria
│ **Fenapraça 2026**        │  ← Título (máx 2 linhas)
│ 📍 Praça do Coreto        │  ← Local
│ 🎟️ Gratuito               │  ← Tipo de ingresso
└──────────────────────────┘
```

### 7.4 Wireframe — Página Individual do Evento

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER (mesmo do site)                                         │
├─────────────────────────────────────────────────────────────────┤
│  BANNER 16:9 (largura total)                                    │
│  ───────────────────────────────────────────────────────        │
│  [Imagem de Capa do Evento — Full Width]                        │
├────────────────────────────┬────────────────────────────────────┤
│  CORPO DO CONTEÚDO         │  STICKY BOX (resumo rápido)        │
│  ─────────────────         │  ──────────────────────────        │
│  🎭 Cultura e Lazer        │  📅 15 a 25 de Maio de 2026        │
│                             │  ⏰ A partir das 18h              │
│  **Fenapraça 2026**        │  📍 Praça do Coreto — Centro       │
│                             │  🎟️ Entrada Gratuita              │
│  Sobre o Evento:            │                                    │
│  [Texto completo da         │  [🔗 Site Oficial / Mais Infos]   │
│  descrição do organizador]  │                                    │
│                             │  ─────────────────────────────    │
│  Programação...             │  Compartilhar:                    │
│                             │  [WhatsApp] [Instagram] [Link]    │
├────────────────────────────┴────────────────────────────────────┤
│  LOCALIZAÇÃO E MAPA                                             │
│  ───────────────────────────────────────────────────────        │
│  [Google Maps Embed — Endereço do evento]                       │
│  Praça do Coreto, Centro — Patos de Minas/MG                   │
├─────────────────────────────────────────────────────────────────┤
│  RODAPÉ DO EVENTO                                               │
│  ───────────────────────────────────────────────────────        │
│  Organizado por: [Nome do Responsável/Organização]              │
│  ⚠️ [Reportar cancelamento ou erro nas informações]             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Diretrizes de Design e Identidade Visual

> **Nota para a ferramenta de vibe code:** As diretrizes abaixo devem orientar 100% das decisões visuais. Não usar templates genéricos de AI.

### 8.1 Paleta de Cores
- **Fundo:** Branco ou off-white levemente quente (`#f7f6f2`).
- **Cor Primária / Destaque:** Verde Cerrado Mineiro — tons de verde intenso (`#2d6a4f`) para remeter à identidade rural e sustentável do Triângulo Mineiro.
- **Cor Secundária:** Amarelo Milho (`#f5a623`) — referência direta à cultura do milho, símbolo de Patos de Minas (Fenamilho, Clássico do Milho).
- **Texto:** Carvão (`#1a1a1a`) para corpo, Cinza Médio para secundários, Cinza Claro para metadados.
- **Superfícies:** Sistema de 4 camadas (bg → surface → surface-2 → surface-offset) com variação sutil para criar profundidade sem poluição visual.
- **Modo Escuro:** Obrigatório. Superfícies escuras com mesma paleta de acento.

### 8.2 Tipografia
- **Display (títulos/hero):** Fonte serifada elegante (ex: Instrument Serif do Google Fonts ou Zodiak do Fontshare) — transmite tradição e identidade cultural.
- **Corpo (textos e UI):** Fonte sans-serif moderna e legível (ex: General Sans do Fontshare ou Work Sans do Google Fonts).
- **Escala de tamanho:** Fluida com `clamp()`. Mínimo absoluto de 12px para labels, 16px para corpo de texto.

### 8.3 Estilo e Componentes (Vibe coding)
- **Estética Premium Tech:** Uso de **Glassmorphism**, tipografia fluida e micro-interações.
- **Transições:** Uso de **Framer Motion** para transições de página e estados de componentes (smooth feel).
- **Cards:** Cantos arredondados (`border-radius: 12px`), sombra sutil (`box-shadow` com alpha baixo), efeito de vidro em superfícies selecionadas. **Proibido:** borda colorida lateral.
- **Botão primário:** Fundo verde sólido, texto branco, feedback tátil no hover. **Proibido:** gradientes agressivos em botões.
- **Badges de categoria:** Pequeno chip com fundo alpha da cor da categoria + texto. Mobile-First obrigatório.
- **Ícones:** Lucide Icons (CDN). Tamanho mínimo de ícone clicável: 44x44px.

---

## 9. Fluxos de Comunicação e Automação

### 9.1 Fluxo 1: Alerta de Novo Envio (ADESP)
- **Gatilho:** Envio do formulário de submissão com sucesso.
- **Ação:** Sistema envia e-mail automático para `curadoria@adesp.com.br` contendo:
  - Nome do Evento
  - Categoria
  - Data
  - Nome e e-mail do organizador
  - Link direto para o painel de revisão no backoffice.
- **SLA esperado de resposta:** Até 48 horas úteis.

### 9.2 Fluxo 2: Retorno ao Organizador (Aprovado)
- **Gatilho:** Equipe ADESP clica em "Publicar" no backoffice.
- **Ação:** E-mail automático para o e-mail cadastrado pelo organizador com:
  - Confirmação de publicação.
  - Link direto para a página do evento no portal.
  - Instruções de como solicitar atualizações ou cancelamento.

### 9.3 Fluxo 3: Retorno ao Organizador (Reprovado)
- **Gatilho:** Equipe ADESP clica em "Reprovar" e preenche o campo de motivo.
- **Ação:** E-mail automático para o organizador informando:
  - Motivo da reprovação (campo de texto livre preenchido pela curadoria).
  - Convite para reenvio após as correções.

### 9.4 Fluxo 4: Alerta de "Reportar Erro" (Público)
- **Gatilho:** Usuário clica em "Reportar cancelamento ou erro" na página do evento.
- **Ação:** Abre um mini formulário (modal) com campos: Nome (opcional), Mensagem (obrigatório).
- **Destino:** E-mail automático para `curadoria@adesp.com.br` com os dados do evento reportado.

---

## 10. Métricas de Sucesso e KPIs

Como o portal não tem fins comerciais, o sucesso é medido por **adoção, engajamento e qualidade do conteúdo**.

| KPI | Descrição | Meta (6 meses) |
|---|---|---|
| **Eventos cadastrados por terceiros / mês** | Volume de submissões orgânicas via formulário | ≥ 20 eventos/mês |
| **Usuários Ativos Mensais (MAU)** | Visitantes únicos ao site por mês | ≥ 3.000 MAUs |
| **Taxa de aprovação pela curadoria** | % de eventos aprovados sobre enviados | > 80% |
| **SLA de Curadoria** | Tempo médio entre envio e aprovação | ≤ 48 horas úteis |
| **Compartilhamentos por evento** | Média de cliques nos botões de compartilhamento | ≥ 15 por evento |
| **Taxa de rejeição (Bounce Rate)** | Usuários que saem sem interagir | < 50% |

---

## 11. Requisitos Técnicos e Stack (Modern Tech Stack)

> **Nota:** A stack foi atualizada de WordPress para uma arquitetura moderna e escalável, seguindo as diretrizes globais do projeto e as melhores práticas de integração frontend e backend.

### 11.1 Frontend e CORE
- **Framework:** **Next.js 14+ (App Router)** para máxima performance e SEO nativo.
- **Linguagem:** **TypeScript (Strict Mode)** para robustez do código.
- **Estilização:** **Tailwind CSS** com sistema de tokens harmoniosos.
- **Componentes:** **Shadcn/UI** (Radix UI) para acessibilidade (WCAG) e consistência.
- **Animações:** **Framer Motion** para transições fluidas e estética "Premium Tech".
- **Ícones:** **Lucide Icons**.

### 11.2 Backend e Dados (Estrutura Segura)
- **Plataforma:** **Supabase** (PostgreSQL).
- **Integração Segura:**
    - **Data Fetching:** Uso de **Server Components** para leitura de dados diretamente do Supabase, evitando exposição de APIs públicas desnecessárias.
    - **Mutações:** Uso de **Server Actions** para processar envios de formulários e edições, garantindo validação lógica no lado do servidor.
    - **Sessão:** Integração via `@supabase/ssr` para gestão segura de cookies e contexto.
- **Segurança (RLS):** Implementação obrigatória de **Row Level Security (RLS)** em todas as tabelas. O acesso será granular (Ex: `Anon` pode ler eventos; `Authenticated` pode gerenciar a própria curadoria).
- **Validação:** Uso de **Zod** para validação de esquemas de dados em todas as entradas e saídas (Frontend-to-Backend synchronization).

### 11.3 Integrações e Automações
- **Notificações:** **n8n** ou Supabase Edge Functions para disparos de e-mail (Resend/SendGrid).
- **Mapas:** Integração direta com Google Maps API ou Leaflet para geolocalização dos eventos.

### 11.4 Conformidade e LGPD
- **Gestão de Segredos:** Uso estrito de variáveis de ambiente (`.env.local`). Nunca expor `SERVICE_ROLE_KEY` no client-side.
- **Auditoria:** Registro de IP e timestamp no Supabase via triggers nativos para conformidade com os Termos de Responsabilidade.

---

## 12. Roadmap de Entrega (Fases)

### Fase 1 — Fundação e MVP (meses 1–2)
- [ ] Setup do projeto Next.js + Tailwind + Lucide Icons.
- [ ] Modelagem do banco de dados no Supabase e configuração de RLS.
- [ ] Implementação do Design System (Glassmorphism + Tokens).
- [ ] Página Inicial (Home) e Discovery.
- [ ] Catálogo de Eventos com filtros dinâmicos via Supabase.
- [ ] Formulário de Submissão Pública (Integrado ao Supabase).
- [ ] Painel Administrativo de Curadoria (Next.js + RLS).
- [ ] Automação de e-mails para curadoria e organizadores.

### Fase 2 — Crescimento (meses 3–4)
- [ ] Fluxo de "Reportar Erro" (Fluxo 9.4).
- [ ] Integração do Google Maps nas páginas de evento.
- [ ] Otimização SEO (Yoast/RankMath + Schema.org para eventos).
- [ ] Configuração do Google Analytics 4 para mensuração dos KPIs.
- [ ] Testes mobile e cross-browser.

### Fase 3 — Consolidação (meses 5–6)
- [ ] Avaliação dos KPIs da Fase 1.
- [ ] Newsletter com a agenda da semana (via Mailchimp ou similar).
- [ ] Mapa interativo de todos os eventos do mês.
- [ ] Avaliar necessidade de área logada para organizadores recorrentes.

---

*Documento elaborado pela ADESP — Associação de Desenvolvimento de Patos de Minas*
*Versão 1.0 | Abril de 2026 | Sujeito a revisão*
