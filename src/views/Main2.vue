<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <CommonAside></CommonAside>
    </el-aside>
    <el-container>
      <el-header style="background: #228b22">
        <CommonHeader></CommonHeader>
      </el-header>
      <common-tab></common-tab>
      <el-main id="con_lf_top_div" class="body-main">
        <router-view></router-view>
        <CommonFooter></CommonFooter>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonAside from '../components/common/CommonAside.vue'
import CommonHeader from '../components/common/CommonHeader.vue'
import CommonTab from '../components/common/CommonTab.vue'
import CommonFooter from '../components/common/CommonFooter.vue'

export default {
  components: { CommonAside, CommonHeader, CommonTab, CommonFooter },
}
</script>
<style>
.body-main {
  background: rgb(231, 234, 237);
  padding: 10px;
  background-image: url(../assets/bgimg1.png);
}
</style>
