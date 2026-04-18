# Diário de Bordo: Projeto Gestão Inteligente de Medicamentos

## 📅 Início do Projeto: 04/03/2026
**Usuário:** Konok
**Objetivo:** Criar um aplicativo para resolver problemas de validade, perda de receitas e falta de histórico de uso de medicamentos.

---

## 🗺️ Roteiro de Execução (BMAD Strategic Flows)

| Fase | Fluxo Estratégico | Status | Objetivo Principal |
| :--- | :--- | :--- | :--- |
| **1** | **Design Thinking (DT)** | ✅ Concluído | Definir a jornada do usuário e o fluxo de segurança visual. |
| **2** | **Innovation Strategy (IS)** | ✅ Concluído | Definir modelo B2B, monetização de dados e penetração de mercado. |
| **3** | **Problem Solving (PS)** | ✅ Concluído | Arquitetura técnica (GTIN determinístico + OCR Multimodal). |
| **4** | **Storytelling (ST)** | ✅ Concluído | Criar a narrativa dupla de venda para B2B e uso B2C. |
| **5** | **Deep MVP Validation** | ✅ Concluído | Estressar e encantar o MVP via SCAMPER, Oceano Azul e Edge Cases. |
| **6** | **Líder de Família Discovery** | ✅ Concluído | Integrar a persona "CEO da Saúde do Lar" como core do MVP. |
| **7** | **Consistency Check & Expansão** | ✅ Concluído | Histórico Clínico, Multi-Farmacinha e Arquitetura App-First. |
| **8** | **Persona Deep-Dive** | ✅ Concluído | Detalhamento das 4 personas (Líder, Idoso, Filho, B2B) e seus cenários. |
| **9** | **UI System Design** | ✅ Concluído | Estabelecimento do Clinical Glassmorphism e regras de acessibilidade. |

---

## 📝 Resumo do Contexto e Problemas
### Contexto
- Medicamentos acumulados ao longo do tempo.
- Compras baseadas em indicação médica ou automedicação.
- Existência de data de validade crítica.
- Necessidade de vincular prescrição (quem, dose, tempo) ao produto.

### Problemas Identificados
1. **Desperdício e Risco:** Remédios vencem sem que o usuário perceba.
2. **Perda de Informação:** Receitas físicas somem, levando junto a orientação de uso.
3. **Falta de Memória:** Não há histórico de quais medicamentos foram eficazes ou usados anteriormente.

---

## 📈 Evolução e Insights
*(Esta seção reflete toda a jornada da fundação estratégica)*

### [Fase 1: Design Thinking] - Concluído
- **Insights de Empatia:** Conflito entre independência e segurança; medo de erro por ilegibilidade de receitas.
- **Definição do Problema:** Foco na gestão de inventário ("farmacinha de casa") para evitar vencimentos.
- **Ideias de Solução:** Scanner Rápido Híbrido: Código de Barras (GTIN) para precisão e **QR Code da Nota Fiscal** (NFC-e) para velocidade ("cadastrar a sacola inteira").
- **Protótipo:** Fluxo focado na precisão e simplicidade, com interface adaptável para ler caixa ou nota.

### [Fase 2: Innovation Strategy] - Concluído
- **Modelo de Negócio:** B2B2C com foco em **Data-as-a-Service**.
- **Diferencial Competitivo:** Controle de estoque doméstico e mapeamento de Inteligência Financeira (Perfil de Gastos via NFC-e).
- **Vantagem Defensível:** Efeito de rede e banco de dados proprietário de farmacovigilância e orçamento familiar.

### [Fase 3: Problem Solving] - Concluído
- **Solução Técnica Master:** Arquitetura Híbrida. GTIN determinístico para remédios; e IA Multimodal na nuvem para datas, com janela probabilística guiada pela **data de emissão da NF-e**.
- **Métrica Essencial:** Tempo médio para novo cadastro (< 10 seg) e OCR com taxa de erro < 5% c/ correção fácil.

