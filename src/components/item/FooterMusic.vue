<template>
  <div class="FooterMusic">
    <!-- 左边布局 -->
    <div class="FooterLeft" @click="updatedetailShow">
      <img
        :src="
          perFm
            ? perFmList[playListIndex].album.picUrl
            : itemList[playListIndex].al.picUrl
        "
        alt=""
      />
      <div>
        <!-- 滚动标签 -->
        <p>
          <Marquee
            direction="left"
            scrolldelay="100"
            vspace="10"
            scrollamount="5"
          >
            {{
              perFm
                ? perFmList[playListIndex].name
                : itemList[playListIndex].name
            }}</Marquee
          >
        </p>

        <span>横滑可以切换上下首哦</span>
        <!-- <p>{{ itemList[playListIndex].id }} 11</p> -->
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
    <!-- audio播放器  perfm：当在perfm界面时为true，则播放的也是perFmList的歌 -->
    <!-- itemList.length <= 1 || !perFm ? 'true' : loop -->
    <!-- <audio
      :loop="changLoop()"
      ref="audio"
      @change="onChange"
      @pause="onPause"
      @play="onPlay"
      @error="onError"
      :src="`https://music.163.com/song/media/outer/url?id=${
        perFm ? perFmList[playListIndex].id : itemList[playListIndex].id
      }.mp3`"
    ></audio> -->
    <audio
      :loop="changLoop()"
      ref="audio"
      @change="onChange"
      @pause="onPause"
      @play="onPlay"
      @error="onError"
      id="audio"
      :src="srcList[playListIndex]"
    ></audio>
    <!-- 弹出层 -->
    <van-popup
      v-model:show="detailShow"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
      duration="0.1"
    >
      <!-- @func  子传父 -->
      <!-- 歌曲播放页面 -->
      <MusicDetail
        :musicList="itemList[playListIndex]"
        :play="play"
        :isPlaying="isPlaying"
        :addDuration="addDuration"
        :updateTime="updateTime"
        @inputIsChange="inputIsChange"
        v-if="!perFm"
      ></MusicDetail>
      <!-- <TopNav v-else></TopNav> -->
      <PerFm
        v-else
        :musicList="perFmList[playListIndex]"
        :play="play"
        :isPlaying="isPlaying"
        :addDuration="addDuration"
        :updateTime="updateTime"
        @inputIsChange="inputIsChange"
      ></PerFm>
    </van-popup>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'
import PerFm from '@/components/home/perFm/perFm.vue'
import { getPreFm, getMusicSrc } from '@/request/api/home.js'
import { getVipMusic } from '@/request/api/vip'
import axios from 'axios'

import { sortSrcList } from '@/views/comment.js'

// import TopNav from '@/components/home/TopNav.vue'

// import { Vue3Marquee } from 'vue3-marquee'
// import 'vue3-marquee/dist/style.css'
export default {
  data () {
    return {
      // 当前歌词时间轴
      interVal: 0,
      loop: false,
      url: 'http://m702.music.126.net/20230813160621/16572c240852247c9088495ebad6646b/jd-musicrep-ts/38c6/4212/63ba/28b4b0d078abee1a05a661f1e094a753.mp3',
      srcList: ['http://m702.music.126.net/20230813160621/16572c240852247c9088495ebad6646b/jd-musicrep-ts/38c6/4212/63ba/28b4b0d078abee1a05a661f1e094a753.mp3']
    }
  },
  components: {
    MusicDetail, PerFm
  },
  computed: {
    // 解构
    ...mapState(['itemList', 'playListIndex', 'isPlaying', 'detailShow', 'musicChange', 'audioPlaying', 'lyricList', 'currentTime', 'perFm', 'perFmList', 'playMode', 'inVideoPage', 'movieIsPlaying', 'idList'])

  },
  // 所有数据变化都会触发
  updated () {
    // itemlist改变传id给vuex获取歌词
    if (this.perFm) {
      this.$store.dispatch('getLyric', this.perFmList[this.playListIndex].id)
    } else { this.$store.dispatch('getLyric', this.itemList[this.playListIndex].id) }
    // alert(1)
    // console.log(this.lyricList)
    // 切换歌曲时候，要延时才能获取duration
    // debugger
    setTimeout(() => {
      this.addDuration()
    }, 600)
    // this.addDuration()
  },

  async mounted () {
    // const ms2 = await getVipMusic(536622304, 3)
    // console.log(ms2)

    const src = await sortSrcList(this.itemList)

    this.srcList = src.map(item => item.url)
    console.log(this.itemList)
    console.log('1111111111111', this.srcList)
    // const src = await getMusicSrc(this.itemList[this.playListIndex])
    // console.log(src)
    this.$store.dispatch('getLyric', this.itemList[this.playListIndex].id)
    this.updateTime()

    const nowtime = Date.now()
    const res = await getPreFm(nowtime)
    this.updatePerFmList(res.data.data)
    // debugger
    // const timestamp = Date.now()
    // const res = await getPreFm(timestamp)
    // this.perFmList = res.data.data
    this.$refs.audio.volume = 0.1
  },
  methods: {
    changLoop () {
      // itemList.length <= 1 || !perFm ? 'true' : loop
      if (!this.perFm) {
        if (this.itemList.length <= 1) return 'true'
      } else return this.loop
    },
    // 播放时触发定时器
    updateTime: function () {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime)
      }, 1300)
    },
    play: function () {
      // 如果音乐暂停就播放
      // console.log(this.$refs.audio.paused)
      if (this.$refs.audio.paused) {
        // console.log('this.audioPlaying', this.audioPlaying)
        this.$refs.audio.play()
        // console.log(this.$refs.audio)

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

      // console.log('当前歌曲长度', this.$refs.audio.duration)
    },
    // 通过子传父监听进度条是否被拖动或者点击  父组件在子组件添加@event标签   子组件 this.$emit('event', data)
    inputIsChange: function (val) {
      if (val) {
        this.$refs.audio.currentTime = this.currentTime
      }
      val = false
    },
    ...mapMutations(['updateIsPlaying', 'updatedetailShow', 'updateMusicChange', 'updateCurrentTime', 'updateDuration', 'updateAudioPlaying', 'updatePlayMode', 'updatePerFmList']),

    // 当音频播放
    onPlay: function () {
      // console.log('开始播放声音')
      // this.updateCurrentTime(0)
      // const audioElement = document.getElementById('audio')
      // audioElement.currentTime = 0

      // console.log('是否暂停', this.$refs.audio.paused)
    },
    onPause () {
      // console.log('播放暂停')
    },
    onChange () {
      // console.log('音频改变')
    },
    onError () {
      // console.log('播放出错')
      this.updateAudioPlaying()
    }

  },

  // initScroll () {
  //   // 实例化用this.$refs.Scroll 来找到要滚动的元素
  //   new BScroll(this.$refs.Scroll)
  // }

  // 数据改变时触发
  watch: {
    playMode: function () {
      if (this.playMode === '单曲循环') {
        this.loop = true
      } else this.loop = false
    },
    playListIndex: async function () {
      // const res = await getMusicSrc(this.itemList[this.playListIndex].id, localStorage.getItem('cookie'))
      // console.log(res)
      // this.url = res.data.data[0].url
      // console.log(this.url)
      // 播放音乐
      // this.$refs.audio.autoplay = false
      this.$refs.audio.play()
      // 此时图标为暂停时，该更图标
      console.log(this.itemList)

      console.log(this.itemList[this.playListIndex])

      // if (this.$refs.audio.paused) {
      if (!this.isPlaying) {
        // console.log(this.isPlaying)
        this.updateIsPlaying()
      }

      // 触发状态改变musicChange也改变
      this.updateMusicChange(true)

      // console.log(this.musicChange)
      // debugger
    },
    //
    itemList: async function () {
      const src = await sortSrcList(this.itemList)
      console.log('213332', src)
      this.srcList = src.map(item => item.url)
      // console.log(this.itemList)
      // if (this.itemList[this.playListIndex]) {
      //   const res = await getMusicSrc(this.itemList[this.playListIndex].id, localStorage.getItem('cookie'))
      //   console.log(res)
      //   this.url = res.data.data[0].url
      // }

      // 如果没有播放
      if (!this.isPlaying) {
        this.$refs.audio.autoplay = true
        // 因为h5的bug，当autoplay了audio.paused也还是true，只能手动加一个play才能抵消不能判断paused的影响
        this.$nextTick(function () {
          // DOM 更新了
          this.$refs.audio.play()
        })
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
    },
    perFmList: function () {
      // console.log('perFmList change')
    },

    perFm: function () {

    },

    isPlaying: function () {
      // console.log('isPlaying change')
      // console.log('111', this.$route.path)
      //  this.$refs.audio.
    },
    inVideoPage: function () {
      // console.log('inVideoPage', this.inVideoPage)
      // if (this.inVideoPage === true) {
      //   this.updateIsPlaying(false)
      //   this.$refs.audio.pause()
      // }
    },
    detailShow: function () {
      // console.log('detailShow', this.detailShow)
    },
    movieIsPlaying: function () {
      if (this.movieIsPlaying === true) {
        if (!this.$refs.audio.paused) {
          this.$refs.audio.pause()
          this.updateIsPlaying()
        }
      }
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
    transform: translateX(5.77rem);
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
