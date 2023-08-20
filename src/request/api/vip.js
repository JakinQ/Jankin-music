
import axios from 'axios'

const service = axios.create({
  baseURL: 'https://csm.sayqz.com/',
  // baseURL: 'http://127.0.0.1:3000/',
  // baseURL: 'http://cloud-music.pl-fe.cn/',
  // baseURL: 'http://10.1.1.130:3000/',
  // baseURL: 'https://netease-cloud-music-emtajj1nk-jakinq.vercel.app/', // 自己的vecel
  // baseURL: 'https://service-1o2t7jim-1316636560.gz.apigw.tencentcs.com/release/', // 腾讯云
  // headers: {
  //   // 设置Accept请求头部字段
  //   Accept: 'application/json, text/plain, */*',
  //   'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
  // },
  timeout: 5000, // request timeout
  withCredentials: true

})

export function getVipMusic (id, level = 0) {
  const type = 'apiSongUrlV1'
  // standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res 0-4
  const levels = ['standard', 'higher', 'exhigh', 'lossless', 'hires']
  return service({
    method: 'GET',
    url: `/api?type=${type}&id=${id}&level=${levels[level]}`
  })
}

// export default service
