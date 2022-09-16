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
