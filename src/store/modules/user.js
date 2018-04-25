import { login } from '@/api/login'
import {
  setRoles,
  getRoles,
  setId,
  getId,
  getSource,
  removeRoles,
  removeId
} from '@/utils/auth'

const user = {
  state: {
    id: getId(),
    roles: getRoles(),
    source: getSource()
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = id
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
            const result = response.data.data
            console.log(result)
            let roles
            switch (result.role) {
              case 0:
                roles = ['student']
                break
              case 1:
                roles = ['teacher']
                break
              default:
                roles = ['manager']
                break
            }
            commit('SET_ROLES', roles)
            commit('SET_ID', result.userid)
            setRoles(roles)
            console.log(result.userid)
            setId(result.userid)
            dispatch('GenerateRoutes', { roles }).then(() => {
              resolve()
            })
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({ commit }) {
      return new Promise(resolve => {
        removeRoles()
        removeId()
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
