import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Pick from '../components/pick'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/pick',
    children: [
      {path: '/pick', component: Pick},
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
