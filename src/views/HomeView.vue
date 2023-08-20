<template>
  <div>
    <!-- 顶部栏 -->
    <TopNav v-show="!detailShow"></TopNav>
    <!-- 轮播图 -->
    <SwiperTop></SwiperTop>
    <!-- 中间 -->
    <IconList></IconList>
    <!-- 发现好歌单 -->
    <Playlist></Playlist>
    <!-- 私人推荐 -->
    <PersonalList></PersonalList>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/home/TopNav.vue'
import SwiperTop from '@/components/home/SwpierTop.vue'
import IconList from '@/components/home/iconList.vue'
import Playlist from '@/components/home/Playlist.vue'
import PersonalList from '@/components/home/personalList.vue'
import { mapMutations, mapState } from 'vuex'
import {

  getUser, getUser1
} from '@/request/api/home'
export default {
  name: 'HomeView',
  components: {
    TopNav,
    SwiperTop,
    IconList,
    Playlist,
    PersonalList
  },
  computed: {
    ...mapState(['detailShow', 'isPlaying', 'isLogin', 'cookie', 'userList'])
  },
  methods: {
    ...mapMutations(['updateIsLogin'])
  },
  async created () {
    // const nowtime = Date.now()
    // const user = await getUser1(this.cookie, nowtime)
    // console.log(user.data.account)
    // if (user.data.account) {
    //   const result = await getUser(user.data.account.id)
    //   this.$store.commit('updateUserList', result.data)
    //   if (result.data) {
    //     await this.updateIsLogin(true)
    //   }
    // }

    // 默认最顶端
    // window.location.href = '#top'
    // console.log('fm', this.perFm)
  },
  watch: {

  }

}
</script>
