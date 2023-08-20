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
import { useStore, mapMutations, mapState } from 'vuex'
import { getItemMusicList, getItemList } from '../request/api/item'
import itemMusicTop from '../components/item/itemMusicTop.vue'
import itemMusicList from '../components/item/itemMusicList.vue'
import { sortSrcList } from '@/views/comment.js'

export default {
  setup () {
    const state = reactive({
      playlist: {}, // 歌单详情页数据
      itemList: [], // 歌单的歌曲
      idList: []// 资源列表

    })
    const store = useStore()

    onMounted(async () => {
      //   console.log(useRoute())
      const id = useRoute().query.id
      // console.log('id:', id)
      // 获取歌单列表
      const res = await getItemMusicList(id, localStorage.getItem('cookie'))
      // console.log('歌单列表', res)
      state.playlist = res.data.playlist
      // console.log(state.playlist)
      // 获取歌单歌曲
      const result = await getItemList({ id, limit: 70, offset: 0, cookie: localStorage.getItem('cookie') })
      // console.log('playlist', state.playlist)
      // state.itemList = result.data.songs

      state.itemList = result.data.songs
      // console.log('itemList', state.itemList)

      // 获得与id顺序匹配的资源列表
      const src = await sortSrcList(result.data.songs)
      // console.log('sortSrcList', sortSrcList)
      await store.commit('updateIdList', src)
      // this.updateIdList(state.itemList.map(obj => obj.id))
      // console.log(state.itemList[0].al)
      // 防止页面刷新，数据丢失，将数据保存到sessionstore
      sessionStorage.setItem('itemDetail', JSON.stringify(state))
    }
    )
    return { state }
  },
  method: {

  },
  components: {
    itemMusicTop,
    itemMusicList
  }
}
</script>

<style>
</style>
