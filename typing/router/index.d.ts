/** 路由配置
 * @link https://doc.cms.talelin.com/client/router.html
 */
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 是否在左侧菜单栏显示 */
    inNav?: boolean
    /** 当前路由权限，数组格式，满足数组内任一权限即可展示该页面 */
    permission?: string[] | null
  }
}

declare interface CMSRouterNode {
  /** 使用 Symbol 确保唯一性，若未设置则默认为随机字符串，若未设置 Symbol 则会自动包裹 */
  name?: symbol | string | undefined | null
  /** 页面title / 左侧sidebar */
  title: string
  /** folder：有子路由，折叠sidebar / tab：子路由在右侧以menuTab展现 / view：直接展示页面 */
  type: 'folder' | 'view' | 'tab'
  /** 可直接配置 mdi/font awesome 类名 / 也可配置为图片路径 */
  icon?: string
  /** 文件路径 */
  filePath?: string
  /** 是否在左侧菜单栏显示 */
  inNav?: boolean
  /** 当前路由权限，数组格式，满足数组内任一权限即可展示该页面 */
  permission?: string[] | null
  /** 当前页面路由 */
  route: string
  /**
   * 将 props 传递给路由组件
   * https://next.router.vuejs.org/zh/guide/essentials/passing-props.html
   * */
  props?: boolean | object | function
  /** 路由排序 */
  order?: null | number
  children?: CMSRouterNode[]
  blueBaseColor?: boolean
}
