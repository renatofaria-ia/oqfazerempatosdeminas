# Solução de Problemas: Farmacinha Legal 🔬
**Data:** 04/03/2026
**Facilitador:** Dr. Quinn (Master Problem Solver)

## 🎯 1. Definição do Problema

### Título do Problema
Confiabilidade e Precisão na Coleta de Dados de Inventário via Visão Computacional.

### Categoria do Problema
Arquitetura de Dados / Visão Computacional / UX.

### Problema Inicial
O aplicativo precisa identificar medicamentos e datas de validade sem exigir digitação manual, mas a identificação errônea pode levar a riscos graves à saúde do usuário e invalidar o modelo de negócio baseado em dados confiáveis.

### Problema Refinado (Problem Statement)
A lacuna crítica é projetar um sistema técnico que, utilizando a câmera de smartphones muitas vezes antigos ou com baixa resolução, garanta 100% de identificação correta do produto (via EAN/GTIN) e proporcione uma interface de validação visual e OCR (Reconhecimento Óptico de Caracteres) para datas de validade de forma que a taxa de erro seja efetivamente zero.

---

## 🔍 2. Diagnóstico e Fronteiras (Is/Is Not)

- **ONDE ocorre?** Em ambientes domésticos variados (pouca luz, câmeras ruins, mãos trêmulas).
- **ONDE NÃO ocorre?** Em ambientes controlados de farmácias com leitores a laser profissionais.
- **QUEM é afetado?** Idosos com dificuldades visuais e motoras (na ponta B2C) e clientes de dados farmacêuticos (na ponta B2B).
- **O QUE É o problema?** Um problema de engenharia de software e design de interação focado em Tolerância a Erros.
- **O QUE NÃO É?** Um problema de aceitação do conceito (o conceito já foi validado no Design Thinking).

---

## 🌳 3. Análise de Causa Raiz

### Diagrama de Ishikawa (Espinha de Peixe) - Fatores Contribuintes:
- **Tecnologia:** Qualidade inconsistente das câmeras dos usuários; variação extrema em formatos de embalagens e fontes usadas para imprimir validade.
- **Pessoas:** Possível declínio cognitivo ou visual do usuário final, diminuindo a capacidade de perceber se o aplicativo errou.
- **Processos:** A falta de padronização universal em onde a validade é carimbada nas caixas de medicamentos no Brasil.

**Causa Raiz Ação (Root Cause):** O principal gargalo técnico é a *variabilidade física das embalagens* acoplada à *instabilidade do OCR em datas de validade*.

---

## ⚖️ 4. Forças e Restrições (Force Field)

### Forças Impulsionadoras (Driving Forces)
- Adoção massiva de APIs governamentais (Anvisa) e bases de dados abertas de medicamentos.
- Avanços recentes em modelos de IA e LLMs multimodais para visão computacional.
- Forte apelo e engajamento para segurança da saúde familiar.

### Forças Restritivas (Restraining Forces)
- Custo computacional de rodar IA avançada em tempo real no dispositivo (Edge AI) vs. atraso se enviado para a nuvem.
- Dificuldade em lidar com caixas amassadas, código de barras rasgados ou reflexos de luz em blísters.

### Insight Chave
A tecnologia nunca será 100% perfeita por si só. A solução deve combinar 99% de acurácia da máquina com um UX (User Experience) brilhante que force 1% de validação inquestionável pelo ser humano.

---

## 💡 5. Opções de Solução

1. **A Abordagem Híbrida Inteligente:** Usar um leitor de código de barras veloz (leve) no dispositivo para buscar o GTIN na base da Anvisa. Assim que reconhecido, apresentar uma foto grande da caixa do remédio armazenado no banco de dados.
2. **IA Multimodal em Nuvem para Validade:** Para a validade, o usuário envia a foto e uma API de IA Multimodal analisa a imagem.
3. **Double Blind Verification System:** Gamificar a validação sugerindo a data, exigindo confirmação do humano.
4. **Onboarding via QR Code da Nota Fiscal (NFC-e):** Ingestão rápida lendo o QR Code da nota fiscal. Isso **delimita a janela probabilística do OCR**: se o remédio foi comprado hoje, a IA já restringe a busca da data de validade para valores futuros, aumentando a precisão para quase 100%.

