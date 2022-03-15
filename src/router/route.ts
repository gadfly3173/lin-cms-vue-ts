import { RouteRecordRaw } from 'vue-router'
import homeRouter from './home-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/about',
    component: () => import('@/view/home/home.vue'),
    children: [...homeRouter],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/login.vue'),
  },
  {
    redirect: '/404',
    path: '/:pathMatch(.*)',
  },
]

export default routes
