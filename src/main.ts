import 'dayjs/locale/zh-cn'
import { createApp } from 'vue'
import ElementPlus, { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import '@/config/global'
import 'lin/plugin'
import { filters } from 'lin/filter'
import permissionDirective from 'lin/directive/authorize'

import App from '@/app.vue'
import store from '@/store'
import router from '@/router'

import LinNotify from '@/component/notify'
import LIcon from '@/component/base/icon/lin-icon.vue'
import StickyTop from '@/component/base/sticky-top/sticky-top.vue'
import SourceCode from '@/component/base/source-code/source-code.vue'

import '@/assets/style/index.scss'
import 'element-plus/dist/index.css'
import '@/assets/style/realize/element-variable.scss'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $message: typeof ElMessage
    $msgbox: typeof ElMessageBox
    $alert: typeof ElMessageBox.alert
    $confirm: typeof ElMessageBox.confirm
    $prompt: typeof ElMessageBox.prompt
    $notify: typeof ElNotification
    $filters: typeof filters
    $store: typeof store
    $connect: any
    $disconnect: any
    $socket: any
  }
}

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus, { locale })
app.use(LinNotify, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
})

// base 组件注册
app.component('l-icon', LIcon)
app.component('sticky-top', StickyTop)
app.component('source-code', SourceCode)

app.config.globalProperties.$filters = filters

app.directive('permission', permissionDirective)

app.mount('#app')
