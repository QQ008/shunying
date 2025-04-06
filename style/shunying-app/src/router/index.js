import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: '首页' }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
    meta: { title: '查找' }
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import('../views/ExploreView.vue'),
    meta: { title: '探索' }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { title: '我的' }
  },
  {
    path: '/photo/:id',
    name: 'photo-detail',
    component: () => import('../views/PhotoDetailView.vue'),
    meta: { title: '图片详情' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫：修改页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 瞬影` : '瞬影'
  next()
})

export default router 