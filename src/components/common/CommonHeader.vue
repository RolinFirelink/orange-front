<template>
  <header>
    <div>
      <i class="el-icon-s-fold" v-show="!isCollapse" @click="collapseMenu"></i>
      <i class="el-icon-s-unfold" v-show="isCollapse" @click="collapseMenu"></i>
    </div>
    <div style="font-size:20px;display:flex">
      <span>物联网+的柑橘农药减施监控云服务平台</span>
    </div>
    <div class="opt-wrapper">
      <el-dropdown :hide-on-click="false" @command="handleCommand">
        <span class="el-dropdown-link">{{ loginStatus == '2' ? '管理员' : '普通用户' }}</span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="slef_info"><i class="el-icon-info"></i>个人中心</el-dropdown-item>
          <el-dropdown-item command="all_members"><i class="el-icon-s-grid"></i>查看全部队员</el-dropdown-item> -->
          <el-dropdown-item command="logout"><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      user: '普通用户',
      loginStatus: '',
      avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    }
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.menu.isCollapse,
    }),
  },
  mounted() {
    sessionStorage.clear()
    // 获取状态码
    this.loginStatus = JSON.parse(window.localStorage.getItem('loginStatus'))
  },
  methods: {
    collapseMenu() {
      this.$store.commit('changeMenu')
    },
    // 退出方法
    handleCommand(command) {
      if (command === 'logout') {
        sessionStorage.clear()
        sessionStorage.removeItem('tabs')
        this.$router.push('/login')
      } else if (command === 'slef_info') {
        // window.location.reload()
        this.$router.push('/main/user')
        // this.$message.success('click on item ' + command)
      } else {
        this.$router.push('/allMembers')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  color: #fff;

  .el-icon-s-fold,
  .el-icon-s-unfold {
    font-size: 25px;
    cursor: pointer;
  }
}

// .opt-wrapper {
//   display: flex;
//   align-items: center;
// }
.avatar {
  margin-top: 10px;
  // display: block;
  margin-right: 40px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.el-dropdown-link {
  display: flex;
  color: #fff;
  font-size: 20px;
}
</style>
