import service from '../index'

// 获取歌单详情数据
export function allList () {
  return service({
    method: 'GET',
    url: '/toplist'
  })
}

// 获取歌单详情数据
export function allListDetail () {
  return service({
    method: 'GET',
    url: '/toplist/detail'
  })
}
