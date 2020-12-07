import request from '@/utils/request'

export function getRoleList() {
  return request({
    url: '/api/v1/roles',
    method: 'get'
  })
}
export function getUserRoleList(params) {
  return request({
    url: '/api/v1/user-role',
    method: 'get',
    params
  })
}