### [Fase 4: Storytelling] - Concluído
- **Narrativa B2B (Elevator Pitch):** Posicionamento como solução que revela o "Ponto Cego" e atua como pilar de farmacovigilância focando em redução agressiva de sinistros de planos de saúde.
- **Narrativa B2C:** Foco no sentimento de independência para o idoso e paz de espírito dos cuidadores e familiares através do gancho emocional da segurança ("o remédio validado na palma da mão").

### [Fase 5: Deep MVP Validation] - Concluído
- **Inovações de Encantamento (SCAMPER):** Gravação com voz da própria família alertando o idoso no Modo Vovô (App). Acessibilidade extrema.
- **Diferencial Competitivo Extremo (Blue Ocean):** Identificação de score de letalidade (interação perigosa na gaveta) para hospitais, não apenas vencimento de remédio.
- **Blindagem de Edge Cases:** Deduplicação de NF-es para a base de dados B2B. Gestão de remédios cortados da cartela pela "Sacola Virtual da Nota".

### [Fase 6: Líder de Família Discovery] - Concluído
- **Nova Persona Core:** O "Líder de Família" (35-55 anos), o real decisor logístico de saúde da casa (compra remédios, vai ao médico, decide trocas na farmácia).
- **Novas Features MVP:**
  - **Multi-Perfil (Hub Familiar):** Uma conta gerenciando silos independentes de estoque para cada dependente.
  - **Dossiê Express (Consulta Mode):** Tela de alto contraste com "Em uso agora" e "Alergias" para mostrar ao médico na hora.
  - **Validador de Balcão:** Bipar genérico/similar na farmácia e cruzar interações medicamentosas com o estoque do dependente.
- **Impacto Estratégico:** Deslocou o heroísmo narrativo do idoso para o Líder. Novo slogan: *"Superpoderes para quem cuida. Paz para quem é cuidado."*

### [Fase 7: Consistency Check & Expansão] - Concluído
- **Histórico Clínico por Dependente:** Módulo de patologias crônicas, alergias e medicamentos passados. Cruza automaticamente com o Validador de Balcão e alimenta o Score de Letalidade (ex: paciente renal + antiinflamatório = alerta).
- **Multi-Farmacinha:** Cada dependente pode ter múltiplos locais de estoque (Casa, Fazenda, Praia, Casa da Mãe) com inventários independentes.
- **Plataforma App-First:** App Principal (iOS e Android) cobrindo todos os módulos (Líder, Idoso via Modo Vovô, Gestão B2C completa). Geração de links seguros nativos do app (Dossiê Express).
- **Freemium Lever:** Plano gratuito = 1 farmacinha; Premium = ilimitadas + exportação de histórico clínico em PDF.

### [Fase 8: Persona Deep-Dive] - Concluído
- **Depth 4x4:** Criação de perfis demográficos e psicológicos completos para:
  - **Ana (Líder):** Protagonista B2C, busca alívio no burnout de cuidar de 3 gerações.
  - **Seu José (Idoso):** Usuário final, focado em independência via App no Modo Vovô Simplificado.
  - **Lucas (Filho/Menor):** Dependente crítico com alergias; gerou a necessidade de Dossiê Exportável do App para terceiros (escola/babás).
  - **Dr. Carlos (B2B):** O "pagador" corporativo; focado em reduzir sinistralidade via inteligência de dados agregada.
- **Cenário "Um Dia na Vida":** Mapeados gatilhos reais de uso (fila da farmácia, consulta médica, rotina escolar, feedback de conformidade matinal).
- **Compliance Menores:** Estruturado fluxo técnico de consentimento parental (LGPD) para o sub-perfil Lucas.
- **Decisão Técnica (UI):** Adoção de design components nativos/cross-platform de alta performance mantendo a identidade premium.
- **Decisão Técnica (Backend):** Utilização do **Supabase** como infraestrutura unificada (Database, Auth, Storage) com foco em **Row Level Security (RLS)** para isolamento absoluto de dados familiares.

---
*Documento gerado e mantido via metodologia BMAD. Ciclo completo: Estruturação Estratégica + Validação + Discovery de Persona + Consistência Final + Persona Deep-Dive.*
