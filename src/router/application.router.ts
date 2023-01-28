import Layout from '@/layout/index.vue'
import { RouteConfig } from '#/global'

const applicationRoutes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/application',
        name: 'Application',
        component: () => import('@/views/application/index.vue'),
        meta: {
          title: '应用预览'
        }
      }
    ]
  }
]

export default applicationRoutes
