import service from '../index'
export function loginStatus () {
  return service({
    method: 'get',
    url: '/login/status'
  })
}
// 获取热门歌手
export function getTopSinger () {
  return service({
    method: 'GET',
    url: '/top/artists'
  })
}

// 获取歌手
export function getSinger (type, area, cookie) {
  return service({
    method: 'GET',
    url: `/artist/list?type=${type}&area=${area}&limit=80&cookie=${cookie}`
  })
}
// type：-1:全部 1:男歌手 2:女歌手 3:乐队  area：-1:全部 7华语 96欧美 8:日本 16韩国0:其他
// url: `/artist/list?type=${type}&area=${area}&initial=${initial}`

export function followUser (id, t) {
  return service({
    method: 'GET',
    url: `/follow?id=${id}&t=${t}`
  })
}
export function followSinger (id, t) {
  return service({
    method: 'GET',
    url: `/artist/sub?id=${id}&t=${t}`
  })
}
// id 用户id，t为1关注，其他则取关
