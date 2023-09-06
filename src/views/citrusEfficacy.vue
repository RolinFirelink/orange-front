<template>
  <div>
    <el-card class="search">
      <el-input class="searchInput" size="small" placeholder="请输入内容" v-model="searchKey" clearable></el-input>
      <el-button type="search" size="small" @click="toSearch()">查询</el-button>
    </el-card>
    <el-card>
      <div class="boxDiv">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="柑橘功效">
                  <span>{{ props.row.effectDetails }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="props">
              <img class="tableImg" :src="props.row.img" alt="" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="name"> </el-table-column>
          <el-table-column label="功效">
            <template slot-scope="scope">
              <div class="divEfficacy">{{ scope.row.effectDetails }}</div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="pageInfo.pagenum" :page-sizes="[4, 6, 8, 10]" :page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
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
        pagesize: 4
      },
      total: 0,
      tableData: [],
      searchKey: ''
    }
  },
  created() {
    this.getEffectInfo()
  },
  methods: {
    async getEffectInfo() {
      const { data: res } = await this.$http.get(`/dev1/effect/list?page=${this.pageInfo.pagenum}&size=${this.pageInfo.pagesize}`)
      if (res.code === 0) {
        this.tableData = res.data.rows
        this.total = res.data.total
      }
    },
    // 搜索
    async toSearch() {
      const { data: res } = await this.$http.get(`/dev1/effect/list?like=${this.searchKey}&page=${this.pageInfo.pagenum}&size=${this.pageInfo.pagesize}`)
      if (res.code === 0) {
        this.tableData = res.data.rows
        this.total = res.data.total
        if (!res.data.total) {
          this.$message.error('查询失败')
        } else {
          this.$message.success('查询成功')
        }
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageInfo.pagesize = val
      this.getEffectInfo()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageInfo.pagenum = val
      this.getEffectInfo()
    }
  }
}
</script>

<style scoped>
.search {
  margin-bottom: 10px;
}

.el-button--search {
  background: rgb(8, 46, 83);
  color: #fff;
  width: 65px;
  font-size: 15px;
}

.searchInput {
  width: 300px;
  margin-right: 20px;
}

.tableImg {
  width: 140px;
  height: 100px;
}

.divEfficacy {
  height: 90px;
}
</style>
