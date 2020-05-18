import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/components/home/Home')
const AdminPages = () => import('@/components/admin/AdminPages')
const Auth = () => import('@/components/auth/Auth')
const ArticleByCategory = () => import('@/components/article/ArticleByCategory')
const ArticleById = () => import('@/components/article/ArticleById')
import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requireAdmin: true }
  },
  {
    name: 'auth',
    path: '/auth',
    component: Auth
  },
  {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticleByCategory
  },
  {
    name: 'articlesById',
    path: '/articles/:id',
    component: ArticleById
  }
]

 const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(userKey)

  if(to.matched.some(record => record.meta.requireAdmin)) {
    const user = JSON.parse(json)
    user && user.admin ? next() : next({ path: '/' })
  } else {
    next()
  }
})

export default router