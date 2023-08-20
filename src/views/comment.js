import { getMusicSrc } from '@/request/api/home.js'

// 获取资源列表
export async function sortSrcList (itemList) {
  // 获取id列表
  const idList = itemList.map(obj => ({ id: obj.id, name: obj.name }))
  // 获取资源列表
  const srcList = await getMusicSrc(idList.map(obj => obj.id).join(','))
  return srcList.data.data.sort((a, b) => {
    const idA = a.id
    const idB = b.id

    // 查找第一个数组中id相同的元素的索引
    const indexA = idList.findIndex(item => item.id === idA)
    const indexB = idList.findIndex(item => item.id === idB)

    // 使用索引来比较排序顺序
    return indexA - indexB
  })
}
