import request from '@/utils/request'

//选题列表
export function topicSelect(page, size) {
  return request({
    url: `/topic/list?page=${page}&size=${size}`,
    method: 'get'
  })
}
//学生选题
export function studentSelect(userid, topicid) {
  return request({
    url: `/topic/select?userid=${userid}&topicid=${topicid}`,
    method: 'get'
  })
}

//任务书接口
export function studentAssign(studentid) {
  return request({
    url: `/select/see_taskbook?studentid=${studentid}`,
    method: 'get'
  })
}
//导出任务书
export function downloadAssign(topicname,filename) {
  return request({
    url: `/common/download?topicname=${topicname}&filename=${filename}`,
    method: 'get'
  })
}
