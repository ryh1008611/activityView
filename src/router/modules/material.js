/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const materialRouter = {
  path: '/material',
  component: Layout,
  redirect: 'noRedirect',
  name: 'material',
  meta: {
    title: '物资管理',
    icon: 'shopping',
    roles: ['ADMIN', 'TEACHER', 'COMMUNITY']
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/material/index'),
      name: 'index',
      meta: { title: '物资信息', icon: 'el-icon-s-claim' }
    },
    {
      path: 'create',
      component: () => import('@/views/material/index'),
      name: 'create',
      meta: { title: '物资信息', icon: 'el-icon-s-claim' }
    }
  ]
}

export default materialRouter
