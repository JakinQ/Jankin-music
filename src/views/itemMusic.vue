<template>
  <div>
    <!-- 歌单顶部 -->
    <itemMusicTop :playlist="state.playlist" />
    <!-- 歌曲列表 -->
    <ItemMusicList
      :itemList2="state.itemList"
      :subscribedCount="state.playlist.subscribedCount"
    />
  </div>
</template>

<script >
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getItemMusicList, getItemList } from '../request/api/item'
import itemMusicTop from '../components/item/itemMusicTop.vue'
import itemMusicList from '../components/item/itemMusicList.vue'

export default {
  setup () {
    const state = reactive({
      playlist: {}, // 歌单详情页数据
      itemList: []// 歌单的歌曲

    })
    onMounted(async () => {
      //   console.log(useRoute())
      const id = useRoute().query.id
      // console.log('id:', id)
      // 获取歌单列表
      const res = await getItemMusicList(id)
      // console.log('歌单列表', res)
      state.playlist = res.data.playlist
      // console.log(state.playlist)
      // 获取歌单歌曲
      const result = await getItemList({ id, limit: 70, offset: 0 })
      // console.log('playlist', state.playlist)
      // state.itemList = result.data.songs

      state.itemList = result.data.songs
      // console.log('itemList', state.itemList)

      //   console.log(state.itemList[0].al)
      // 防止页面刷新，数据丢失，将数据保存到sessionstore
      sessionStorage.setItem('itemDetail', JSON.stringify(state))
    }
    )
    return { state }
  },
  components: {
    itemMusicTop,
    itemMusicList
  }
}
</script>

<style>
</style>
