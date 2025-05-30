import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Games from '../pages/Games.vue'
import Rankings from '../pages/Rankings.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/games', component: Games },
  { path: '/rankings', component: Rankings }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
