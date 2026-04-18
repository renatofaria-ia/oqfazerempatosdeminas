# UI System Design: Farmacinha Legal 🎨
**Data:** 05/03/2026
**Status:** Design Guidelines (Pre-Development)
**Designers:** Maya (Design Maestro) & Sophia (Storyteller)

> Este documento estabelece as bases visuais e de interação para garantir que o Hub de Saúde Familiar transmita **Confiança, Clareza e Modernidade**. O design deve ser "Premium Tech": sofisticado para o Dr. Carlos, funcional para a Ana e acessível para o Seu José.

---

## 1. Conceito Visual (The "Vibe")
O app adota a estética **"Clinical Glassmorphism"**.
- **Metáfora:** Uma clínica moderna com painéis de vidro fosco, iluminação suave e precisão digital. 
- **Atributos:** Transparência, profundidade (z-axis), cantos arredondados generosos e tipografia fluida.

---

## 2. Paleta de Cores (Premium & Semântica)

### Cores Base (Paleta HSL Curada)
| Nome | Amostra | Função | Reason |
| :--- | :--- | :--- | :--- |
| **Vital Blue** | `hsl(215, 80%, 40%)` | Cor Primária / CTAs | Transmite autoridade médica e tecnologia. |
| **Serenity Teal** | `hsl(175, 50%, 45%)` | Acentos / Sucesso | Cor secundária associada à saúde e calma. |
| **Tech Slate** | `hsl(220, 20%, 15%)` | Superfícies Escuras | Base para o Dark Mode e textos de alta ênfase. |
| **Pure Glass** | `hsl(0, 0%, 100%, 0.7)` | Cards / Backgrounds | Onde o efeito de desfoque (Blur) acontece. |

### Cores de Status (Segurança Primeiro)
| Status | Cor | Aplicação |
| :--- | :--- | :--- |
| **Alerta Letal** | `hsl(0, 85%, 55%)` | Contraindicações críticas (Validador de Balcão). |
| **Vencimento** | `hsl(35, 90%, 50%)` | Medicamentos próximos ao vencimento. |
| **Adesão OK** | `hsl(140, 60%, 45%)` | Confirmação de medicação tomada (Seu José). |

---

## 3. Tipografia (Legibilidade & Hierarquia)
Utilizaremos fontes do Google Fonts para garantir carregamento rápido e estética moderna.

- **Primary Heading:** `Outfit` (Geométrica, moderna, amigável).
- **Body & Interface:** `Inter` (Altíssima legibilidade em telas pequenas).

### Escala Tipográfica
- **Display (Títulos):** 32px / Bold / Outfit
- **H1 (Ana's Dashboard):** 24px / SemiBold / Outfit
- **Body Large (Para o Seu José):** 18px / Regular / Inter
- **Micro-Copy (Legendas):** 12px / Medium / Inter

---

## 4. Componentes Chave (Basics no shadcn/ui)

### Cards de Medicamento (The "Hub Card")
- **Visual:** Fundo semi-transparente (glass), borda sutil de 1px.
- **Interação:** Hover com escala suave (1.02x) e brilho interno.
- **Conteúdo:** Nome grande, Dosagem, Ícone de Status (vencimento) e foto da caixa.

### Botão de Ação Primária (Floating Action Button - FAB)
- **Visual:** Gradiente do Vital Blue ao Serenity Teal.
- **Função:** "Escanear Agora" (Ação central do app).

### Inputs de Busca
- Pesquisa por nome de remédio deve ter *auto-complete* inteligente e ícones claros da Anvisa.

---

## 5. Diretrizes para Acessibilidade (O "Fator Seu José")

### A "Regra dos 44px"
- Todo elemento clicável deve ter no mínimo **44x44px** de área de toque. 
- Sem exceções para botões de fechar (x) ou ícones de menu.

### Contraste Dinâmico
- O app deve suportar um modo de **"Alta Visibilidade"** que remove o Glassmorphism e utiliza fundos sólidos de alto contraste e fontes 20% maiores.

### Feedback Auditivo e Háptico
- **Sucesso:** Vibração curta e bip agudo (Remédio Validado).
- **Erro:** Duas vibrações longas e som grave de alerta (Contraindicado!).

---

## 6. Micro-interações (Framer Motion)

- **Transições de Página:** Slide-ups suaves para modais de scanner.
- **Feedback de Validação:** Quando a Ana bipa um remédio, o card deve "pular" suavemente para a estante digital com um efeito de partícula.
- **App Modo Vovô:** Ao entrar na tela simplificada, a câmera abre com uma animação de "foco de radar" para guiar o olhar do idoso direto no App.

---

## 7. Interfaces Específicas (The High-Impact Views)

### A. O Validador de Balcão
- **Estado Neutro:** Câmera ocupando 70% da tela, com um overlay de "Target" clínico.
- **Estado de Análise:** Animação de scanner laser percorrendo o código de barras.
- **Estado de Alerta:** Overlay vermelho pulsante com ícone de ⛔ gigante e texto: **"NÃO COMPRE: Risco para [Nome do Dependente]"**.

### B. Dossiê Express (Consulta Mode)
- **Layout:** "Modo Apresentação". Oculta toda a navegação.
- **Foco:** Exibe apenas 3 cards gigantes: **Medicamentos em Uso**, **Alergias Fatais**, **Patologias Crônicas**.

---

## 8. Glossário de Ícones (Lucide Icons)
- 💊 `Pill` (Medicamento)
- 🏠 `Home` (Farmacinha Casa)
- 🏖️ `Palmtree` (Farmacinha Praia)
- 👶 `Baby` (Perfil Lucas)
- 👴 `User` (Perfil Seu José)
- 🛡️ `ShieldCheck` (Validação de Segurança)

---
*Este sistema de design deve ser a bíblia visual para a implementação dos componentes shadcn/ui no Next.js.*
