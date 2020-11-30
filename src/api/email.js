import request from '@/utils/request'

// 得到邮箱信息
export function getEmailInfo() {
  return request({
    url: '/api/v1/mail',
    method: 'get'
  })
}

// 绑定邮箱
export function setEmailInfo(data) {
  return request({
    url: '/api/v1/mail',
    method: 'post',
    data: data
  })
}
