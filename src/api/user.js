import request from '@/utils/request'
// 登录
export function login(data) {
  return request({
    url: '/api/v1/login',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/api/v1/users/info',
    method: 'get',
    params: { token }
  })
}
// 更改用户信息
export function updateUserInfo(users) {
  return request({
    url: '/api/v1/users/update',
    method: 'put',
    data: users
  })
}
// 退出
export function logout() {
  return request({
    url: '/api/v1/logout',
    method: 'get'
  })
}
// 得到用户列表
export function getUserList(listQuest) {
  return request({
    url: '/api/v1/users',
    method: 'get',
    params: listQuest
  })
}
// 更改用户状态
export function updateUserStatus(users) {
  return request({
    url: '/api/v1/users/status',
    method: 'put',
    data: users
  })
}
