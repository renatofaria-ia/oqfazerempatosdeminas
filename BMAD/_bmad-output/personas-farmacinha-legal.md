# Personas: Farmacinha Legal 👥
**Data:** 05/03/2026
**Metodologia:** Design Thinking (Empathize Aprofundado) + Brainstorming de Cenários
**Facilitadora:** Maya 🎨 (Design Thinking Maestro)

> Este documento define as personas de referência para toda a engenharia de produto, UX/UI e comunicação de marketing do Farmacinha Legal. Cada persona é um arquétipo baseado nas dores reais identificadas nas fases anteriores do projeto.

---

## 👩 Persona 1: Ana — A Líder de Família (Primária B2C)

### Perfil Demográfico
| Campo | Valor |
| :--- | :--- |
| **Nome** | Ana Cristina Souza |
| **Idade** | 42 anos |
| **Estado Civil** | Casada, 1 filho de 8 anos (Lucas) |
| **Localização** | Curitiba, PR — bairro residencial de classe média |
| **Escolaridade** | Superior completo (Administração) |
| **Profissão** | Analista financeira em empresa de médio porte |
| **Renda Familiar** | ~R$ 12.000/mês |
| **Plano de Saúde** | Unimed (titular, extensão para pais e filho) |
| **Dispositivo** | iPhone 13 (pessoal) + notebook do trabalho |
| **Proficiência Tecnológica** | Alta. Usa apps de banco, e-commerce e agenda digital no dia a dia. |

### Citação que Define
> *"Eu sou a secretária de saúde da família inteira. Minha mãe liga pra mim quando não entende a receita, meu pai esconde que não toma o remédio e meu filho tem alergia a tudo. Vivo com medo de errar."*

### Goals (O que ela quer)
1. Ter a lista atualizada e confiável de **tudo** que cada pessoa da família toma — em um só lugar.
2. Chegar na consulta médica da mãe e mostrar ao doutor, em 5 segundos, o histórico completo.
3. Não ser pega de surpresa no balcão da farmácia quando oferecem um genérico que ela não sabe se pode dar.
4. Gerenciar os remédios que ficam na casa dela, na casa dos pais e na casa de praia — sem confundir estoques.

### Frustrations (O que a impede)
1. **Memória frágil:** Ela não lembra se o pai é alérgico a dipirona ou se era a algum outro.
2. **Informação fragmentada:** Receitas em fotos borradas no WhatsApp, notas fiscais crumpled na bolsa, tudo espalhado.
3. **Pressão de decisão no balcão:** O farmacêutico empurra um similar e ela não tem como validar.
4. **Falta de controle remoto:** Os pais moram em outra cidade. Ela não sabe se o remédio do pai já acabou ou venceu.

### Cenário "Um Dia na Vida"
**7h:** Ana acorda e, enquanto arruma o Lucas para a escola, lembra que precisa refazer a receita do Enalapril do pai. Procura no WhatsApp por "receita do pai" — encontra 4 fotos antigas, nenhuma legível.
**10h:** Recebe ligação da mãe: "Ana, aquele remédio redondinho acabou, como era o nome mesmo?". Ana não lembra.
**12h30:** Na pausa do almoço, vai à farmácia comprar o Enalapril do pai e o antialérgico do Lucas. No balcão, o atendente diz: "Não temos o de referência, tem o genérico Y". Ana hesita — *"Será que pode? Meu pai toma um remédio pro rim também..."*. Compra por desespero, sem certeza.
**20h:** Ligação com a mãe pelo vídeo. Tenta explicar como tomar o genérico novo. A mãe não entende a bula.

### Jornada no App (Como o Farmacinha Legal resolve)
1. **Onboarding:** Ana baixa o app (App Store), cria a conta e cadastra 3 dependentes: "Meu Estoque", "Pai - Seu José", "Mãe - Dona Maria", "Lucas".
2. **Scan da sacola:** Na farmácia, bipa a NFC-e → os remédios vão automaticamente para a "Farmacinha Casa dos Pais" do Seu José.
3. **Validador de Balcão:** Bipa o genérico Y → app diz: *"⚠️ Atenção: Seu José tem Insuficiência Renal Crônica cadastrada. Este anti-inflamatório é contraindicado. Consulte o médico."*
4. **Consulta Mode:** Na consulta do pai, aperta 1 botão → tela de alto contraste com "Em uso", "Patologias", "Alergias" aparece na tela do celular (ou projeta/compartilha direto do App para o monitor do consultório).
5. **Monitoramento remoto:** Recebe notificação: *"✅ Seu José validou o Enalapril às 8h via WhatsApp."*

