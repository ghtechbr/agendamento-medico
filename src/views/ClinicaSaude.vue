<template>
  <div class="page">
    <!-- ============ NAVBAR ============ -->
    <header class="nav" :class="{ scrolled }">
      <div class="nav-in">
        <a class="brand" href="#topo" aria-label="Clínica Saúde">
          <svg class="logo" viewBox="0 0 48 48" aria-hidden="true">
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#2EE6C5" />
                <stop offset="1" stop-color="#0B6E7A" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="url(#lg)" />
            <path d="M24 11v26M11 24h26" stroke="#fff" stroke-width="5" stroke-linecap="round" />
            <path d="M8 36c8-2 12-8 16-8s8 6 16 8" stroke="#FFD27A" stroke-width="2.5" fill="none"
              stroke-linecap="round" />
          </svg>
          <div>
            <strong class="brand-name">{{ clinica.nome }}</strong>
            <span class="brand-addr">{{ clinica.endereco }}</span>
          </div>
        </a>
        <a class="btn-wpp" :href="wpp()" target="_blank"
          rel="noopener">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path fill="currentColor"
              d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.3c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" />
          </svg>
          <span>Agendar consulta</span>
        </a>
      </div>
    </header>

    <main id="topo">
      <!-- ============ HERO + BUSCA ============ -->
      <section class="hero">
        <div class="blob b1"></div>
        <div class="blob b2"></div>

        <div class="hero-in">
          <div class="hero-copy">
            <p class="pill"><i class="dot"></i> Atendimento presencial e online</p>
            <h1>
              <span class="ln l1">Cuidar de você</span>
              <span class="ln l2">começa com uma</span>
              <span class="ln l3">consulta fácil.</span>
            </h1>
            <p class="lead">Escolha a especialidade, veja os médicos disponíveis e agende pelo WhatsApp em poucos
              toques.</p>

            <label class="search" for="busca">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
                  d="m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
              </svg>
              <input id="busca" v-model.trim="busca" type="search"
                placeholder="Busque por especialidade, sintoma ou nome do médico" autocomplete="off" />
              <button v-if="busca" class="clear" @click="busca = ''" aria-label="Limpar busca">×</button>
            </label>
          </div>

          <!-- composição visual -->
          <div class="hero-art" aria-hidden="true">
            <div class="art-main">
              <img v-if="clinica.heroImg" :src="clinica.heroImg" alt="" />
              <svg v-else viewBox="0 0 400 420" class="art-svg">
                <defs>
                  <linearGradient id="ag" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#14B8A6" />
                    <stop offset="1" stop-color="#0A3D4A" />
                  </linearGradient>
                </defs>
                <rect width="400" height="420" rx="36" fill="url(#ag)" />
                <circle cx="300" cy="110" r="90" fill="#fff" opacity=".08" />
                <circle cx="90" cy="340" r="120" fill="#fff" opacity=".06" />
                <circle cx="200" cy="150" r="46" fill="#E8FFF9" />
                <path d="M110 330c0-52 40-84 90-84s90 32 90 84v30H110Z" fill="#E8FFF9" />
                <path d="M200 262v54M173 289h54" stroke="#0B6E7A" stroke-width="12" stroke-linecap="round" />
                <path class="ecg" d="M20 214h90l22-44 34 96 28-68 18 16h188" fill="none" stroke="#FFD27A"
                  stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div class="float f1"><span class="ico">📅</span>
              <div><b>Hoje, 15:30</b><small>Horário livre</small></div>
            </div>
            <div class="float f2"><span class="ico">⭐</span>
              <div><b>4,9 de 5</b><small>12 mil avaliações</small></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ ESPECIALIDADES ============ -->
      <section class="wrap" id="especialidades">
        <div class="sec-head">
          <h2>{{ busca ? 'Resultados da busca' : 'Escolha uma especialidade' }}</h2>
          <p v-if="!busca">Toque em uma área para ver quem atende e os próximos horários.</p>
          <p v-else>{{ filtradas.length }} {{ filtradas.length === 1 ? 'especialidade encontrada' : 'especialidades encontradas' }}.</p>
        </div>

        <TransitionGroup name="grid" tag="div" class="spec-grid">
          <button v-for="e in filtradas" :key="e.id" class="spec" :style="{ '--c': e.cor, '--c2': e.cor2 }"
            @click="abrir(e)">
            <span class="spec-ico">{{ e.icone }}</span>
            <strong>{{ e.nome }}</strong>
            <small>{{ e.desc }}</small>
            <em>{{ medicosDe(e.id).length }} {{ medicosDe(e.id).length === 1 ? 'médico' : 'médicos' }}</em>
          </button>
        </TransitionGroup>

        <div v-if="!filtradas.length" class="empty">
          <p>Nenhuma especialidade encontrada para “{{ busca }}”.</p>
          <button class="btn-ghost" @click="busca = ''">Ver todas as especialidades</button>
        </div>
      </section>

      <!-- ============ NÚMEROS ============ -->
      <section v-if="!busca" ref="statsEl" class="stats">
        <div class="stats-in">
          <div v-for="s in stats" :key="s.rotulo" class="stat">
            <span class="stat-ico">{{ s.icone }}</span>
            <b>{{ fmt(s.atual) }}{{ s.sufixo }}</b>
            <small>{{ s.rotulo }}</small>
          </div>
        </div>
      </section>

      <!-- ============ FAQ ============ -->
      <section class="wrap faq" id="faq">
        <div class="sec-head">
          <h2>Perguntas frequentes</h2>
          <p>Não encontrou o que procurava? Chame a gente no WhatsApp.</p>
        </div>
        <div class="faq-list">
          <div v-for="(f, i) in faqs" :key="i" class="faq-item" :class="{ open: faqAberta === i }">
            <button :aria-expanded="faqAberta === i" @click="faqAberta = faqAberta === i ? null : i">
              <span>{{ f.p }}</span><i class="chev"></i>
            </button>
            <div class="faq-body">
              <div>
                <p>{{ f.r }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- ============ FOOTER ============ -->
    <footer class="footer">
      <div class="footer-in">
        <div class="f-brand">
          <svg class="logo" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="#2EE6C5" />
            <path d="M24 11v26M11 24h26" stroke="#0A3D4A" stroke-width="5" stroke-linecap="round" />
          </svg>
          <div>
            <strong>{{ clinica.nome }}</strong>
            <span>{{ clinica.endereco }}</span>
          </div>
        </div>

        <div class="f-dev">
          <h4>Gustavo Henrique</h4>
          <p>{{ dev.nome }}</p>
          <p>{{ dev.cargo }}</p>
          <p>
            <a :href="dev.github" target="_blank" rel="noopener">GitHub</a> ·
            <a :href="dev.linkedin" target="_blank" rel="noopener">LinkedIn</a> ·
            <a :href="'mailto:' + dev.email">{{ dev.email }}</a>
          </p>
        </div>
      </div>
      <p class="aviso">
        ⚠️ Este site é apenas um projeto de portfólio. Todos os dados, médicos, avaliações, números, endereços e
        telefones,  são fictícios e não representam uma clínica real.
      </p>
    </footer>

    <!-- ============ TELA DE MÉDICOS ============ -->
    <Transition name="sheet">
      <div v-if="espAtiva" class="sheet" role="dialog" aria-modal="true" :aria-label="'Médicos de ' + espAtiva.nome">
        <div class="sheet-top" :style="{ '--c': espAtiva.cor, '--c2': espAtiva.cor2 }">
          <button class="back" @click="fechar"><span>←</span> Voltar</button>
          <div class="sheet-title">
            <span class="spec-ico big">{{ espAtiva.icone }}</span>
            <div>
              <h2>{{ espAtiva.nome }}</h2>
              <p>{{ medicosAtivos.length }} {{ medicosAtivos.length === 1 ? 'médico disponível' : 'médicos disponíveis'
                }} · {{ espAtiva.desc }}</p>
            </div>
          </div>
        </div>

        <div class="sheet-body">
          <article v-for="(m, i) in medicosAtivos" :key="m.id" class="doc"
            :style="{ '--i': i, '--c': espAtiva.cor, '--c2': espAtiva.cor2 }">
            <div class="doc-photo">
              <img v-if="m.foto" :src="m.foto" :alt="'Foto de ' + m.nome" />
              <span v-else class="initials">{{ iniciais(m.nome) }}</span>
              <span class="online" :class="{ off: !m.online }">{{ m.online ? 'Presencial e online' : 'Presencial'
                }}</span>
            </div>

            <div class="doc-info">
              <h3>{{ m.nome }}</h3>
              <p class="doc-sub">{{ m.titulo }} · {{ m.crm }}</p>

              <div class="rating">
                <span class="stars" :style="{ '--p': (m.nota / 5) * 100 + '%' }" aria-hidden="true">★★★★★</span>
                <b>{{ m.nota.toFixed(1).replace('.', ',') }}</b>
                <small>({{ m.avaliacoes }} avaliações)</small>
              </div>

              <p class="doc-about">{{ m.sobre }}</p>

              <div class="tags">
                <span v-for="a in m.areas" :key="a" class="tag">{{ a }}</span>
              </div>

              <ul class="facts">
                <li><b>{{ m.anos }} anos</b> de experiência</li>
                <li><b>Idiomas:</b> {{ m.idiomas }}</li>
                <li><b>Convênios:</b> {{ m.convenios }}</li>
              </ul>

              <blockquote>“{{ m.depoimento }}”</blockquote>
            </div>

            <div class="doc-cta">
              <small>Próximo horário</small>
              <strong>{{ m.proximo }}</strong>
              <a class="btn-wpp full"
                :href="wpp()"
                target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="currentColor"
                    d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.3c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" />
                </svg>
                Agendar consulta
              </a>
            </div>
          </article>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

/* ===================== CONFIGURAÇÃO ===================== */
const clinica = {
  nome: 'Clínica Saúde',
  endereco: 'Av. Paulista, 1234 — Centro, São Paulo/SP',
  whatsapp: '5519982602082',
  heroImg: ''
}

const dev = {
  nome: 'GHTech BR',
  cargo: 'Engenharia Web & Front-End + Data & Business Intelligence',
  github: 'https://github.com/ghtechbr/agendamento-medico',
  linkedin: 'https://linkedin.com/in/gustavo-henriqueaa',
  email: 'contato@ghtechbr.com.br'
}

const especialidades = [
  { id: 'cardio', nome: 'Cardiologia', icone: '🫀', desc: 'Coração e pressão arterial', tags: 'coração pressão arritmia colesterol infarto', cor: '#F43F5E', cor2: '#FB923C' },
  { id: 'derma', nome: 'Dermatologia', icone: '🧴', desc: 'Pele, cabelo e unhas', tags: 'pele acne mancha alergia queda de cabelo', cor: '#F59E0B', cor2: '#FACC15' },
  { id: 'pedia', nome: 'Pediatria', icone: '🧸', desc: 'Saúde de bebês a adolescentes', tags: 'criança bebê vacina febre crescimento', cor: '#0EA5E9', cor2: '#38BDF8' },
  { id: 'orto', nome: 'Ortopedia', icone: '🦴', desc: 'Ossos, músculos e articulações', tags: 'joelho coluna dor lesão fratura esporte', cor: '#6366F1', cor2: '#8B5CF6' },
  { id: 'gineco', nome: 'Ginecologia', icone: '🌸', desc: 'Saúde da mulher', tags: 'gravidez pré-natal preventivo menopausa', cor: '#EC4899', cor2: '#F472B6' },
  { id: 'neuro', nome: 'Neurologia', icone: '🧠', desc: 'Cérebro e sistema nervoso', tags: 'enxaqueca dor de cabeça tontura memória sono', cor: '#8B5CF6', cor2: '#A78BFA' },
  { id: 'oftalmo', nome: 'Oftalmologia', icone: '👁️', desc: 'Saúde dos olhos', tags: 'visão óculos miopia catarata vista', cor: '#10B981', cor2: '#34D399' },
  { id: 'psico', nome: 'Psiquiatria', icone: '🌿', desc: 'Saúde mental e bem-estar', tags: 'ansiedade depressão estresse terapia insônia', cor: '#14B8A6', cor2: '#2DD4BF' }
]

const medicos = [
  { id: 1, esp: 'cardio', nome: 'Dra. Helena Duarte', titulo: 'Cardiologista', crm: 'CRM 000001/SP', foto: '', nota: 4.9, avaliacoes: 412, anos: 18, idiomas: 'Português, Inglês', convenios: 'Principais convênios e particular', online: true, proximo: 'Hoje · 15:30', areas: ['Hipertensão', 'Check-up cardiológico', 'Arritmias'], sobre: 'Foco em prevenção e acompanhamento de pacientes com pressão alta e histórico familiar de doenças do coração.', depoimento: 'Explicou tudo com calma e me senti seguro.' },
  { id: 2, esp: 'cardio', nome: 'Dr. Rafael Menezes', titulo: 'Cardiologista do esporte', crm: 'CRM 000002/SP', foto: '', nota: 4.8, avaliacoes: 267, anos: 12, idiomas: 'Português, Espanhol', convenios: 'Particular e convênios selecionados', online: false, proximo: 'Amanhã · 09:00', areas: ['Cardiologia esportiva', 'Teste ergométrico', 'Colesterol'], sobre: 'Atende atletas amadores e profissionais, com liberação para atividade física e planos de treino seguros.', depoimento: 'Me liberou para voltar a correr com segurança.' },
  { id: 3, esp: 'derma', nome: 'Dra. Camila Torres', titulo: 'Dermatologista', crm: 'CRM 000003/SP', foto: '', nota: 4.9, avaliacoes: 530, anos: 10, idiomas: 'Português, Inglês', convenios: 'Principais convênios e particular', online: true, proximo: 'Hoje · 17:00', areas: ['Acne', 'Manchas', 'Rosácea', 'Mapeamento de pintas'], sobre: 'Trata acne adulta, manchas e envelhecimento da pele com planos simples de seguir no dia a dia.', depoimento: 'Minha pele melhorou em dois meses.' },
  { id: 4, esp: 'derma', nome: 'Dr. Bruno Albuquerque', titulo: 'Dermatologista clínico', crm: 'CRM 000004/SP', foto: '', nota: 4.7, avaliacoes: 198, anos: 15, idiomas: 'Português', convenios: 'Convênios selecionados', online: true, proximo: 'Qua · 10:20', areas: ['Queda de cabelo', 'Alergias de pele', 'Câncer de pele'], sobre: 'Especialista em saúde capilar e diagnóstico precoce de lesões suspeitas na pele.', depoimento: 'Atendimento rápido e muito atencioso.' },
  { id: 5, esp: 'pedia', nome: 'Dra. Marina Souza', titulo: 'Pediatra', crm: 'CRM 000005/SP', foto: '', nota: 5.0, avaliacoes: 644, anos: 14, idiomas: 'Português, Inglês', convenios: 'Principais convênios e particular', online: true, proximo: 'Hoje · 14:00', areas: ['Recém-nascidos', 'Vacinação', 'Alimentação infantil'], sobre: 'Acompanha o crescimento da criança desde os primeiros dias, com orientação próxima para pais de primeira viagem.', depoimento: 'Meu filho adora ir às consultas!' },
  { id: 6, esp: 'pedia', nome: 'Dr. Lucas Ferraz', titulo: 'Pediatra e alergista', crm: 'CRM 000006/SP', foto: '', nota: 4.8, avaliacoes: 321, anos: 9, idiomas: 'Português', convenios: 'Convênios selecionados', online: false, proximo: 'Amanhã · 11:15', areas: ['Alergias', 'Asma', 'Adolescentes'], sobre: 'Cuida de crianças com alergias respiratórias e alimentares e acompanha a transição para a adolescência.', depoimento: 'Resolveu a alergia da minha filha.' },
  { id: 7, esp: 'orto', nome: 'Dr. Eduardo Prado', titulo: 'Ortopedista', crm: 'CRM 000007/SP', foto: '', nota: 4.8, avaliacoes: 289, anos: 20, idiomas: 'Português, Inglês', convenios: 'Principais convênios e particular', online: false, proximo: 'Amanhã · 08:40', areas: ['Joelho', 'Coluna', 'Lesões esportivas'], sobre: 'Experiência em tratamento conservador e reabilitação de lesões de joelho, ombro e coluna.', depoimento: 'Voltei a caminhar sem dor.' },
  { id: 8, esp: 'gineco', nome: 'Dra. Beatriz Lima', titulo: 'Ginecologista e obstetra', crm: 'CRM 000008/SP', foto: '', nota: 4.9, avaliacoes: 476, anos: 16, idiomas: 'Português, Espanhol', convenios: 'Principais convênios e particular', online: true, proximo: 'Hoje · 16:10', areas: ['Pré-natal', 'Preventivo', 'Planejamento familiar'], sobre: 'Acompanha a mulher em todas as fases, do pré-natal à menopausa, com escuta cuidadosa.', depoimento: 'Me deu total segurança na gravidez.' },
  { id: 9, esp: 'gineco', nome: 'Dra. Renata Vasconcelos', titulo: 'Ginecologista', crm: 'CRM 000009/SP', foto: '', nota: 4.7, avaliacoes: 233, anos: 11, idiomas: 'Português', convenios: 'Convênios selecionados', online: true, proximo: 'Qui · 13:30', areas: ['Menopausa', 'Endometriose', 'Saúde hormonal'], sobre: 'Atua no cuidado da saúde hormonal e no tratamento de dores pélvicas crônicas.', depoimento: 'Finalmente fui ouvida de verdade.' },
  { id: 10, esp: 'neuro', nome: 'Dr. André Nogueira', titulo: 'Neurologista', crm: 'CRM 000010/SP', foto: '', nota: 4.8, avaliacoes: 254, anos: 17, idiomas: 'Português, Inglês', convenios: 'Principais convênios e particular', online: true, proximo: 'Amanhã · 15:00', areas: ['Enxaqueca', 'Distúrbios do sono', 'Memória'], sobre: 'Investiga dores de cabeça persistentes, tonturas e alterações de memória com exames bem direcionados.', depoimento: 'Minhas crises de enxaqueca diminuíram muito.' },
  { id: 11, esp: 'oftalmo', nome: 'Dra. Sofia Carvalho', titulo: 'Oftalmologista', crm: 'CRM 000011/SP', foto: '', nota: 4.9, avaliacoes: 388, anos: 13, idiomas: 'Português, Inglês', convenios: 'Principais convênios e particular', online: false, proximo: 'Hoje · 18:00', areas: ['Miopia infantil', 'Catarata', 'Glaucoma'], sobre: 'Cuida da visão de toda a família, com atenção especial à miopia em crianças e à prevenção de glaucoma.', depoimento: 'Exame completo e sem espera.' },
  { id: 12, esp: 'psico', nome: 'Dr. Thiago Barros', titulo: 'Psiquiatra', crm: 'CRM 000012/SP', foto: '', nota: 4.9, avaliacoes: 301, anos: 14, idiomas: 'Português, Inglês', convenios: 'Particular', online: true, proximo: 'Amanhã · 19:00', areas: ['Ansiedade', 'Depressão', 'Insônia'], sobre: 'Atendimento acolhedor, com plano de cuidado combinado com o paciente e foco em qualidade de vida.', depoimento: 'Me senti acolhido desde a primeira conversa.' }
]

const faqs = [
  { p: 'Como funciona o agendamento?', r: 'Escolha a especialidade, selecione o médico e toque em “Agendar consulta”. Você será levado ao WhatsApp com a mensagem já preenchida e nossa equipe confirma o melhor horário.' },
  { p: 'Vocês atendem por convênio?', r: 'Sim. Cada médico informa os convênios aceitos no próprio perfil. Se tiver dúvida, pergunte na conversa do WhatsApp antes de confirmar.' },
  { p: 'Posso fazer consulta online?', r: 'Sim. Os médicos com a etiqueta “Presencial e online” atendem por videochamada, com o mesmo valor e a mesma qualidade.' },
  { p: 'Posso remarcar ou cancelar?', r: 'Pode, sem custo, até 24 horas antes do horário. É só avisar pelo mesmo WhatsApp usado no agendamento.' },
  { p: 'O que preciso levar na primeira consulta?', r: 'Documento com foto, carteirinha do convênio (se houver) e exames ou receitas anteriores relacionados ao motivo da consulta.' },
  { p: 'Em quanto tempo consigo ser atendido?', r: 'Em muitos casos há horários no mesmo dia ou no dia seguinte. A disponibilidade aparece no card de cada médico.' }
]

const metas = [
  { icone: '🩺', alvo: 48320, sufixo: '', rotulo: 'consultas realizadas' },
  { icone: '👩‍⚕️', alvo: 86, sufixo: '', rotulo: 'médicos atendendo' },
  { icone: '📍', alvo: 18, sufixo: '', rotulo: 'cidades atendidas' },
  { icone: '⭐', alvo: 4.9, sufixo: '/5', rotulo: 'média de avaliações', dec: 1 }
]

/* ===================== ESTADO ===================== */
const busca = ref('')
const espAtiva = ref(null)
const faqAberta = ref(0)
const scrolled = ref(false)
const statsEl = ref(null)
const stats = ref(metas.map(m => ({ ...m, atual: 0 })))
let animou = false
let observer

/* ===================== COMPUTADAS ===================== */
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const filtradas = computed(() => {
  const q = norm(busca.value)
  if (!q) return especialidades
  return especialidades.filter(e =>
    norm(`${e.nome} ${e.desc} ${e.tags}`).includes(q) ||
    medicos.some(m => m.esp === e.id && norm(`${m.nome} ${m.titulo} ${m.areas.join(' ')}`).includes(q))
  )
})

const medicosDe = id => medicos.filter(m => m.esp === id)
const medicosAtivos = computed(() => (espAtiva.value ? medicosDe(espAtiva.value.id) : []))

/* ===================== AÇÕES ===================== */
/* ===================== AÇÕES ===================== */
const wpp = () => `https://wa.me/${clinica.whatsapp}?text=${encodeURIComponent('Olá! Conheci os sites da GHTech BR e gostaria de solicitar mais informações sobre os serviços.')}`
const iniciais = nome => nome.replace(/^(Dr\.|Dra\.)\s*/, '').split(' ').slice(0, 2).map(p => p[0]).join('')
const fmt = n => (Number.isInteger(n) ? Math.round(n).toLocaleString('pt-BR') : n.toFixed(1).replace('.', ','))

const abrir = e => { espAtiva.value = e }
const fechar = () => { espAtiva.value = null }
const onKey = ev => { if (ev.key === 'Escape') fechar() }
const onScroll = () => { scrolled.value = window.scrollY > 12 }

// trava o scroll da página enquanto a lista de médicos está aberta
watch(espAtiva, v => { document.body.style.overflow = v ? 'hidden' : '' })

// contadores animados quando a seção entra na tela
function contar() {
  if (animou) return
  animou = true
  const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dur = reduz ? 1 : 1800
  const ini = performance.now()
  const passo = agora => {
    const t = Math.min((agora - ini) / dur, 1)
    const ease = 1 - Math.pow(1 - t, 3)
    stats.value.forEach((s, i) => {
      const v = metas[i].alvo * ease
      s.atual = metas[i].dec ? Number(v.toFixed(metas[i].dec)) : Math.round(v)
    })
    if (t < 1) requestAnimationFrame(passo)
  }
  requestAnimationFrame(passo)
}

async function observar() {
  await nextTick()
  if (!statsEl.value) return
  observer?.disconnect()
  observer = new IntersectionObserver(([en]) => { if (en.isIntersecting) contar() }, { threshold: 0.4 })
  observer.observe(statsEl.value)
}

watch(busca, v => { if (!v) observar() })

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  onScroll()
  observar()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  observer?.disconnect()
  document.body.style.overflow = ''
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600;700&display=swap');

.page {
  --ink: #0A3D4A;
  --ink-2: #4B6B73;
  --teal: #0B8F8A;
  --mint: #2EE6C5;
  --sun: #FFD27A;
  --bg: #F3FBF9;
  --card: #FFFFFF;
  --line: #D6EAE6;
  --wpp: #128C4A;
  --radius: 22px;
  font-family: 'Figtree', system-ui, sans-serif;
  color: var(--ink);
  background: var(--bg);
  min-height: 100vh;
  line-height: 1.55;
}

.page *,
.page *::before,
.page *::after {
  box-sizing: border-box;
}

.page h1,
.page h2,
.page h3,
.page h4 {
  font-family: 'Bricolage Grotesque', 'Figtree', sans-serif;
  margin: 0;
  line-height: 1.08;
  letter-spacing: -0.02em;
}

.page p {
  margin: 0;
}

.page button {
  font: inherit;
  cursor: pointer;
  border: 0;
  background: none;
  color: inherit;
}

.page a {
  color: inherit;
}

.page :focus-visible {
  outline: 3px solid var(--teal);
  outline-offset: 3px;
  border-radius: 10px;
}

/* ---------- NAV ---------- */
.nav {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(243, 251, 249, .8);
  backdrop-filter: blur(14px);
  transition: box-shadow .3s, background .3s;
}

.nav.scrolled {
  box-shadow: 0 6px 24px rgba(10, 61, 74, .1);
  background: rgba(255, 255, 255, .92);
}

.nav-in {
  max-width: 1180px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  min-width: 0;
}

.logo {
  width: 52px;
  height: 52px;
  flex: none;
}

.brand-name {
  display: block;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
}

.brand-addr {
  display: block;
  font-size: .82rem;
  color: var(--ink-2);
  margin-top: 4px;
}

.btn-wpp {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  background: var(--wpp);
  color: #fff !important;
  text-decoration: none;
  font-weight: 700;
  padding: 12px 20px;
  border-radius: 999px;
  box-shadow: 0 8px 20px rgba(18, 140, 74, .3);
  transition: transform .2s, box-shadow .2s;
  white-space: nowrap;
}

.btn-wpp:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(18, 140, 74, .38);
}

