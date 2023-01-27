import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000/',
  // baseURL: '  10.1.1.130:3000/',
  // baseURL: 'https://netease-cloud-music-emtajj1nk-jakinq.vercel.app/', // 自己的vecel
  // baseURL: 'https://neteasecloudmusicapi-docs.4everland.app/', // 别人的vecel
  timeout: 5000, // request timeout
  withCredentials: true

})

export default service
