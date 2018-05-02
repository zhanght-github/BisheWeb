import request from '@/utils/request'

export function topicSelect(page, size) {
  return request({
    url: `/topic/list?page=${page}&size=${size}`,
    method: 'get'
  })
}
