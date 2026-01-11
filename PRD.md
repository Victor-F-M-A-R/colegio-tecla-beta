# PRD - Landing Page "Ensino" (Beta)

## 1. Objetivo

Criar uma página de alta conversão e estética premium para apresentar os ciclos de ensino do Colégio Tecla. A página deve passar a sensação de modernidade, organização e acolhimento.

## 2. Estrutura da Página

### A. Hero Section (Curto e Direto)

- **Altura:** ~80vh (não precisa ser full screen, deixar o próximo conteúdo visível instiga o scroll).
- **Conteúdo:**
  - Título: "Ensino que acompanha cada fase"
  - Subtítulo: "Da Educação Infantil ao Ensino Médio, com rotina, acolhimento e desenvolvimento."
  - CTA Primário: "Agendar visita" (Destacado)
  - CTA Secundário: "Ver segmentos" (Scroll para a próxima seção).

### B. Seção Horizontal Interativa (Core Feature)

- **Layout:** Container horizontal com "scroll snap".
- **Comportamento Desktop:**
  - O scroll do mouse (wheel) deve mover o conteúdo horizontalmente enquanto o cursor estiver sobre a seção.
  - Ao chegar no fim do conteúdo horizontal, o scroll vertical da página deve continuar naturalmente.
- **Barra de Progresso:**
  - Uma linha fina na parte superior ou inferior dos cards.
  - Fill amarelo que preenche conforme o scroll avança.
  - Dots/Bolinhas marcando o início de cada card.
- **Conteúdo dos Cards (4 Slides):**
  1. **Educação Infantil:** Foco em acolhimento, lúdico e base.
  2. **Anos Iniciais (1º-5º):** Foco em alfabetização e autonomia.
  3. **Anos Finais (6º-9º):** Foco em projetos e tecnologia.
  4. **Ensino Médio:** Foco em pensamento crítico e futuro.
     _Nota: Textos detalhados estão no arquivo `content.json` (será criado a seguir)._

### C. Rodapé / CTA Final

- **Chamada:** "Pronto para conhecer o Tecla?"
- **Botões:** "Matricule-se" (Destaque) e "WhatsApp" (Outline/Ghost).
- **Footer:** Simples, apenas copyright e links essenciais.

## 3. Especificações Técnicas

- **Scroll Snap:** `scroll-snap-type: x mandatory` no container pai; `scroll-snap-align: start` nos filhos.
- **Tamanho dos Cards:**
  - Desktop: `min-width: 80vw` (para mostrar um pedaço do próximo e incentivar o scroll).
  - Mobile: `min-width: 92vw`.
- **Micro-interações:**
  - Hover no card: Leve escala (`scale-[1.02]`).
  - Mascote: Efeito suave de flutuar ou parallax leve.

## 4. Conteúdo (Copywriting)

Utilizar EXATAMENTE os textos fornecidos para cada ciclo (Infantil, Iniciais, Finais, Médio) focando em: Título, Subtítulo, Texto Descritivo e Bullet Points.
