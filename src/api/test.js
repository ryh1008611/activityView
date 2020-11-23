// eslint-disable-next-line no-unused-vars
import request from '@/utils/request'

export function getList2() {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get'
  })
}
