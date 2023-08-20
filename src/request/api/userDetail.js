// 获取用户详细信息
import service from '../index'

export function getSingerDetail (id, cookie) {
  return service({
    method: 'get',
    url: `/artist/detail?id=${id}&cookie=${cookie}`

  })
}
export function getSingerHot (id) {
  return service({
    method: 'get',
    url: `/artist/top/song?id=${id}`

  })
}
export function getAlbum (id) {
  return service({
    method: 'get',
    url: `/artist/album?id=${id}`

  })
}
export function getAlbumInfo (id) {
  return service({
    method: 'get',
    url: `/album?id=${id}`

  })
}
export function getAlbumDetail (id) {
  return service({
    method: 'get',
    url: `/album/detail/dynamic?id=${id}`

  })
}
// 获取歌手描述
export function getSingerDesc (id) {
  return service({
    method: 'GET',
    url: `/artist/desc?id=${id}`
  })
}
// 可选参数 : limit: 取出数量 , 默认为 30   offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0

// 获取歌手排名
export function getSingerToplist (type) {
  return service({
    method: 'GET',
    url: `/toplist/artist?type=${type}`
  })
}
// 获取歌手粉丝
export function getSingerFans (id) {
  return service({
    method: 'GET',
    url: `/artist/follow/count?id=${id}`
  })
}
// type : 地区 1: 华语 2: 欧美 3: 韩国 4: 日本

export function followUser (id, t) {
  return service({
    method: 'GET',
    url: `/follow?id=${id}&t=${t}`
  })
}
// id 用户id，t为1关注，其他则取关

export function followSinger (id, t) {
  return service({
    method: 'GET',
    url: `/artist/sub?id=${id}&t=${t}`
  })
}
// id 用户id，t为1关注，其他则取关

// 获取用户动态
export function getUserDynamic (id, t) {
  return service({
    method: 'GET',
    url: `/user/event?uid=${id}`
  })
}

// 获得用户听歌排行   0一周 ，1所有
export function getSingerList (uid, type) {
  return service({
    method: 'GET',
    url: `/user/record?uid=${uid}&type=${type}`
  })
}
