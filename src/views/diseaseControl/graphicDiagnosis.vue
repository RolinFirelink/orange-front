<template>
  <!-- 图文诊断 -->
  <div>
    <!-- 查询 -->
    <el-card shadow="never" style="margin-bottom: 15px">
      <div class="search-card">
        <div class="search-input">
          <div style="flex-shrink: 0">疾病名称：</div>
          <el-input v-model="searchInfo.diseaseChineseName" size="small" style="margin-left: 10px"
            placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span>疾病部位:</span>
          <el-select v-model="searchInfo.citrusPartId" size="small" style="margin-left: 10px" placeholder="请选择">
            <el-option v-for="item in partOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div>
          <span>疾病类型:</span>
          <el-select v-model="searchInfo.disasterTypeId" size="small" style="margin-left: 10px" placeholder="请选择">
            <el-option v-for="item in diseaseOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button size="small" @click="newSearchInfo()">重置</el-button>
          <el-button type="search" @click="searchDiseaseSelect()" size="small">查询</el-button>
        </div>
      </div>
    </el-card>
    <!-- 查询结束 -->
    <!-- 展示开始 -->
    <el-card shadow="never">
      <el-row v-loading="loading" :gutter="20" v-for="(item, index) in length" :key="index">
        <el-col :span="8" v-if="(item - 1) * 3 + 0 < graphicInfo.length">
          <div class="boxDiv">
            <el-tooltip class="item" effect="light" content="预览" placement="top">
              <el-image style="width: 140px; height: 105px; margin-top: 5px"
                :src="graphicInfo[(item - 1) * 3 + 0].diseasePictureUrl"
                :preview-src-list="[graphicInfo[(item - 1) * 3 + 0].diseasePictureUrl]">
              </el-image>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
              <div @click="openDetails((item - 1) * 3 + 0)" class="boxDivName">{{ graphicInfo[(item - 1) * 3 +
                0].diseaseConciseDescription }}</div>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="8" v-if="(item - 1) * 3 + 1 < graphicInfo.length">
          <div class="boxDiv">
            <el-tooltip class="item" effect="light" content="预览" placement="top">
              <el-image style="width: 140px; height: 105px; margin-top: 5px"
                :src="graphicInfo[(item - 1) * 3 + 1].diseasePictureUrl"
                :preview-src-list="[graphicInfo[(item - 1) * 3 + 1].diseasePictureUrl]">
              </el-image>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
              <div @click="openDetails((item - 1) * 3 + 1)" class="boxDivName">{{ graphicInfo[(item - 1) * 3 +
                1].diseaseConciseDescription }}</div>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="8" v-if="(item - 1) * 3 + 2 < graphicInfo.length">
          <div class="boxDiv">
            <el-tooltip class="item" effect="light" content="预览" placement="top">
              <el-image style="width: 140px; height: 105px; margin-top: 5px"
                :src="graphicInfo[(item - 1) * 3 + 2].diseasePictureUrl"
                :preview-src-list="[graphicInfo[(item - 1) * 3 + 2].diseasePictureUrl]">
              </el-image>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
              <div @click="openDetails((item - 1) * 3 + 2)" class="boxDivName">{{ graphicInfo[(item - 1) * 3 +
                2].diseaseConciseDescription }}</div>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pageInfo.pagenum" :page-sizes="[9, 12, 15]" :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      graphicInfo: [],
      pageInfo: {
        pagenum: 1,
        pagesize: 12,
      },
      total: 0,
      partOptions: [
        { value: '1', label: '根' },
        { value: '2', label: '茎' },
        { value: '3', label: '叶' },
        { value: '4', label: '树干' },
        { value: '5', label: '枝' },
        { value: '6', label: '新梢' },
        { value: '7', label: '果' },
      ],
      diseaseOptions: [
        { value: '1', label: '虫害' },
        { value: '2', label: '病害' },
        { value: '3', label: '生理病害' },
        { value: '4', label: '草害' },
        { value: '5', label: '天敌' },
      ],
      length: 0,
      searchInfo: {
        // 部位
        citrusPartId: '',
        // 疾病类型
        disasterTypeId: '',
        // 名称
        diseaseChineseName: '',
      },
      searchKey: '',
      loading: true,
    }
  },
  created() {
    if (sessionStorage.getItem('msgInfo') && sessionStorage.getItem('flag') == 2) {
      this.searchInfo = JSON.parse(sessionStorage.getItem('searchInfo'))
      this.pageInfo = JSON.parse(sessionStorage.getItem('pageInfo'))
      this.searchDiseaseSelect()
    } else {
      this.getgraphicInfo()
    }
  },
  mounted() {
    sessionStorage.setItem('flag', 1)
  },
  destroyed() {
    // 销毁组件
    sessionStorage.removeItem('msgInfo')
  },
  methods: {
    // 获取图文
    async getgraphicInfo() {
      const { data: res } = await this.$http.get(`/dev2/disease-information/showDiseasePicture?pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`)
      if (res.code === 0) {
        this.graphicInfo = res.data.diseasePictureNameVOPage.records
        this.total = res.data.diseasePictureNameVOPage.total
        console.log(Math.ceil(this.graphicInfo.length / 3))
        this.length = Math.ceil(this.graphicInfo.length / 3)
        this.loading = false
      }
    },
    // 查询疾病
    async searchDiseaseSelect() {
      sessionStorage.setItem('flag', 2)
      this.loading = true
      if (this.searchInfo.diseaseChineseName === '' && this.searchInfo.citrusPartId === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/diseaseSelect?disasterTypeId=${this.searchInfo.disasterTypeId}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.graphicInfo = res.data.diseasePictureNameVOPage.records
          this.total = res.data.diseasePictureNameVOPage.total
          if (!res.data.diseasePictureNameVOPage.total) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
        }
      } else if (this.searchInfo.diseaseChineseName === '' && this.searchInfo.disasterTypeId === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/diseaseSelect?citrusPartId=${this.searchInfo.citrusPartId}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.graphicInfo = res.data.diseasePictureNameVOPage.records
          this.total = res.data.diseasePictureNameVOPage.total
          if (!res.data.diseasePictureNameVOPage.total) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
        }
      } else if (this.searchInfo.citrusPartId === '' && this.searchInfo.disasterTypeId === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/diseaseSelect?diseaseChineseName=${this.searchInfo.diseaseChineseName}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.graphicInfo = res.data.diseasePictureNameVOPage.records
          this.total = res.data.diseasePictureNameVOPage.total
          if (!res.data.diseasePictureNameVOPage.total) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
        }
      } else if (this.searchInfo.diseaseChineseName === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/diseaseSelect?citrusPartId=${this.searchInfo.citrusPartId}&disasterTypeId=${this.searchInfo.disasterTypeId}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.graphicInfo = res.data.diseasePictureNameVOPage.records
          this.total = res.data.diseasePictureNameVOPage.total
          if (!res.data.diseasePictureNameVOPage.total) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
        }
      } else if (this.searchInfo.citrusPartId === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/diseaseSelect?disasterTypeId=${this.searchInfo.disasterTypeId}&diseaseChineseName=${this.searchInfo.diseaseChineseName}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.graphicInfo = res.data.diseasePictureNameVOPage.records
          this.total = res.data.diseasePictureNameVOPage.total
          if (!res.data.diseasePictureNameVOPage.total) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
        }
      } else if (this.searchInfo.disasterTypeId === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/diseaseSelect?citrusPartId=${this.searchInfo.citrusPartId}&diseaseChineseName=${this.searchInfo.diseaseChineseName}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.graphicInfo = res.data.diseasePictureNameVOPage.records
          this.total = res.data.diseasePictureNameVOPage.total
          if (!res.data.diseasePictureNameVOPage.total) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
        }
      } else {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/diseaseSelect?citrusPartId=${this.searchInfo.citrusPartId}&disasterTypeId=${this.searchInfo.disasterTypeId}&diseaseChineseName=${this.searchInfo.diseaseChineseName}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.graphicInfo = res.data.diseasePictureNameVOPage.records
          this.total = res.data.diseasePictureNameVOPage.total
          if (!res.data.diseasePictureNameVOPage.total) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
        }
      }
      this.loading = false
      this.length = Math.ceil(this.graphicInfo.length / 3)
    },
    // 重置查询条件
    newSearchInfo() {
      ; (this.searchInfo.citrusPartId = ''), (this.searchInfo.disasterTypeId = '')
    },

    openDetails(index) {
      sessionStorage.setItem('searchInfo', JSON.stringify(this.searchInfo))
      sessionStorage.setItem('pageInfo', JSON.stringify(this.pageInfo))
      this.$router.push({ path: '/diseaseDetails', query: { id: this.graphicInfo[index].diseaseId } })
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageInfo.pagesize = val
      if (sessionStorage.getItem('flag') == 2) {
        this.searchDiseaseSelect()
      } else {
        this.getgraphicInfo()
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageInfo.pagenum = val
      if (sessionStorage.getItem('flag') == 2) {
        this.searchDiseaseSelect()
      } else {
        this.getgraphicInfo()
      }
    },
  },
}
</script>

<style scoped>
.search-card {
  display: flex;
  align-items: center;
  font-size: 15px;
  justify-content: space-between;
}

.search-input {
  display: flex;
  align-items: center;
}

.el-button--search {
  background: rgb(8, 46, 83);
  color: #fff;
}

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
  justify-content: center;
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