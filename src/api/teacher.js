import request from '@/utils/request'

export function addTopic(data) {
  return request({
    url: `/topic/savetopic`,
    method: 'post'
  })
}
