<template>
  <div>
    <!-- 歌单顶部 -->
    <itemMusicTop :playlist="state.playlist" />
    <!-- 歌曲列表 -->
    <ItemMusicList
      :itemList="state.itemList"
      :subscribedCount="state.playlist.subscribedCount"
    />
  </div>
  <!-- <div>111111111{{ state.playlist }}</div> -->
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
      // 获取歌单列表
      const res = await getItemMusicList(id)
      // console.log(res)
      state.playlist = res.data.playlist
      //   console.log(res)
      //   console.log(state.playlist)
      // 获取歌单歌曲
      const result = await getItemList({ id, limit: 70, offset: 0 })
      console.log(state.playlist)
      state.itemList = result.data.songs
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
