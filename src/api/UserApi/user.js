import request from '@/utils/request'

export function login() {
  return request({
    url: '/api/v1/login',
    method: 'post',
    data: {
      'name': 'kaixin',
      'password': '123456'
    }
  })
}
// export function getInfo(token) {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }
