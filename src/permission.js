import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { getRoles } from '@/utils/auth' // 验权
// import { Message } from 'element-ui'

// permissiom judge
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  const check = () => {
    if (getRoles()) {
      // 判断是否有token
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        if (hasPermission(store.getters.roles, to.meta.role)) {
          next()
        } else {
          next({ path: '/401', query: { noGoBack: true } })
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next('/login') // 否则全部重定向到登录页
      }
    }
  }
  if (!store.getters.permission_routers && store.getters.roles) {
    // 生成可访问的路由表
    store.dispatch('GenerateRoutes', { roles: store.getters.roles }).then(() => {
      next({ ...to, replace: true })
    })
  } else {
    check()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
