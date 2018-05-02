import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
const _import = require(`./_import_${process.env.NODE_ENV}`)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/

export const constantRouterMap = [
  { path: '/login', component: _import('login/Index'), hidden: true },
  { path: '/authredirect', component: _import('login/Authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/',
    component: Layout,
    name: 'home',
    hidden: true,
    children: [
      {
        path: '',
        component: _import('Home/Index'),
        name: 'home',
        hidden: true
      }
    ]
  },
]

export const asyncRouterMap = [
  {
    path: '/teacher/teacherInfo',
    component: Layout,
    meta: { title: '教师信息', role: ['teacher'] },
    children: [
      {
        path: '',
        component: _import('Teacher/TeacherInfo/Index'),
        name: 'topic',
        meta: { title: '教师信息', noCache: true, role: ['teacher'] }
      }
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    meta: { title: '课题管理', role: ['teacher'] },
    children: [
      {
        path: '/teacher/topic',
        component: _import('Teacher/Topic/Index'),
        name: 'topic',
        meta: { title: '课题管理', icon: 'ico_game', role: ['teacher'] },
        children: [
          {
            path: '',
            component: _import('Teacher/Topic/Index'),
            name: 'topic',
            meta: { title: '课题管理', icon: 'ico_game', noCache: true, role: ['teacher'] }
          }
        ]
      }
    ]
  },
  // 学生部分
  {
    path: '/student',
    component: Layout,
    meta: { title: '选题管理', role: ['student'] },
    children: [
      {
        path: '/student/topic',
        component: _import('student/topic/select'),
        name: 'topic',
        meta: { title: '选择课题', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/topic/select'),
            name: 'topic',
            meta: { title: '选择课题', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      },
      {
        path: '/student/assign',
        component: _import('student/topic/assign'),
        name: 'topic',
        meta: { title: '选择课题', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/topic/assign'),
            name: 'topic',
            meta: { title: '查看任务书', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      },
      {
        path: '/student/literature',
        component: _import('student/topic/report'),
        name: 'topic',
        meta: { title: '选择课题', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/topic/literature'),
            name: 'topic',
            meta: { title: '文献综述', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      },
      {
        path: '/student/report',
        component: _import('student/topic/report'),
        name: 'topic',
        meta: { title: '选择课题', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/topic/report'),
            name: 'topic',
            meta: { title: '填写开题报告', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      }
    ]
  },
  {
    path: '/student',
    component: Layout,
    meta: { title: '中期检查', role: ['student'] },
    children: [
      {
        path: '/student/check',
        component: _import('student/topic/check'),
        name: 'topic',
        meta: { title: '中期检查', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/topic/check'),
            name: 'topic',
            meta: { title: '中期检查', icon: 'ico_promotion', noCache: true, role: ['student'] }
          }
        ]
      }
    ]
  },
  {
    path: '/student',
    component: Layout,
    meta: { title: '论文管理', role: ['student'] },
    children: [
      {
        path: '/student/draft',
        component: _import('student/topic/draft'),
        name: 'topic',
        meta: { title: '论文管理', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/topic/draft'),
            name: 'topic',
            meta: { title: '论文草稿', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      },
      {
        path: '/student/finalize',
        component: _import('student/topic/finalize'),
        name: 'topic',
        meta: { title: '论文管理', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/topic/finalize'),
            name: 'topic',
            meta: { title: '论文定稿', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      }
    ]
  },
  {
    path: '/student',
    component: Layout,
    meta: { title: '评分答辩', role: ['student'] },
    children: [
      {
        path: '/student/myArgument',
        component: _import('student/topic/myArgument'),
        name: 'topic',
        meta: { title: '评分答辩', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/topic/myArgument'),
            name: 'topic',
            meta: { title: '我的答辩', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      },
      {
        path: '/student/argumentGrade',
        component: _import('student/topic/argumentGrade'),
        name: 'topic',
        meta: { title: '评分答辩', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/topic/argumentGrade'),
            name: 'topic',
            meta: { title: '答辩成绩', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router
