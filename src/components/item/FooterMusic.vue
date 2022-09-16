<template>
  <div class="FooterMusic">
    <!-- 左边布局 -->
    <div class="FooterLeft" @click="updatedetailShow">
      <img :src="itemList[playListIndex].al.picUrl" alt="" />
      <div>
        <!-- 滚动标签 -->
        <p>
          <Marquee
            direction="left"
            scrolldelay="100"
            vspace="10"
            scrollamount="5"
          >
            {{ itemList[playListIndex].name }}</Marquee
          >
        </p>

        <span>横滑可以切换上下首哦</span>
      </div>
    </div>

    <div class="FooterRight">
      <div>
        <svg class="icon1" aria-hidden="true" v-if="isPlaying" @click="play()">
          <use xlink:href="#icon-weibiaoti--"></use>
        </svg>
        <svg class="icon1" aria-hidden="true" v-else @click="play()">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <svg class="icon2" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
    <!-- audio播放器 -->
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${itemList[playListIndex].id}.mp3`"
    ></audio>

    <!-- 弹出层 -->
    <van-popup
      v-model:show="detailShow"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <!-- 歌曲播放页面 -->
      <MusicDetail
        :musicList="itemList[playListIndex]"
        :play="play"
        :isPlaying="isPlaying"
        :addDuration="addDuration"
      ></MusicDetail>
    </van-popup>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'
// import { Vue3Marquee } from 'vue3-marquee'
// import 'vue3-marquee/dist/style.css'
export default {
  data () {
    return {
      // 当前歌词时间轴
      interVal: 0
    }
  },
  components: {
    MusicDetail
  },
  computed: {
    // 解构
    ...mapState(['itemList', 'playListIndex', 'isPlaying', 'detailShow', 'musicChange'])

  },
  // 所有数据变化都会触发
  updated () {
    // itemlist改变传id给vuex获取歌词
    this.$store.dispatch('getLyric', this.itemList[this.playListIndex].id)
    this.addDuration()
  },
  mounted () {
    // console.log(this.$refs)
    this.$store.dispatch('getLyric', this.itemList[this.playListIndex].id)
    this.updateTime()
    // debugger
  },
  methods: {

    // 播放时触发定时器
    updateTime: function () {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime)
        // this.$store.dispatch('updateCurrentTime', this.$refs.audio.currentTime)
      }, 1300)
    },
    play: function () {
      // 如果音乐暂停就播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.updateIsPlaying()
        this.updateTime()
      } else {
        // 否则暂停
        this.$refs.audio.pause()
        this.updateIsPlaying()
        // 不播放就清除定时器
        clearInterval(this.interVal)
      }
      //   console.log(this.isPlaying)
    },
    // 添加进度条
    addDuration: function () {
      this.updateDuration(this.$refs.audio.duration)
    },
    ...mapMutations(['updateIsPlaying', 'updatedetailShow', 'updateMusicChange', 'updateCurrentTime', 'updateDuration'])
  },

  // initScroll () {
  //   // 实例化用this.$refs.Scroll 来找到要滚动的元素
  //   new BScroll(this.$refs.Scroll)
  // }

  // 数据改变时触发
  watch: {
    playListIndex: function () {
      // console.log(this.musicChange)
      // debugger
      // 播放音乐
      this.$refs.audio.autoplay = true

      // 此时图标为暂停时，该更图标
      if (this.$refs.audio.paused) {
        this.updateIsPlaying()
      }
      // 触发状态改变musicChange也改变
      this.updateMusicChange(true)
      // console.log(this.musicChange)
      // debugger
    },
    //
    itemList: function () {
      // 如果没有播放
      if (!this.isPlaying) {
        this.$refs.audio.autoplay = true
        // 因为h5的bug，当autoplay了audio.paused也还是true，只能手动加一个play才能抵消不能判断paused的影响
        this.$refs.audio.play()
        this.updateIsPlaying()
      } else if (this.playListIndex === 0) { // 当遇到下标都为0时，playListIndex不能触发，无法改变状态，只能走这几条代码改变状态
        this.$refs.audio.autoplay = true
        this.$refs.audio.play()
      }
      // console.log(this.playListIndex)
      // console.log(this.itemList)

      // console.log(this.itemList[this.playListIndex])
      // 获取更新的歌词
      this.$store.dispatch('getLyric', this.itemList[this.playListIndex].id)
      //   console.log(this.itemList.id)
      // 触发状态改变musicChange也改变
      this.updateMusicChange(true)
      // debugger
    }

  }

}
</script>

<style lang="less" scoped>
.FooterMusic {
  height: 1.068rem;
  width: 100%;
  background-color: rgb(255, 255, 255);
  position: fixed;
  bottom: 0;
  border-top: 0.01rem solid #999;
  padding: 0.128rem;
  //   justify-content: space-between;
  display: flex;
  .FooterLeft {
    width: 70%;
    height: 100%;
    display: flex;
    // justify-content: space-around;
    align-content: center;
    overflow: hidden;

    img {
      width: 0.88rem;
      height: 0.88rem;
      border-radius: 50%;
    }
    div {
      position: absolute;
      transform: translateX(1.268rem);

      p {
        width: 86.4%;
        overflow: hidden;
        // text-overflow: ellipsis; /* 加省略号 */
        white-space: nowrap; /* 强制不换行 */

        padding-top: 0.052rem;
        font-size: 0.27rem;
        font-weight: 400;
      }
      span {
        font-size: 0.24rem;
        padding-top: 0.2rem;
        color: rgb(139, 139, 141);
      }
    }
  }
  .FooterRight {
    width: 20%;
    height: 100%;
    display: flex;
    position: absolute;
    transform: translateX(330px);
    // align-items: center;

    // justify-content: space-between;
    .icon1 {
      height: 0.6rem;
      width: 0.6rem;
      fill: rgb(76, 76, 76);
      position: fixed;
      bottom: 0.3186rem;
    }
    .icon2 {
      position: fixed;
      right: 0.116rem;
      bottom: 0.3186rem;
      height: 0.6rem;
      width: 0.6rem;
      fill: rgb(76, 76, 76);
    }
  }
}
</style>
