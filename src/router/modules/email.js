/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const emailsRouter = {
  path: '/email',
  component: Layout,
  redirect: 'noRedirect',
  name: 'email',
  meta: {
    title: '邮箱管理',
    icon: 'el-icon-message',
    roles: ['ADMIN', 'TEACHER', 'COMMUNITY']
  },
  children: [
    {
      path: 'settingEmail',
      component: () => import('@/views/activity/index'),
      name: 'settingEmail',
      meta: { title: '配置邮箱', icon: 'el-icon-setting' }
    },
    {
      path: 'PersonalEmail',
      component: () => import('@/views/activity/userInfo'),
      name: 'PersonalEmail',
      meta: { title: '我的邮箱',
        roles: ['ADMIN', 'TEACHER'],
        icon: 'el-icon-message-solid'
      }
    }
  ]
}

export default emailsRouter
