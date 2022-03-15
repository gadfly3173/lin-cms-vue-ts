import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

import appConfig from '@/config/index'
import Util from '@/lin/util/util'
import autoJump from '@/lin/util/auto-jump'
import store from '../store'
import routes from './route'

// 判断是否需要登录访问, 配置位于 config 文件夹
let isLoginRequired = (routeName: string | symbol): boolean => {
  // 首次执行时缓存配置
  let { notLoginRoute } = appConfig
  interface stringBoolMap {
    [key: string]: boolean
  }

  const notLoginMark: stringBoolMap = {}

  // 构建标记对象
  if (Array.isArray(notLoginRoute)) {
    for (let i = 0; i < notLoginRoute.length; i += 1) {
      notLoginMark[notLoginRoute[i].toString()] = true
    }
  }

  notLoginRoute = null // 释放内存

  // 重写初始化函数
  isLoginRequired = (name: string | symbol): boolean => {
    if (!name) {
      return true
    }
    // 处理 Symbol 类型
    const target = typeof name === 'symbol' ? name.description : name
    return !notLoginMark[target as string]
  }

  return isLoginRequired(routeName)
}

const router = createRouter({
  scrollBehavior: () => ({ top: 0 }),
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // 登录验证
  if (isLoginRequired(to.name as string) && !store.state.loggedIn) {
    next({ path: '/login' })
    return
  }

  // TODO: tab 模式重复点击验证
  if (to.path === from.path) {
    return
  }

  // 权限验证
  if (store?.state && store?.getters) {
    const { permissions, user } = store.getters
    if (to.path !== appConfig.defaultRoute && !Util.hasPermission(permissions, to.meta, user)) {
      ElMessage.error('您无此页面的权限哟')
      next({ path: appConfig.defaultRoute })
      return
    }
  }

  // 路由发生变化重新计时
  autoJump(router)

  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  next()
})

export default router
