// 导入  axios
import axios from 'axios'
// import { Loading } from 'element-ui'
// import router from '../router/index'
// 导入qs 对post请求进行序列化，如果不需要序列化，可以不用导入
// import qs from 'qs'

/*
 * 根据环境变量区分接口的默认地址
 * axios.defauls.baseURL = 'http://127.0.0.1:3000'
 * process.env.NODE_ENV     表示环境变量
 */

switch (process.env.NODE_ENV) {
  case 'production':
    // 发布上线、生产环境的请求地址
    axios.defaults.baseURL = 'http://127.0.0.1:3000'
    break
  case 'test':
    // 测试环境的请求地址
    axios.defaults.baseURL = 'http://127.0.0.1:3000'
    break
  default:
    // 除了生产环境、测试环境，剩下的环境，比如开发环境"development" /api
    axios.defaults.baseURL = '/api'
    // axios.defaults.baseURL = 'http://localhost:9999'
}

/*
 * 设置超时时间和跨域，是否允许携带凭证
 */
axios.defaults.timeout = 1000
axios.defaults.withCredentials = true

/*
 * 设置请求传递数据的格式（具体要看服务器要求什么格式，一般情况不用）
 * 比如 x-www-form-urlencoded
 */

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.transformRequest = data => qs.stringify(data)

// 定义一个变量，用来控制请求时加载提示样式，前提是要全局安装了element-ui
// var loadings

/*
 * 设置请求拦截器 客户端发送请求->[ 请求拦截器 ] -> 服务器
 * TOEKN 校验（JWT）, 接收服务器返回的token，存储到vue/本地存储
 */
axios.interceptors.request.use(
  config => {
    // 携带上token
    const token = localStorage.getItem('token')
    // 在每次发起请求在请求头上加上token值
    token && (config.headers.Authorization = token)
    // 在每次请求获取数据之前都开启loading弹窗
    // loadings = Loading.service()
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

/*
 * 响应拦截器
 * 服务器返回信息 -> [拦截器的统一处理] ->客户端js获取到信息
 */
axios.defaults.validateStatus = status => {
  // 自定义响应成功的HTTP状态码
  return /^(2|3)\d{2}$/.test(status)
}

axios.interceptors.response.use(
  response => {
    // loadings.close()
    return response.data
  },
  error => {
    // loadings.close()
    const { response } = error
    console.log(error)
    if (response) {
      // 服务器返回了，最起码有结果
      switch (response.status) {
        case 401:
          // 当前请求需要用户验证（一般是未登录）
          // 下次有时间查资料整理此处跳转登录页面
          break
        case 403:
          // 服务器已经理解请求，但是拒绝执行它（一般是token过期）
          // 有时间补充资料来跳转登录界面
          localStorage.removeItem('token')
          break
        case 404:
          // 请求失败，请求所希望得到的资源未被在服务器上发现
          // 可强制跳转到404页面
          break
        case 500:
          // 服务器异常（一般是业务报的错）
          break
      }
    } else {
      // 服务器连结果都没有返回
      if (!window.navigator.onLine) {
        // 断网处理：可以跳转到断网页面
        return
      }
      return Promise.reject(error)
    }
  }
)
// 导出封装的axios
export default axios
