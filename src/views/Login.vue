<template>
  <div class="container">
    <!-- <div class="logo-box"><img src="../../assets/one.png" alt="" /></div> -->
    <div class="login-box">
      <div class="login-text">物联网+的柑橘农药减施监控云服务平台</div>
      <el-tabs class="tabs" v-model="activeName">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules" class="login-form">
            <el-form-item prop="username" class="login-form-item1">
              <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom" placeholder="请输入用户名" @input="change($event)"></el-input>
            </el-form-item>
            <el-form-item prop="password" class="login-form-item2">
              <el-input v-model="loginForm.password" prefix-icon="el-icon-unlock" placeholder="请输入密码" @input="change($event)" type="password" @keyup.enter.native="handleLoginForm()"></el-input>
            </el-form-item>
            <el-form-item class="login-form-item3">
              <el-button type="primary" @click="handleLoginForm">登录</el-button>
              <el-button type="primary" @click="loginFormReset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <!-- 注册表单 -->
          <el-form :model="registerForm" ref="registerFormRef" :rules="loginFormRules" class="login-form">
            <el-form-item prop="username" class="login-form-item1">
              <el-input v-model="registerForm.username" prefix-icon="el-icon-s-custom" placeholder="请输入用户名" @input="change($event)"></el-input>
            </el-form-item>
            <el-form-item prop="password" class="login-form-item2">
              <el-input
                v-model="registerForm.password"
                prefix-icon="el-icon-unlock"
                placeholder="请输入密码"
                @input="change($event)"
                type="password"
                @keyup.enter.native="handleRegisterForm()"
              ></el-input>
            </el-form-item>
            <el-form-item class="login-form-item3">
              <el-button type="primary" @click="handleRegisterForm">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'login',
      // 登录表单数据对象
      loginForm: {
        username: '',
        password: '',
      },
      // 注册表单数据对象
      registerForm: {
        avater: '',
        gmtCreate: '',
        gmtModified: '',
        id: '',
        isDeleted: 0,
        password: '',
        phone: '',
        realName: '',
        status: 0,
        username: '',
      },
      // 注册表单的校验对象
      registerFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
        ],
      },
      // 登录表单的校验对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
        ],
      },
    }
  },
  props: {
    status,
  },
  methods: {
    // 多层嵌套无法输入解决方法
    change(e) {
      this.$forceUpdate()
    },
    // 表单重置方法
    loginFormReset() {
      this.$refs.loginFormRef.resetFields()
    },
    // 注册方法
    async handleRegisterForm() {
      this.$refs.registerFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return
        const { data: res } = await this.$http.post(`/web/user/register`, this.registerForm)
        if (res.code === 0) {
          this.$message.success('注册成功！')
          // localStorage.setItem('userForm', JSON.stringify(res.data))
          window.localStorage.setItem('token', this.registerForm.password)
          // this.$router.push('/main')
        } else {
          this.$message.error('注册失败')
        }
      })
    },
    // 登录方法
    async handleLoginForm() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return
        const { data: res } = await this.$http.post(`/web/user/login`, this.loginForm)
        if (res.code === 0) {
          //登陆成功

          console.log(res)
          console.log(res.data.user.status) //成功打印

          // window.localStorage.setItem('token', this.loginForm.password)
          // this.$router.push('/main')
          const status = res.data.user.status

          if (status == '2') {
            this.$message.success('登录成功！')
            console.log(status)
            window.localStorage.setItem('token', this.loginForm.password)
            window.localStorage.setItem('loginStatus',status)
            this.$router.push('/main')
            return status
          } else if (status == '0' || status == '1') {
            this.$message.success('登录成功！')
            console.log(status)
             window.localStorage.setItem('loginStatus',status)
            window.localStorage.setItem('token', this.loginForm.password)
            this.$router.push('/main')
            return status
          }
          // localStorage.setItem('userForm', JSON.stringify(res.data))
        } else {
          //登陆失败
          this.$message.error('密码或账号错误！')
        }
      })

      // // console.log('123456')
      // this.$refs.loginFormRef.validate(valid => {
      //   // console.log(valid)
      //   if (!valid) return
      //   console.log('后端开始验证')
      //   /// todo 后端验证用户名和密码成功，存储用户信息，token
      //   // mapMutations();
      //   this.$store.commit('user/save_login', this.loginForm)
      //   this.$router.push('/main')
      // })
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  // background: $loginImg;
  background-size: 100% 100%;
  background-image: url('../assets/bgimg.png');
  //  background-image: linear-gradient(to right, #757f9a,#d7dde8);
}
.logo-box {
  position: absolute;
  top: 30px;
  left: 30px;
  img {
    width: 100px;
    height: 100px;
  }
}
.login-box {
  position: absolute;
  top: 50%;
  right: 5%;
  width: 400px;
  height: 400px;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  border-radius: 5px;
  // background-image: linear-gradient(to right, #606c88,#3f4c6b);
  //  background-image: linear-gradient(to right, #70e1f5,#ffd194);
}
.login-text {
  width: 100%;
  font-size: 20px;
  text-align: center;
  color: #fff;
  margin-bottom: 50px;
  box-sizing: border-box;
  padding: 20px;
}
.el-form-item {
  width: 90%;
  margin: 20px auto;
}
.login-text span {
  line-height: 30px;
  font-size: 18px;
  color: #666666;
}
.login-form-item3 {
  width: 100%;
  text-align: center;
  margin-top: 50px;
}
::v-deep .el-tabs__header {
  margin-top: -50px;
  margin-bottom: 40px;
  margin-left: 25px;
}
::v-deep .el-tabs__content {
  overflow: visible;
}
::v-deep .el-tabs__item {
  font-size: 16px;
  // color: white;
}
::v-deep .el-tabs__item.is-active {
  color: #15cbf3;
}
::v-deep .el-icon-arrow-left {
  color: white;
}
::v-deep .el-icon-arrow-right {
  color: white;
}
::v-deep .el-tabs__nav-wrap::after {
  height: 0;
}
::v-deep .el-tabs__active-bar {
  background-color: #15cbf3;
}
// .login-form {
// 	margin-top: 20px;
// 	@for $i from 1 through 3 {
// 		.login-form-item#{$i} {
// 			opacity: 0;
// 			animation-name: error-num;
// 			animation-duration: 0.5s;
// 			animation-fill-mode: forwards;
// 			animation-delay: calc($i/10) + s;
// 		}
// 	}
// }
</style>
