<template>
  <div class="iconList">
    <div class="iconItem">
      <!-- <svg class="icon" aria-hidden="true" @click="router('/RecommendedDaily')">
        <use xlink:href="#icon-tuijian"></use>
      </svg> -->
      <i
        class="bi bi-calendar-heart i icon2"
        @click="router('/RecommendedDaily')"
      ></i>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true" @click="toFm()">
        <use xlink:href="#icon-zhibo"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true" @click="router('/morePlayList')">
        <use xlink:href="#icon-gedan"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true" @click="router('/list')">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
    <div class="iconItem" @click="router('/singer')">
      <div class="icon iconfont i icon-geshou"></div>
      <span>全部歌手</span>
    </div>
  </div>

  <!-- 弹出层 -->
  <!-- <van-popup
    v-model:show="fmShow"
    position="bottom"
    :style="{ height: '100%', width: '100%' }"
    duration="0.1"
  >
    @func  子传父
    歌曲播放页面
    <MusicDetail
      :musicList="itemList[playListIndex]"
      :play="play"
      :isPlaying="isPlaying"
      :addDuration="addDuration"
      :updateTime="updateTime"
      @inputIsChange="inputIsChange"
    ></MusicDetail>
    <PerFm></PerFm>
  </van-popup> -->
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getPreFm } from '@/request/api/home'

export default {
  // components: {
  //   PerFm
  // },
  data () {
    return {
      fmShow: false,
      musicList: [{}],
      itemList2: []
    }
  },
  async created () {

  },
  computed: {
    ...mapState(['userList', 'perFm'])
  },
  methods: {
    ...mapMutations(['updatePerFm', 'updatedetailShow', 'updatePerFmList']),
    async toFm () {
      if (JSON.stringify(this.userList) !== '{}') {
        this.updatePerFm(true)
        this.updatedetailShow()
        setTimeout(() => {

        }, 600)
      } else {
        this.$router.push('/login')
      }
    },
    router (link) {
      // if (link === '/RecommendedDaily' || link === '/perFm') {
      //   if (JSON.stringify(this.userList) !== '{}') {
      //     // console.log(this.userList)
      //     this.$router.push(link)
      //   }
      //   this.$router.push('/login')
      // } else { this.$router.push(link) }

      this.$router.push(link)
    }
  }
}
</script>

<style lang="less" scoped>
.iconList {
  margin-top: 0.2rem;
  display: flex;
  width: 100%;
  height: 2rem;
  justify-content: space-around;
  align-items: center;
  .iconItem {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .i {
      font-weight: 900;

      font-size: 0.9rem;
      color: #fe0000;
      // background-color: #fe0000;
      // border-radius: 0.4rem;
    }
  }
  .icon {
    width: 1rem;
    height: 1rem;
  }
  .icon2 {
    width: 1rem;
    height: 1rem;
    // transform: translateY(-0.16rem);
  }
}
.bi::before {
  vertical-align: 0;
}
</style>
