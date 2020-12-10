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
// 修改活动状态

export function examine(data) {
  return request({
    url: '/api/v1/activity/updateStatus',
    method: 'post',
    data: data
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

// 活动类型管理-查看活动列表
export function activityTypeList(listQuery) {
  return request({
    url: '/api/v1/activityType',
    method: 'get',
    params: listQuery
  })
}
// 活动类型管理-添加一个活动类型
export function addActivityType(data) {
  return request({
    url: '/api/v1/activityType',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 活动类型管理-修改活动类型信息
export function updateActivityType(id, data) {
  return request({
    url: `/api/v1/activityType/${id}`,
    method: 'put',
    data: data
  })
}
// 活动类型管理-删除活动类型
export function deleteActivityType(id) {
  return request({
    url: `/api/v1/activityType/${id}`,
    method: 'delete'
  })
}
