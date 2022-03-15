import { CMSRouterNode } from 'typing/router'

import Util from '@/lin/util/util'

// eslint-disable-next-line import/no-self-import
import * as getters from './getter'
import states from './state'

let stageMap: StringCMSNodeMap = {}

type State = typeof states
export interface SidebarConfig {
  name: string | symbol
  title: string
  icon: string | undefined
  path: string
  children?: SidebarConfig[]
}
declare interface StringCMSNodeMap {
  [key: string | symbol]: CMSRouterNode
}

export const loggedIn = (state: State) => state.loggedIn

export const user = (state: State) => state.user

export const alreadyReadMessages = (state: State) => state.alreadyReadMessages

export const unreadMessages = (state: State) => state.unreadMessages

/**
 * 获取有权限的舞台配置
 */
 export const permissionStageConfig = (state: State) => {
  const { stageConfig, permissions, user } = state
  const tempStageConfig = Util.deepClone(stageConfig)
  const shookConfig = permissionShaking(tempStageConfig, permissions, user)

  // 设置舞台缓存
  const list = {} as StringCMSNodeMap
  deepTravel(shookConfig, item => {
    list[item.name as string] = item
  })
  stageMap = list
  return shookConfig
}

/**
 * 获取有权限的左侧菜单数据
 * @param {*} state
 * @param {*} getters 其他 getter
 */
export const sidebarList = (state: State, getter: typeof getters): SidebarConfig[] => {
  const { sidebarLevel } = state
  const { permissionStageConfig } = getter

  function deepGetSidebar(target: CMSRouterNode[] | CMSRouterNode, level = 3): SidebarConfig[] | SidebarConfig | null {
    // 集合节点处理
    if (Array.isArray(target)) {
      const acc = target.map(item => deepGetSidebar(item, level - 1)) as SidebarConfig[]
      return acc.filter(item => item !== null)
    }

    // 检测是否需要在导航中显示
    if (!target.inNav) {
      return null
    }

    if (target.type === 'folder' && level !== 0) {
      // 处理 folder 模式
      const sideConfig: SidebarConfig = {
        name: target.name as string | symbol,
        title: target.title,
        icon: target.icon,
        path: target.route || Util.getRandomStr(6),
        children: target.children
          ? (target.children
            .map(item => deepGetSidebar(item, level - 1))
            .filter(item => item !== null) as SidebarConfig[])
          : undefined,
      }
      return sideConfig
    }

    // 处理一级就是 view 的情况
    if (target.type === 'view') {
      const sideConfig: SidebarConfig = {
        name: target.name as string | symbol,
        title: target.title,
        icon: target.icon,
        path: target.route,
      }
      return sideConfig
    }

    // 处理 appTab 情况
    if (target.type === 'tab') {
      const sideConfig: SidebarConfig = {
        name: target.name as string | symbol,
        title: target.title,
        icon: target.icon,
        path: target.route,
      }
      // 如果 Tab 没有设置默认打开的路由, 则设置为第一个子节点路由
      if (!sideConfig.path) {
        if (target.children && target.children.length > 0 && target.children[0].route) {
          sideConfig.path = target.children[0].route
        }
      }
      return sideConfig
    }

    // 最后一层, 都当做子节点处理
    if (level <= 0) {
      const sideConfig: SidebarConfig = {
        name: target.name as string | symbol,
        title: target.title,
        icon: target.icon,
        path: Util.getRandomStr(6),
      }
      if (target.children && target.children.length > 0 && target.children[0].route) {
        sideConfig.path = target.children[0].route
      }
      return sideConfig
    }
    return null
  }

  const sideBar = deepGetSidebar(permissionStageConfig as unknown as CMSRouterNode[], sidebarLevel) as SidebarConfig[]
  return sideBar
}

/**
 * 获取有权限的所有节点配置对象
 */
export const getStageByName = () => (name: string) => stageMap[name]

/**
 * 获取有权限的所有节点配置对象
 */
export const getStageByRoute = () => (path: string) => {
  const result = Object.getOwnPropertySymbols(stageMap).find(key => stageMap[key].route === path) as symbol
  return stageMap[result]
}

export const stageList = () => stageMap

export const permissions = (state: State) => state.permissions

export const getStageInfo = (state: State) => {
  const { stageConfig } = state
  const cache: StringCMSNodeMap = {}
  const findStage = (
    stages: CMSRouterNode[] | CMSRouterNode,
    name: string | symbol,
  ): CMSRouterNode[] | CMSRouterNode | boolean | undefined => {
    let result
    if (Array.isArray(stages)) {
      for (let i = 0; i < stages.length; i += 1) {
        result = findStage(stages[i], name)
        if (result) {
          break
        }
      }
      return result
    }

    if (stages.children && stages.children.length) {
      result = findStage(stages.children, name) as CMSRouterNode[]
      if (result) {
        result.unshift(stages)
      }
      return result
    }

    if (stages.name === name) {
      return [stages]
    }
    return false
  }
  return (name: string | symbol) => {
    if (cache[name]) {
      return cache[name]
    }
    const stageInfo = findStage(stageConfig, name)
    if (stageInfo) {
      cache[name] = stageInfo as CMSRouterNode
    }
    return stageInfo
  }
}

/**
 * 递归
 * @param {*} obj
 * @param {*} fuc
 */
function deepTravel(obj: CMSRouterNode[] | CMSRouterNode, fuc: (obj: CMSRouterNode) => void) {
  if (Array.isArray(obj)) {
    obj.forEach(item => {
      deepTravel(item, fuc)
    })
    return
  }
  if (obj && obj.children) {
    fuc(obj)
    deepTravel(obj.children, fuc)
    return
  }
  if (obj.name) {
    fuc(obj)
  }
}

/**
 * 在侧边栏展示时，如果当前路由 children 属性为空，则删除该路由
 * @param {*} arr 路由配置项数据
 */
function IterationDelateMenuChildren(arr: CMSRouterNode[] | undefined): CMSRouterNode[] {
  if (arr && arr.length) {
    // eslint-disable-next-line no-unused-vars
    for (const i in arr) {
      if (arr[i].children && !arr[i].children?.length) {
        delete arr[i]
      } else if (arr[i].children && arr[i].children?.length) {
        IterationDelateMenuChildren(arr[i].children)
      }
    }
  }
  return arr as CMSRouterNode[]
}

/**
 * Shaking 掉无权限路由
 * @param {array} stageConfig 路由配置项数据
 * @param {array} permissions 当前登录管理员所拥有的权限集合
 * @param {object} currentUser 当前登录管理员
 */
function permissionShaking(stageConfig: CMSRouterNode[], permissions: string[], currentUser: typeof states.user) {
  const shookConfig = stageConfig.filter(route => {
    if (Util.hasPermission(permissions, route, currentUser)) {
      if (route.children && route.children.length) {
        route.children = permissionShaking(route.children, permissions, currentUser)
      }
      return true
    }
    return false
  })
  return IterationDelateMenuChildren(shookConfig)
}