---

## 👴 Persona 2: Seu José — O Idoso Independente (Secundária B2C)

### Perfil Demográfico
| Campo | Valor |
| :--- | :--- |
| **Nome** | José Carlos Souza |
| **Idade** | 72 anos |
| **Estado Civil** | Casado com Dona Maria (70 anos) |
| **Localização** | Londrina, PR — casa própria, bairro tranquilo |
| **Escolaridade** | Ensino médio completo |
| **Profissão** | Aposentado (ex-bancário) |
| **Renda** | ~R$ 4.500/mês (aposentadoria + FGTS) |
| **Plano de Saúde** | Unimed (como dependente da filha Ana) |
| **Dispositivo** | Samsung Galaxy A14 (tela grande, câmera básica) |
| **Proficiência Tecnológica** | Baixa. Usa apenas WhatsApp (com dificuldade para links e downloads). |

### Citação que Define
> *"Eu sei me cuidar. Já tomo remédio há 20 anos. O problema é que agora são muitos e as letras ficaram pequenas."*

### Patologias Conhecidas
- Hipertensão arterial (crônica, 15 anos)
- Insuficiência Renal Crônica (estágio 2)
- Artrose no joelho direito
- Alergia a dipirona (leve — provoca urticária)

### Goals
1. Tomar o remédio certo, na hora certa, sem depender de ninguém.
2. Não ir parar no hospital por causa de uma caixa vencida ou errada.
3. Manter sua dignidade e independência ("Eu não sou incapaz").

### Frustrations
1. **Letras minúsculas:** Não consegue ler a validade impressa em relevo nas caixas.
2. **Caixas parecidas:** Tem 6 caixas na gaveta, duas são brancas com letras azuis. Confunde.
3. **Tecnofobia:** Baixar app da loja de aplicativos é "coisa de outro planeta".
4. **Orgulho:** Fica com vergonha de admitir que errou a dose ou esqueceu de tomar.

### Cenário "Um Dia na Vida"
**6h30:** Seu José acorda, vai até a gaveta da cozinha (a "farmacinha") e pega 3 cartelas soltas. Não sabe mais de qual caixa são. Toma "os de sempre" na confiança.
**9h:** Sente uma dor no joelho. Lembra que tem um anti-inflamatório em algum lugar. Encontra uma caixa meio amassada. Não consegue ler a validade. Toma por conta.
**14h:** Dona Maria liga para a Ana: "Seu pai tomou um remédio que eu acho que tava vencido."
**17h:** Ana liga desesperada. Seu José minimiza: "Tá tudo bem, eu sei o que faço."

### Jornada no App (Como o Farmacinha Legal resolve)
1. **App Simplificado:** Ana instala o App para o pai e ativa o "Modo Vovô" de alta acessibilidade. Seu José toca no ícone de câmera gigante no próprio App.
2. **Validação diária:** Ele aponta a câmera pra cartela → foto da caixa oficial aparece grande na tela. A voz da neta (gravada pela Ana) diz: *"Vovô, esse é o Losartana. Tá certinho e não tá vencido! Te amo."*
3. **Alerta automático:** Se ele tentar validar o anti-inflamatório contraindicado, a tela fica VERMELHA e diz em voz alta: *"⛔ Atenção, Seu José! Esse remédio não é seguro para o senhor. Fale com a Ana."*
4. **Feedback silencioso:** O OK dele sobe direto pro app da Ana, que recebe um ✅ no trabalho.

---

## 👦 Persona 3: Lucas — O Filho Menor de Idade (Terciária B2C)

### Perfil Demográfico
| Campo | Valor |
| :--- | :--- |
| **Nome** | Lucas Henrique Souza |
| **Idade** | 8 anos |
| **Escolaridade** | 3º ano do ensino fundamental |
| **Localização** | Mora com Ana e o pai em Curitiba, PR |
| **Condições de Saúde** | Rinite alérgica crônica + Alergia alimentar (amendoim) |
| **Plano de Saúde** | Unimed (extensão da mãe Ana) |
| **Dispositivo Próprio** | Nenhum. Interage via dispositivo da mãe ou da escola. |
| **Proficiência Tecnológica** | N/A — não é usuário direto do app. |

### Citação que Define (pela voz da Ana)
> *"O Lucas tem alergia a tudo. Na escola, eu preciso mandar uma lista de remédios que ele pode e não pode tomar. Se um dia ele ficar doente longe de mim, quero que qualquer pessoa consiga abrir o prontuário dele no celular."*

