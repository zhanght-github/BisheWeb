import request from '@/utils/request'

export function topicSelect(page, size) {
  return request({
    url: `/topic/list?page=${page}&size=${size}`,
    method: 'get'
  })
}

export function studentSelect(userid, topicid) {
  return request({
    url: `/topic/select?userid=${userid}&topicid=${topicid}`,
    method: 'get'
  })
}
