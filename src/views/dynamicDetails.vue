<template>
  <div>
    <el-card>
      <div class="box">
          <div class="title">{{title}}</div>
           <el-divider></el-divider>
        <div  v-loading="loading" v-html="htmlInfo"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        detailUrl: '',
      },
      title: '',
      htmlInfo: '',
      loading: true
    }
  },
  created() {
    this.obj.detailUrl = this.$route.query.url
    this.title = this.$route.query.title
    this.getDetails()
  },
  methods: {
    //   根据url获取详情页信息
    async getDetails() {
      const { data: res } = await this.$http.post(`/dev1/news/detail`, this.obj)
      console.log(res, '详情')
      if (res.code === 0) {
        this.htmlInfo = res.data.htmlText
      }
      this.loading = false
    },
  },
}
</script>

<style scoped>
.box {
  min-height: 640px;
}
::v-deep p {
    text-indent: 2em;
    line-height: 26px;
    font-size: 16px;
    color: #222;
    margin-bottom: 15px;
}
.title {
    text-align: center;
    font-size: 32px;
}
.el-divider--horizontal {
  /* margin-top: 0px; */
  height: 3px;
  background-color: coral;
}
</style>