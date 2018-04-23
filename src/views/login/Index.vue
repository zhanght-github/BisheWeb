<template>
<div>
  123
</div>
  <!-- <div class="login-container">
    <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="logo">
        <svg-icon icon-class="logo"/>
      </div>

      <div class="title">公众号粉丝维护平台</div>

      <div class="userlogin" v-if='!showSignIn'>
        <el-form-item prop="username">
          <div class="label">手机号</div>
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="输入手机号" />
        </el-form-item>
        <el-form-item prop="password">
           <div class="label">密码</div>
          <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
            placeholder="输入密码" />
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
        </el-form-item>

        <el-button class="deepbluebtn" type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
      </div>

      <div class="usersignin"  v-if='showSignIn'>
        <el-form-item prop="username">
          <div class="label">手机号</div>
          <el-input name="username" type="text" v-model="singInFrom.username" autoComplete="on" placeholder="输入手机号" />
        </el-form-item>
        <el-form-item prop="username">
          <div class="label">验证码</div>
          <el-input name="username" type="text" v-model="singInFrom.verify" autoComplete="on" placeholder="输入验证码">
            <el-button class="deepbluebtn embedbtn"  slot="suffix" type="primary" v-if='!verifyButton' @click='sendVerify()'>{{verifyText}}</el-button>
            <el-button class="gray embedbtn"  slot="suffix" type="primary"  v-if='verifyButton' disabled="">{{count}}S</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <div class="label">密码</div>
          <el-input type="password" v-model="singInFrom.password" autoComplete="on" placeholder="输入密码" />
        </el-form-item>
        <el-form-item prop="username">
          <div class="label">确认密码</div>
          <el-input type="password" v-model="singInFrom.ensurePassword" autoComplete="on" placeholder="再次输入密码" />
        </el-form-item>
        <el-button class="deepbluebtn" type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleSingIn()">注册</el-button>
      </div>

      <div class="noaccount"  v-if='!showSignIn'>
        还没有账号?<span @click="toggleShowSign()">点此注册</span>
      </div>
      <div class="noaccount"  v-if='showSignIn'>
        已有账号?<span @click="toggleShowSign()">点此登陆</span>
      </div>
    </el-form>
    <div class="loginfooter">©杭州禅一科技有限公司</div>
  </div> -->
</template>

<script>
// import { sendCode, signUp } from '@/api/index'

