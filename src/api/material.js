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
// 我的list
export function myMaterialList(params) {
  return request({
    url: '/api/v1/activityMaterial/1',
    method: 'get',
    params: params
  })
}
// 更改审核状态
export function updateExamineStatus(id, status) {
  return request({
    url: `/api/v1/activityMaterial/${id}`,
    method: 'put',
    params: { apply_status: status }
  })
}
// 更改提交的材料信息
export function updateMaterialApply(row) {
  return request({
    url: `/api/v1/activityMaterial/update/Info`,
    method: 'post',
    data: row
  })
}
// 添加一个物资

export function createMaterialApply(row) {
  return request({
    url: `/api/v1/activityMaterial`,
    method: 'post',
    data: row
  })
}
