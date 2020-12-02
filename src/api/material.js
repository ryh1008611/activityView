import request from '@/utils/request'

// 得到物资信息
export function getMaterialList(query) {
  return request({
    url: '/api/v1/material',
    method: 'get',
    params: query
  })
}
// 添加一个物资
export function createMaterials(data) {
  return request({
    url: '/api/v1/material',
    method: 'post',
    data: data
  })
}
// 更新物资
export function updateMaterial(data) {
  return request({
    url: `/api/v1/material/${data.id}`,
    method: 'put',
    data: data
  })
}
// 删除物资
export function deleteMaterial(id) {
  return request({
    url: `/api/v1/material/${id}`,
    method: 'delete'
  })
}

// 审核list
export function examineMaterialList(params) {
  return request({
    url: '/api/v1/activityMaterial',
    method: 'get',
    params: params
  })
}
// 更改审核状态
export function updateExamineStatus(id, status) {
  return request({
    url: `/api/v1/activityMaterial/${id}`,
    method: 'put',
    params: { status: status }
  })
}
