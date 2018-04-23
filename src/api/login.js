import request from '@/utils/request'

export function login(adminId, adminPwd) {
  return request({
    url: `/login?phone=${adminId}&password=${adminPwd}`,
    method: 'post'
  })
}
