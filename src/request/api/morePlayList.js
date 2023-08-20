import service from '../index'

// 获取歌单分类
export function getCatList () {
  return service({
    url: '/playlist/catlist'
  })
}

// 热门歌单分类
export function getHot () {
  return service({
    url: '/playlist/hot'
  })
}

// 推荐歌单
export function getPersonalized (limit) {
  return service({
    url: '/personalized?limit=200'
  })
}

// 获取精品歌单
// cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
// limit: 取出歌单数量 , 默认为 20
// before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
export function getHighQuality (tag, limit) {
  return service({
    url: `/top/playlist/highquality?cat=${tag}`
  })
}
export function getTop (tag) {
  return service({
    url: `/top/playlist?limit=100&cat=${tag}`
  })
}

// 私人歌单
export function getPreMusic () {
  return service({
    method: 'POST',
    url: '/recommend/resource'
  })
}
