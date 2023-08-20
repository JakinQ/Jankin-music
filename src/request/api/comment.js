import service from '../index'

// 获取歌曲详情
// /song/detail?ids=347230,/song/detail?ids=347230,347231
export function getMusicDetail (id) {
  return service({
    url: '/song/detail?ids=' + id
  })
}
// 热门评论
export function getHotComment (id, type, limit) {
  return service({
    method: 'GET',
    url: `/comment/hot?id=${id}&type=${type}&limit=${limit}`
  })
}
// limit: 取出评论数量 , 默认为 20  offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值  before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 0: 歌曲  1: mv  2: 歌单  3: 专辑  4: 电台节目  5: 视频  6: 动态  7: 电台
// 歌曲评论
export function getMusicComment (id, limit) {
  return service({
    method: 'GET',
    url: `/comment/music?id=${id}&limit=${limit}`
  })
}
// 楼层评论
export function getFloorComment (parentCommentId, id, limit, type) {
  return service({
    method: 'GET',
    url: `/comment/floor?parentCommentId=${parentCommentId}&id=${id}&limit=${limit}&type=${type}`
  })
}

// 专辑评论
export function getAlbumComment (id, limit) {
  return service({
    method: 'GET',
    url: `/comment/album?id=${id}&limit=${limit}`
  })
}
// 专辑信息
export function getAlbumInfo (id) {
  return service({
    method: 'get',
    url: `/album?id=${id}`

  })
}
// 获取歌单详情数据
export function getPlaylist (id) {
  return service({
    method: 'GET',
    url: `/playlist/detail?id=${id}`
  })
}
// 歌单评论
export function getPlaylistComment (id, limit) {
  return service({
    method: 'GET',
    url: `/comment/playlist?id=${id}&limit=${limit}`
  })
}

// 发送/删除评论
// export function comment (t, content, id, type, cookie) {
//   return service({
//     method: 'GET',
//     url: `/comment?t=${t}&content=${content}&id=${id}&type=${type}&cookie=${cookie}`
//   })
// }
export function comment (t, content, id, type, timestamp) {
  return service({
    method: 'GET',
    url: `/comment?t=${t}&content=${content}&id=${id}&type=${type}&timestamp=${timestamp}`
  })
}
// t:1 发送, 2 回复 0 删除
// type: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
// 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
// id:对应资源 id
// content :要发送的内容
// commentId :回复的评论 id (回复评论时必填)
