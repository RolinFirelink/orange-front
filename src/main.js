import Vue from 'vue'
// import './plugins/axios.js'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from './store'
import axios from 'axios'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导出表格
import JsonExcel from 'vue-json-excel'
// 全局配置视频播放插件

import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import hls from 'videojs-contrib-hls';

Vue.use(hls);
Vue.use(VideoPlayer);
// 视频播放
import vueMiniPlayer from 'vue-mini-player'
import 'vue-mini-player/lib/vue-mini-player.css'
Vue.use(vueMiniPlayer)

Vue.component('downloadExcel', JsonExcel)
Vue.use(ViewUI);
Vue.use(VueQuillEditor);

Vue.config.productionTip = false

// 将导入的接口文件全局挂载在vue全局上
// Vue.prototype.$api = api
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://120.77.156.205:8804'
// axios.defaults.withCredentials = false
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8/x-www-form-urlencoded';
// axios.defaults.withCredentials=true //携带cookie
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