.btn-wpp.full {
  width: 100%;
  padding: 14px 20px;
  border-radius: 16px;
}

/* ---------- HERO ---------- */
.hero {
  position: relative;
  overflow: hidden;
  padding: 56px 24px 72px;
  background: linear-gradient(160deg, #E2F7F2 0%, #F3FBF9 60%);
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: .55;
  animation: drift 14s ease-in-out infinite alternate;
}

.b1 {
  width: 380px;
  height: 380px;
  background: #7DF0D9;
  top: -120px;
  right: 8%;
}

.b2 {
  width: 300px;
  height: 300px;
  background: #FFE3A6;
  bottom: -120px;
  left: -60px;
  animation-delay: -6s;
}

@keyframes drift {
  to {
    transform: translate(40px, 30px) scale(1.12);
  }
}

.hero-in {
  position: relative;
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: 48px;
  align-items: center;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid var(--line);
  padding: 8px 16px;
  border-radius: 999px;
  font-weight: 600;
  font-size: .9rem;
  margin-bottom: 22px;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--wpp);
  box-shadow: 0 0 0 0 rgba(18, 140, 74, .6);
  animation: ping 2s infinite;
}

@keyframes ping {
  70% {
    box-shadow: 0 0 0 10px rgba(18, 140, 74, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(18, 140, 74, 0);
  }
}

.hero h1 {
  font-size: clamp(2.6rem, 6vw, 4.8rem);
  font-weight: 800;
}

.ln {
  display: block;
  opacity: 0;
  transform: translateY(40px);
  animation: rise .9s cubic-bezier(.2, .8, .2, 1) forwards;
}

.l2 {
  animation-delay: .12s;
  color: var(--teal);
}

.l3 {
  animation-delay: .24s;
}

@keyframes rise {
  to {
    opacity: 1;
    transform: none;
  }
}

.lead {
  font-size: 1.15rem;
  color: var(--ink-2);
  max-width: 520px;
  margin: 22px 0 30px;
}

.search {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 2px solid var(--line);
  border-radius: 20px;
  padding: 6px 12px 6px 18px;
  box-shadow: 0 14px 36px rgba(10, 61, 74, .1);
  transition: border-color .2s, box-shadow .2s;
  max-width: 600px;
}

.search:focus-within {
  border-color: var(--teal);
  box-shadow: 0 14px 40px rgba(11, 143, 138, .22);
}

.search svg {
  color: var(--teal);
  flex: none;
}

.search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: none;
  font: inherit;
  font-size: 1.05rem;
  padding: 14px 0;
  color: var(--ink);
}

