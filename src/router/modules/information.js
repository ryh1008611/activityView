/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const informationRouter = {
  path: '/information',
  component: Layout,
  redirect: 'noRedirect',
  name: 'information',
  meta: {
    title: '信息管理',
    icon: 'el-icon-document',
    roles: ['ADMIN', 'TEACHER', 'COMMUNITY']
  },
  children: [
    {
      path: 'activity',
      component: () => import('@/views/information/activity-table'),
      name: 'activity',
      meta: { title: '活动管理', icon: 'el-icon-s-claim' }
    },
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
