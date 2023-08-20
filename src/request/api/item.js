import service from '../index'

// 获取歌单详情数据
export function getItemMusicList (id, cookie) {
  return service({
    method: 'GET',
    url: `/playlist/detail?id=${id}&cookie=${cookie}`
  })
}

// 获取歌单的所有歌曲
export function getItemList (data) {
  return service({
    method: 'GET',
    url: `/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=${data.offset}&cookie=${data.cookie}`
  })
}

// 检测歌曲版权
export function musicCopyright (data) {
  return service({
    method: 'GET',
    url: `/check/music?id=${data}`
    // url: '/check/music?id=33894312'
  })
}

// 获取歌单的所有歌词 /lyric?id=33894312
export function getMusicLyric (data) {
  return service({
    method: 'GET',
    url: `/lyric?id=${data}`
    // url: '/check/music?id=33894312'
  })
}

// 获取默认搜索词/search/default
export function getDefaultWord () {
  return service({
    method: 'GET',
    url: '/search/default'
  })
}
// 等级
export function getLevel () {
  return service({
    method: 'GET',
    url: '/user/level'
  })
}
// 云贝签到
export function yunbei () {
  return service({
    method: 'GET',
    url: '/yunbei/sign'
  })
}
export function concernList (data, timestamp) {
  return service({
    method: 'GET',
    // url: '/daily_signin'
    url: `/user/follows?uid=${data}&timestamp=${timestamp}`
  })
}
export function singerDetail (id) {
  return service({
    method: 'GET',
    // url: '/daily_signin'
    url: `/user/detail?uid=${id}`
  })
}
export function followedsList (data) {
  return service({
    method: 'GET',
    url: `/user/followeds?uid=${data}`
  })
}

// 喜欢音乐列表
export function likeList (uid, cookie) {
  return service({
    method: 'GET',
    url: `/likelist?uid=${uid}&cookie=${cookie}`
  })
}
// 喜欢音乐
export function like (id, bool, cookie) {
  return service({
    method: 'GET',
    url: `/like?id=${id}&like=${bool}&cookie=${cookie}`
  })
}
