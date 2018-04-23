import request from '@/utils/request'

export function sendCode(data) {
  return request({
    url: `/login/sendCode?phone=${data}`,
    method: 'post'
  })
}

export function signUp(data) {
  return request({
    url: `/login/signUp?phone=${data.phone}&password=${data.password}&code=${data.code}`,
    method: 'post'
  })
}

export function getuserinfo() {
  return request({
    url: '/ticket/getAuthorizerInfo',
    method: 'post'
  })
}

export function moveToWX() {
  return request({
    url: '/ticket/auth',
    method: 'get'
  })
}

export function WXCallback(data) {
  return request({
    url: `/ticket/authBack?auth_code=${data.auth_code}&expires_in=${data.expires_in}&channel=${data.channel}`,
    method: 'get'
  })
}

export function fansToday() {
  return request({
    url: '/ticket/userTodayFansCount',
    method: 'post'
  })
}

export function fansAllCount() {
  return request({
    url: '/ticket/userFansCount',
    method: 'post'
  })
}

export function CodeUserList(pageNum, pageSize) {
  return request({
    url: `/ticket/getUserFansList?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'post'
  })
}

export function payment(money) {
  return request({
    url: `/payment/palmpay/unifiedorder?money=${money}&ChannelId=0&paymentType=3`,
    method: 'get'
  })
}

export function checkPay(balanceTradeId) {
  return request({
    url: `/payment/check?balanceTradeId=${balanceTradeId}`,
    method: 'post'
  })
}

export function getAllAuthorizer(pageNum, pageSize) {
  return request({
    url: `/ticket/getAllAuthorizer?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'post'
  })
}

export function eachTodayFansCount(authorizerAppid) {
  return request({
    url: `/ticket/todayFansCount?authorizerAppid=${authorizerAppid}`,
    method: 'post'
  })
}

export function eachFansCount(authorizerAppid) {
  return request({
    url: `/ticket/fansCount?authorizerAppid=${authorizerAppid}`,
    method: 'post'
  })
}

export function eachFansList(authorizerAppid, pageNum, pageSize) {
  return request({
    url: `/ticket/getFansList?authorizerAppid=${authorizerAppid}&pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'post'
  })
}

export function switckOnOff(authorizerAppid) {
  return request({
    url: `/ticket/onOff?authorizerAppid=${authorizerAppid}`,
    method: 'post'
  })
}
