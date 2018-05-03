<template>
  <el-menu class="navbar">
    <div class="header flex">
        <div class="logo flex">
          <div>
            毕业设计管理系统
          </div>
        </div>
      <div class="headerright flex">
        <div class="welcome">
          欢迎
        </div>
        <div class="userinfo flex">
          <span>{{userinfo.username}}</span>
        </div>
        <div class="price">
          {{userinfo.role}}
        </div>
        <div class="exit" @click="logout()">
          <i class="iconfont icon-ico_sign_out"></i>
          退出
        </div>
      </div>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import ErrorLog from '@/components/ErrorLog'
import { getUserInfo } from '@/api'

export default {
  data() {
    return {
      Managername: '',
      Manageicon: '',
      messagelist: [],
      showmessage: false,
      userinfo: {
        username: '',
        role: ''
      }
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar', 'errorLogs'])
  },
  created() {
    this.getnameicon()
    this.getUser()
  },
  methods: {
    getUser() {
      getUserInfo(this.getUserId()).then(res => {
        this.userinfo = res.data.data
        sessionStorage.setItem('userinfo', JSON.stringify(this.userinfo))
        this.userinfo.role = this.userinfo.role === 0 ? '同学' : this.userinfo.role === 1 ? '教师' : '管理'
      })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    getnameicon() {
      this.Managername = this.$route.meta.title
      this.Manageicon = this.$route.meta.icon
    },
    showmess() {
      this.showmessage = !this.showmessage
    }
  },
  watch: {
    $route(val) {
      this.getnameicon()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header {
  background-color: #ffffff;
  position: fixed;
  top: 0;
  right: 0;
  left: 240px;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  padding: 0 20px;
  .logo {
    svg {
      width: 64px;
      height: 16.8px;
      fill: #fff;
    }
    div {
      font-size: 14px;
      margin-left: 6px;
    }
  }
  .headerright {
    align-items: center;
    .exit {
      &:hover {
        cursor: pointer;
      }
    }
    .welcome {
      font-size: 12px;
    }
    .price {
      margin-right: 21.5px;
      padding: 0;
      height: 28px;
      border-radius: 4px;
      background-color: #fff;
      line-height: 28px;
      text-align: center;
      font-size: 12px;
    }
    .userinfo {
      align-items: center;
      margin: 0 5px;
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 6px;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">

</style>




