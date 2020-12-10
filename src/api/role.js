import request from '@/utils/request'

// 得到所有权限列表
export function getRoleList() {
  return request({
    url: '/api/v1/roles',
    method: 'get'
  })
}
// 得到某个用户权力
export function getUserRoleList(params) {
  return request({
    url: '/api/v1/user-role',
    method: 'get',
    params
  })
}
//  添加一个权限
export function addRole(params) {
  return request({
    url: '/api/v1/user-role',
    method: 'post',
    data: params
  })
}

// 删除权限
export function deleteRole(params) {
  return request({
    url: `/api/v1/user-role/${params}`,
    method: 'delete'
  })
}
