<template>
  <div>
    <el-card shadow="never" style="min-height: 400px">
      <div>选择图片进行智能诊断</div>
      <div class="upImg">
        <el-upload class="upload-demo" ref="upload" list-type="picture-card"
          action="http://120.77.156.205:8804/dev1/test/intelligent_diagnosis" name="pic" :file-list="fileList" :limit="1"
          :on-exceed="handleExceed" :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="false"
          :on-change="changefn" :on-success="successfn" :on-progress="progressfn">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-button class="jugdgeBtn" style="margin-left: 10px" size="small" type="success"
          @click="submitUpload">智能诊断</el-button>
      </div>
      <div v-loading="loading" class="diseaseName">
        <div class="title">诊断结果</div>
        <img class="judgeImg" v-show="flag != ''" :src="resData.imgUrl" alt="" />
        <br />
        <span class="name" v-for="(item, index) in diseaseName" :key="index">名称：<span class="nameSpan"
            @click="toDetails(item)">{{ item }} </span> 相似度：{{ resData.scores[index] * 100 }}%<br /></span>
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      flag: '',
      dialogVisible: false,
      diseaseName: [],
      resData: {},
      loading: false,
      nameId: '',
      fileList: [],
    }
  },
  mounted() {
    if (sessionStorage.getItem('msgInfo')) {
      this.flag = 1
      this.resData = JSON.parse(sessionStorage.getItem('resData'))
      this.diseaseName = this.resData.classes
      this.fileList[0] = this.resData.imgUrl
    }
  },
  destroyed() {
    // 销毁组件
    sessionStorage.removeItem('msgInfo')
  },
  methods: {
    changefn(file) {
      console.log(file, '123')
      this.dialogImageUrl = file.url
    },
    progressfn(event, file) {
      console.log(event, file, '图片')
    },
    successfn(response) {
      console.log(response, '诊断')
      if (response.code === 200) {
        this.resData = response.data
        this.diseaseName = response.data.classes
        this.flag = 1
        this.$message.success('诊断成功！')
        console.log(this.resData)
        this.loading = false
      } else if (response.code === 1) {
        this.$message.error(response.message + '请稍后重试')
        this.loading = false
      }
    },
    // 根据name查询id，跳转到详情页
    async toDetails(name) {
      try {
        const { data } = await this.$http.get(`/dev1/test/nameToID/{name}?name=${name}`)
        if (data.code === 0) {
          this.nameId = data.data.diseaseId
          sessionStorage.setItem('resData', JSON.stringify(this.resData))
          this.$router.push({ path: '/diseaseDetails', query: { id: this.nameId } })
        } else {
          this.$message.error(data.message)
        }
      } catch (error) {
        this.$message.error('没有该病的信息，请待有关人员完善')
      }
    },
    handleExceed() {
      this.$message.warning(`当前限制选择 1 张图片`)
    },
    submitUpload() {
      this.loading = true
      this.$refs.upload.submit()
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePreview(file) {
      console.log(file)
      this.dialogVisible = true
    },
  },
}
</script>

<style scoped>
.upImg {
  float: left;
  width: 40%;
  text-align: center;
  border-right: 1px solid rgb(193, 193, 193);
}

.jugdgeBtn {
  margin-top: 20px;
}

.title {
  font-size: 20px;
  font-weight: 500;
}

.diseaseName {
  float: right;
  width: 30%;
  margin-left: 1%;
}

.name {
  margin-top: 20px;
  margin-right: 10px;
  font-size: 15px;
}

.judgeImg {
  width: 150px;
  height: 150px;
}

.nameSpan {
  margin-right: 10px;
  color: rgb(109, 96, 96);
  cursor: pointer;
  /* color: rgb(34, 139, 34); */
}

.nameSpan:hover {
  color: rgb(34, 139, 34);
}
</style>