.search input::placeholder {
  color: #86A1A8;
}

.clear {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--bg);
  font-size: 1.3rem;
  line-height: 1;
}

.hero-art {
  position: relative;
  justify-self: center;
  width: min(100%, 400px);
}

.art-main {
  border-radius: 36px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(10, 61, 74, .28);
  transform: rotate(2deg);
  animation: bob 7s ease-in-out infinite;
}

.art-main img,
.art-svg {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 400 / 420;
  object-fit: cover;
}

.ecg {
  stroke-dasharray: 700;
  stroke-dashoffset: 700;
  animation: ecg 3.2s ease-in-out infinite;
}

@keyframes ecg {

  60%,
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes bob {
  50% {
    transform: rotate(2deg) translateY(-10px);
  }
}

.float {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  padding: 12px 18px 12px 12px;
  border-radius: 18px;
  box-shadow: 0 16px 34px rgba(10, 61, 74, .2);
  animation: bob2 5s ease-in-out infinite;
}

.float .ico {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  background: #E8FFF9;
  border-radius: 12px;
  font-size: 1.3rem;
}

.float b {
  display: block;
  font-size: .98rem;
  line-height: 1.2;
}

.float small {
  color: var(--ink-2);
  font-size: .8rem;
}

.f1 {
  left: -34px;
  top: 56px;
}

.f2 {
  right: -22px;
  bottom: 46px;
  animation-delay: -2.5s;
}

@keyframes bob2 {
  50% {
    transform: translateY(-9px);
  }
}

/* ---------- SEÇÕES ---------- */
.wrap {
  max-width: 1180px;
  margin: 0 auto;
  padding: 72px 24px;
}

.sec-head {
  margin-bottom: 36px;
}

.sec-head h2 {
  font-size: clamp(1.9rem, 3.6vw, 2.8rem);
  font-weight: 800;
}

.sec-head p {
  color: var(--ink-2);
  margin-top: 10px;
  font-size: 1.05rem;
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.spec {
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 26px;
  border-radius: var(--radius);
  background: var(--card);
  border: 1.5px solid var(--line);
  overflow: hidden;
  transition: transform .25s, box-shadow .25s, border-color .25s;
}

.spec::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg, var(--c), var(--c2));
  opacity: 0;
  transition: opacity .3s;
}

