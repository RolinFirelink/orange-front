<template>
  <div>
    <el-card shadow="never" style="margin-bottom: 15px">
      <div class="search-card">
        <div class="search-input">
          <div style="flex-shrink: 0">药剂名称：</div>
          <el-input size="small" style="margin-left: 10px" v-model="searchInfo.name" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <el-button size="small" @click="newSearchInfo()">重置</el-button>
          <el-button type="search" size="small" @click="getpicAndInfo()">查询</el-button>
        </div>
      </div>
    </el-card>

    <el-card shadow="never">
      <el-table :data="picAndInfo" max-height="560" border style="width: 100%; cursor: pointer" @row-click="toDetails">
        <!-- <el-table-column prop="date" label="序号" width="80"> </el-table-column> -->
        <el-table-column header-align="center" align="center" prop="insecticideName" label="杀虫剂名" width="150px">
        </el-table-column>
        <el-table-column header-align="center" prop="emergencyTreatment" label="急救措施" width="300px"> </el-table-column>
        <el-table-column header-align="center" prop="attention" label="药剂介绍"> </el-table-column>
        <el-table-column header-align="center" prop="remarks" label="备注" width="300px"> </el-table-column>
        <el-table-column header-align="center" prop="attention" label="注意事项"> </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pageInfo.pagenum" :page-sizes="[10, 14, 16, 20]" :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination></el-card>

    <el-dialog title="详细信息" :visible.sync="dialogVisible">
      <table class="tableInfo" :model="addForm" id="printTest">
        <thead></thead>
        <tbody>
          <tr>
            <td class="tdName">英文名</td>
            <br />
            <td class="tdInfo">{{ addForm.englishName }}</td>
          </tr>
          <tr>
            <td class="tdName">杀虫剂名</td>
            <br />
            <td class="tdInfo">{{ addForm.insecticideName }}</td>
          </tr>
          <tr>
            <td class="tdName">活性成分</td>
            <br />
            <td class="tdInfo">{{ addForm.activeConstituent }}</td>
          </tr>
          <tr>
            <td class="tdName">证书编号</td>
            <br />
            <td class="tdInfo">{{ addForm.certificateNumber }}</td>
          </tr>
          <tr>
            <td class="tdName">介绍</td>
            <br />
            <td class="tdInfo" align="left">{{ addForm.instruction }}</td>
          </tr>
          <tr>
            <td class="tdName">紧急处理</td>
            <br />
            <td class="tdInfo" align="left">{{ addForm.emergencyTreatment }}</td>
          </tr>
          <tr>
            <td class="tdName">注意事项</td>
            <br />
            <td class="tdInfo" align="left">{{ addForm.attention }}</td>
          </tr>
          <tr>
            <td class="tdName">备注</td>
            <br />
            <td class="tdInfo" align="left">{{ addForm.remarks }}</td>
          </tr>
        </tbody>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"> 关闭 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 10,
      },
      total: 10,
      dialogVisible: false,
      addForm: {},
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 40,
      },
      total: 10,
      flag: true,
      searchInfo: {
        name: '',
      },
      tableData: [],
      picAndInfo: [],
      loading: true,
    }
  },
  created() {
    this.getDiseaseInfo()
  },
  mounted() {
    this.getpicAndInfo()
  },

  methods: {
    // 重置查询条件
    newSearchInfo() {
      this.searchInfo.name = ''
    },
    // 分页获取疾病数据
    async getDiseaseInfo() {
      const { data: res } = await this.$http.get(`/orange_service/insecticide/getAllInsecticide/${this.pageInfo.pagenum}/${this.pageInfo.pagesize}`)
      console.log(res)
      if (res.code === 0) {
        this.picAndInfo = res.data.rows
        this.addForm = res.data.total
      }
      this.loading = false
    },
    toDetails(row) {
      // this.dialogVisible = true
      console.log(row, '列')
      this.addForm = row
      this.dialogVisible = true
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => { })
    },
    // 查看详情
    openedDetails(row) {
      console.log('点击', row)
      // this.$router.push({ path: '/medication',query: { id: row.diseaseId }})
    },
    //详细信息
    async getpicAndInfo() {
      this.loading = true
      if (this.searchInfo.name) {
        const { data: res } = await this.$http.get(`/orange_service/insecticide/getpicAndName/{insecticideName}?insecticideName=${this.searchInfo.name}`)
        console.log(res, '农药11')
        console.log(this.searchInfo.name)
        if (res.code === 0) {
          this.picAndInfo = res.data.insecticideVoArrayList
          this.addForm = res.data.insecticideVoArrayList[0]
          if (!res.data.insecticideVoArrayList[0]) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
          this.loading = false
        }
        // console.log(this.picAndInfo)
        // console.log('add',this.addForm)
        // console.log(JSON.parse(this.picAndInfo));
      } else if (this.searchInfo.name === '') {
        const { data: res } = await this.$http.get(`/orange_service/insecticide/getAllInsecticide/${this.pageInfo.pagenum}/${this.pageInfo.pagesize}`)
        console.log(res)
        if (res.code === 0) {
          this.picAndInfo = res.data.rows
          this.addForm = res.data.total
        }
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageInfo.pagesize = val
      this.getDiseaseInfo()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageInfo.pagenum = val
      this.getDiseaseInfo()
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
  margin-left: 0%;
}

.tdInfo {
  font-size: 16px;
}
</style>
