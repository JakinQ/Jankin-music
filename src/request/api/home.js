import service from '../index'
import 'vant/es/toast/style'
import { Toast } from 'vant'

// 获取首页轮播图数据
export function getBanner () {
  return service({
    method: 'GET',
    url: '/banner?type=2'
  })
}
// 获取 发现好歌单
export function getMusicList () {
  return service({
    method: 'GET',
    url: '/personalized?limit=70'
  })
}
// 私人歌单

export function getPreMusic (cookie) {
  return service({
    method: 'POST',
    url: '/recommend/resource',
    data: {
      cookie: cookie
    }
  })
}
// 搜索歌曲 /search?keywords= 海阔天空
// 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
export function getSearchMusic (data) {
  return service({
    method: 'GET',
    url: `/cloudsearch?keywords=${data}&limit=50`
    // url: '/check/music?id=33894312'
  })
}

//    /login/cellphone?phone=xxx&password=yyy
export function getPhoneLogin (data) {
  return service({
    method: 'POST',
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`

    // url: '/check/music?id=33894312'
  })
}

// 二维码登录
// 获得key
export function qrCodeLoginKey (timestamp) {
  return service({
    method: 'POST',
    url: '/login/qr/key?timestamp=\' + timestamp'

    // url: '/check/music?id=33894312'
  })
}
// 生成二维码
export function qrCodeLoginImg (key) {
  return service({
    method: 'GET',
    url: '/login/qr/create?qrimg=true&key=' + key

  })
}
// 检测二维码状态
export function qrCodeLoginCheck (key, timestamp) {
  return service({
    method: 'POST',
    url: '/login/qr/check?key=' + key + '&timestamp=' + timestamp

  })
}

// 登录状态
export function loginStatus (cookie) {
  return service({
    method: 'get',
    url: '/login/status?cookie=' + cookie
  })
}
// 登录状态
export function logOut () {
  return service({
    method: 'get',
    url: '/logout'
  })
}

// 获取用户信息
export function getUser1 (cookie, time) {
  return service({
    method: 'post',
    url: `/user/account?time=${time}`,
    data: {
      cookie: cookie
    }

  })
}

// 获取用户详细信息
export function getUser (data) {
  return service({
    method: 'post',
    url: `/user/detail?uid=${data}`

  })
}
// 获取登录用户信息 , 歌单，收藏，mv, dj 数量
export function getUserMore (cookie) {
  return service({
    method: 'get',
    url: `/user/subcount?cookie=${cookie}`
  })
}

// 获取用户歌单
export function getUserSongList (uid) {
  return service({
    url: '/user/playlist?uid=' + uid
  })
}

// 检测歌曲是否是vip歌曲
export function checkMusicFree (feeId) {
  if (!feeId) {
    return true
  } else return false
  // else if (feeId === 8) return true
}

// 获取日推歌曲
export function getRecommendedDailySongs (cookie) {
  return service({
    url: '/recommend/songs?cookie=' + cookie
  })
}
// 私人FM
export function getPreFm (timestamp) {
  return service({
    method: 'GET',
    url: `/personal_fm?time=${timestamp}`
  })
}
// 把私人fm音乐放进垃圾堆
export function fmTrash (id, cookie) {
  return service({
    method: 'GET',
    url: `/fm_trash?id=${id}&cookie=${cookie}`
  })
}
// 歌手详情
export function getSingerDetail (id) {
  return service({
    method: 'get',
    url: `/artist/detail?id=${id}`

  })
}

// 获取歌曲url
export function getMusicSrc (id, cookie = 'MUSIC_U%3D002E6F485C6B0816DB37F67375DBD2283F7FDD436A3B4F41628DE2332E0CD1163A87D10A60F7F02432195CF25B476619A84111F9BE0A83CB29C809B4473F79D8D5A576551F6A31F9D26058FEEDDD158F46D3742C6D00234055B16F9D8659E01F971748FBFCE1805C877CA354F414D569DC44332663DB214DFE57B303CF30D5C0806ED6A7D6A1D158A47B83146923464FAC1CCAD72CD59902D92BEE6ABC591A136C43229FD27B31AE048F8B3B729956D196AF9CF26D4D3C5DD29EC267F17E2BBE43D2B24059E3D9F376B1CFE73F7778F5430BA25D381A666360DC7BBF1CEE275F52926CDA62BD12821392E8D369648932A9C10F081A1385D53A3FD4BC99EC67412C65C58FB0E7DB1C21C9775439E61EEECC064E4AAE60415B2AF9A3E93706D119D03616D7C24D115FC3F688C2DE29A4A01D8EDA644E40D593ACF6A674947B7FB6154771540D3895E20940F8BEA6C6C6ABB9B0CEFBDE8389766846E95879BFE798D4') {
  return service({
    method: 'post',
    url: `/song/url?id=${id}`,
    data: {
      cookie: cookie
    }

  })
}
export function getMusicSrcList (idList, cookie) {
  return service({
    method: 'post',
    url: `/song/url?id=${idList}`,
    data: {
      cookie: cookie
    }

  })
}
