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
<<<<<<< HEAD
import Cookies from 'js-cookie'
=======
>>>>>>> 0f3c8fb89d57b9a5a1fbfa94208ac46c99b4b106

Vue.use(Element)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

global.success = 200
global.fail = 40001

if (process.env.BASE_API === 'https://api-managertest.wajiwaji.net') {
  global.backURL = encodeURIComponent('https://wms-t.wajiwaji.net/manage/')
} else {
  global.backURL = encodeURIComponent('https://wms.wajiwaji.net/manage/')
}

Vue.config.productionTip = false

<<<<<<< HEAD
Vue.prototype.getUserId = function() {
  return Cookies.get('id') || ''
}

=======
>>>>>>> 0f3c8fb89d57b9a5a1fbfa94208ac46c99b4b106
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
