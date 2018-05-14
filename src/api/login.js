import request from '@/utils/request'

export function login(userid, password) {
  return request({
    url: `/user/login?userid=${userid}&password=${password}`,
    method: 'get'
  })
}
export function register(data) {
  return request({
    url: `/user/register`,
    method: 'post',
    data: data
  })
}
