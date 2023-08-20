<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more" @click="this.$router.push('/morePlayList')">
        歌单广场
      </div>
    </div>
    <div class="musicContent">
      <van-swipe :loop="false" class="mySwiper" :show-indicators="false">
        <van-swipe-item
          v-for="item in state.musicList"
          :key="item"
          style="width: 2.625rem"
        >
          <!-- 私人fm -->

          <!-- 推荐歌单 -->
          <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
            <span class="item.name"></span>

            <img :src="item.picUrl" alt="" />
            <span class="playCount">
              <i class="bi bi-play-fill icon"></i>
              {{ changeCount(item.playCount) }}
            </span>
            <!-- 歌单描述 -->
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from '@/request/api/home'
import { reactive, onMounted } from 'vue'

// getPreFm

export default {
  // vue2
  // data () {
  //   return {
  //     musicList: [],
  //     preMusic: {

  //       id: 560609382,
  //       type: 0,
  //       name: '『加州公路』皮卡夕阳与微风，生活不止苟且',
  //       copywriter: '',
  //       picUrl: 'https://p2.music.126.net/kzrUM6_p8N0wDXGW71GX3g==/18965476068109008.jpg',
  //       canDislike: true,
  //       trackNumberUpdateTime: 1572484634417,
  //       playCount: 20492130,
  //       trackCount: 62,
  //       highQuality: false,
  //       alg: 'alg_high_quality'

  //     }
  //   }
  // },
  // methods: {
  //   async getGeDan () {
  //     const res = await getMusicList()
  //     // const res1 = await getPreFm()
  //     // console.log(res)
  //     this.musicList = res.data.result
  //     // this.musicList[0] = res1.data.result
  //   },
  //   changCount: function (num) {
  //     if (num >= 100000000) { return (num / 100000000).toFixed(1) + '亿' } else if (num >= 10000) {
  //       return (num / 10000).toFixed(2) + '万'
  //     }
  //   }
  // },
  // // async getPreGeDan () {
  // //   const res = await getPreFm()
  // //   console.log(res)
  // // }

  // mounted () {
  //   this.getGeDan()
  // }
  // Vue3
  setup () {
    const state = reactive({
      musicList: []
    })
    // 播放量数据加工
    function changeCount (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
    // 获取歌单信息
    onMounted(async () => {
      const res = await getMusicList()
      // console.log(res)
      state.musicList = res.data.result
    })
    return { state, changeCount }
  }

}
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem 0.2rem 0 0.2rem;

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
  height: 3.8rem;
  .van-swipe-item {
    //   margin-right: 0.14rem;
    padding-right: 0.2rem;
    position: relative;
    height: 3.8rem;
    img {
      width: 100%;
      height: 2.422rem;
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
        font-size: 0.4rem;
      }
    }
    .name {
      //   position: absolute;
      bottom: 0rem;
    }
  }
}
</style>
