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

//任务书确定接口
export function submitAssign(studentid) {
  return request({
    url: `/select/confirm_taskbook?studentid=${studentid}`,
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
//文献综述列表
export function literatureList(studentid) {
  return request({
    url: `/open/query?studentid=${studentid}`,
    method: 'get'
  })
}
//中检列表
export function middleCheckList(studentid) {
  return request({
    url: `/middle/studentquery?studentid=${studentid}`,
    method: 'get'
  })
}
//初稿列表
export function draftList(studentid) {
  return request({
    url: `/defence/query?studentid=${studentid}`,
    method: 'get'
  })
}
