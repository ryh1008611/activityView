import request from '@/utils/request'

// 判断该用户是否有参加这个活动
export function isJoin(id) {
  return request({
    url: `/api/v1/join/${id}`,
    method: 'get'
  })
}

// 报名参加活动
export function addJoin(data) {
  return request({
    url: '/api/v1/join',
    method: 'post',
    data
  })
}
// 活动我参加的活动列表
export function getMyJoinList(params) {
  return request({
    url: '/api/v1/join',
    method: 'get',
    params
  })
}

// 修改签到状态
export function signIn(data) {
  return request({
    url: '/api/v1/join-user/sign',
    method: 'post',
    data
  })
}