.spec>* {
  position: relative;
}

.spec:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 44px rgba(10, 61, 74, .18);
  border-color: transparent;
}

.spec:hover::before {
  opacity: 1;
}

.spec:hover strong,
.spec:hover small,
.spec:hover em {
  color: #fff;
}

.spec-ico {
  width: 60px;
  height: 60px;
  display: grid;
  place-items: center;
  font-size: 1.9rem;
  border-radius: 18px;
  background: linear-gradient(145deg, var(--c), var(--c2));
  margin-bottom: 14px;
  box-shadow: 0 10px 20px color-mix(in srgb, var(--c) 35%, transparent);
  transition: transform .3s;
}

.spec:hover .spec-ico {
  transform: rotate(-8deg) scale(1.08);
  background: #fff;
}

.spec strong {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.4rem;
  transition: color .3s;
}

.spec small {
  color: var(--ink-2);
  font-size: .95rem;
  transition: color .3s;
}

.spec em {
  font-style: normal;
  font-weight: 700;
  font-size: .9rem;
  margin-top: 10px;
  color: var(--teal);
  transition: color .3s;
}

.grid-enter-active,
.grid-leave-active {
  transition: all .35s;
}

.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(.92);
}

.grid-leave-active {
  position: absolute;
}

.grid-move {
  transition: transform .35s;
}

