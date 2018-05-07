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

export function topicInfo(topicid) {
  return request({
    url: `/topic/query?topicid=${topicid}`,
    method: 'get'
  })
}

export function getSelectList(pageNum, pageSize, teacherId) {
  return request({
    url: `/select/list?page=${pageNum}&size=${pageSize}&teacherid=${teacherId}`,
    method: 'get'
  })
}

export function confirmStudent(studentid, ispass) {
  return request({
    url: `/select/confirm?studentid=${studentid}&ispass=${ispass}`,
    method: 'get'
  })
}

export function confirmAready(pageNum, pageSize, teacherId) {
  return request({
    url: `/select/successlist?page=${pageNum}&size=${pageSize}&teacherid=${teacherId}`,
    method: 'get'
  })
}

export function writeTaskbook(data) {
  return request({
    url: '/select/write_taskbook',
    method: 'post',
    data: data
  })
}

export function getOpenlist(pageNum, pageSize, teacherId) {
  return request({
    url: `/open/openlist?page=${pageNum}&size=${pageSize}&teacherid=${teacherId}`,
    method: 'get'
  })
}
