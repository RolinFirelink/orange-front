<template>
  <div>
    <!--  -->
    <el-card shadow="never">
      <div class="heard">常见症状</div>
      <!-- 选择框 -->
      <div class="choose">
        <div class="citrusPart">
          <span>疾病部位:</span>
          <el-select size="small" @change="getCatalogue()" style="margin-left: 10px" placeholder="请选择"
            v-model="searchInfo.citrusPartId">
            <el-option v-for="part in partOptions" :key="part.value" :label="part.label" :value="part.value"> </el-option>
          </el-select>
        </div>
        <div class="disasterType">
          <span>疾病类型:</span>
          <el-select size="small" @change="getCatalogue()" style="margin-left: 10px" placeholder="请选择"
            v-model="searchInfo.disasterTypeId">
            <el-option v-for="item in diseaseOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 展示框 -->
      <div class="catalogueInfo" v-loading="loading">
        <el-radio-group v-for="(item, index) in catalogueInfo" :key="index" v-model="diseaseId">
          <el-radio :label="item.diseaseId">{{ item.diseaseCharacteristic }}</el-radio>
        </el-radio-group>
      </div>
      <!-- 诊断 -->
      <div class="btn_diagnose">
        <el-button type="search" size="small" @click="toDetails()">诊断</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      partOptions: [
        // { value: '1', label: '根' },
        // { value: '2', label: '茎' },
        { value: '3', label: '叶' },
        // { value: '4', label: '树干' },
        // { value: '5', label: '枝' },
        // { value: '6', label: '新梢' },
        { value: '7', label: '果' },
      ],
      diseaseOptions: [
        // { value: '1', label: '虫害' },
        { value: '2', label: '病害' },
        // { value: '3', label: '生理病害' },
        // { value: '4', label: '草害' },
        // { value: '5', label: '天敌' },
      ],
      searchInfo: {
        citrusPartId: '7',
        disasterTypeId: '2',
      },
      catalogueInfo: [],
      diseaseId: '',
      loading: '',
    }
  },
  created() {
    this.getCatalogue()
  },
  methods: {
    async getCatalogue() {
      this.loading = true
      const { data: res } = await this.$http.get(`/dev2/disease-information/catalogue?citrusPartId=${this.searchInfo.citrusPartId}&disasterTypeId=${this.searchInfo.disasterTypeId}`)
      if (res.code === 0) {
        this.catalogueInfo = res.data.catalogue
      }
      this.loading = false
    },
    toDetails() {
      console.log(this.diseaseId, '选择')
      if (this.diseaseId) {
        this.$router.push({ path: '/diseaseDetails', query: { id: this.diseaseId } })
        this.$message.success('查询成功')
      } else {
        this.$message.error("查询失败")
      }

    },
  },
}
</script>

<style scoped>
.heard {
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.choose {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: 500;
}

.disasterType {
  margin-left: 25px;
}

.catalogueInfo {
  min-height: 100px;
}

::v-deep .el-radio-group {
  display: block;
  margin-bottom: 10px;
}

::v-deep .el-radio__label {
  font-size: 16px;
  font-weight: 500;
}

.btn_diagnose {
  margin-top: 20px;
}

.el-button--search {
  background: rgb(8, 46, 83);
  color: #fff;
  width: 65px;
  font-size: 15px;
}
</style>