.empty {
  text-align: center;
  padding: 40px 0;
  color: var(--ink-2);
}

.btn-ghost {
  margin-top: 16px;
  padding: 12px 22px;
  border-radius: 999px;
  border: 2px solid var(--teal);
  color: var(--teal);
  font-weight: 700;
}

.btn-ghost:hover {
  background: var(--teal);
  color: #fff;
}

/* ---------- NÚMEROS ---------- */
.stats {
  background: linear-gradient(135deg, #0A3D4A, #0B6E7A);
  color: #fff;
  padding: 64px 24px;
  position: relative;
  overflow: hidden;
}

.stats::after {
  content: '';
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  right: -120px;
  top: -160px;
  background: radial-gradient(circle, rgba(46, 230, 197, .35), transparent 70%);
}

.stats-in {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  text-align: center;
}

.stat-ico {
  display: inline-grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 18px;
  background: rgba(255, 255, 255, .12);
  font-size: 1.6rem;
  margin-bottom: 12px;
}

.stat b {
  display: block;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
}

.stat small {
  display: block;
  margin-top: 8px;
  color: #BDE9E2;
  font-size: 1rem;
}

/* ---------- FAQ ---------- */
.faq-list {
  max-width: 820px;
  display: grid;
  gap: 12px;
}

.faq-item {
  background: #fff;
  border: 1.5px solid var(--line);
  border-radius: 18px;
  transition: border-color .2s, box-shadow .2s;
}

.faq-item.open {
  border-color: var(--teal);
  box-shadow: 0 12px 28px rgba(11, 143, 138, .12);
}

.faq-item>button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  text-align: left;
  padding: 20px 24px;
  font-weight: 700;
  font-size: 1.08rem;
}

