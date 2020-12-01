/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const activityRouter = {
  path: '/activity',
  component: Layout,
  redirect: 'noRedirect',
  name: 'activity',
  meta: {
    title: '活动管理',
    icon: 'el-icon-platform-eleme',
    roles: ['ADMIN', 'TEACHER', 'COMMUNITY']
  },
  children: [
    {
      path: 'activity',
      component: () => import('@/views/activity/index'),
      name: 'activity',
      meta: { title: '活动管理', icon: 'el-icon-s-claim' }
    },
    {
      path: 'userInfo',
      component: () => import('@/views/activity/userInfo'),
      name: 'userInfo',
      meta: { title: '查看用户',
        roles: ['ADMIN', 'TEACHER'],
        icon: 'people'
      }
    },
    {
      path: 'show',
      component: () => import('@/views/activity/show'),
      name: 'show',
      meta: { title: '活动信息',
        icon: 'people'
      },
      hidden: true
    },
    {
      path: 'create',
      component: () => import('@/views/activity/create'),
      name: 'create',
      meta: { title: '活动申请',
        icon: 'el-icon-plus'
      }
    }
  ]
}

export default activityRouter