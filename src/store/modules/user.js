import { login } from '@/api/login'
import {
  setRoles,
  getRoles,
  setName,
  getName,
  getSource,
  setSource
} from '@/utils/auth'

const user = {
  state: {
    name: getName(),
    roles: getRoles(),
    source: getSource()
  },

  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_SOURCE: (state, source) => {
      state.source = source
    }
  },

  actions: {
    // 用户名登录
    login({ dispatch, commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            const result = response.data.result
            let roles
            switch (result.roleId) {
              case 0:
                roles = ['admin']
                break
              default:
                roles = ['other']
                break
            }
            commit('SET_ROLES', roles)
            commit('SET_NAME', result.id)
            commit('SET_SOURCE', result.source)
            setRoles(roles)
            setName(result.id)
            setSource(result.source)
            dispatch('GenerateRoutes', { roles }).then(() => {
              resolve()
            })
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(state.token)
    //       .then(response => {
    //         if (!response.data) {
    //           // 由于mockjs 不支持自定义状态码只能这样hack
    //           reject('error')
    //         }
    //         const data = response.data
    //         commit('SET_ROLES', data.role)
    //         commit('SET_NAME', data.name)
    //         commit('SET_AVATAR', data.avatar)
    //         commit('SET_INTRODUCTION', data.introduction)
    //         resolve(response)
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit }) {
      return new Promise(resolve => {
        resolve()
      })
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', role)
        setRoles(role)
        resolve()
        // getUserInfo(role).then(response => {
        //   const data = response.data
        //   commit('SET_ROLES', data.role)
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   commit('SET_INTRODUCTION', data.introduction)
        //   resolve()
        // })
      })
    }
  }
}

export default user
