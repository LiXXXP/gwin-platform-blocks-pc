import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import homeRoutes from './home.router'
import applicationRoutes from './application.router'
import designRoutes from './design.router'
import commonRoutes from './common.router'
import getPageTitle from '../utils/get-page-title'

const routes: Array<RouteRecordRaw> = [...commonRoutes, ...homeRoutes, ...applicationRoutes, ...designRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = getPageTitle(title)
  }
  next()
})

export default router
