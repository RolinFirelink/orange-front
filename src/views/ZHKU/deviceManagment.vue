<template>
  <div>
    <video-player ref="videoPlayer" class="video-player vjs-custom-skin" :playsinline="true" :options="playerOptions" />
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="设备名" name="first">DS-2CD2T25FD-I5SGLE(E52412209)</el-tab-pane>
      <el-tab-pane label="序列号" name="second">E52412209</el-tab-pane>
      <el-tab-pane label="当前版本" name="third">V5.5.88 build 200610</el-tab-pane>
      <el-tab-pane label="最新版本" name="fourth">V5.5.88 build 200610</el-tab-pane>
    </el-tabs>
  </div>
  <!-- <vueMiniPlayer ref="vueMiniPlayer" :video="video" :mutex="true" @fullscreen="handleFullscreen" /> -->
</template>
<script>
export default {
  data() {
    return {
      activeName: 'second',
      video: {
        url: 'http://hls01open.ys7.com/openlive/7c946db5849549d6a5e128015a2dc8c9.m3u8',
        // url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4  autoplay muted',
        cover: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
        muted: false,
        loop: false,
        preload: 'auto',
        poster: '',
        volume: 1,
        autoplay: false,
      },
      // 监控视频配置
      playerOptions: {
        // playbackRates: [0.5, 1.0, 1.5, 2.0], //可选择的播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'application/x-mpegURL', // 这里的种类支持很多种：基本视频格式、直播、流媒体等
            src: 'http://hls01open.ys7.com/openlive/7c946db5849549d6a5e128015a2dc8c9.m3u8', //url地址
          },
        ],
        poster: '', //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, //当前时间和持续时间的分隔符
          durationDisplay: true, //显示持续时间
          remainingTimeDisplay: false, //是否显示剩余时间功能
          fullscreenToggle: true, //全屏按钮
        },
      },
    }
  },
  computed() {
    // $video(){
    //   return this.$refs.vueMiniPlayer.$video;
    // }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleFullscreen() {},
  },
}
</script>
<style scope>
.el-tabs__item:hover {
  color: rgb(223, 223, 223);
  /* background-color: rgb(210, 210, 210, 100%); */
}
.el-tabs__item.is-active {
  color: rgb(187, 187, 187);
  /* background-color: rgb(209, 209, 209); */
}
/* video-player{
   width: 100%;
   height: 100%;
   object-fit: contain;
}
video-player:focus {
  outline:none;
} */
.video-js .vjs-tech {
  object-fit: fill;
}
.vjs-poster {
  background-size: cover;
}
</style>
