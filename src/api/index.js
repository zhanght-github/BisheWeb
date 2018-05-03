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
