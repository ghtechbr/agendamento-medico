# 🏥 Atendimento Online — Clínica Saúde

![Vue 3](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vuelodedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Pure%20Scoped-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> Aplicação web (SPA) moderna, de alta performance e totalmente responsiva para agendamento de consultas médicas presenciais e online.

---

## 🚀 Sobre o Projeto

O **Atendimento Online** é uma Single Page Application (SPA) desenvolvida para a **Clínica Saúde**. O projeto foi construído do zero focando em **módulos reativos, UX fluida, acessibilidade (a11y) e estilização sob medida com CSS3 puro** (sem dependência de frameworks visuais externos como Tailwind CSS ou Bootstrap).

A interface conta com micro-interações refinadas, visual estilo *Glassmorphism*, efeitos de iluminação via gradientes e animações de alta performance totalmente otimizadas.

---

## ✨ Destaques de Funcionalidades

- 🔍 **Busca Reativa em Tempo Real:** Filtro instantâneo por especialidade médica, sintomas ou nome do profissional.
- 🩺 **Painel Detalhado de Profissionais (Sheet/Modal):** Exibição de perfil completo, avaliações dinâmicas em estrelas, convênios aceitos, depoimentos e próximos horários disponíveis.
- 📊 **Métricas Animadas:** Contadores estatísticos incrementais ativados dinamicamente via `IntersectionObserver` ao vislumbrar a seção na tela.
- 💬 **Agendamento via WhatsApp:** Conexão direta com a API do WhatsApp(Na versão atual a mensagem é encaminhada para um número de contato).
- ❓ **FAQ Interativo:** Accordion nativo fluido e acessível para dúvidas frequentes.
---

## 🛠️ Arquitetura e Tecnologias

- **Core Framework:** [Vue 3](https://vuejs.org/) (`Composition API` com `<script setup>`)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilização:** **Vanilla CSS3**
  - *Scoped Styles* para encapsulamento de componentes
  - *CSS Custom Properties (Variáveis CSS)* para fácil gestão do Design System
  - *Flexbox* & *CSS Grid Layout* responsivos
  - *Glassmorphism* e animações avançadas via `@keyframes`
- **APIs Nativas do Navegador:** `IntersectionObserver`, `requestAnimationFrame` e `matchMedia`.

---

## 💻 Como Executar o Projeto Localmente

```bash
# 1. Clone o repositório
git clone [https://github.com/ghtechbr/atendimento-online.git](https://github.com/ghtechbr/atendimento-online.git)

# 2. Acesse a pasta do projeto
cd "Atendimento Online"

# 3. Instale as dependências
npm install

# 4. Inicie o ambiente de desenvolvimento
npm run dev