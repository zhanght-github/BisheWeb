import request from '@/utils/request'

export function getTopicList(pageNum, pageSize, teacherId) {
  return request({
    url: `/topic/list?page=${pageNum}&size=${pageSize}&userid=${teacherId}`,
    method: 'get'
  })
}

export function addTopic(data) {
  return request({
    url: '/topic/savetopic',
    method: 'post',
    data: data
  })
}

export function deleteTopic(topicid) {
  return request({
    url: `/topic/deletetopic?topicid=${topicid}`,
    method: 'get'
  })
}

export function updateTopic(data) {
  return request({
    url: '/topic/updatetopic',
    method: 'post',
    data: data
  })
}
