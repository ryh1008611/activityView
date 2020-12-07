/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const informationRouter = {
  path: '/information',
  component: Layout,
  redirect: 'noRedirect',
  name: 'information',
  meta: {
    title: '人员管理',
    icon: 'peoples',
    roles: ['ADMIN', 'TEACHER']
  },
  children: [
    {
      path: 'users',
      component: () => import('@/views/information/user-table'),
      name: 'users',
      meta: { title: '用户管理',
        roles: ['ADMIN', 'TEACHER'],
        icon: 'people'
      }
    },
    {
      path: 'material',
      component: () => import('@/views/information/material-table'),
      name: 'material',
      meta: { title: '物资管理',
        icon: 'shopping' }
    }
  ]
}

export default informationRouter
