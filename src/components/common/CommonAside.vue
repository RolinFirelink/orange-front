<template>
  <el-menu background-color="#006400" text-color="#fff" active-text-color="#fff" :default-active="String(activeNav)" :collapse="isCollapse" :unique-opened="true" class="el-menu-vertical-demo">
    <div class="header_speace"></div>
    <!-- 没有二级菜单的导航栏 -->
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <!-- <i :class="'el-icon-' + item.icon"></i> -->
      <img style="width: 20px; height: 20px" :src="item.icon" />
      <span slot="title" style="font-size: 15px; margin-left: 5px">{{ item.label }}</span>
    </el-menu-item>
    <!-- 疾病防治 -->
    <el-submenu :index="item.path" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <!-- <i :class="'el-icon-' + item.icon"></i> -->
        <img style="width: 20px; height: 20px" :src="item.icon" />
        <span style="font-size: 15px; margin-left: 5px">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
          <!-- <i :class="'el-icon-' + subItem.icon"></i> -->
          <img style="width: 20px; height: 20px" :src="subItem.icon" />
          <span style="font-size: 15px; margin-left: 5px" slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- 倒数第二个菜单 -->
    <el-menu-item :index="item.path" v-for="item in lastChildren" :key="item.path" @click="clickMenu(item)">
      <!-- <i :class="'el-icon-' + item.icon"></i> -->
      <img style="width: 20px; height: 20px" :src="item.icon" />
      <span slot="title" style="font-size: 15px; margin-left: 5px">{{ item.label }}</span>
      <!-- 最后一个菜单 -->
    </el-menu-item>
    <el-submenu :index="item.path" v-for="(item, index) in lastHasChildren" :key="index">
      <template slot="title">
        <!-- <i :class="'el-icon-' + item.icon"></i> -->
        <img style="width: 20px; height: 20px" :src="item.icon" />
        <span style="font-size: 15px; margin-left: 5px">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
          <!-- <i :class="'el-icon-' + subItem.icon"></i> -->
          <img style="width: 20px; height: 20px" :src="subItem.icon" />
          <span style="font-size: 15px; margin-left: 5px" slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import MenuData from './menu_data.js'
export default {
  data() {
    console.log('菜单', MenuData.get_menu_data())
    return {
      asideMenu: MenuData.get_menu_data(),
    }
  },
  computed: {
    // 判断导航栏是否有子节点
    noChildren() {
      // this.asideMenu.filter(item => console.log(item,"导航"))
      // return this.asideMenu.filter((item) => !item.children && item.label != '视频监控' && item.label != '用药指导' && item.label != '种植技术')
      return this.asideMenu.filter((item) => !item.children && item.label != '用药指导')
    },
    hasChildren() {
      return this.asideMenu.filter((item) => item.children && item.label === '疾病防治')
    },
    lastHasChildren() {
      return this.asideMenu.filter((item) => item.children && item.label === '柑橘基地(仲恺)')
    },
    lastChildren() {
      // return this.asideMenu.filter((item) => item.label === '视频监控' || item.label === '用药指导' || item.label === '种植技术')
      return this.asideMenu.filter((item) => item.label === '用药指导')
    },
    isCollapse() {
      return this.$store.state.menu.isCollapse
    },
    // 设置当前激活的导航
    activeNav() {
      return this.$route.path
    },
  },
  methods: {
    // 点击切换路由
    clickMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
      console.log(item.name)
    },
  },
}
</script>
<style lang="scss">
.el-menu {
  height: 100%;
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.header_speace {
  height: 55px;
}
</style>
