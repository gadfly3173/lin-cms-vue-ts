import { CMSRouterNode } from 'typing/router'

const centerRouter: CMSRouterNode = {
  route: '/center',
  name: null,
  title: '个人',
  type: 'view', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/center/', // 文件路径
  order: null,
  inNav: false,
}

export default centerRouter
