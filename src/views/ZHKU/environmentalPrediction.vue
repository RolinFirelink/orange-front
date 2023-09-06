<template>
  <div>
    <el-card shadow="never">
      <div class="box">
        <!-- 左边选择框 -->
        <div class="chooseBox">
          <div class="data_title">预测数据选择</div>
          <div class="common_box">
            预测模型：
            <el-select v-model="value1" placeholder="请选择">
              <el-option :label="'线性回归'"> </el-option>
            </el-select>
          </div>
          <div class="common_box">
            环境因素：
            <el-select v-model="value3" placeholder="请选择" @change="change">
              <el-option v-for="item in ElementOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="common_box">
            设备编号：
            <el-select v-model="value2" placeholder="请选择">
              <el-option v-for="item in Equipment" :key="item.value" :label="item.label" :picker-options="pickerOptions">
              </el-option>
            </el-select>
          </div>
          <div class="common_box">
            预测时间：
            <div class="block">
              <el-select v-model="value4" placeholder="请选择">
                <el-option v-for="(item, index) in  pickerOptions.shortcuts" :key="index" :label="item.label"
                  :value="item.picker"> </el-option>
              </el-select>
              <!-- <el-date-picker v-model="value4" type="daterange" align="right" unlink-panels range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
              </el-date-picker> -->
            </div>
          </div>
          <el-button type="primary" class="common_btn" @click="setData()">预测</el-button>
          <el-button type="primary" class="common_btn" @click="reset()">重置</el-button>
        </div>

        <!-- 右边展示 -->
        <div class="resBox" id="main">
          <div class="data_title">预测结果展示</div>
        </div>
        <!-- <div class="tips" v-if="flag">预测所得结果为种植适宜条件，建议维持现状。</div> -->
      </div>
    </el-card>
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

<script>
// 引入echarts
import Vue from 'vue'
import * as echarts from 'echarts'
// 将echarts放到vue的原型上让她有这个属性
Vue.prototype.$echarts = echarts

export default {
  data() {
    return {
      ElementOptions: [
        { value: 'PM', label: 'PM2.5' },
        { value: 'PMTEN', label: 'PM10' },
        { value: 'EYHT', label: '二氧化碳' },
        { value: 'KQSD', label: '空气湿度' },
        { value: 'KQWD', label: '空气温度' },
        { value: 'GZQD', label: '光照强度' }
      ],
      Equipment: [{ value: '选项1', label: 'E52412209' }],
      startTime: '',
      endTime: '',
      envir: '',
      pickerOptions: {
        shortcuts: [
          {
            label: '最近一天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          }
          // {
          //   text: '最近一个月',
          //   onClick(picker) {
          //     const end = new Date()
          //     const start = new Date()
          //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          //     picker.$emit('pick', [start, end])
          //   }
          // },
          // {
          //   text: '最近三个月',
          //   onClick(picker) {
          //     const end = new Date()
          //     const start = new Date()
          //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          //     picker.$emit('pick', [start, end])
          //   }
          // }
        ]
      },
      // 日期获取到的数据放到盒子里
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      envirValue: '',
      flag: false,
      titleTime: ''
    }
  },
  methods: {
    CurentTime() {
      var now = new Date()
      var year = now.getFullYear() // 年
      var month = now.getMonth() + 1 // 月
      var day = now.getDate() // 日

      var hh = now.getHours() // 时
      var mm = now.getMinutes() // 分

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
      ; (this.value1 = ''), (this.value2 = ''), (this.value3 = '')
    },
    change(value) {
      // value3 = this.value
      if (judge()) {
        this.setData(value)
      }
    },
    async getData(code) {
      if (this.value1 != '' && this.value2 != '' && this.value4 != '') {
        const { data: res } = await this.$http.get(`/environment/getDate/${code}`).then(data => {
          return data
        })
        if (res.code === 0) {
          // this.setKQWD(res)

          return {
            res
          }
        }
      } else {
        this.$message.info('请完善数据选项')
      }
    },
    setEcharts(res, name, labelName, idName) {
      var time = []
      var dataValue = []
      this.flag = true
      for (var i = 0; i < 10; i++) {
        time[i] = res.data.data[i].gmtCreate.substr(11, 5)
        dataValue[i] = res.data.data[i].value
      }

      const myChart = echarts.init(document.getElementById(idName))
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
          // 图例组件，通过点击图例控制哪些系列不显示，即小图例
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
      myChart.clear() // 如果图表有修改需求建议加上此方法先清后画
      myChart.setOption(option)
    },
    setData() {
      // 设置空气湿度
      var KQWD = this.value3
      var label = this.label
      const res = this.getData(KQWD).then(res => {
        var promiseValueData = []
        promiseValueData = res.res.data.data
        res = res.res
        this.setEcharts(res, KQWD, '预测结果展示', 'main')
        this.$message.success('预测成功！')
      })
    }
  },
  mounted() {
    this.getTimes()
  }
}
</script>

<style scoped>
.box {
  position: relative;
  display: flex;
  min-width: 990px;
}

.data_title {
  font-size: 1.5rem;
  width: 100%;
}

.common_box {
  margin-top: 3rem;
}

.common_box::before {
  color: red;
  content: '*';
  font-size: 1.25rem;
}

.common_btn {
  margin-top: 3rem;
  margin-left: 3rem;
}

.chooseBox {
  width: 30%;
}

.resBox {
  margin-left: 1%;
  min-width: 60vw;
}

.tips {
  position: absolute;
  right: 2rem;
  /* bottom: 36rem; */
  float: right;
  color: red;
  font-weight: bold;
}

.tips::before {
  background-image: url(../../assets/prompt.png);
}
</style>
