<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="headUrl" label="头像" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.headUrl" width="50" height="50" class="head_pic" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="appellation" label="职称" width="150">
      </el-table-column>
      <el-table-column prop="researchArea" label="研究领域" width="150">
      </el-table-column>
      <el-table-column prop="subsidiaryOrgan" label="所属机构" width="150">
      </el-table-column>
      <el-table-column prop="researchResults" label="研究成果">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button @click="toDetail(scope.row)" type="text" size="small" style="color: orange">查看</el-button>
          <el-button v-if="loginStatus == '2'" @click.native.prevent="updateInfo(scope.row)" type="text" size="small"
            style="color: orange">编辑</el-button>
          <el-button v-if="loginStatus == '2'" @click.native.prevent="deleteRow(scope.row)" type="text" size="small"
            style="color: red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="详细信息" :visible.sync="dialogVisible">
      <table class="tableInfo" :model="detailForm">
        <thead></thead>
        <tbody>
          <tr>
            <td class="tdName">姓名</td>
            <br />
            <td class="tdInfo">{{ detailForm.name }}</td>
          </tr>
          <tr>
            <td class="tdName">简介</td>
            <br />
            <td class="tdInfo">{{ detailForm.introduction }}</td>
          </tr>
          <tr>
            <td class="tdName">邮箱</td>
            <br />
            <td class="tdInfo">{{ detailForm.email }}</td>
          </tr>
          <tr>
            <td class="tdName">电话</td>
            <br />
            <td class="tdInfo">{{ detailForm.phone }}</td>
          </tr>
          <tr>
            <td class="tdName">职称</td>
            <br />
            <td class="tdInfo">{{ detailForm.appellation }}</td>
          </tr>
          <tr>
            <td class="tdName">研究领域</td>
            <br />
            <td class="tdInfo">{{ detailForm.researchArea }}</td>
          </tr>
          <tr>
            <td class="tdName">研究成果</td>
            <br />
            <td class="tdInfo">{{ detailForm.researchResults }}</td>
          </tr>
        </tbody>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"> 关闭 </el-button>
      </span>
    </el-dialog>
    <div class="block">
      <el-button v-if="loginStatus == '2'" style="float:right" size="small" type="primary" round
        @click="addDialogVisible = true">添加</el-button>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pageInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 新增表单 -->
    <el-dialog title="新增" :visible.sync="addDialogVisible" width="40%">
      <el-form :model="addForm" label-position="top" :inline="true">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="头像(仅支持链接)" :label-width="formLabelWidth" prop="headUrl">
          <el-input v-model="addForm.headUrl"></el-input>
        </el-form-item>
        <el-form-item label="职称" prop="appellation">
          <el-input v-model="addForm.appellation"></el-input>
        </el-form-item>
        <el-form-item label="所属机构" :label-width="formLabelWidth" prop="subsidiaryOrgan">
          <el-input v-model="addForm.subsidiaryOrgan"></el-input>
        </el-form-item>
        <el-form-item label="研究领域" style="width: 500px" prop="researchArea">
          <el-input type="textarea" v-model="addForm.researchArea"></el-input>
        </el-form-item>
        <el-form-item label="研究成果" style="width: 500px" prop="researchResults">
          <el-input type="textarea" v-model="addForm.researchResults"></el-input>
        </el-form-item>
        <el-form-item label="简介" style="width: 500px" prop="introduction">
          <el-input type="textarea" v-model="addForm.introduction"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑表单 -->
    <el-dialog title="编辑" :visible.sync="updateDialogVisible" width="40%">
      <el-form :model="updateFrom" label-position="top" :inline="true">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="updateFrom.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="updateFrom.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="updateFrom.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像(仅支持链接)" :label-width="formLabelWidth" prop="headUrl">
          <el-input v-model="updateFrom.headUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职称" prop="appellation">
          <el-input v-model="updateFrom.appellation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="研究领域" style="width: 500px" prop="researchArea">
          <el-input type="textarea" v-model="updateFrom.researchArea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="研究成果" style="width: 500px" prop="researchResults">
          <el-input type="textarea" v-model="updateFrom.researchResults" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" style="width: 500px" prop="introduction">
          <el-input type="textarea" v-model="updateFrom.introduction" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除表单 -->
    <el-dialog title="删除" :visible.sync="deleteDialogVisible" width="30%">
      <span>是否删除该条数据！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDeleta">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginStatus: '',
      dialogVisible: false,
      tableData: [],
      detailForm: {},
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 7,
        total: 10,
      },
      // 新增数据
      addDialogVisible: false,
      addForm: {
        subsidiaryOrgan: '',
        id: '',
        name: '',
        email: '',
        phone: '',
        appellation: '',
        researchArea: '',
        researchResults: '',
        introduction: '',
        headUrl: ''
      },
      // 编辑数据
      updateDialogVisible: false,
      updateFrom: {
        id: '',
        name: '',
        email: '',
        phone: '',
        appellation: '',
        researchArea: '',
        researchResults: '',
        introduction: '',
        headUrl: ''
      },
      formLabelWidth: '80px',
      // 删除数据
      deleteDialogVisible: false,
      deleteInfo: {},
    }
  },
  methods: {
    // text() {
    //   console.log(this.tableData);
    // },
    toDetail(row) {
      console.log(row);
      this.detailForm = row
      this.dialogVisible = true
    },
    async getSpecialistInfo() {
      const { data: res } = await this.$http.get(`/dev2/citrus_expert/browse?page=${this.pageInfo.pagenum}&size=${this.pageInfo.pagesize}`)
      console.log(res, 123456);
      this.tableData = res.data.browse.records
      this.total = res.data.browse.total
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageInfo.pagesize = val
      this.getSpecialistInfo()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageInfo.pagenum = val
      this.getSpecialistInfo()
    },
    // 确认新增
    async confirmAdd() {
      const { data: res } = await this.$http.post(`/dev2/citrus_expert/add`, this.addForm)
      if (res.code === 0) {
        this.getSpecialistInfo()
        this.addDialogVisible = false
        this.$message.success('新增成功！')
      } else {
        this.addDialogVisible = false
        this.$message.error('新增失败！')
      }
    },
    // 编辑信息
    async updateInfo(row) {
      const { data: res } = await this.$http.get(`/dev2/citrus_expert/get?id=${row.id}`)
      console.log(res);
      this.updateFrom.name = res.data.result.name
      this.updateFrom.email = res.data.result.email
      this.updateFrom.phone = res.data.result.phone
      this.updateFrom.appellation = res.data.result.appellation
      this.updateFrom.researchArea = res.data.result.researchArea
      this.updateFrom.researchResults = res.data.result.researchResults
      this.updateFrom.introduction = res.data.result.introduction
      this.updateFrom.headUrl = res.data.result.headUrl
      this.updateFrom.id = res.data.result.id
      this.updateDialogVisible = true
      console.log('编辑', row, this.updateFrom)
    },
    async confirmUpdate() {
      const { data: res } = await this.$http.put(`/dev2/citrus_expert/update`, this.updateFrom)
      if (res.code === 0) {
        this.updateDialogVisible = false
        this.getSpecialistInfo()
        this.$message.success('编辑成功！')
      } else {
        this.updateDialogVisible = false
        this.$message.error('编辑失败！')
      }
    },
    // 删除数据
    deleteRow(row) {
      this.deleteInfo = row
      this.deleteDialogVisible = true
      console.log('删除', row)
    },
    async confirmDeleta() {
      console.log(this.deleteInfo.id);
      const { data: res } = await this.$http.delete(`/dev2/citrus_expert/delete?id=${this.deleteInfo.id}`)
      console.log(res.code);
      if (res.code === 0) {
        this.getSpecialistInfo()
        this.deleteDialogVisible = false
        this.$message.success('删除成功！')
      } else {
        this.deleteDialogVisible = false
        this.$message.error('删除失败！')
      }
    },
  },

  mounted() {
    this.getSpecialistInfo()
    // 获取状态码
    this.loginStatus = JSON.parse(window.localStorage.getItem('loginStatus'))
  },
}
</script>
<style scoped>
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
  width: 800px;
}
</style>