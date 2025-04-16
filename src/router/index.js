import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EndView from '@/views/EndView.vue'
import SlideView from '@/views/SlideView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { path: "/:id", component: SlideView },
  {
    path:'/end',
    name: 'end',
    component: EndView
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
