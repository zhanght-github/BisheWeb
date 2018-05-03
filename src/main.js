import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
// import '@/icons/iconfont/iconfont.css'

import App from './App'
import router from './router'
import store from './store'

import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
// import './mock' // simulation data generator

import * as filters from './filters' // global filter
import Cookies from 'js-cookie'

Vue.use(Element)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

global.success = 200
global.fail = 40001

Vue.config.productionTip = false

Vue.prototype.getUserId = function() {
  return Cookies.get('id') || ''
}

/**
 * 获取当前时间24小时制
 * yyyy-MM-dd HH:mm:ss
 */
Vue.prototype.get24Hours = function() {
  var date = new Date()
  var seperator1 = '-'
  var seperator2 = ':'
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = `0${month}`
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`
  }
  var currentdate = `${date.getFullYear() + seperator1 + month + seperator1 + strDate
  } ${date.getHours()}${seperator2}${date.getMinutes()
  }${seperator2}${date.getSeconds()}`
  return currentdate
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
