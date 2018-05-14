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
    path: '',
    component: Layout,
    name: 'home',
    meta: { title: '毕业公告', role: ['teacher', 'student', 'manager'] },
    children: [
      {
        path: '',
        component: _import('Home/Index'),
        name: 'home',
        meta: { title: '毕业公告', noCache: true, role: ['teacher', 'student', 'manager'] }
      }
    ]
  }
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
        meta: { title: '课题管理', icon: 'icon-ico_goodie', role: ['teacher'] },
        children: [
          {
            path: '',
            component: _import('Teacher/Topic/Index'),
            name: 'topic',
            meta: { title: '课题管理', icon: 'icon-ico_goodie', noCache: true, role: ['teacher'] }
          }
        ]
      },
      {
        path: '/teacher/ApplyStudent',
        component: _import('Teacher/Topic/ApplyStudent'),
        name: 'ApplyStudent',
        meta: { title: '申请学生', icon: 'peoples', role: ['teacher'] },
        children: [
          {
            path: '',
            component: _import('Teacher/Topic/ApplyStudent'),
            name: 'ApplyStudent',
            meta: { title: '申请学生', icon: 'peoples', noCache: true, role: ['teacher'] }
          }
        ]
      },
      {
        path: '/teacher/upLoadTask',
        component: _import('Teacher/Topic/uploadTask'),
        name: 'uploadTask',
        meta: { title: '下达任务书', icon: 'peoples', role: ['teacher'] },
        children: [
          {
            path: '',
            component: _import('Teacher/Topic/uploadTask'),
            name: 'uploadTask',
            meta: { title: '下达任务书', icon: 'peoples', noCache: true, role: ['teacher'] }
          }
        ]
      },
      {
        path: '/teacher/LiteratureReview',
        component: _import('Teacher/Topic/LiteratureReview'),
        name: 'LiteratureReview',
        meta: { title: '文献综述', icon: 'peoples', role: ['teacher'] },
        children: [
          {
            path: '',
            component: _import('Teacher/Topic/LiteratureReview'),
            name: 'LiteratureReview',
            meta: { title: '文献综述', icon: 'peoples', noCache: true, role: ['teacher'] }
          }
        ]
      }, {
        path: '/teacher/OpeningReport',
        component: _import('Teacher/Topic/OpeningReport'),
        name: 'OpeningReport',
        meta: { title: '审核开题报告', icon: 'peoples', role: ['teacher'] },
        children: [
          {
            path: '',
            component: _import('Teacher/Topic/OpeningReport'),
            name: 'OpeningReport',
            meta: { title: '审核开题报告', icon: 'peoples', noCache: true, role: ['teacher'] }
          }
        ]
      }
    ]
  },
  {
    path: '/teacherMiddle',
    component: Layout,
    meta: { title: '中期检查', role: ['teacher'] },
    children: [
      {
        path: '/teacherMiddle/CheckList',
        component: _import('Teacher/MiddleCheck/CheckList'),
        name: 'CheckList',
        meta: { title: '检阅名单', icon: 'icon-ico_goodie', role: ['teacher'] },
        children: [
          {
            path: '',
            component: _import('Teacher/MiddleCheck/CheckList'),
            name: 'CheckList',
            meta: { title: '检阅名单', icon: 'icon-ico_goodie', noCache: true, role: ['teacher'] }
          }
        ]
      },
      {
        path: '/teacher/MiddleCheck',
        component: _import('Teacher/MiddleCheck/Index'),
        name: 'MiddleCheck',
        meta: { title: '所属学生成绩', icon: 'peoples', role: ['teacher'] },
        children: [
          {
            path: '',
            component: _import('Teacher/MiddleCheck/Index'),
            name: 'MiddleCheck',
            meta: { title: '所属学生成绩', icon: 'peoples', noCache: true, role: ['teacher'] }
          }
        ]
      }
    ]
  },
  {
    path: '/teacherPaper',
    component: Layout,
    meta: { title: '论文管理', role: ['teacher'] },
    children: [
      {
        path: '/teacherPaper/AdviserApprise',
        component: _import('Teacher/PaperManage/AdviserApprise'),
        name: 'AdviserApprise',
        meta: { title: '初稿审阅', icon: 'icon-ico_goodie', role: ['teacher'] },
        children: [
          {
            path: '',
            component: _import('Teacher/PaperManage/AdviserApprise'),
            name: 'AdviserApprise',
            meta: { title: '初稿审阅', icon: 'icon-ico_goodie', noCache: true, role: ['teacher'] }
          }
        ]
      },
      {
        path: '/teacherPaper/AdviserGrade',
        component: _import('Teacher/PaperManage/AdviserGrade'),
        name: 'AdviserGrade',
        meta: { title: '定稿审阅', icon: 'icon-ico_goodie', role: ['teacher'] },
        children: [
          {
            path: '',
            component: _import('Teacher/PaperManage/AdviserGrade'),
            name: 'AdviserGrade',
            meta: { title: '定稿审阅', icon: 'icon-ico_goodie', noCache: true, role: ['teacher'] }
          }
        ]
      }
    ]
  },
  {
    path: '/teacherReply',
    component: Layout,
    meta: { title: '答辩管理', role: ['teacher'] },
    children: [
      {
        path: '/teacherReply/MyReply',
        component: _import('Teacher/ReplyManage/MyReply'),
        name: 'MyReply',
        meta: { title: '学生答辩', icon: 'icon-ico_goodie', role: ['teacher'] },
        children: [
          {
            path: '',
            component: _import('Teacher/ReplyManage/MyReply'),
            name: 'MyReply',
            meta: { title: '学生答辩', icon: 'icon-ico_goodie', noCache: true, role: ['teacher'] }
          }
        ]
      },
      {
        path: '/teacherReply/ReplyGrade',
        component: _import('Teacher/ReplyManage/ReplyGrade'),
        name: 'ReplyGrade',
        meta: { title: '录入成绩', icon: 'icon-ico_goodie', role: ['teacher'] },
        children: [
          {
            path: '',
            component: _import('Teacher/ReplyManage/ReplyGrade'),
            name: 'ReplyGrade',
            meta: { title: '录入成绩', icon: 'icon-ico_goodie', noCache: true, role: ['teacher'] }
          }
        ]
      }
    ]
  },
  {
    path: '/teacherRecommend/recommendPaper',
    component: Layout,
    meta: { title: '论文推优', role: ['teacher'] },
    children: [
      {
        path: '',
        component: _import('Teacher/RecommendPaper/Index'),
        name: 'recommendPaper',
        meta: { title: '论文推优', noCache: true, role: ['teacher'] }
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
        component: _import('student/topic/literature'),
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
            meta: { title: '开题报告', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      }
    ]
  },
  {
    path: '/student/check',
    component: Layout,
    meta: { title: '中期检查', role: ['student'] },
    children: [
      {
        path: '/student/check',
        component: _import('student/middleCheck/check'),
        name: 'topic',
        meta: { title: '中期检查', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/middleCheck/check'),
            name: 'topic',
            meta: { title: '中期检查', icon: 'ico_promotion', noCache: true, role: ['student'] }
          }
        ]
      }
    ]
  },
  {
    path: '/student/manage',
    component: Layout,
    meta: { title: '答辩管理', role: ['student'] },
    children: [
      {
        path: '/student/draft',
        component: _import('student/reportManage/draft'),
        name: 'topic',
        meta: { title: '答辩管理', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/reportManage/draft'),
            name: 'topic',
            meta: { title: '论文草稿', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      },
      {
        path: '/student/finalize',
        component: _import('student/reportManage/finalize'),
        name: 'topic',
        meta: { title: '答辩管理', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/reportManage/finalize'),
            name: 'topic',
            meta: { title: '论文定稿', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      },
      {
        path: '/student/myArgument',
        component: _import('student/reportManage/myArgument'),
        name: 'topic',
        meta: { title: '答辩管理', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/reportManage/myArgument'),
            name: 'topic',
            meta: { title: '我的答辩', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      }
    ]
  },
  {
    path: '/student/grade',
    component: Layout,
    meta: { title: '成绩管理', role: ['student'] },
    children: [
      {
        path: '/student/argumentGrade',
        component: _import('student/gradeManage/argumentGrade'),
        name: 'topic',
        meta: { title: '成绩管理', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/gradeManage/argumentGrade'),
            name: 'topic',
            meta: { title: '答辩成绩', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      },
    ]
  },
  {
    path: '/student/greatReport',
    component: Layout,
    meta: {title: '优秀毕业生论文', role: ['student']},
    children: [
      {
        path: '',
        component: _import('student/greatReport/greatReport'),
        name: 'topic',
        meta: {title: '优秀毕业生论文', noCache: true, role: ['student']}
      }]
  },
  {
    path: '/student/exchange',
    component: Layout,
    meta: {title: '留言板', role: ['student']},
    children: [
      {
        path: '/student/teacherList',
        component: _import('student/exchange/teacherList'),
        name: 'topic',
        meta: { title: '留言板', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/exchange/teacherList'),
            name: 'topic',
            meta: { title: '教师列表', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      },
      {
        path: '/student/exchangeList',
        component: _import('student/exchange/exchangeList'),
        name: 'topic',
        meta: { title: '留言板', icon: 'ico_game', role: ['student'] },
        children: [
          {
            path: '',
            component: _import('student/exchange/exchangeList'),
            name: 'topic',
            meta: { title: '留言板', icon: 'ico_game', noCache: true, role: ['student'] }
          }
        ]
      }
    ]
  },
  // 管理员
  {
    path: '/adminAddnews',
    component: Layout,
    name: 'Addnews',
    meta: { title: '添加公告', role: ['manager'] },
    children: [
      {
        path: '',
        component: _import('Admin/newsManage/addNews'),
        name: 'Addnews',
        meta: { title: '添加公告', noCache: true, role: ['manager'] }
      }
    ]
  },
  // 管理员部分
  {
    path: '/admin/manger',
    component: Layout,
    meta: { title: '管理员信息', role: ['manager'] },
    children: [
      {
        path: '',
        component: _import('Admin/manger/index'),
        name: 'topic',
        meta: { title: '管理员信息', noCache: true, role: ['manager'] }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    meta: { title: '查看个人信息', role: ['manager'] },
    children: [
      {
        path: '/admin/personalmes',
        component: _import('Admin/Topic/studentmes'),
        name: 'topic',
        meta: { title: '学生信息', icon: 'icon-ico_goodie', role: ['manager'] },
        children: [
          {
            path: '',
            component: _import('Admin/Topic/studentmes'),
            name: 'topic',
            meta: { title: '学生信息', icon: 'icon-ico_goodie', noCache: true, role: ['manager'] }
          }
        ]
      },
      {
        path: '/admin/teachermes',
        component: _import('Admin/Topic/teachermes'),
        name: 'topic',
        meta: { title: '教师信息', icon: 'icon-ico_goodie', role: ['manager'] },
        children: [
          {
            path: '',
            component: _import('Admin/Topic/teachermes'),
            name: 'topic',
            meta: { title: '教师信息', icon: 'icon-ico_goodie', noCache: true, role: ['manager'] }
          }
        ]
      }
    ]
  },
  {
    path: '/admin1',
    component: Layout,
    meta: { title: '毕设题目', role: ['manager'] },
    children: [
      {
        path: '/admin1/bishesubject',
        component: _import('Admin/Topic/bishesubject'),
        name: 'topic',
        meta: { title: '毕设题目信息', icon: 'icon-ico_goodie', role: ['manager'] },
        children: [
          {
            path: '',
            component: _import('Admin/Topic/bishesubject'),
            name: 'topic',
            meta: { title: '毕设题目信息', icon: 'icon-ico_goodie', noCache: true, role: ['manager'] }
          }
        ]
      },
      {
        path: '/admin1/bishegrouping',
        component: _import('Admin/Topic/bishegrouping'),
        name: 'topic',
        meta: { title: '毕设中检分组', icon: 'icon-ico_goodie', role: ['manager'] },
        children: [
          {
            path: '',
            component: _import('Admin/Topic/bishegrouping'),
            name: 'topic',
            meta: { title: '毕设中检分组', icon: 'icon-ico_goodie', noCache: true, role: ['manager'] }
          }
        ]
      },
      {
        path: '/admin1/bishedefence',
        component: _import('Admin/Topic/bishedefence'),
        name: 'topic',
        meta: { title: '毕设答辩分组', icon: 'icon-ico_goodie', role: ['manager'] },
        children: [
          {
            path: '',
            component: _import('Admin/Topic/bishedefence'),
            name: 'topic',
            meta: { title: '毕设答辩分组', icon: 'icon-ico_goodie', noCache: true, role: ['manager'] }
          }
        ]
      }
    ]
  },
  {
    path: '/admin3',
    component: Layout,
    meta: { title: '毕业设计成绩', role: ['manager'] },
    children: [
      {
        path: '/admin3/bisheexcellent',
        component: _import('Admin/Topic/bisheexcellent'),
        name: 'topic',
        meta: { title: '毕业设计评优', icon: 'icon-ico_goodie', role: ['manager'] },
        children: [
          {
            path: '',
            component: _import('Admin/Topic/bishescore'),
            name: 'topic',
            meta: { title: '毕业设计评优', icon: 'icon-ico_goodie', noCache: true, role: ['manager'] }
          }
        ]
      },
      {
        path: '/admin3/bishescore',
        component: _import('Admin/Topic/bishescore'),
        name: 'topic',
        meta: { title: '毕业设计成绩', icon: 'icon-ico_goodie', role: ['manager'] },
        children: [
          {
            path: '',
            component: _import('Admin/Topic/bishescore'),
            name: 'topic',
            meta: { title: '毕业设计成绩', icon: 'icon-ico_goodie', noCache: true, role: ['manager'] }
          }
        ]
      }
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
