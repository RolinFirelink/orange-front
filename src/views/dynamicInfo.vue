<template>
  <div v-infinite-scroll="load" class="infoDiv">
    <el-card shadow="never" class="body-card" v-loading="loading">
      <div class="newBox" v-for="(item, index) in newInfo" :key="index">
        <img v-show="item.picUrl != null" class="imgBox" :src="item.picUrl" alt="" />
        <div class="textBox" @click="openDetail(item.detailUrl, item.title)">
          <div class="title">{{ item.title }}</div>
          <p class="content">{{ item.introduction }}</p>
          <div class="time">{{ item.publishTime }}</div>
          <el-divider></el-divider>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newInfo: [],
      loading: true,
      conut: 1,
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    //   触底事件
    load() {
      if (this.conut < 10 && this.conut != 1) {
        this.getInfo()
        console.log(123)
        this.conut++
      }
    },
    //   获取数据
    async getInfo() {
      this.loading = true
      const { data: res } = await this.$http.get(`/dev1/news/paChong/${this.conut}`)
      if (res.code === 0) {
        this.newInfo = this.newInfo.concat(res.data.list)
        console.log(this.newInfo)
      }
      if (this.conut == 1) {
        this.conut = 2
      }
      this.loading = false
    },
    openDetail(e, title) {
      this.$router.push({ path: '/dynamicDetails', query: { url: e, title: title } })
    },
  },
}
</script>

<style scoped>
.body-card {
  width: 100%;
  min-height: 400px;
}
.newBox {
  display: flex;
  margin-bottom: 15px;
}
.imgBox {
  width: 240px;
  height: 190px;
  margin-right: 30px;
}
.textBox {
  cursor: pointer;
}
.title {
  font-size: 25px;
  margin-bottom: 20px;
}
.title:hover {
  color: coral;
}
.content {
  color: #888;
  word-break: break-all;
  word-wrap: break-word;
  width: 750px;
  font-size: 15px;
  margin-bottom: 65px;
}
.content:hover {
  color: coral;
}
.time {
  font-size: 15px;
  color: #888;
}
</style>