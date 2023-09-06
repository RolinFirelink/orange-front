<template>
  <div>
    <div class="showTime" :getTimes="getTimes">
      <span>当前监测时间为：{{ this.titleTime }}</span>
    </div>
    <div class="top_box">
      <div id="main1" class="common1"></div>
      <div id="main2" class="common1"></div>
      <div id="main3" class="common1"></div>
    </div>
    <div class="bottom_box">
      <div id="main4" class="common1"></div>
      <div id="main5" class="common1"></div>
      <div id="main6" class="common1"></div>
    </div>
    <div class="tips_box">
      <!-- 标准 -->
      <h1 class="tips_title">具体数值参照表</h1>
      <div class="tips_box_in">
        <div class="tops_common">
          <h2>二氧化碳适宜范围：</br><span>320~1000mg/kg</span></h2>
        </div>
        <div class="tops_common">
          <h2>
            PM10适宜范围：</br>
            <span>40~50μg/m3 </span>
          </h2>
        </div>
        <div class="tops_common">
          <h2>PM2.5适宜范围：</br> 35~75μg/m³</h2>
        </div>
        <div class="tops_common">
          <h2>
            空气温度适宜范围:</br>
            <span>23～34℃</span>
          </h2>
        </div>
        <div class="tops_common">
          <h2>
            空气湿度适宜范围:</br>
            <span>相对应湿度为65~80%</span>
          </h2>
        </div>
        <div class="tops_common lastOne">
          <h2>
            光照强度适宜范围</br>
            <span>1.2万~2万Lx（勒克斯）</span>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
// 引入echarts
import Vue from 'vue'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
export default {
  data() {
    return {titleTime: ''}
  },

  methods: {
    CurentTime() {
      var now = new Date()
      var year = now.getFullYear() //年
      var month = now.getMonth() + 1 //月
      var day = now.getDate() //日

      var hh = now.getHours() //时
      var mm = now.getMinutes() //分

      var clock = year + '-'

      if (month < 10) clock += '0'

      clock += month + '-'

      if (day < 10) clock += '0'

      clock += day + ' '

      if (hh < 10) clock += '0'

      clock += hh + ':'
      if (mm < 10) clock += '0'
      clock += mm
      return clock
    },
    getTimes() {
      this.titleTime = this.CurentTime()
    },
    judge() {
      console.log(this.value4)
      if (this.value1 != null && this.value2 != null && this.value3 != null) {
        flag = true
      }
      if (flag) {
        return 1
      } else {
        alert('请完善选择信息！！')
        return 0
      }
    },
    reset() {
      ;(this.value1 = ''), (this.value2 = ''), (this.value3 = '')
    },
    change(value) {
      // value3 = this.value
      if (judge()) {
        this.setData(value)
      }
    },
    async getData(code) {
      const { data: res } = await this.$http.get(`/environment/getDate/${code}`).then(data => {
        console.log(data)
        console.log(data.data.data)
        return data
      })
      if (res.code === 0) {
        console.log(res.data.data)
        // this.setKQWD(res)

        return {
          res
        }
      }
    },
    setEcharts(res, name, labelName, idName) {
      var time = []
      var dataValue = []
      for (var i = 0; i < 10; i++) {
        time[i] = res.data.data[i].gmtCreate.substr(11, 5)
        dataValue[i] = res.data.data[i].value
      }
      console.log(time)
      let myChart = echarts.init(document.getElementById(idName))
      console.log(myChart)
      var option = {
        title: {
          text: labelName
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true
            }
          }
        },
        legend: {
          //图例组件，通过点击图例控制哪些系列不显示，即小图例
          data: labelName
        },
        xAxis: {
          data: time
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [
          {
            name: labelName,
            type: 'line',
            data: dataValue
          }
        ]
      }
      myChart.clear() //如果图表有修改需求建议加上此方法先清后画
      myChart.setOption(option)
    },
    setKQWD() {
      //设置空气湿度
      var KQWD = 'KQWD'
      const res = this.getData(KQWD).then(res => {
        var promiseValueData = []
        promiseValueData = res.res.data.data
        var time = []
        res = res.res
        this.setEcharts(res, KQWD, '空气温度', 'main1')
      })
    },
    setKQSD() {
      //设置空气湿度
      var KQSD = 'KQSD'
      const res = this.getData(KQSD).then(res => {
        console.log(res.res.data.data)
        var promiseValueData = []
        promiseValueData = res.res.data.data
        console.log(promiseValueData)
        console.log(promiseValueData)
        // var time = []
        res = res.res
        this.setEcharts(res, KQSD, '空气湿度', 'main2')
      })
    },
    setGZQD() {
      //设置空气湿度
      var GZQD = 'GZQD'
      const res = this.getData(GZQD).then(res => {
        console.log(res.res.data.data)
        var promiseValueData = []
        promiseValueData = res.res.data.data
        console.log(promiseValueData)
        console.log(promiseValueData)
        // var time = []
        res = res.res
        this.setEcharts(res, GZQD, '光照强度', 'main3')
      })
    },
    setEYHT() {
      //设置空气湿度
      var EYHT = 'EYHT'
      const res = this.getData(EYHT).then(res => {
        console.log(res.res.data.data)
        var promiseValueData = []
        promiseValueData = res.res.data.data
        console.log(promiseValueData)
        console.log(promiseValueData)
        // var time = []
        res = res.res
        this.setEcharts(res, EYHT, '二氧化碳', 'main4')
      })
    },
    setPM() {
      //设置空气湿度
      var PM = 'PM'
      const res = this.getData(PM).then(res => {
        console.log(res.res.data.data)
        var promiseValueData = []
        promiseValueData = res.res.data.data
        console.log(promiseValueData)
        console.log(promiseValueData)
        // var time = []
        res = res.res
        this.setEcharts(res, PM, 'PM2.5', 'main5')
      })
    },
    setZZ() {
      //设置空气湿度
      var ZZ = 'ZZ'
      const res = this.getData(ZZ).then(res => {
        console.log(res.res.data.data)
        var promiseValueData = []
        promiseValueData = res.res.data.data
        console.log(promiseValueData)
        console.log(promiseValueData)
        // var time = []
        res = res.res
        this.setEcharts(res, ZZ, 'PM10', 'main6')
      })
    }
  },
  mounted() {
    this.setKQWD()
    this.setKQSD()
    this.setGZQD()
    this.setEYHT()
    this.setPM()
    this.setZZ()
    this.getTimes()

  }
}
</script>
<style>
.top_box {
  display: flex;
  justify-content: space-around;
}
.bottom_box {
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;
}
.common1 {
  width: 500px;
  height: 400px;
  background-color: antiquewhite;
  border-radius: 1rem;
  display: inline-block;
  margin-left: 2rem;
}
.tips_box {
  margin-top: 1rem;
  background-color: aliceblue;
  box-shadow: teal, 10px;
  border-radius: 10px;
}
.tips_box_in {
  margin-left: 2rem;
  display: flex;

  flex-wrap: wrap;
}
.tips_title {
  display: flex;
  justify-content: center;
}
.tops_common {
  flex: 2;
  margin-top: 1.5rem;
  margin-left: 2rem;
}
.lastOne {
  padding-bottom: 1rem;
}
.showTime {
  height: auto;
  font-size: 3rem;
  background-color: rgb(82, 160, 91);
  color: yellow;
  border-radius: 20px;
  margin-bottom: 2rem;
}
.showTime span {
  display: flex;
  justify-content: center;
}
</style>
