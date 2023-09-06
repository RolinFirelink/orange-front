<template>
  <div>
    <el-card shadow="never" style="margin-bottom: 15px">
      <div class="search-card">
        <div class="search-input">
          <div style="flex-shrink: 0">疾病名称：</div>
          <el-input size="small" style="margin-left: 10px" v-model="searchInfo.name" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span>疾病部位:</span>
          <el-select size="small" style="margin-left: 10px" placeholder="请选择" v-model="searchInfo.part">
            <el-option v-for="part in partOptions" :key="part.value" :label="part.label" :value="part.value"> </el-option>
          </el-select>
        </div>
        <div>
          <span>疾病类型:</span>
          <el-select size="small" style="margin-left: 10px" placeholder="请选择" v-model="searchInfo.disease">
            <el-option v-for="item in diseaseOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button v-if="loginStatus == '2'" size="small" @click="addDialogVisible = true">添加</el-button>
          <el-drawer title="我嵌套了 Form !" :before-close="handleClose" :visible.sync="dialog" direction="ltr"
            custom-class="demo-drawer" ref="drawer">
            <div class="demo-drawer__content">
              <!-- 嵌套的表单 -->
              <el-form :model="form">
                <el-form label-width="80px" :model="formLabelAlign">
                  <div v-for="item in formLabelAlign">
                    <el-form-item :label="item.title">
                      <el-input v-model="formLabelAlign.citruspartid"></el-input>
                    </el-form-item>
                  </div>
                </el-form>
              </el-form>
              <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' :
                  '确 定' }}</el-button>
              </div>
            </div>
          </el-drawer>
          <el-button size="small" @click="newSearchInfo()">重置</el-button>
          <el-button type="search" size="small" @click="toSearch()">查询</el-button>
        </div>
      </div>
    </el-card>
    <el-card shadow="never">
      <el-table v-loading="loading" :data="tableData" min-height="400" border style="width: 100%; cursor: pointer"
        @row-dblclick="openedDetails">
        <!-- <el-table-column prop="date" label="序号" width="80"> </el-table-column> -->
        <el-table-column header-align="center" align="center" prop="diseaseChineseName" label="疾病名称" width="150">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="disasterTypeName" label="疾病类型" width="150">
        </el-table-column>
        <el-table-column header-align="center" prop="diseaseIntroduce" label="疾病简介"> </el-table-column>
        <el-table-column header-align="center" label="疾病表现">
          <template slot-scope="props">
            <el-tooltip class="item" effect="dark" placement="top">
              <div style="width: 440px; font-size: 16px" slot="content">{{ props.row.diseaseSymptom }}</div>
              <div>{{ props.row.diseaseSymptom }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column v-if="loginStatus == '2'" fixed="right" label="操作" width="90">
          <template slot-scope="scope">
            <el-button @click.native.prevent="updateInfo(scope.row)" type="text" size="small" style="color: orange"> 编辑
            </el-button>
            <el-button @click.native.prevent="deleteRow(scope.row)" type="text" size="small" style="color: red"> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pageInfo.pagenum" :page-sizes="[7, 10, 14, 16]" :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 新增表单 -->
    <el-dialog title="新增" :visible.sync="addDialogVisible" width="40%" :before-close="handleClose">
      <el-form :model="addForm" label-position="top" :inline="true" :rules="rules">
        <el-form-item label="疾病名称（中文）" :label-width="formLabelWidth" prop="diseaseChineseName">
          <el-input v-model="addForm.diseaseChineseName"></el-input>
        </el-form-item>
        <el-form-item label="疾病名称（英文）" :label-width="formLabelWidth">
          <el-input v-model="addForm.diseaseEnglishName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="疾病名称（常用名）" :label-width="formLabelWidth">
          <el-input v-model="addForm.diseaseTrivialName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="病原物" :label-width="formLabelWidth">
          <el-input v-model="addForm.diseasePathogen" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="疾病类型" :label-width="formLabelWidth" prop="disasterTypeId">
          <el-select v-model="addForm.disasterTypeId" placeholder="请选择疾病类型">
            <el-option label="虫害" value="1"></el-option>
            <el-option label="病害" value="2"></el-option>
            <el-option label="生理病害" value="3"></el-option>
            <el-option label="草害" value="4"></el-option>
            <el-option label="天敌" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="疾病发生部位" :label-width="formLabelWidth" prop="citrusPartId">
          <el-select v-model="addForm.citrusPartId" placeholder="请选择疾病类型">
            <el-option label="根" value="1"></el-option>
            <el-option label="茎" value="2"></el-option>
            <el-option label="叶" value="3"></el-option>
            <el-option label="树干" value="4"></el-option>
            <el-option label="枝" value="5"></el-option>
            <el-option label="花" value="6"></el-option>
            <el-option label="果" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="疾病主要分布情况（仅支持链接）" :label-width="formLabelWidth" prop="diseaseDistribution">
          <el-input v-model="addForm.diseaseDistribution" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="疾病图片（仅支持链接）" :label-width="formLabelWidth" prop="diseasePictureUrl">
          <el-input v-model="addForm.diseasePictureUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="疾病视频（仅支持链接）" :label-width="formLabelWidth">
          <el-input v-model="addForm.diseaseVideo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="疾病简介" style="width: 500px" prop="diseaseIntroduce">
          <el-input type="textarea" v-model="addForm.diseaseIntroduce" autocomplete="off"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="主要症状" style="width: 500px" prop="diseaseSymptom">
          <el-input type="textarea" v-model="addForm.diseaseSymptom" autocomplete="off"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="防控措施" style="width: 500px" prop="diseaseTreatment">
          <el-input type="textarea" v-model="addForm.diseaseTreatment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑表单 -->
    <el-dialog title="编辑" :visible.sync="updateDialogVisible" width="40%" :before-close="handleClose">
      <el-form :model="updateFrom" label-position="top" :inline="true" :rules="rules">
        <el-form-item label="疾病名称（中文）" :label-width="formLabelWidth" prop="diseaseChineseName">
          <el-input v-model="updateFrom.diseaseChineseName"></el-input>
        </el-form-item>
        <el-form-item label="疾病名称（英文）" :label-width="formLabelWidth">
          <el-input v-model="updateFrom.diseaseEnglishName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="疾病名称（常用名）" :label-width="formLabelWidth">
          <el-input v-model="updateFrom.diseaseTrivialName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="病原物" :label-width="formLabelWidth">
          <el-input v-model="updateFrom.diseasePathogen" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="疾病类型" :label-width="formLabelWidth" prop="disasterTypeId">
          <el-select v-model="updateFrom.disasterTypeId" placeholder="请选择疾病类型">
            <el-option label="虫害" value="1"></el-option>
            <el-option label="病害" value="2"></el-option>
            <el-option label="生理病害" value="3"></el-option>
            <el-option label="草害" value="4"></el-option>
            <el-option label="天敌" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="疾病发生部位" :label-width="formLabelWidth" prop="citrusPartId">
          <el-select v-model="updateFrom.citrusPartId" placeholder="请选择疾病类型">
            <el-option label="根" value="1"></el-option>
            <el-option label="茎" value="2"></el-option>
            <el-option label="叶" value="3"></el-option>
            <el-option label="树干" value="4"></el-option>
            <el-option label="枝" value="5"></el-option>
            <el-option label="花" value="6"></el-option>
            <el-option label="果" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="疾病主要分布情况（仅支持链接）" :label-width="formLabelWidth" prop="diseaseDistribution">
          <el-input v-model="updateFrom.diseaseDistribution" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="疾病图片（仅支持链接）" :label-width="formLabelWidth" prop="diseasePictureUrl">
          <el-input v-model="updateFrom.diseasePictureUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="疾病视频（仅支持链接）" :label-width="formLabelWidth">
          <el-input v-model="updateFrom.diseaseVideo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="疾病简介" style="width: 500px" prop="diseaseIntroduce">
          <el-input type="textarea" v-model="updateFrom.diseaseIntroduce" autocomplete="off"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="主要症状" style="width: 500px" prop="diseaseSymptom">
          <el-input type="textarea" v-model="updateFrom.diseaseSymptom" autocomplete="off"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="防控措施" style="width: 500px" prop="diseaseTreatment">
          <el-input type="textarea" v-model="updateFrom.diseaseTreatment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除表单 -->
    <el-dialog title="删除" :visible.sync="deleteDialogVisible" width="30%" :before-close="handleClose">
      <span>是否删除该条数据！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDeleta">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 7,
      },
      total: 10,
      flag: true,
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
      searchInfo: {
        name: '',
        part: '',
        disease: '',
      },
      tableData: [],
      loading: true,
      formLabelAlign: [
        { title: '柑橘编号' },
        { title: '疾病分类' },
        { title: '名称' },
        { title: '疾病介绍' },
        { title: 'diseaseIntelligence' },
        { title: '病原体' },
        { title: '英文名' },
        { title: '疾病症状' },
        { title: '治疗方法' },
        { title: '常用名/俗名' },
      ],
      form: {
        diseasetypeid: '',
        diseaseclass: '',
        chinesename: '',
        distribution: '',
        diseaseintelligence: '',
        pathogen: '',
        englishname: '',
        diseasesymptom: '',
        diseasetreatment: '',
        diseasetrivialname: '',
      },
      formLabelWidth: '80px',
      timer: null,
      loginStatus: '',
      // 新增数据
      addDialogVisible: false,
      addForm: {
        citrusPartId: '',
        disasterTypeId: '',
        diseaseChineseName: '',
        diseaseDistribution: '',
        diseaseEnglishName: '',
        diseaseIntroduce: '',
        diseasePathogen: '',
        diseasePictureUrl: '',
        diseaseSymptom: '',
        diseaseTreatment: '',
        diseaseVideo: '',
        diseaseTrivialName: '',
      },
      // 编辑数据
      updateFrom: {
        citrusPartId: '',
        disasterTypeId: '',
        diseaseChineseName: '',
        diseaseDistribution: '',
        diseaseEnglishName: '',
        diseaseId: '',
        diseaseIntelligence: 0,
        diseaseIntroduce: '',
        diseasePathogen: '',
        diseasePictureUrl: '',
        diseaseSymptom: '',
        diseaseTreatment: '',
        diseaseTrivialName: '',
        diseaseVideo: '',
        diseaseWeight: 0,
        isDeleted: 0,
      },
      updateDialogVisible: false,
      // 删除数据
      deleteDialogVisible: false,
      deleteInfo: {},
      // 表单验证规则
      rules: {
        diseaseChineseName: [{ required: true, message: '请输入疾病名称', trigger: 'blur' }],
        disasterTypeId: [{ required: true, message: '请选择疾病类别', trigger: 'change' }],
        citrusPartId: [{ required: true, message: '请选择疾病发生部位', trigger: 'change' }],
        diseaseIntroduce: [{ required: true, message: '请输入疾病简介', trigger: 'blur' }],
        diseaseSymptom: [{ required: true, message: '请输入疾病症状', trigger: 'blur' }],
        diseaseTreatment: [{ required: true, message: '请输入疾病防控措施', trigger: 'blur' }],
        diseaseDistribution: [{ required: true, message: '请输入疾病主要发生区域', trigger: 'blur' }],
        diseasePictureUrl: [{ required: true, message: '请输入疾病图片链接', trigger: 'blur' }],
      },
    }
  },
  created() {
    // this.getDiseaseInfo()
    if (sessionStorage.getItem('msgInfo') && sessionStorage.getItem('flag') == 2) {
      this.searchInfo = JSON.parse(sessionStorage.getItem('searchInfo'))
      this.pageInfo = JSON.parse(sessionStorage.getItem('pageInfo'))
      this.toSearch()
    } else {
      this.getDiseaseInfo()
    }
    // 获取状态码
    this.loginStatus = JSON.parse(window.localStorage.getItem('loginStatus'))
    console.log(this.loginStatus, '登录状态')
    if (this.loginStatus !== null) {
      this.$store.commit('user/login_status', this.loginStatus)
    }
  },
  mounted() {
    window.addEventListener('beforeunload', (e) => {
      window.localStorage.setItem('loginStatus', JSON.stringify(this.$store.state.user.loginStatus))
    })
    // 存储搜索
    // sessionStorage.setItem('msgInfo', true)
    sessionStorage.setItem('flag', 1)
  },
  computed: {
    ...mapState({
      loginStatus: (state) => state.user.loginStatus,
    }),
  },
  destroyed() {
    // 销毁组件
    sessionStorage.removeItem('msgInfo')
  },
  methods: {
    // 分页获取疾病数据
    async getDiseaseInfo() {
      // if (sessionStorage.getItem("msgInfo")) {
      //   this.searchInfo = sessionStorage.getItem("searchInfo")
      //   this.toSearch()
      // }
      const { data: res } = await this.$http.get(`/dev2/disease-information/browse?pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`)
      console.log(res)
      if (res.code === 0) {
        this.tableData = res.data.browse.records
        this.total = res.data.browse.total
      }
      this.loading = false
    },
    // 查看详情
    openedDetails(row) {
      console.log('点击', row)
      sessionStorage.setItem('searchInfo', JSON.stringify(this.searchInfo))
      sessionStorage.setItem('pageInfo', JSON.stringify(this.pageInfo))
      this.$router.push({ path: '/diseaseDetails', query: { id: row.diseaseId } })
    },
    // 查询
    async toSearch() {
      this.loading = true
      sessionStorage.setItem('flag', 2)
      // console.log(this.searchInfo, '查询数据')
      if (this.searchInfo.name === '' && this.searchInfo.part === '') {
        const { data: res } = await this.$http.get(`/dev2/disease-information/browseLike?disasterTypeId=${this.searchInfo.disease}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`)
        console.log(res, "31231");

        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          if (!res.data.browse.total) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
        }
      } else if (this.searchInfo.name === '' && this.searchInfo.disease === '') {
        const { data: res } = await this.$http.get(`/dev2/disease-information/browseLike?citrusPartId=${this.searchInfo.part}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`)
        if (res.code === 0) {
          console.log(res);
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          if (!res.data.browse.total) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
        }
      } else if (this.searchInfo.part === '' && this.searchInfo.disease === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?diseaseChineseName=${this.searchInfo.name}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        console.log(res);
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          if (!res.data.browse.total) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
        }
      } else if (this.searchInfo.name === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?citrusPartId=${this.searchInfo.part}&disasterTypeId=${this.searchInfo.disease}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          if (!res.data.browse.total) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
        }
      } else if (this.searchInfo.part === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?disasterTypeId=${this.searchInfo.disease}&diseaseChineseName=${this.searchInfo.name}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          if (!res.data.browse.total) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
        }
      } else if (this.searchInfo.disease === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?citrusPartId=${this.searchInfo.part}&diseaseChineseName=${this.searchInfo.name}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          if (!res.data.browse.total) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
        }
      } else {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?citrusPartId=${this.searchInfo.part}&disasterTypeId=${this.searchInfo.disease}&diseaseChineseName=${this.searchInfo.name}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          if (!res.data.browse.total) {
            this.$message.error("查询失败")
          } else {
            this.$message.success('查询成功')
          }
        }
      }
      this.loading = false
    },
    // 重置查询条件
    newSearchInfo() {
      ; (this.searchInfo.name = ''), (this.searchInfo.part = ''), (this.searchInfo.disease = '')
    },
    // 确认新增
    async confirmAdd() {
      const { data: res } = await this.$http.post(`/dev2/disease-information/add`, this.addForm)
      if (res.code === 0) {
        this.getDiseaseInfo()
        this.addDialogVisible = false
        this.$message.success('新增成功！')
      } else {
        this.addDialogVisible = false
        this.$message.error('新增失败！')
      }
    },
    // 编辑疾病信息
    async updateInfo(row) {
      const { data: res } = await this.$http.get(`/dev2/disease-information/showDiseaseInformation?diseaseId=${row.diseaseId}`)
      this.updateFrom.diseaseChineseName = res.data.showDiseaseInfoVO.diseaseChineseName
      this.updateFrom.diseaseIntroduce = res.data.showDiseaseInfoVO.diseaseIntroduce
      this.updateFrom.diseaseSymptom = res.data.showDiseaseInfoVO.diseaseSymptom
      this.updateFrom.diseaseDistribution = res.data.showDiseaseInfoVO.diseaseDistribution
      this.updateFrom.diseaseEnglishName = res.data.showDiseaseInfoVO.diseaseEnglishName
      this.updateFrom.diseasePathogen = res.data.showDiseaseInfoVO.diseasePathogen
      this.updateFrom.diseasePictureUrl = res.data.showDiseaseInfoVO.diseasePictureUrl
      this.updateFrom.diseaseTreatment = res.data.showDiseaseInfoVO.diseaseTreatment
      this.updateFrom.diseaseTrivialName = res.data.showDiseaseInfoVO.diseaseTrivialName
      this.updateFrom.diseaseVideo = res.data.showDiseaseInfoVO.diseaseVideo
      this.updateFrom.diseaseId = row.diseaseId
      this.updateDialogVisible = true
      console.log('编辑', row, this.updateFrom)
    },
    async confirmUpdate() {
      const { data: res } = await this.$http.put(`/dev2/disease-information/update`, this.updateFrom)
      if (res.code === 0) {
        this.updateDialogVisible = false
        this.getDiseaseInfo()
        this.$message.success('编辑成功！')
      } else {
        this.updateDialogVisible = false
        this.$message.error('编辑失败！')
      }
    },
    // 删除疾病数据
    deleteRow(row) {
      this.deleteDialogVisible = true
      this.deleteInfo = row
      console.log('删除', row)
    },
    async confirmDeleta() {
      const { data: res } = await this.$http.delete(`/dev2/disease-information/delete?diseaseId=${this.deleteInfo.diseaseId}`)
      if (res.code === 0) {
        this.getDiseaseInfo()
        this.deleteDialogVisible = false
        this.$message.success('删除成功！')
      } else {
        this.deleteDialogVisible = false
        this.$message.error('删除失败！')
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageInfo.pagesize = val
      if (sessionStorage.getItem('flag') == 2) {
        this.toSearch()
      } else {
        this.getDiseaseInfo()
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageInfo.pagenum = val
      if (sessionStorage.getItem('flag') == 2) {
        this.toSearch()
      } else {
        this.getDiseaseInfo()
      }
    },
    handleClose(done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要关闭表单？')
        .then((_) => {
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400)
          }, 2000)
        })
        .catch((_) => { })
    },
    cancelForm() {
      this.loading = false
      // this.dialog = false
      clearTimeout(this.timer)
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

/* ::v-deep .cell {
  height: 71px;
  overflow: hidden;
  text-overflow: ellipsis;
} */
</style>
