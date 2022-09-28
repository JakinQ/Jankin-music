import service from '../index'

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
export function getPreFm () {
  return service({
    method: 'GET',
    url: '/personal_fm'
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
    method: 'GET',
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`

    // url: '/check/music?id=33894312'
  })
}

// 二维码登录
// 获得key
export function qrCodeLoginKey (timestamp) {
  return service({
    method: 'GET',
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
    method: 'post',
    url: '/login/qr/check?key=' + key + '&timestamp=' + timestamp

  })
}

// 登录状态
export function loginStatus () {
  return service({
    method: 'get',
    url: '/login/status'
  })
}
// 获取用户信息
export function getUser1 (cookie, time) {
  return service({
    method: 'post',
    url: 'http://localhost:3000/user/account?time',
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
export function getUserMore () {
  return service({
    method: 'get',
    url: '/user/subcount'
  })
}

// 获取用户歌单
export function getUserSongList (uid) {
  return service({
    url: '/user/playlist?uid=' + uid
  })
}

// 获取歌曲详情
// /song/detail?ids=347230,/song/detail?ids=347230,347231
// export function getMusicDetail (id) {
//   return service({
//     url: '/song/detail?ids=' + id
//   })
// }
