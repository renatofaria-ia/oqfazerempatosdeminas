# Design Thinking: Gestão Inteligente de Medicamentos
**Data:** 04/03/2026
**Facilitadora:** Maya 🎨

## 🎯 1. Desafio de Design

### Contexto do Desafio
O projeto visa resolver o caos das "farmacinhas caseiras", onde medicamentos vencem silenciosamente, receitas físicas desaparecem e o histórico de saúde se perde em gavetas. O foco está na segurança do paciente, economia e organização.

### Definição de Sucesso
O sucesso será alcançado quando o usuário:
1. Receber alertas proativos sobre vencimentos iminentes.
2. Acessar instantaneamente as instruções de uso (quem, dose, tempo) sem depender de papéis.
3. Tiver total visibilidade do histórico de consumo para compartilhar com médicos.

### Restrições e Premissas
- **Simplicidade Extrema:** A interface deve ser funcional e acessível para idosos (alta legibilidade, navegação intuitiva).
- **Funcionalidade:** O app deve ser prático para o dia a dia, evitando burocracia no cadastro.

### Declaração do Desafio (HMW - How Might We)
> **Como podemos transformar o "Líder da Família" em um gestor imbatível, facilitando o gerenciamento do ecossistema de medicamentos (da compra à consulta médica) para garantir que seus dependentes (idosos e crônicos) nunca utilizem produtos vencidos e tenham a orientação correta?**

---

## 🧠 2. EMPATHIZE (Empatia)

