import { createApp, Vue } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/fonts/iconfont.css'
// import 'default-passive-events'
// import axios from 'axios'
// import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
// import videojs from 'video.js'
// import 'video.js-landscape-fullscreen'

import getVant from './plugins/vant'

const app = createApp(App)
getVant(app)
app.use(store)
app.use(router)
// app.use(VueVideoPlayer)
app.mount('#app')
// 配置请求根路径
