import request from '@/utils/request'
export function getteacher(pageNum, pageSize, teacherId, collegeid) {
  return request({
    url: `/user/list?page=${pageNum}&size=${pageSize}&role=${teacherId}&collegeid=${collegeid}`,
    method: 'get'
  })
}
export function getexcellent(studentid, recommend) {
  return request({
    url: `/score/recommend?studentid=${studentid}&recommend=${recommend}`,
    method: 'get'
  })
}
export function getexamine(topicid, topicstate) {
  return request({
    url: `/topic/check?topicid=${topicid}&topicstate=${topicstate}`,
    method: 'get'
  })
}
export function getCollegeList() {
  return request({
    url: `/topic/college`,
    method: 'get'
  })
}
export function checkMiddleGroup(data) {
  return request({
    url: `/middle/group`,
    method: 'post',
    data:data
  })
}
export function checkDefenceGroup(data) {
  return request({
    url: `/defence/group`,
    method: 'post',
    data:data
  })
}
export function getsettime(teacherid, time, location) {
  return request({
    url: `/defence/settime?teacherid=${teacherid}&time=${time}&location=${location}`,
    method: 'get'
  })
}
export function deleteuser(userid) {
  return request({
    url: `/user/delete?userid=${userid}`,
    method: 'get'
  })
}

export function defencegroup() {
  return request({
    url: 'defence/querygroup',
    method: 'get'
  })
}
export function middlegroup() {
  return request({
    url: '/middle/querygroup',
    method: 'get'
  })
}
export function setdefencetime(groupid, time, location) {
  return request({
    url: `/defence/settime?groupid=${groupid}&time=${time}&location=${location}`,
    method: 'get'
  })
}
export function goodstate(page, size, state) {
  return request({
    url: `/score/good?page=${page}&size=${size}&state=${state}`,
    method: 'get'
  })
}
