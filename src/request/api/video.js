import service from '../index'

// 获取视频
// id : 歌手 id
// 可选参数 : size : 返回数量 , 默认为 10
// cursor : 返回数据的 cursor, 默认为 0 , 传入上一次返回结果的 cursor,将会返回下一页的数据
// order : 排序方法, 0 表示按时间排序, 1 表示按热度排序, 默认为 0
export function getVideo (id, cursor, size, timestamp) {
  return service({
    method: 'GET',
    url: `/artist/video?id=${id}&cursor=${cursor}&size=${size}&timestamp=${timestamp}`
  })
}

// 获取mv
export function getMv (id) {
  return service({
    method: 'GET',
    url: `/artist/mv?id=${id}`
  })
}
// 获取mv url
export function getMvUrl (id) {
  return service({
    method: 'GET',
    url: `/mv/url?id=${id}`
  })
}
// 获取mv 详情
export function getMvDetail (id) {
  return service({
    method: 'GET',
    url: `/mv/detail?mvid=${id}`
  })
}

// 将 mlog id 转为视频 id  必须用这个id才能获取视频详情
export function getVideoId (id) {
  return service({
    method: 'GET',
    url: `/mlog/to/video?id=${id}`
  })
}
// 视频详情
export function getVideoDetail (id) {
  return service({
    method: 'GET',
    url: `/video/detail?id=${id}`
  })
}
// 视频播放地址
export function getVideoUrl (id) {
  return service({
    method: 'GET',
    url: `/video/url?id=${id}`
  })
}

// 获取视频点赞转发评论数数据
export function getVideoCount (id) {
  return service({
    method: 'GET',
    url: `/video/detail/info?vid=${id}`
  })
}

// 获取mv点赞转发评论数数据
export function getMvCount (id) {
  return service({
    method: 'GET',
    url: `/mv/detail/info?mvid=${id}`
  })
}

// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 mv 的所有评论 ( 不需要 登录 )
// 必选参数 : id: mv id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 接口地址 : /comment/mv
// 调用例子 : /comment/mv?id=5436712

// mv 评论
export function getMvComment (id) {
  return service({
    method: 'GET',
    url: `/comment/mv?id=${id}`
  })
}
// 视频评论
export function getVideoComment (id) {
  return service({
    method: 'GET',
    url: `/comment/video?id=${id}`
  })
}

// 相关视频
export function getRelatedVideo (id) {
  return service({
    method: 'GET',
    url: `/related/allvideo?id=${id}`
  })
}

// 搜索  type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
export function search (keywords, type) {
  return service({
    method: 'GET',
    url: `/cloudsearch?keywords=${keywords}&type=${type}`
  })
}

// 获取音乐  standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res
export function getMusic (id) {
  return service({
    method: 'GET',
    // url: `/song/url/v1?id=${id}&level=standard`
    url: `/song/url?id=${id}`
  })
}

// 检测歌曲是否是vip歌曲
export function checkMusicFree (feeId) {
  if (!feeId) {
    return true
  } else if (feeId === 8) return true
  else return false
}

// 发送/删除评论
export function comment2 (t, content, id, type, cookie) { // type 2/6
  return service({
    method: 'GET',
    url: `/comment?t=${t}&content=${content}&id=${id}&type=${type}&cookie=${cookie}`
  })
}
// t:1 发送, 2 回复 0 删除
// type: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
// 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
// id:对应资源 id
// content :要发送的内容
// commentId :回复的评论 id (回复评论时必填)
