/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const settingsRouter = {
  path: '/Personal-Settings',
  component: Layout,
  redirect: 'noRedirect',
  name: 'settings',
  meta: {
    title: '个人设置',
    icon: 'el-icon-s-tools'
  },
  children: [
    {
      path: 'personal',
      component: () => import('@/views/Personal-Settings/index'),
      name: 'personal',
      meta: { title: '修改个人信息', icon: 'peoples' }
    },
    {
      path: 'passwords',
      component: () => import('@/views/Personal-Settings/passwords'),
      name: 'passwords',
      icon: 'el-icon-document',
      meta: { title: '修改密码',
        icon: 'lock'
      }
    }
  ]
}

export default settingsRouter