.chev {
  width: 12px;
  height: 12px;
  border-right: 3px solid var(--teal);
  border-bottom: 3px solid var(--teal);
  transform: rotate(45deg);
  transition: transform .3s;
  flex: none;
  margin-top: -4px;
}

.faq-item.open .chev {
  transform: rotate(225deg);
  margin-top: 4px;
}

.faq-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows .35s ease;
}

.faq-item.open .faq-body {
  grid-template-rows: 1fr;
}

.faq-body>div {
  overflow: hidden;
}

.faq-body p {
  padding: 0 24px 22px;
  color: var(--ink-2);
}

/* ---------- FOOTER ---------- */
.footer {
  background: #072B35;
  color: #CFE8E4;
  padding: 56px 24px 32px;
}

.footer-in {
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 36px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, .12);
}

.f-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.f-brand strong {
  display: block;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.6rem;
  color: #fff;
  line-height: 1.1;
}

.f-brand span {
  font-size: .9rem;
}

.f-dev h4 {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.f-dev p {
  font-size: .95rem;
}

.f-dev a {
  color: var(--mint);
  text-decoration: none;
}

.f-dev a:hover {
  text-decoration: underline;
}

.aviso {
  max-width: 1180px;
  margin: 24px auto 0;
  background: rgba(255, 210, 122, .12);
  border: 1px solid rgba(255, 210, 122, .4);
  color: #FFE7B3;
  padding: 16px 20px;
  border-radius: 14px;
  font-size: .95rem;
}

/* ---------- TELA DE MÉDICOS ---------- */
.sheet {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: var(--bg);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.sheet-top {
  position: sticky;
  top: 0;
  z-index: 2;
  color: #fff;
  padding: 18px 24px 24px;
  background: linear-gradient(120deg, var(--c), var(--c2));
  box-shadow: 0 10px 30px rgba(10, 61, 74, .2);
}

.sheet-top>* {
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.back {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  background: rgba(255, 255, 255, .22);
  padding: 9px 18px;
  border-radius: 999px;
  font-weight: 700;
  margin-bottom: 18px;
  transition: background .2s;
}

.back:hover {
  background: rgba(255, 255, 255, .36);
}

.sheet-title {
  display: flex;
  align-items: center;
  gap: 18px;
}

.sheet-title h2 {
  font-size: clamp(1.8rem, 4vw, 2.7rem);
  font-weight: 800;
}

.sheet-title p {
  opacity: .92;
  margin-top: 4px;
}

.spec-ico.big {
  background: #fff;
  box-shadow: none;
  margin: 0;
  width: 68px;
  height: 68px;
  font-size: 2.1rem;
  flex: none;
}

.sheet-body {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px 64px;
  display: grid;
  gap: 22px;
}

.doc {
  display: grid;
  grid-template-columns: 200px 1fr 230px;
  gap: 28px;
  background: #fff;
  border: 1.5px solid var(--line);
  border-radius: 26px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(10, 61, 74, .07);
  opacity: 0;
  transform: translateY(26px);
  animation: rise .6s cubic-bezier(.2, .8, .2, 1) forwards;
  animation-delay: calc(var(--i) * .1s + .25s);
}

.doc-photo {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(145deg, var(--c), var(--c2));
  display: grid;
  place-items: center;
}

.doc-photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.initials {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 3.6rem;
  font-weight: 800;
  color: rgba(255, 255, 255, .95);
  letter-spacing: -0.04em;
}

.online {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  text-align: center;
  background: rgba(255, 255, 255, .95);
  color: var(--wpp);
  font-size: .78rem;
  font-weight: 700;
  padding: 6px 8px;
  border-radius: 999px;
}

.online.off {
  color: var(--ink-2);
}

.doc-info h3 {
  font-size: 1.6rem;
  font-weight: 800;
}

.doc-sub {
  color: var(--ink-2);
  margin-top: 4px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
}

.stars {
  font-size: 1.15rem;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #F5A524 var(--p), #D9E5E3 var(--p));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.rating small {
  color: var(--ink-2);
}

.doc-about {
  max-width: 60ch;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 14px 0;
}

.tag {
  background: #E8FFF9;
  color: var(--ink);
  border: 1px solid #BDEFE5;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: .86rem;
  font-weight: 600;
}

.facts {
  list-style: none;
  padding: 0;
  margin: 0 0 14px;
  display: grid;
  gap: 3px;
  font-size: .94rem;
  color: var(--ink-2);
}

.facts b {
  color: var(--ink);
}

blockquote {
  margin: 0;
  padding: 10px 16px;
  border-left: 4px solid var(--sun);
  background: #FFFAEE;
  border-radius: 0 12px 12px 0;
  font-style: italic;
  color: #6B5320;
}

.doc-cta {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 6px;
  padding: 20px;
  border-radius: 20px;
  background: var(--bg);
  text-align: center;
}

.doc-cta small {
  color: var(--ink-2);
}

.doc-cta strong {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.35rem;
  margin-bottom: 10px;
}

.sheet-enter-active,
.sheet-leave-active {
  transition: transform .45s cubic-bezier(.2, .8, .2, 1), opacity .3s;
}

.sheet-enter-from,
.sheet-leave-to {
  transform: translateY(8%);
  opacity: 0;
}

/* ---------- RESPONSIVO ---------- */
@media (max-width: 960px) {
  .hero-in {
    grid-template-columns: 1fr;
  }

  .hero-art {
    width: min(80%, 340px);
    margin-top: 16px;
  }

  .stats-in {
    grid-template-columns: repeat(2, 1fr);
  }

  .doc {
    grid-template-columns: 160px 1fr;
  }

  .doc-cta {
    grid-column: 1 / -1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    flex-wrap: wrap;
  }

  .doc-cta strong {
    margin: 0;
  }

  .doc-cta .btn-wpp.full {
    width: auto;
  }
}

@media (max-width: 640px) {
  .nav-in {
    padding: 10px 14px;
  }

  .logo {
    width: 42px;
    height: 42px;
  }

  .brand-name {
    font-size: 1.25rem;
  }

  .brand-addr {
    font-size: .7rem;
  }

  .btn-wpp {
    padding: 11px 14px;
    font-size: .88rem;
  }

  .btn-wpp span {
    display: none;
  }

  .btn-wpp.full span,
  .doc-cta .btn-wpp {
    display: inline-flex;
  }

  .hero {
    padding-top: 36px;
  }

  .f1 {
    left: -10px;
  }

  .f2 {
    right: -8px;
  }

  .wrap {
    padding: 52px 18px;
  }

  .doc {
    grid-template-columns: 1fr;
    padding: 18px;
  }

  .doc-photo {
    aspect-ratio: 16 / 11;
  }

  .doc-cta .btn-wpp.full {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {

  .page *,
  .page *::before,
  .page *::after {
    animation-duration: .001s !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001s !important;
  }

  .ecg {
    stroke-dashoffset: 0;
  }
}
</style>