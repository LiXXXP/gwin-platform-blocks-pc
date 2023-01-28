import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/element-variables.scss'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './styles/index.scss' // global css

import 'virtual:svg-icons-register'

// 公共css
import '@gwin/platform-css-pc/lib/theme-default/index.css'

// svg-icon
import SvgIcon from '@gwin/svg-icon'
import '@gwin/svg-icon/lib/theme-default/index.css'

// console-base
import ConsoleBase from '@gwin/platform-console-base-pc'
import './styles/console-base-variables.scss'

// admin ui
import AdminUI from '@gwin/admin-ui'
import '@gwin/admin-ui/lib/theme-default/index.css'

// console-menu
// import ConsoleMenu from '@gwin/platform-menu-pc'
// import '@gwin/platform-menu-pc/lib/theme-default/index.css'

// 网络配置
import { commonConfig } from '@gwin/networking'
import { Passport } from '@gwin/platform-passport-pc'
import config from './config'

commonConfig.loginCallback = () => {
  Passport.logout()
}

commonConfig.noPermissionCallback = () => {
  // 403
  router.push('/403')
}

commonConfig.businessNoPermissionCallback = () => {
  // 无权限
  window.location.href = config.GWIN_URL_NOPERMISSION
}

commonConfig.requestUserRoleResCallback = () => {
  // 请求刷新权限
  Passport.logout()
}

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(store).use(ElementPlus, { locale }).use(SvgIcon).use(ConsoleBase).use(AdminUI).mount('#app')
