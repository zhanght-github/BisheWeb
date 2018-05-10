import request from '@/utils/request'
export function getteacher(pageNum, pageSize, teacherId,collegeid) {
  return request({
    url: `/user/list?page=${pageNum}&size=${pageSize}&role=${teacherId}&collegeid=${collegeid}`,
    method: 'get'
  })
}
export function getsutdent(pageNum, pageSize, studentId) {
  return request({
    url: `/user/list?page=${pageNum}&size=${pageSize}&role=${studentId}&collegeid=${collegeid}`,
    method: 'get'
  })
}
export function getCollegeList() {
  return request({
    url: `/topic/college`,
    method: 'get'
  })
}

export function checkMiddleGroup(pageNum, pageSize, studentId) {
  return request({
    url: `/middle/group`,
    method: 'get'
  })
}