---

## 🏆 6. Avaliação e Recomendação

**Solução Recomendada: Arquitetura Orientada a GTIN + OCR Baseado em Nuvem Inteligente + Acelerador de NFC-e.**

**Racional:** 
A identificação do REMÉDIO deve ser determinística via EAN/GTIN ou do QR Code da NFC-e. Para a DATA DE VALIDADE, tratamos como um problema que une probabilidade e contexto. Usamos a **data de emissão da Nota Fiscal** (quando escaneada) como um limitador de "bounding box" temporal para a IA Visão, garantindo que o OCR nunca sugerirá um ano no passado. Pedimos ao usuário a validação humana final para mitigar o pequeno risco restante.

---

## 🏁 7. Plano de Implementação Técnica

### Fase 1: Arquitetura Base
- Construir/Consolidar base de dados determinística (EAN/GTIN), banco de interações medicamentosas/alérgicas e banco de contraindicações por patologia (ex: insuficiência renal → lista de antiinflamatórios proibidos).
- Arquitetura Híbrida/Multi-Tenant: Uma única Conta Principal ("Líder") gerenciando múltiplos Sub-perfis ("Dependentes"). Cada Dependente possui:
  - **Histórico Clínico:** Patologias crônicas, alergias, medicamentos passados.
  - **Múltiplas Farmacinhas:** Silos de estoque por local físico (Casa, Fazenda, Praia, Casa da Mãe, etc.).
- Implementar **Deduplicação de NF-e** (via Chave de Acesso única) e algoritmo de **"Sacola Virtual"** para distribuir itens automaticamente para a "gaveta" e "farmacinha" de seus respectivos sub-perfis.
- **Fluxo Simplificado App (Seu José):** Acesso direto no App ("Modo Vovô") com interface de câmera em tela cheia, fontes grandes e alto contraste que retorna confirmação visual de validade de forma extremamente simples.
- **Gestão de Menores (Lucas):** Fluxo de consentimento parental (LGPD Art. 14) integrado na criação do sub-perfil, com logs de auditoria inalteráveis.

### Fase 2: Motor de OCR
- Avaliar provedores de Visão (Google Cloud Vision, AWS Textract, OpenAI Vision) especificamente para o caso de uso de relevos e carimbos em caixas de remédios.
- Implementar pipeline que corrige perspectivas e iluminância da foto da validade antes do OCR.

### Fase 3: Segurança e LGPD
- **Infraestrutura:** Utilização do **Supabase** como plataforma de Backend-as-a-Service (PostgreSQL, Auth, Storage).
- **Segurança (RLS):** Implementação rigorosa de **Row Level Security (RLS)** em todas as tabelas para garantir que dados de um Hub Familiar (Ana) nunca vazem para outro, protegendo o histórico clínico.
- **Histórico Clínico (Criptografia):** Patologias armazenadas com criptografia adicional em nível de aplicação antes de serem persistidas no Supabase.
- **Módulo Analytics B2B (Dr. Carlos):** Pipeline de agregação de dados K-anonimizada gerada via Supabase Edge Functions para o Score de Letalidade Geográfico.

### Fase 4: Plataforma Central (App-First)
- **App Principal (iOS + Android):** A base única para cadastro, consulta, recebimento de alertas e gestão de todos os dados de forma conveniente, organizada e segura. Todas as interações ocorrem no App (notificações push, NFC-e, scanner).
- **Compartilhamento Seguro:** Visualização de dados externos (Dossiê Express para escolas/médicos) sempre comandados e gerados através do App, mantendo-o como o único centro de comando.

---

## 📊 8. Monitoramento e Validação

### Métricas de Sucesso
- **Leading Indicators:** Tempo médio para cadastrar 1 medicamento (< 10 segundos).
- **Lagging Indicators:** Taxa de rejeição de OCR (quantas vezes a IA erra a data e o usuário arruma na mão - Meta: < 5%).

### Mitigação de Riscos
- *O que fazer se o OCR falhar repetidamente para um fabricante?* Criar fallback fluido para digitação em fonte muito grande e notificar equipe para treinar modelo em cima dos padrões daquele fabricante.
