import VueRouter, { RouteConfig } from 'vue-router'
import Vue from 'vue'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/pages/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/notifications',
        component: () => import(/* webpackChunkName: "notifications" */ '@/pages/notifications/index.vue')
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

export default router
