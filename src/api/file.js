import request from '@/utils/request'

export function updateFile(query) {
  return request({
    url: '/api/v1/upload/file',
    method: 'post',
    data: query
  })
}