### Patologias / Condições
- Rinite alérgica crônica (usa Budesonida nasal diariamente)
- Alergia a amendoim (Classe 4 — anafilaxia potencial)
- Contraindicação: Corticoides orais sem prescrição médica prévia

### Goals (Via Ana, a gestora)
1. Manter o histórico do Lucas acessível para a escola, babá ou pronto-socorro.
2. Garantir que ninguém dê um remédio proibido por descuido (automedicação por terceiros).
3. Controlar o uso contínuo da Budesonida (acabou? precisa repor? qual farmacinha tem?).

### Frustrations (Via Ana)
1. **Risco em ambientes fora de casa:** Quando Lucas vai dormir na avó, Ana precisa ligar e explicar tudo verbalmente.
2. **Escola sem informação:** A ficha médica escolar é genérica e nunca é atualizada.
3. **Automedicação de terceiros:** Avós e vizinhos que oferecem "remedinho caseiro" sem saber das alergias.

### Cenário "Um Dia na Vida"
**7h30:** Ana prepara o spray nasal do Lucas. Terminou. Ela precisa saber se tem refil na farmacinha da casa ou se precisa comprar.
**13h:** A escola liga: "Lucas está com febre de 38.2°C. Podemos dar Paracetamol?". Ana consulta o app no celular e confirma: *"Pode sim. Dose: 10ml (200mg). Está no prontuário."*
**Sábado:** Lucas vai pra casa da avó (Dona Maria) em Londrina. Ana compartilha o link do *Dossiê Express* do Lucas via WhatsApp para Dona Maria: uma tela simples com "PODE tomar" (lista verde) e "NÃO PODE tomar" (lista vermelha com fundo piscando).

### Jornada no App (Como o Farmacinha Legal resolve)
1. **Sub-perfil "Lucas":** Ana cadastra o Lucas como dependente, com suas alergias e patologias.
2. **Farmacinha por local:** A Budesonida está na "Farmacinha Casa Curitiba". Ana verifica se tem refil na "Farmacinha Casa dos Avós".
3. **Compartilhamento de emergência:** Ana gera o *Dossiê Express* do Lucas e compartilha o acesso seguro criado pelo próprio App para a escola e para Dona Maria.
4. **Alerta de contraindicação:** Se alguém tentar cadastrar um corticoide oral no estoque do Lucas, o app bloqueia: *"⚠️ Contraindicação cadastrada. Necessita prescrição médica."*

---

## 🏢 Persona 4: Dr. Carlos — O Diretor de Inovação (Primária B2B)

### Perfil Demográfico
| Campo | Valor |
| :--- | :--- |
| **Nome** | Carlos Eduardo Martins |
| **Idade** | 48 anos |
| **Escolaridade** | MBA em Gestão de Saúde (FGV) + Medicina (CRM ativo, não exerce) |
| **Profissão** | Diretor de Inovação e Sinistralidade — Operadora Saúde Premium (médio porte, 800k vidas) |
| **Localização** | São Paulo, SP |
| **Renda** | ~R$ 45.000/mês |
| **Meta Anual Pessoal** | Reduzir a sinistralidade da carteira de idosos em pelo menos 3% year-over-year |
| **Dispositivo** | MacBook Pro (trabalho) + iPhone 15 Pro |
| **Proficiência Tecnológica** | Muito alta. Avalia dashboards, APIs e plataformas de dados diariamente. |

### Citação que Define
> *"Eu gasto R$ 180 milhões por ano com internações que poderiam ter sido evitadas. Metade são idosos que confundiram remédios em casa. Se alguém me der visibilidade sobre o que acontece DENTRO da casa do beneficiário, eu pago com prazer."*

### Goals
1. **Reduzir sinistralidade:** Identificar e prevenir eventos adversos medicamentosos ANTES que virem uma estada na UTI.
2. **Dados que comprovem ROI:** Precisar provar para o board que cada real investido em prevenção digital economiza R$ 5 em tratamento hospitalar.
3. **Inteligência competitiva:** Saber quais medicamentos os beneficiários realmente usam (vs. o que foi prescrito) para negociar melhor com laboratórios.
4. **Inovação visível:** Entregar ao departamento de marketing uma história de "cuidado preventivo" que diferencie a operadora no mercado.

### Frustrations
1. **Ponto Cego Doméstico:** Ele sabe o que o médico receitou (dados do sistema), mas NÃO sabe se o paciente comprou, se trocou por genérico, se o remédio venceu ou se o idoso mistura com automedicação.
2. **Dados de farmácia são parciais:** PBMs (Pharmacy Benefit Managers) mostram compra, mas não estoque nem adesão real ao tratamento.
3. **Custo de sinistro imprevisível:** "Idosos são a parcela mais cara e mais imprevisível da carteira."
4. **Regulação e LGPD:** Qualquer parceiro de dados precisa estar em compliance absoluto.

