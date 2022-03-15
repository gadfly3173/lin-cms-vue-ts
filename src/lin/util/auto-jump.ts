/**
 * 定时自动登出功能, 启用后一段时间无用户操作, 则自动登出. 需在项目 config 中配置
 */
import { Router } from 'vue-router'

import Config from '@/config'
import store from '@/store'

let timer: NodeJS.Timeout

export default (router: Router) => {
  if (timer) clearTimeout(timer)
  if (!Config.openAutoJumpOut) return
  if (router?.currentRoute.value.path === '/' || router?.currentRoute.value.path === '/login') {
    return
  }

  timer = setTimeout(() => {
    store.dispatch('loginOut')
    const { origin } = window.location
    window.location.href = origin
  }, Config.stagnateTime)
}
