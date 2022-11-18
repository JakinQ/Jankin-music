import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/fonts/iconfont.css'

// import axios from 'axios'

import getVant from './plugins/vant'

const app = createApp(App)
getVant(app)
app.use(store)
app.use(router)
app.mount('#app')

// 配置请求根路径
