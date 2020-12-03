import request from '@/utils/request'

export function getActivityList(query) {
  return request({
    url: '/api/v1/activity/list',
    method: 'post',
    data: query
  })
}
// 获得活动下所有参加者名单
export function getActivityUserInfo(query) {
  return request({
    url: '/api/v1/activity/userInfo',
    method: 'post',
    data: query
  })
}
export function delActivity(id) {
  return request({
    url: `/api/v1/activity/${id}`,
    method: 'delete'
  })
}
// show
export function showActivity(id) {
  return request({
    url: `/api/v1/activity/${id}`,
    method: 'get'
  })
}
// 活动类型管理
export function activityTypeList() {
  return request({
    url: '/api/v1/activityType',
    method: 'get'
  })
}
// 获得我申请的所有活动
export function passActivityList(data) {
  return request({
    url: '/api/v1/activity',
    method: 'get',
    data: data
  })
}

// 添加一个活动
export function addActivity(data) {
  return request({
    url: '/api/v1/activity',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
