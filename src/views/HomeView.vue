<template>
  <div>
    <!-- 顶部栏 -->
    <TopNav></TopNav>
    <!-- 轮播图 -->
    <SwiperTop></SwiperTop>
    <!-- 中间 -->
    <IconList></IconList>
    <!-- 发现好歌单 -->
    <Playlist></Playlist>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/home/TopNav.vue'
import SwiperTop from '@/components/home/SwpierTop.vue'
import IconList from '@/components/home/iconList.vue'
import Playlist from '@/components/home/Playlist.vue'

export default {
  name: 'HomeView',
  components: {
    TopNav,
    SwiperTop,
    IconList,
    Playlist
  }
}
</script>
