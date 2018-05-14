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

export function reportispass(studentid, ispass, score, suggest) {
  return request({
    url: `/open/wenxianispass?studentid=${studentid}&ispass=${ispass}&score=${score}&suggest=${suggest}`,
    method: 'get'
  })
}

export function openingispass(studentid, ispass, score, suggest) {
  return request({
    url: `/open/reportispass?studentid=${studentid}&ispass=${ispass}&score=${score}&suggest=${suggest}`,
    method: 'get'
  })
}

export function middleStudent(teacherid) {
  return request({
    url: `middle/query?teacherid=${teacherid}`,
    method: 'get'
  })
}

export function middleMine(pageNum, pageSize, teacherId) {
  return request({
    url: `/middle/mystudent?page=${pageNum}&size=${pageSize}&teacherid=${teacherId}`,
    method: 'get'
  })
}

export function middleCheck(data) {
  return request({
    url: '/middle/check',
    method: 'post',
    data: data
  })
}

export function draftispass(studentid, ispass, suggest) {
  return request({
    url: `defence/draftispass?studentid=${studentid}&ispass=${ispass}&suggest=${suggest}`,
    method: 'get'
  })
}

export function finalispass(studentid, ispass, suggest) {
  return request({
    url: `/defence/finalispass?studentid=${studentid}&ispass=${ispass}&suggest=${suggest}`,
    method: 'get'
  })
}

export function defencelist(pageNum, pageSize, teacherId) {
  return request({
    url: `/defence/defencelist?page=${pageNum}&size=${pageSize}&teacherid=${teacherId}`,
    method: 'get'
  })
}

export function greatPaper(pageNum, pageSize, state) {
  return request({
    url: `/score/good?page=${pageNum}&size=${pageSize}&state=${state}`,
    method: 'get'
  })
}

export function getMyStudent(pageNum, pageSize, teacherid) {
  return request({
    url: `/defence/mystudent?page=${pageNum}&size=${pageSize}&teacherid=${teacherid}`,
    method: 'get'
  })
}

export function getScoreList(pageNum, pageSize, teacherid) {
  return request({
    url: `/score/scorelist?page=${pageNum}&size=${pageSize}&teacherid=${teacherid}`,
    method: 'get'
  })
}

export function setScore(data) {
  return request({
    url: '/score/commit',
    method: 'post',
    data: data
  })
}

export function recommendPaper(studentid, recommend) {
  return request({
    url: `/score/recommend?studentid=${studentid}&recommend=${recommend}`,
    method: 'get'
  })
}

export function getMessage(pageNum, pageSize, receiverid, state) {
  return request({
    url: `/message/receiverquery?page=${pageNum}&size=${pageSize}&receiverid=${receiverid}&state=${state}`,
    method: 'get'
  })
}

export function replyMessage(messageid, replycontent) {
  return request({
    url: `/message/reply?messageid=${messageid}&replycontent=${replycontent}`,
    method: 'get'
  })
}

export function changeMessageState(state, data) {
  return request({
    url: `/message/setstate?state=${state}`,
    method: 'post',
    data: data
  })
}
