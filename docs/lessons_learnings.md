# Lessons Learnings

Este documento registrará os problemas encontrados durante o desenvolvimento do oqfazerempatosdeminas e como foram resolvidos, para evitar que os mesmos erros ocorram novamente.

## Lições Aprendidas

1.  **PRD como Single Source of Truth (SSOT):** O PRD não deve refletir apenas *o que* vamos construir (funcionalidades), mas também *como* (segurança, stack, processos). Mantê-lo atualizado com as decisões técnicas de arquitetura (como a mudança de WordPress para Next.js + Supabase) evita erros de alinhamento e garante que o produto seja seguro e profissional desde o início.
2.  **Governança como Código (Arquivos de Sistema):** Para garantir que as diretrizes e lições sejam sempre consultadas, criamos um arquivo `.cursorrules` e um workflow de sincronagem. Isso transforma a documentação passiva em comandos ativos para a IA, garantindo que o projeto não perca qualidade com o tempo.

3.  **Falhas Silenciosas do Supabase RLS:** O Supabase não retorna erro quando uma política de RLS bloqueia um `UPDATE`; ele retorna sucesso com 0 linhas afetadas. Isso cria uma "falha silenciosa" difícil de detectar. **Lição:** Sempre verifique se o retorno do `.update()` contém dados ou use um cliente administrativo (`service_role`) para ações de curadoria quando não houver sistema de autenticação completo.
4.  **Saneamento de Payloads de Atualização:** Enviar objetos completos (com `id`, `created_at`, etc.) em chamadas de `.update()` pode causar problemas de permissão ou integridade, mesmo que os valores não tenham mudado. **Lição:** Sempre sanitize o objeto no Server Action, enviando apenas as colunas que realmente devem ser editáveis pelo formulário.
5.  **Ambiguidade entre Schema Local e Realidade:** Confiar apenas no arquivo `schema.sql` pode ser perigoso se o banco de dados real divergir (ex: RLS habilitado mas com políticas diferentes). **Lição:** Testar conexões e permissões com scripts de debug (`node scratch/test_supa.js`) é essencial para diagnosticar problemas de infraestrutura rapidamente.
