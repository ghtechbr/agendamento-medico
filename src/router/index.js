import { createRouter, createWebHistory } from 'vue-router'
import ClinicaSaude from '../views/ClinicaSaude.vue' // Garanta que o nome do arquivo bate perfeitamente

const routes = [
  {
    path: '/',
    name: 'ClinicaSaude',
    component: ClinicaSaude
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router