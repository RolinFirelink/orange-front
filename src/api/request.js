import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'http://120.77.156.205:8804', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout

})

/*
 * 设置请求拦截器 客户端发送请求->[ 请求拦截器 ] -> 服务器
 * TOEKN 校验（JWT）, 接收服务器返回的token，存储到vue/本地存储
 */
// service.interceptors.request.use(
//   config => {
//     // 携带上token
//     const token = localStorage.getItem('token')
//     // 在每次发起请求在请求头上加上token值
//     token && (config.headers.Authorization = token)
//     // 在每次请求获取数据之前都开启loading弹窗
//     // loadings = Loading.service()
//     return config
//   },
//   error => {
//     console.log(error)
//     return Promise.reject(error)
//   }
// )

/*
 * 响应拦截器
 * 服务器返回信息 -> [拦截器的统一处理] ->客户端js获取到信息
 */
// service.defaults.validateStatus = status => {
//   // 自定义响应成功的HTTP状态码
//   return /^(2|3)\d{2}$/.test(status)
// }

// service.interceptors.response.use(
//   response => {
//     return response.data
//   },
//   error => {
//     const { response } = error
//     console.log(error)
//     if (response) {
//       // 服务器返回了，最起码有结果
//       switch (response.status) {
//         case 401:
//           // 当前请求需要用户验证（一般是未登录）
//           // 下次有时间查资料整理此处跳转登录页面
//           break
//         case 403:
//           // 服务器已经理解请求，但是拒绝执行它（一般是token过期）
//           // 有时间补充资料来跳转登录界面
//           localStorage.removeItem('token')
//           break
//         case 404:
//           // 请求失败，请求所希望得到的资源未被在服务器上发现
//           // 可强制跳转到404页面
//           break
//         case 500:
//           // 服务器异常（一般是业务报的错）
//           break
//       }
//     } else {
//       // 服务器连结果都没有返回
//       if (!window.navigator.onLine) {
//         // 断网处理：可以跳转到断网页面
//         return
//       }
//       return Promise.reject(error)
//     }
//   }
// )

export const request = (url, method = 'POST', data = {}) => {
  // 参数配置 如果是get方法就 设置成params 参数， 其他则设置成data参数
  const reConfig = method.toLocaleUpperCase() === 'GET' ? {
    url,
    method,
    params: data
  } : {
    url,
    method,
    data
  }
  return service(reConfig)
}

export default {request,service}
