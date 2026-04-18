# Product Backlog: Farmacinha Legal 📋
**Data:** 05/03/2026
**Status:** Fase de Planejamento de Engenharia
**Stack:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui (Radix UI), Supabase (Database/Auth/Storage), Row Level Security (RLS).

> Este backlog traduz a visão estratégica e as personas em requisitos técnicos acionáveis.

---

## 🏛️ Épico 1: Core Health Hub (Arquitetura Multi-Perfil)

### US01: Gestão de Dependente (Ana)
**Como** Ana (Líder), **quero** cadastrar meus pais e filhos como dependentes, **para que** eu possa gerenciar a saúde de todos em uma única conta.
- **Critérios de Aceitação:**
  - Login via Supabase Auth (Email/Senha ou Social).
  - CRUD de dependentes (Nome, Foto, Data de Nasc, Parentesco).
  - Armazenamento seguro de dados sensíveis.

### US02: Prontuário Clínico Familiar (Histórico)
**Como** Ana, **quero** registrar as patologias, alergias e tipos sanguíneos de cada dependente, **para que** o app possa me alertar sobre riscos.
- **Critérios de Aceitação:**
  - Lista de seleção rápida para patologias comuns (ex: Diabetes, IR, Hipertensão).
  - Campo de texto livre para alergias severas.
  - Vínculo direto entre Histórico Clínico e o Motor de Alertas de Medicamentos.

---

## 📸 Épico 2: Ingestão Inteligente e Inventário

### US03: Scanner de NFC-e (Sacola Virtual)
**Como** Ana, **quero** escanear o QR code da nota fiscal da farmácia, **para que** o app cadastre todos os medicamentos da compra de uma só vez.
- **Critérios de Aceitação:**
  - Leitura do link da SEFAZ via QR Code.
  - Scraping/Parsing dos itens da nota (GTIN + Nome).
  - Tela de "Distribuição": Escolher para qual dependente e qual farmacinha (Casa/Praia) cada item vai.

### US04: Scanner Visual c/ OCR de Validade
**Como** Ana, **quero** apontar a câmera para a caixa do remédio, **para que** a IA identifique o produto e a data de validade.
- **Critérios de Aceitação:**
  - Identificação via código de barras (EAN-13).
  - OCR multimodal para extrair Mês/Ano de validade.
  - Confirmação manual obrigatória pelo usuário (Segurança).

---

## 🛡️ Épico 3: Segurança e Validação de Campo

### US05: Validador de Balcão (Ana na Farmácia)
**Como** Ana, **quero** bipar um medicamento similar no balcão da farmácia, **para que** o app me diga se ele é seguro para o histórico clínico do meu dependente.
- **Critérios de Aceitação:**
  - Cruzamento imediato de fármaco vs. patologias do dependente selecionado.
  - Exibição de Alerta Vermelho (⛔) em caso de contraindicação.
  - Alerta de Interação Medicamento (se o idoso já toma algo que conflita).

### US06: App Simplificado (Modo Vovô)
**Como** Seu José, **quero** acessar um modo simplificado no App e apenas apontar a câmera pro remédio, **para que** eu saiba se estou tomando o certo.
- **Critérios de Aceitação:**
  - Interface no App configurada para alta acessibilidade (fontes grandes, botões fixos).
  - Câmera abre direto no modo de identificação do remédio.
  - Feedback visual/auditivo simplificado ("OK" ou "ERRO").

---

## 📄 Épico 4: Compartilhamento e Consultas

### US07: Dossiê Express / Consulta Mode (App Export)
**Como** Ana, **quero** gerar um acesso instantâneo no App ou link seguro, **para que** o médico ou a escola do Lucas vejam as informações vitais instantaneamente através da infraestrutura do App.
- **Critérios de Aceitação:**
  - Organização visual: "O que toma agora", "Alergias", "Patologias".
  - Acesso controlado gerado pelo App para leitura das informações críticas.
  - Versão print-friendly para PDF.

---

## 📊 Épico 5: B2B Analytics (Dr. Carlos)

### US08: Dashboard de Risco Agregado (Score de Letalidade)
**Como** Dr. Carlos (Diretor de Inovação), **quero** ver um dashboard com o score de risco medicamentoso da minha base de idosos, **para que** eu possa reduzir internações evitáveis.
- **Critérios de Aceitação:**
  - Dados K-anonimizados (agregados).
  - Filtro por região e faixa etária.
  - Cálculo do "Score de Letalidade" (Volume de interações perigosas detectadas nas farmacinhas dos lares).

---

## 🛠️ Priorização do MVP (Release Planning)

### SPRINT 1: Base & Identidade
- Setup do projeto Next.js + Tailwind + Supabase.
- Login e Cadastro de Dependentes (Ana).
- Cadastro Manual de Medicamentos com busca no DB da Anvisa.

### SPRINT 2: Ingestão & IA
- Implementação do scanner de código de barras.
- Protótipo do OCR de validade via API Multimodal.
- Integração básica com NFC-e (leitura de QR Code).

### SPRINT 3: Inteligência & Alertas
- Motor de regras: Histórico Clínico vs. Contraindicações.
- Validador de Balcão (Feature principal de segurança).
- Lógica de "Múltiplas Farmacinhas".

### SPRINT 4: Ecossistema App
- Modo Vovô Simplificado no App Principal.
- Dossiê Express (Geração e Exportação via App).
- Dashboard de Analytics agregados (Versão 1.0 Dr. Carlos).

---
*Backlog gerado via metodologia BMAD. Foco em Seniors Simplicity e Escalabilidade Técnica.*
