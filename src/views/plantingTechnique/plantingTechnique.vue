<template>
  <div>
    <el-card shadow="never">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="种植技术" name="first">
          <Planting></Planting>
        </el-tab-pane>
        <el-tab-pane label="专家" name="second">
          <Specialis />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Planting from './planting.vue'
import Specialis from './Specialis.vue'
export default {
  components: {
    Planting,
    Specialis,
  },
  data() {
    return {
      activeName: 'first',
      
    }
  },
  created() { },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    async openDetails() {
      const { data: res } = await this.$http.get(`/dev2/expert/get`)
      // console.log(res.data);
    },
    handleClick(row) {
      // console.log(row);
    },
  },
}
</script>

<style scoped>
::v-deep .el-tabs__item.is-top {
  font-size: 20px;
  font-weight: 500;
  padding-right: 30px;
  padding-left: 40px;
}

.header {
  display: flex;
}

.header img {
  margin-left: 10px;
}

.title {
  margin-left: 10px;
  min-height: 90px;
}

.name {
  font-size: 1.3em;
  color: black;
  margin-top: -10px;
}

.title p {
  color: rgb(151, 151, 151);
  margin-top: 4px;
}
</style>