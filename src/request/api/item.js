import service from '../index'

// 获取歌单详情数据
export function getItemMusicList (id) {
  return service({
    method: 'GET',
    url: `/playlist/detail?id=${id}`
  })
}

// 获取歌单的所有歌曲
export function getItemList (data) {
  return service({
    method: 'GET',
    url: `/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=${data.offset}`
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

// 获取歌单的所有歌曲 /lyric?id=33894312
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
