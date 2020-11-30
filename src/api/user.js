import request from '@/utils/request'

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

export function getInfo(token) {
  return request({
    url: '/api/v1/users/info',
    method: 'get',
    params: { token }
  })
}

export function updateUserInfo(users) {
  return request({
    url: '/api/v1/users/update',
    method: 'put',
    data: users
  })
}
export function logout() {
  return request({
    url: '/api/v1/logout',
    method: 'get'
  })
}
