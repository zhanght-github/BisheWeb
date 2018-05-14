import request from '@/utils/request'

export function getUserInfo(id) {
  return request({
    url: `/user/info?userid=${id}`,
    method: 'get'
  })
}

export function getCollege() {
  return request({
    url: '/topic/college',
    method: 'get'
  })
}

export function getMajor(collegeid) {
  return request({
    url: `/topic/major?collegeid=${collegeid}`,
    method: 'get'
  })
}

export function noticeinfo(pageNum, pageSize) {
  return request({
    url: `/notice/query?page=${pageNum}&size=${pageSize}`,
    method: 'get'
  })
}

export function noticeDel(noticeid) {
  return request({
    url: `/notice/delete?noticeid=${noticeid}`,
    method: 'get'
  })
}

export function noticeAdd(data) {
  return request({
    url: '/notice/insert',
    method: 'post',
    data: data
  })
}