> [!NOTE]
> A profundidade total das personas (demografia, rotinas e jornadas) está detalhada em: [personas-farmacinha-legal.md](file:///c:/Users/konok/Documents/vibecode/BMAD%201/_bmad-output/personas-farmacinha-legal.md).

### Personas de Referência 👥

1. **Ana (Líder de Família - Primária B2C):** Gestora de saúde de 3 gerações. Sofre com sobrecarga mental e medo de erro medicamentoso nos pais e filhos.
2. **Seu José (Idoso Independente - Secundária B2C):** Quer autonomia, mas luta com letras pequenas e confusão de caixas. Interage via **App (Modo Vovô Simplificado)**.
3. **Lucas (Filho Menor - Terciária B2C):** Dependente com alergias (rinite/amendoim). Requer que seu prontuário seja acessível à escola e avós.
4. **Dr. Carlos (Diretor de Inovação - Primária B2B):** Busca reduzir sinistralidade em operadoras de saúde através do **Score de Letalidade Doméstica**.

### Insights e Observações Chave
1. **Ponto Cego na Consulta:** O médico receita às escuras porque o idoso esqueceu e o Filho (Líder) não lembra se aquele remédio conflita com o que a mãe já tem na gaveta.
2. **Pressão de Balcão:** O Líder da Família sofre coerção na farmácia ao aceitar trocar medicamentos por "similares" sem saber se afeta interações medicamentosas ou histórico alérgico.
3. **Segurança de Terceiros:** A saúde de crianças (Lucas) muitas vezes depende de cuidadores temporários que precisam de acesso rápido a um "Dossiê de Alergias".
4. **Valor do Dado Doméstico:** O que acontece "dentro da gaveta" é o dado mais valioso e menos mapeado pelas operadoras de saúde (Gap de Sinistralidade).

---

## 🎯 3. DEFINE (Definição)

### Ponto de Vista (POV)
> **Usuário:** Líder de Família (Agregador de Saúde) e seus Dependentes (Idosos).
> **Necessidade:** Uma central de controle portátil e confiável para gerenciar prescrições, compras e validades do núcleo familiar, garantindo informações cruciais na farmácia e na consulta.
> **Insight:** O Líder é o real decisor da cadeia logística, e a dor dele não é apenas ler a caixa, mas *saber o que a casa inteira toma, se pode ser misturado e se já acabou*.

### Pergunta Foco (How Might We)
1. **HMW** ajudar a **Ana** a gerenciar a saúde de 3 gerações sem Burnout logístico?
2. **HMW** garantir que o **Seu José** valide seus remédios no App sem fricção de uso?
3. **HMW** manter o **Lucas** seguro na escola através de um "Dossiê de Alergias" compartilhado de forma segura pelo App?
4. **HMW** gerar o **Score de Letalidade** que o **Dr. Carlos** precisa para reduzir a sinistralidade?

---

## 💡 4. IDEATE (Ideação)

Agora que sabemos *exatamente* o que estamos resolvendo, vamos gerar soluções. Para este foco em "Controle da Farmacinha", vamos usar o método **Crazy 8’s** (adaptado aqui) e **Brainstorming de Analogias**.

### Desafio de Ideação:
Como o app pode "saber" o que tem na farmácia e quando vence sem que o usuário tenha que digitar tudo?

**Sugestões da Maya para começarmos:**
1. **Visão de Máquina:** Tirar foto do código de barras ou da caixa e a IA extrair a data de validade e a identificação.
2. **"Leitura Mágica" de Recibos (NFC-e):** Escanear o QR code da nota da farmácia para importar a sacola inteira e atrelá-la a um "Dependente" e a uma "Farmacinha" específica.
3. **Dossiê Express ("Consulta Mode"):** 1 botão para congelar a tela com o "Prontuário de Bolso" (patologias + medicamentos em uso + alergias) para entregar ao médico durante a consulta ou teleconsulta.
4. **Validador de Balcão:** Bipar um "similar"; o app cruza com estoques contínuos **e patologias registradas** do dependente (ex: paciente renal não pode tomar certos antiinflamatórios) e diz se dá choque.
5. **App Modo Simplificado:** Interface de altíssima acessibilidade no próprio App para o Idoso só escanear e validar, subindo o dado pro Hub Familiar.
6. **Multi-Farmacinha:** Organizar estoques por local físico ("Casa", "Fazenda", "Praia", "Casa da Mãe") sob um mesmo dependente.
7. **Histórico Clínico por Dependente:** Módulo onde o Líder registra patologias crônicas (ex: insuficiência renal, diabetes), alergias e medicamentos passados, alimentando o motor de alertas inteligentes.

### Ideia Selecionada para o MVP
**Scanner de QR Code / Código de Barras + Leitor de Notas Fiscais NFC-e**
*   **Por que:** O código de barras garante a precisão visual determinística. O QR Code da nota fiscal garante velocidade (onboarding de compras inteiras) e delimita temporalmente a data em que o remédio foi comprado.
*   **Restrição Crítica de Segurança:** O app **não pode errar**. A identificação automática deve ser seguida por uma confirmação visual clara e fácil do usuário para evitar riscos à saúde.

---

### Detalhamento do Protótipo (High-Resolution Flow - Hub Familiar)
1. **Homescreen Multi-Perfil + Multi-Farmacinha:** Abas superiores por Dependente ("Vovô José", "Dona Maria", "Lucas"). Dentro de cada aba, seletor de "Farmacinha" (Casa, Fazenda, Praia).
2. **Módulo "Histórico Clínico":** Tela por Dependente listando patologias (ex: Insuficiência Renal), alergias (ex: Amendoim - Lucas), e histórico de medicações.
3. **Dossiê / Consulta Mode:** Link ou visualização gerada pelo App pela Ana para a escola do Lucas ou médico do Seu José visualizarem alergias e "Em Uso".
4. **Validador no Balcão:** Botão "Validar Similar" que cruza dados da Anvisa com o histórico clínico de quem vai tomar (Seu José ou Lucas).
5. **Scanner Universal:** Guia visual para Caixa ou Nota Fiscal (NFC-e).
6. **Autonomia (Idoso no App):** Seu José recebe aviso push; abre o App no Modo Vovô, valida o remédio fisicamente e o OK sobe pro Hub.

### Plataforma Única
- **App Central (iOS e Android):** App nativo (ou multiplataforma). É a base universal para cadastro, consulta, recebimento de alertas e alteração de todos os dados de forma conveniente, organizada e segura. Garante experiência premium para o Líder de Família (scanner, NFC-e, notificações push) e acessibilidade extrema para o Idoso (Modo Vovô). A gestão do ecossistema familiar é feita 100% pelo aplicativo, gerando acessos externos apenas para compartilhamento emergencial seguro (Dossiê Express).

---

## 🧪 6. TEST (Teste)

Para validar se a **comparação visual** realmente resolve o problema de entendimento dos nomes complexos, planejamos o seguinte teste:

### Plano de Teste
- **Público:** 5 idosos (65+) e 3 cuidadores.
- **Tarefa:** Entregar 3 caixas de remédios diferentes e pedir para cadastrá-las no app.
- **O que observar:**
    - O usuário hesita ao ver a foto?
    - Ele consegue ler o nome do medicamento na tela?
    - Ele consegue identificar que a foto no app é a mesma da caixa física, mesmo se o lote ou a embalagem tiver pequenos detalhes diferentes?

---