### Cenário "Um Dia na Vida"
**8h:** Reunião com o CFO. "Carlos, a sinistralidade subiu 2.1% no tri. São R$ 3.7M a mais. O que você vai fazer?"
**10h:** Apresentação de um fornecedor de telemedicina. Carlos pensa: *"Telemedicina trata DEPOIS. Eu preciso de algo que PREVINE."*
**14h:** Almoço com um head de laboratório: "Quantos pacientes seus realmente aderem ao tratamento de hipertensão?". Carlos: "Honestamente? Eu não faço a menor ideia."
**16h:** Recebe um pitch da equipe da Farmacinha Legal. Vê o **Score de Letalidade Doméstica** pela primeira vez: um dashboard mostrando que 12% dos idosos da carteira têm combinações perigosas na gaveta de casa. Carlos: *"Isso é ouro. Me diz o preço."*

### Jornada no Farmacinha Legal (B2B)
1. **Dashboard Agregado:** Acessa via Web portal corporativo os dados anonimizados da base. Vê mapa de calor de risco medicamentoso por região.
2. **Score de Letalidade:** Filtra por "Beneficiários 65+ com interação perigosa na gaveta". O sistema alerta: *"423 beneficiários com anti-inflamatório contraindicado + doença renal cadastrada."*
3. **Relatório de ROI:** Sistema calcula: *"Se 20% desses 423 fossem internados, custo estimado = R$ 2.1M. Prevenção ativa via app = R$ 180k/ano."*
4. **Integração de Campanha:** Dispara notificação segmentada para os 423 beneficiários via app da ana: *"Atenção: valide seus remédios esta semana. Sua operadora cuida de você."*

---

## 📊 Matriz de Relacionamento entre Personas

```
                    ┌──────────────────┐
                    │   Dr. Carlos     │
                    │   (B2B Comprador)│
                    └────────┬─────────┘
                             │ Compra dados e
                             │ Score de Letalidade
                             ▼
              ┌──────────────────────────────┐
              │      FARMACINHA LEGAL         │
              │    (Hub de Saúde Familiar)    │
              └──────────────┬───────────────┘
                             │
              ┌──────────────┼───────────────┐
              │              │               │
              ▼              ▼               ▼
    ┌─────────────┐ ┌──────────────┐ ┌────────────┐
    │    Ana       │ │  Seu José    │ │   Lucas    │
    │   (Líder)    │ │  (Idoso)     │ │   (Filho)  │
    │  App Base    │ │  Modo Vovô   │ │  Via Ana   │
    │   Unificado  │ │  (App)       │ │  Sub-perfil│
    └──────┬──────┘ └──────────────┘ └────────────┘
           │
           │ Gerencia perfis de:
           ├── Seu José (pai)
           ├── Dona Maria (mãe)
           ├── Lucas (filho)
           └── Ela mesma
```

---

## 🏠 Mapa de Farmacinhas por Persona

| Farmacinha | Dono(s) | Responsável | Remédios Típicos |
| :--- | :--- | :--- | :--- |
| **Casa Curitiba** | Ana + Lucas | Ana | Antialérgicos, Budesonida, vitaminas, analgésicos |
| **Casa Londrina** | Seu José + Dona Maria | Ana (remoto) | Enalapril, Losartana, Metformina, analgésicos |
| **Casa de Praia (Guaratuba)** | Todos | Ana | Kit emergência: Buscopan, Dorflex, protetor solar medicinal |
| **Fazenda (interior PR)** | Seu José | Ana + Seu José | Remédios de uso contínuo duplicados (backup) |

---

## 🎯 Resumo de Plataforma por Persona

| Persona | Plataforma Principal | Plataforma Secundária | Tipo de Interação |
| :--- | :--- | :--- | :--- |
| **Ana (Líder)** | Mobile App (iOS/Android) | Nenhuma | Scanner, NFC-e, gestão, Consulta Mode |
| **Seu José (Idoso)** | Modo Vovô (App Principal) | Nenhuma | Validação diária com UI acessível |
| **Lucas (Filho)** | N/A (não interage) | Link de Acesso do App | Dossiê Express para escola/avó |
| **Dr. Carlos (B2B)** | Web (Dashboard corporativo) | Nenhuma | Analytics, Score de Letalidade, ROI |

---
*Documento gerado via metodologia BMAD — Design Thinking (Empathize Aprofundado) + Brainstorming de Cenários.*
