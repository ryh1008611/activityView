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
      meta: { title: '物资管理', icon: 'el-icon-s-grid' },
      roles: ['ADMIN', 'TEACHER']
    },
    {
      path: 'create',
      component: () => import('@/views/material/examine'),
      name: 'create',
      meta: { title: '审核管理', icon: 'el-icon-s-claim' },
      roles: ['ADMIN', 'TEACHER']
    },
    {
      path: 'create',
      component: () => import('@/views/material/create'),
      name: 'create',
      meta: { title: '物资申请', icon: 'el-icon-plus' }
    },
    {
      path: 'myApply',
      component: () => import('@/views/material/myApply'),
      name: 'myApply',
      meta: { title: '我的物资', icon: 'people' }
    }
  ]
}

export default materialRouter
