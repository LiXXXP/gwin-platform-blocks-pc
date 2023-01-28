import Layout from '@/layout/index.vue'
import { RouteConfig } from '#/global'

const designRoutes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/design/basic',
        name: 'DesignBasic',
        component: () => import('@/views/design/basic/index.vue'),
        meta: {
          title: '基本配置'
        }
      },
      {
        path: '/design/form',
        name: 'DesignForm',
        component: () => import('@/views/design/form/index.vue'),
        meta: {
          title: '表单设计'
        }
      },
      {
        path: '/design/button',
        name: 'DesignButton',
        component: () => import('@/views/design/button/index.vue'),
        meta: {
          title: '搜索按钮组设计'
        }
      },
      {
        path: '/design/table',
        name: 'DesignTable',
        component: () => import('@/views/design/table/index.vue'),
        meta: {
          title: '表格设计'
        }
      },

      {
        path: '/design/code',
        name: 'DesignCode',
        component: () => import('@/views/design/code/index.vue'),
        meta: {
          title: '编辑源码'
        }
      }
    ]
  }
]

export default designRoutes
