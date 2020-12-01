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
      component: () => import('@/views/email/create'),
      name: 'settingEmail',
      meta: { title: '配置邮箱', icon: 'el-icon-setting' }
    },
    {
      path: 'PersonalEmail',
      component: () => import('@/views/email/index'),
      name: 'PersonalEmail',
      meta: { title: '我的邮箱',
        roles: ['ADMIN', 'TEACHER', 'COMMUNITY'],
        icon: 'email'
      }
    },
    {
      path: 'SendEmail',
      component: () => import('@/views/email/mySend'),
      name: 'SendEmail',
      meta: { title: '已发邮箱',
        roles: ['ADMIN', 'TEACHER', 'COMMUNITY'],
        icon: 'guide'
      }
    },
    {
      path: 'step',
      component: () => import('@/views/email/step'),
      name: 'step',
      meta: { title: '获取授权码',
        icon: 'el-icon-s-unfold'
      }
    }
  ]
}

export default emailsRouter
