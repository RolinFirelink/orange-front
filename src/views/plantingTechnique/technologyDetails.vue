<template>
  <div>
    <el-card v-loading="loading">
      <div class="box">
        <div v-html="detailsHtml" class="test"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { text } from 'body-parser';

export default {
  data() {
    return {
      obj: {
        detailUrl: '',
      },
      detailsHtml: '',
      loading: true
    }
  },
  created() {
    console.log(this.detailsHtml, "212");
    this.getDetailUrl()
    this.getDetailHtml()
  },
  methods: {
    getDetailUrl() {
      this.obj.detailUrl = this.$route.query.url
      // console.log(this.detailUrl, '参数')
    },

    // 根据url获取详情页
    async getDetailHtml() {
      const { data: res } = await this.$http.post(`/dev1/technology/detail`, this.obj)
      // let test = document.createElement("div")
      // test.innerHTML = res.data.detailHtml
      // console.dir(test.children[7].style.display = "none");
      // console.log(JSON.parse.toString(res.data.detailHtml));
      if (res.code === 0) {
        // console.dir(test.innerHTML, "21212");
        // this.detailsHtml = test.innerHTML
        this.detailsHtml = res.data.detailHtml
        console.log(res.data.detailHtml);
      }
      this.loading = false
    }
  },
}
</script>

<style>
.box {
  min-height: 640px;
}

::v-deep .article-title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 15px;
}

::v-deep .article-detail .shrink {
  font-size: 16px;
  line-height: 10px;
}

.article-title {
  display: flex;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 45px;
}

.article-desc {
  font-size: 17px;
  line-height: 30px;
}

.article-detail {
  font-size: 16px;
  line-height: 30px;
}

.ql-align-center {
  text-align: center;
}

.article-tips {
  display: none;
}
</style>