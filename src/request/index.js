import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000/',
  // baseURL: 'http://127.0.0.1:3000/',
  // baseURL: 'http://cloud-music.pl-fe.cn/',
  // baseURL: 'http://10.1.1.130:3000/',
  // baseURL: 'https://netease-cloud-music-emtajj1nk-jakinq.vercel.app/', // 自己的vecel
  // baseURL: 'https://service-1o2t7jim-1316636560.gz.apigw.tencentcs.com/release/', // 腾讯云
  timeout: 5000, // request timeout
  withCredentials: true

})

export default service
