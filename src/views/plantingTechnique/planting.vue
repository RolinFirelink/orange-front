<template>
  <div>
    <div class="plantingBox">
      <el-card v-loading="loading" shadow="never">
        <el-row :gutter="20" v-for="(item, index) in length" :key="index">
          <el-col :span="8" v-if="(item - 1) * 3 + 0 < technologyInfo.length">
            <div class="boxDiv">
              <el-tooltip class="item" effect="light" content="预览" placement="top">
                <el-image style="width: 140px; height: 105px; margin-top: 5px" :src="technologyInfo[(item - 1) * 3 + 0].picUrl" :preview-src-list="[technologyInfo[(item - 1) * 3 + 0].picUrl]">
                </el-image>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
                <div @click="openDetails((item - 1) * 3 + 0)" class="boxDivName">{{ technologyInfo[(item - 1) * 3 + 0].title }}</div>
              </el-tooltip>
            </div>
          </el-col>
          <el-col :span="8" v-if="(item - 1) * 3 + 1 < technologyInfo.length">
            <div class="boxDiv">
              <el-tooltip class="item" effect="light" content="预览" placement="top">
                <el-image style="width: 140px; height: 105px; margin-top: 5px" :src="technologyInfo[(item - 1) * 3 + 1].picUrl" :preview-src-list="[technologyInfo[(item - 1) * 3 + 1].picUrl]">
                </el-image>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
                <div @click="openDetails((item - 1) * 3 + 1)" class="boxDivName">{{ technologyInfo[(item - 1) * 3 + 1].title }}</div>
              </el-tooltip>
            </div></el-col
          >
          <el-col :span="8" v-if="(item - 1) * 3 + 2 < technologyInfo.length">
            <div class="boxDiv">
              <el-tooltip class="item" effect="light" content="预览" placement="top">
                <el-image style="width: 140px; height: 105px; margin-top: 5px" :src="technologyInfo[(item - 1) * 3 + 2].picUrl" :preview-src-list="[technologyInfo[(item - 1) * 3 + 2].picUrl]">
                </el-image>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
                <div @click="openDetails((item - 1) * 3 + 2)" class="boxDivName">{{ technologyInfo[(item - 1) * 3 + 2].title }}</div>
              </el-tooltip>
            </div></el-col
          >
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      technologyInfo: [],
      length: 0,
      loading: true,
    }
  },
  created() {
    this.getTechnologyInfo()
  },
  methods: {
    // 获取信息
    async getTechnologyInfo() {
      const { data: res } = await this.$http.get(`/dev1/technology/list`)
      if (res.code === 0) {
        this.technologyInfo = res.data.items
        this.length = Math.ceil(this.technologyInfo.length / 3)
        this.loading = false
      }
    },

    openDetails(index) {
      this.$router.push({ path: '/technologyDetails', query: { url: this.technologyInfo[index].detailUrl } })
    },
  },
}
</script>

<style scoped>
::v-deep .el-col {
  height: 120px;
  width: 400px;
  border: 1px solid #d9d9d9;
  margin-left: 22px;
  margin-bottom: 22px;
}
.boxDiv {
  display: flex;
  /* 针对子元素的垂直方向对齐方式 */
  align-items: center;
  /* 对子元素的水平方向对齐方式 */
  /* justify-content: center; */
}
.boxDivName {
  margin-left: 10px;
  font-size: 17px;
  color: rgba(0, 0, 0, 0.45);
}
::v-deep .el-col-8:hover {
  border: 1px solid #012a5d;
  cursor: pointer;
}
</style>