// export default {
//   components: {},
//   name: 'login',
//   data() {
//     const validateUsername = (rule, value, callback) => {
//       // if (!isvalidUsername(value)) {
//       //   callback(new Error('请输入正确的用户名'))
//       // } else {
//       //   callback()
//       // }
//       callback()
//     }
//     const validatePassword = (rule, value, callback) => {
//       // if (value.length < 6) {
//       //   callback(new Error('密码不能小于6位'))
//       // } else {
//       //   callback()
//       // }
//       callback()
//     }
//     return {
//       loginForm: {
//         username: '',
//         password: ''
//       },
//       loginRules: {
//         username: [{ required: true, trigger: 'blur', validator: validateUsername }],
//         password: [{ required: true, trigger: 'blur', validator: validatePassword }]
//       },
//       singInFrom: {
//         username: '',
//         password: '',
//         verify: '',
//         ensurePassword: ''
//       },
//       pwdType: 'password',
//       loading: false,
//       showDialog: false,
//       showSignIn: false,
//       verifyText: '获取验证码',
//       verifyButton: false,
//       timer: null,
//       count: 60
//     }
//   },
//   mounted() {},
//   watch: {
//     showSignIn(val) {
//       this.reset()
//     }
//   },
//   methods: {
//     showPwd() {
//       if (this.pwdType === 'password') {
//         this.pwdType = ''
//       } else {
//         this.pwdType = 'password'
//       }
//     },
//     handleLogin() {
//       this.$refs.loginForm.validate(valid => {
//         if (valid) {
//           this.loading = true
//           this.$store
//             .dispatch('login', this.loginForm)
//             .then(() => {
//               this.loading = false
//               this.$router.push({ path: '/' })
//               // this.showDialog = true
//             })
//             .catch(() => {
//               this.loading = false
//             })
//         } else {
//           console.log('error submit!!')
//           return false
//         }
//       })
//     },
//     handleSingIn() {
//       if (!/^1\d{10}$/.test(this.singInFrom.username)) {
//         this.$message.error('手机号格式不正确')
//       } else if (this.singInFrom.password !== this.singInFrom.ensurePassword) {
//         this.$message.error('密码不一致')
//       } else {
//         var data = {
//           phone: this.singInFrom.username,
//           password: this.singInFrom.password,
//           code: this.singInFrom.verify
//         }
//         signUp(data)
//           .then(res => {
//             console.log(res)
//             this.loginForm.username = this.singInFrom.username
//             this.loginForm.password = this.singInFrom.password
//             this.handleLogin()
//           })
//           .catch(error => {
//             this.$message.error(error)
//           })
//       }
//     },
//     toggleShowSign() {
//       this.showSignIn = !this.showSignIn
//     },
//     sendVerify() {
//       if (!/^1\d{10}$/.test(this.singInFrom.username)) {
//         this.$message.error('手机号格式不正确')
//       } else {
//         sendCode(this.singInFrom.username).then(res => {
//           if (res.data.code === '200') {
//             this.$message.success('发送成功')
//             this.verifyButton = true
//             if (!this.timer) {
//               this.timer = setInterval(() => {
//                 if (this.count > 0) {
//                   this.count = this.count - 1
//                 } else {
//                   this.verifyButton = false
//                   this.verifyText = `再次获取`
//                   clearInterval(this.timer)
//                   this.timer = null
//                   this.count = 60
//                 }
//               }, 1000)
//             }
//           } else {
//             this.$message.error('发送失败')
//           }
//         })
//       }
//     },
//     reset() {
//       this.loginForm = {
//         username: '',
//         password: ''
//       }
//       this.singInFrom = {
//         username: '',
//         password: '',
//         verify: '',
//         ensurePassword: ''
//       }
//     }
//     // afterQRScan() {
//     //   const hash = window.location.hash.slice(1)
//     //   const hashObj = getQueryObject(hash)
//     //   const originUrl = window.location.origin
//     //   history.replaceState({}, '', originUrl)
//     //   const codeMap = {
//     //     wechat: 'code',
//     //     tencent: 'code'
//     //   }
//     //   const codeName = hashObj[codeMap[this.auth_type]]
//     //   if (!codeName) {
//     //     alert('第三方登录失败')
//     //   } else {
//     //     this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
//     //       this.$router.push({ path: '/' })
//     //     })
//     //   }
//     // }
//   }
//   // created() {
//   //   window.addEventListener('hashchange', this.afterQRScan)
//   // },
//   // destroyed() {
//   //   window.removeEventListener('hashchange', this.afterQRScan)
//   // }
// }
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/styles/mixin.scss';
@import 'src/styles/variables.scss';
$bg: #130a2f;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  @include relative;
  height: 100vh;
  background-color: $bg;

  .tips {
    font-size: 13px;
    color: #fff;
    margin-bottom: 10px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 40px;
    color: $light_gray;
    margin: 0px auto;
    text-align: center;
    font-family: SourceHanSansCN;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: auto;
    margin-top: 18vh;
  }
  .el-form-item {
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 40px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .el-button {
    margin-top: 5vh;
  }
  .label {
    margin-bottom: 10px;
  }
  .noaccount {
    font-size: 14px;
    text-align: center;
    margin-top: 6vh;
    span {
      display: inline-block;
      margin-left: 3px;
      text-decoration: underline;
      &:hover {
        cursor: pointer;
        color: $fontblue;
      }
    }
  }
  .logo {
    text-align: center;
    margin-bottom: 15px;
    .svg-icon {
      fill: #fff;
      width: 98px;
      height: 20px;
    }
  }
  .userlogin {
    margin-top: 10vh;
  }
  .usersignin {
    margin-top: 5vh;
  }
  .loginfooter {
    text-align: center;
    opacity: 0.4;
    font-size: 12px;
    position: absolute;
    bottom: 3.5vh;
    left: 0;
    right: 0;
  }
  .embedbtn {
    margin-top: 6px;
    padding: 8px 0;
    width: 88px;
    height: 36px;
    display: inline-block;
  }
  .gray {
    background-color: #534488;
    &:hover {
      background-color: #534488;
    }
  }
}
@media screen and (max-height: 810px) {
  .login-container {
    .login-form {
      margin-top: 8vh;
    }
  }
}
</style>
