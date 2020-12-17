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

// 发送邮箱
export function sendEmail(data) {
  return request({
    url: '/api/v1/mail/send',
    method: 'post',
    data: data
  })
}

// 群发邮件
export function sendUserGroup(data) {
  return request({
    url: '/api/v1/mail/sendUserGroup',
    method: 'post',
    data: data
  })
}
// 个人发信箱

export function getMySend(listQuery) {
  return request({
    url: `/api/v1/emailInfo?pageSize=${listQuery.pageSize}&page=${listQuery.page}`,
    method: 'get'
  })
}

export function getMyEmail(listQuery) {
  return request({
    url: `/api/v1/mail/Receive?pageSize=${listQuery.pageSize}&page=${listQuery.page}`,
    method: 'post'
  })
}

// 发送验证码
export function getCheckCode(data) {
  return request({
    url: '/api/v1/mail/sendCheckCode',
    method: 'post',
    data
  })
}
