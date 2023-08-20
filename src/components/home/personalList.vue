<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">个性化歌单</div>
      <!-- <div class="more">1</div> -->
    </div>
    <div class="musicContent" v-if="store.state.isLogin">
      <van-swipe
        :loop="false"
        :width="150"
        class="mySwiper"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <!-- 推荐歌单 -->
          <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
            <span class="item.name"></span>

            <img :src="item.picUrl" alt="" />
            <span class="playCount">
              <i class="bi bi-play-fill icon"></i>
              {{ changeCount(item.playcount) }}
            </span>
            <!-- 歌单描述 -->
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div v-else class="else">登录后可查看个性化推荐歌单</div>
  </div>
</template>

<script>
import { getMusicList, getPreMusic, getUser1, getUser, getPreMusic2 } from '@/request/api/home'
import { reactive, onMounted, computed } from 'vue'
import { useStore, mapMutations, mapState } from 'vuex'

// getPreFm

export default {

  // Vue3
  setup () {
    const state = reactive({
      musicList: []
    })
    const store = useStore()
    // 播放量数据加工
    function changeCount (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
    const isLogin = computed(() => store.state.isLogin)
    const cookie = computed(() => store.state.cookie)

    // 获取歌单信息
    onMounted(async () => {
      const nowtime = Date.now()
      const user = await getUser1(store.state.cookie, nowtime)
      console.log(user.data.account)
      if (user.data.account) {
        const result = await getUser(user.data.account.id)
        store.commit('updateUserList', result.data)
        if (result.data) {
          await store.commit('updateIsLogin', true)
        }
      }
      // console.log(store.state.isLogin)
      if (store.state.isLogin) {
        const res2 = await getPreMusic(localStorage.getItem('cookie'))
        // console.log('res2', res23)
        state.musicList = res2.data.recommend
        // console.log(res2)
      }
    })
    return { state, changeCount, store }
  }

}
</script>

<style lang="less" scoped>
.else {
  margin-top: 1.4rem;
  text-align: center;
}
.musicList {
  width: 100%;
  height: 5rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  margin-bottom: 1.068rem;

  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 0.0175rem solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
}

.musicContent {
  width: 100%;
  height: 3.6rem;
  .van-swipe-item {
    //   margin-right: 0.14rem;
    padding-right: 0.2rem;
    position: relative;
    height: 3.8rem;
    img {
      width: 100%;
      height: 2.4rem;
      border-radius: 0.2rem;
      //   position: absolute;
    }
    .playCount {
      position: absolute;
      z-index: 100;
      right: 0.3rem;
      color: white;
      margin-top: 0.06rem;
      .icon {
        color: white;
        font-size: 0.4rem;
      }
    }
    .name {
      //   position: absolute;
      bottom: 0px;
    }
  }
}
</style>
