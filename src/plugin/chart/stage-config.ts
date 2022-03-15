import { CMSRouterNode } from 'typing/router'

const ChartsRouter: CMSRouterNode = {
  route: '/dashboard',
  name: 'DashBoard',
  title: '数据分析',
  type: 'view',
  icon: 'iconfont icon-weibiaoti--',
  filePath: 'plugin/chart/view/chart.vue',
  order: 0,
  inNav: true,
}

export default ChartsRouter
