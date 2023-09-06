<template>
  <div>
    <div class="tabsBox">
      <!-- <div class="tabsName">{{ tabsName[activeName] }}</div> -->
      <el-card shadow="never" style="margin-bottom: 30px; height: 500px">
        <el-tabs style="height: 200px" v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="柑橘特征" name="fea" style="font-weight: bold"
            ><p class="mes2">{{ data1.features }}</p></el-tab-pane
          >
          <el-tab-pane label="生长环境" name="env" class="lab"
            ><p class="mes2">{{ data1.environment }}</p></el-tab-pane
          >
          <el-tab-pane label="柑橘分布" name="dis"
            ><p class="mes2">{{ data1.distribution }}</p></el-tab-pane
          >
          <el-tab-pane label="柑橘分类" name="cha"
            ><p class="mes2">{{ data1.character }}</p></el-tab-pane
          >
          <el-tab-pane label="柑橘存储" name="sto"
            ><p class="mes2">{{ data1.values }}</p></el-tab-pane
          >
          <el-tab-pane label="柑橘价值" name="val"
            ><p class="mes2">{{ data1.cultivate }}</p></el-tab-pane
          >
          <el-tab-pane label="柑橘培养" name="cult"
            ><p class="mes2">{{ data1.storage }}</p></el-tab-pane
          >
          <el-tab-pane label="柑橘文化" name="cul"
            ><p class="mes2">{{ data1.culture }}</p></el-tab-pane
          >
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data1: {},
      activeName: 'fea',
      tabsName: {
        fea: '柑橘特征',
        env: '生长环境',
        dis: '柑橘分布',
        cha: '柑橘分类',
        sto: '柑橘存储',
        cult: '柑橘培养',
        cul: '柑橘文化',
        val: '柑橘价值',
      },
    }
  },
  created() {
    this.getEncycloprdia()
  },
  methods: {
    // 根据疾病名称获取对应农药
    async getEncycloprdia() {
      const { data: res } = await this.$http.get(`/dev3/orangeBaiKe/orange`)
      // console.log(res, '农药')
      if (res.code === 0) {
        // let picAndInfo = res.data
        // let arr = Object.keys(picAndInfo).map(key=>{
        //   console.log(picAndInfo);
        //   return picAndInfo[key]
        // })
        // console.log(arr[0].values)
        this.data1 = res.data.orangeBaiKeVo
      }
      // console.log(this.data)
    },
    handleClick(tab, event) {
      console.log(tab.name, event)
      console.log(this.activeName)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
  },
}
</script>
<style scoped>
.body-card {
  width: 100%;
}
.card-left {
  width: 30%;
  float: left;
}
.card-right {
  width: 69%;
  float: right;
  margin-left: 1%;
}
.title {
  font-size: 20px;
  color: coral;
}
.tabsBox {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
.tabsName {
  font-size: 18px;
  color: #666;
}
::v-deep .el-tabs__content {
  overflow: visible;
}
::v-deep .el-tabs__item {
  font-size: 16px;
  color: #000;
}
::v-deep .el-tabs__item:hover {
  color: rgb(255, 102, 0);
}
::v-deep .el-tabs__item.is-active {
  color: rgb(255, 0, 0);
}
::v-deep .el-icon-arrow-left {
  color: #000;
}
::v-deep .el-icon-arrow-right {
  color: #000;
}
::v-deep .el-tabs__nav-wrap::after {
  height: 0;
}
::v-deep .el-tabs__active-bar {
  background-color: rgb(255, 102, 0);
}
.imgBox {
  border: 1px solid #000;
  width: 270px;
  height: 240px;
}
.dashed {
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: dashed 1px #e5e5e5;
}
.lab {
  font-weight: bold;
}
.mes {
  display: flex;
  align-items: center;
}
.mes1 {
  white-space: nowrap;
  font-weight: 700;
  margin-right: 15px;
}
.mes2 {
  font-weight: bold;
  font-size: 20px;
  color: coral;
  text-indent: 2em;
}
.footer {
  height: 10px;
}
.baseInfoBox {
  font-size: 18px;
}
.controlBox {
  font-size: 18px;
}
.el-divider--horizontal {
  margin-top: 0px;
  height: 3px;
  background-color: coral;
}
.picture img {
  margin-right: 10px;
  width: 285px;
  height: 245px;
}
.pictureChoose {
  margin-bottom: 25px;
}
::v-deep .el-radio__label {
  font-size: 17px;
}
.insecticideName {
  font-size: 19px;
  margin-right: 25px;
  cursor: pointer;
}
.insecticideName:hover {
  color: coral;
}
.dialog_span {
  font-size: 18px;
  color: coral;
}
.dialog_span1 {
  font-size: 16px;
  line-height: 15px;
}
.picDiv {
  display: inline-block;
  width: 270px;
  height: 280px;
  margin-right: 10px;
}
.picDiv img {
  padding-right: 10px;
}
.picName {
  text-align: center;
  font-size: 16px;
}
.tableInfo {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
}
.tableInfo td,
.tableInfo th {
  border: 1px solid #333;
  color: #666;
  height: 60px;
}
.tdName {
  font-size: 18px;
  width: 100px;
  background-color: #cad9ea;
}
.tdInfo {
  font-size: 16px;
}
</style>
