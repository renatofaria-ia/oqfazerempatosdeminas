# Diretrizes do Projeto

Este documento registrará as principais decisões, padrões e diretrizes técnicas tomadas durante o desenvolvimento do oqfazerempatosdeminas.

## Diretrizes Atuais

* **Framework Base:** BMAD-CIS (Creative Intelligence System)
* **Design/UI:** Premium Tech (Glassmorphism, tipografia fluida, Framer Motion, Tailwind CSS, Shadcn/UI, Lucide Icons)
* **Stack Principal (Frontend):** Next.js (App Router), TypeScript (Strict), Tailwind CSS. (Em detrimento do WordPress sugerido no PRD, seguindo as diretrizes globais do projeto).
* **Banco de Dados/Backend:** Supabase com RLS (Row Level Security) obrigatório em todas as tabelas.
* **Segurança e Integração:**
    * **Server-Side Logic:** Uso preferencial de Next.js **Server Actions** para mutações e **Server Components** para leitura de dados, reduzindo a exposição de lógica no lado do cliente.
    * **Validação:** Uso de **Zod** para validação de esquemas tanto no frontend quanto no backend.
    * **Middleware:** Proteção de rotas e verificação de sessão via Next.js Middleware.
    * **Princípio do Menor Privilégio:** Políticas de RLS granulares (ex: público pode ler eventos publicados, mas apenas curadoria pode editar).
* **Segurança de Segredos:** Uso de variáveis de ambiente (`.env.local`), nunca versionando chaves de serviço de admin.
