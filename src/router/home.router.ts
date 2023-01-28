import Layout from '@/layout/index.vue'
import { RouteConfig } from '#/global'

const homeRoutes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '积木'
        }
      }
    ]
  }
]

export default homeRoutes
