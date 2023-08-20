<template>
  <div>
    <!-- 背景图 -->
    <img
      :src="changeImg(musicList.al.picUrl, 100)"
      :class="musicList.al.picUrl ? 'bgimg' : 'bgimg2'"
      class="bgimg"
      alt=""
    />
    <div class="bgimg-before"></div>
    <!-- 顶部 -->
    <div class="detailTop">
      <!-- 左边 -->
      <div class="detailTopLeft">
        <svg class="icon" aria-hidden="true" @click="backHome">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <!-- 头部信息 -->
        <div class="leftMarquee">
          <Vue3Marquee class="Marquee">{{ musicList.name }}</Vue3Marquee>
          <div>
            <span v-for="item in musicList.ar" :key="item" class="spa">
              {{ item.name }}
            </span>
            <svg class="icon liebiao i" aria-hidden="true">
              <use xlink:href="#icon-youjiantou1"></use>
            </svg>
          </div>
        </div>
      </div>
      <!-- 右边 -->
      <div class="detailTopRight">
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <!-- 中间内容 -->
    <div class="detailContent" v-show="!isLyricShow">
      <img
        src="@/assets/needle-ab.png"
        class="img_needle"
        :class="{ img_needle_active: isPlaying }"
        alt=""
      />
      <img src="@/assets/cd.png" class="img_cd" alt="" />
      <!-- 添加点击事件  点击后出现歌词-->

      <img
        @click="watchLyric()"
        :src="changeImg(musicList.al.picUrl, 500)"
        class="img_ar"
        alt=""
        :class="isPlaying ? 'img_ar_active' : 'img_ar_pauesd'"
      />
    </div>
    <!-- 歌词 -->
    <div
      class="musicLyric"
      ref="musicLyric"
      v-show="isLyricShow"
      @click="this.isLyricShow = false"
    >
      <!-- 当前时间轴currentTime大于歌词自身的时间,且小宇下一句歌词的时间时高亮显示歌词 -->
      <br ref="br" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <p
        v-for="(item, i) in lyric1"
        :key="i"
        :class="
          currentTime * 1000 >= item.time && currentTime * 1000 < item.next
            ? 'active'
            : ''
        "
      >
        {{ item.lrc }}
        <br />
        {{ item.tlyric }}
      </p>
    </div>

    <!-- 底部组件 -->
    <div class="detailFooter">
      <!-- 上 -->
      <!-- <div v-show="isLyricShow"> -->
      <div>
        <div class="footerTop" v-show="!isLyricShow">
          <!-- <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin"></use>
          </svg> -->
          <i
            v-if="!isLike"
            class="bi bi-heart"
            style="font-size: 0.6rem; color: white"
            @click="likeOrDislike(true)"
          ></i>
          <i
            v-else
            class="bi bi-heart-fill"
            style="font-size: 0.6rem; color: red"
            @click="likeOrDislike(false)"
          ></i>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
          </svg>
          <!-- <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinlechangpian"></use>
          </svg> -->
          <van-icon name="chat-o" @click="intoComment" :badge="count" />
          <!-- <svg class="icon" aria-hidden="true" @click="intoComment">
            <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
          </svg> -->
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao-"></use>
          </svg>
        </div>
      </div>
      <div class="footerContent"></div>
      <!-- 进度条 -->
      <div class="input">
        <span class="left">{{ formatSeconds(this.currentTime) }}</span>
        <input
          id="range"
          type="range"
          class="range"
          ref="ProgressBar"
          min="0"
          :max="duration"
          v-model="currentTime"
          step="0.05"
          @change="changeProgressBar()"
          @input="inputProgressBar()"
        />
        <span class="right">{{ formatSeconds(this.duration) }}</span>
      </div>

      <!-- 下 -->
      <div class="footer">
        <!-- 顺序循环 -->
        <svg
          @click="changePlayMode('单曲循环')"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-repeat icon"
          viewBox="0 0 16 16"
          v-if="playMode === '列表循环'"
        >
          <path
            d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"
          />
        </svg>
        <!-- 单曲循环 -->
        <svg
          @click="changePlayMode('随机播放')"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-repeat-1 icon"
          viewBox="0 0 16 16"
          v-if="playMode === '单曲循环'"
        >
          <path
            d="M11 4v1.466a.25.25 0 0 0 .41.192l2.36-1.966a.25.25 0 0 0 0-.384l-2.36-1.966a.25.25 0 0 0-.41.192V3H5a5 5 0 0 0-4.48 7.223.5.5 0 0 0 .896-.446A4 4 0 0 1 5 4h6Zm4.48 1.777a.5.5 0 0 0-.896.446A4 4 0 0 1 11 12H5.001v-1.466a.25.25 0 0 0-.41-.192l-2.36 1.966a.25.25 0 0 0 0 .384l2.36 1.966a.25.25 0 0 0 .41-.192V13h6a5 5 0 0 0 4.48-7.223Z"
          />
          <path
            d="M9 5.5a.5.5 0 0 0-.854-.354l-1.75 1.75a.5.5 0 1 0 .708.708L8 6.707V10.5a.5.5 0 0 0 1 0v-5Z"
          />
        </svg>
        <!-- 随机 -->
        <i
          @click="changePlayMode('列表循环')"
          class="bi bi-shuffle icon"
          style="color: white; font-size: 0.45rem"
          v-if="playMode === '随机播放'"
        ></i>
        <!-- <i class="bi bi-repeat-1 icon2"></i>
        <i class="bi bi-repeat icon2"></i> -->

        <svg class="icon" aria-hidden="true" @click="changeMusic(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg
          class="icon bofang"
          aria-hidden="true"
          @click="play"
          v-if="!isPlaying"
        >
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg class="icon bofang" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="changeMusic(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>

import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex'
import { like, likeList } from '@/request/api/item.js'
import { getMusicComment } from '@/request/api/comment'
import BScroll from '@better-scroll/core'

export default {
  data () {
    return {
      isLyricShow: false,
      list: '',
      lyric1: [{
        min: '',
        sec: '',
        mill: '',
        lrc: '',
        time: 0,
        tlyric: '',
        next: 0
      }],
      musicDetail: '',
      isLike: false,
      count: 0, // 評論數量
      IntervalTime: 0
    }
  },
  components: {
    Vue3Marquee
  },
  computed: {
    ...mapState(['userList', 'lyricList', 'currentTime', 'playListIndex', 'itemList', 'duration', 'audioPlaying', 'playMode'])

  },
  updated () {
  },
  async created () {
    this.getCommentCount()
    // console.log(this.musicList)

    // likeList() 505673461
    // this.musicDetail = this.itemList[this.playListIndex]
    if (JSON.stringify(this.userList) !== '{}') {
      const res = await likeList(this.userList.profile.userId, localStorage.getItem('cookie'))// this.userList.profile.userId
      // console.log(res)
      // console.log(this.itemList[this.playListIndex].id)
      if (res.data.ids.includes(this.itemList[this.playListIndex].id) === true) {
        // console.log('true')
        this.isLike = true
      }
    }
  },

  mounted () {
    // console.log('lyricList', this.lyricList)

    // 处理未翻译的歌词
    if (this.lyricList.lrc.lyric) {
      const arr = this.lyricList.lrc.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
        // 分
        const min = item.slice(item.indexOf('[') + 1, item.indexOf(':'))
        // 秒
        const sec = item.slice(item.indexOf(':') + 1, item.indexOf('.'))
        // 毫秒
        const mill = item.slice(item.indexOf('.') + 1, item.indexOf(']'))
        // 歌词
        const lrc = item.slice(item.indexOf(']') + 1, item.length)
        // 总时间
        const time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
        return { min, sec, mill, lrc, time }
      })
      // 获取下一句歌词的时间
      arr.forEach((item
        , i) => {
        // 如果循环到了最后一句，固定为active样式
        if (i === arr.length - 1 || !arr[i + 1].time) {
          item.next = 100000
        } else { item.next = arr[i + 1].time }// 下一首歌的时间
      })
      // 处理翻译的歌词

      if (this.lyricList.tlyric) {
        const arr2 = this.lyricList.tlyric.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          // 分
          const min = item.slice(item.indexOf('[') + 1, item.indexOf(':'))
          // 秒
          const sec = item.slice(item.indexOf(':') + 1, item.indexOf('.'))
          // 毫秒
          const mill = item.slice(item.indexOf('.') + 1, item.indexOf(']'))
          // 歌词
          const lrc = item.slice(item.indexOf(']') + 1, item.length)
          // 毫秒
          const time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)

          return { min, sec, mill, lrc, time }
        })

        // 处理一下翻译的歌词数组，把空的去掉
        arr.forEach((item
          , i) => {
          if (arr[i].lrc.includes('作词') || arr[i].lrc.includes('作曲') || arr[i].lrc.includes('编曲')) {
            arr.splice(i, 1)
          }
        })
        arr2.forEach((item
          , i) => {
          if (arr2[i].lrc === '') {
            arr2.splice(i, 1)
          }
        })

        arr.forEach((item
          , i) => {
          if (arr2.length > i) {
            if (arr[i].lrc && !arr[i].lrc.includes('作词') && !arr[i].lrc.includes('作曲') && !arr[i].lrc.includes('编曲')) {
              arr[i].tlyric = arr2[i].lrc
              // console.log(arr[i].lrc, arr2[i].lrc)
            } else {
              arr[i].tlyric = ''
            }
          }
        })
        // }
      }
      this.lyric1 = arr
      // console.log('最终', this.lyric1)

      setTimeout(() => {
        this.addDuration()
      }, 1200)
    }
  },
  methods: {
    ...mapMutations([
      'updatedetailShow',
      'updateplayListIndex',
      'updateDuration', 'updateLyricList', 'updateAudioPlaying', 'updateIsPlaying', 'updateCurrentTime', 'updatePlayMode', 'updateIsFooterMusic']),
    changeImg (url, size) {
      url += '?param=' + size + 'y' + size
      return url
    },
    // addSuffix (array, suffix) {
    //   return array.map(item => {
    //     item.picUrl += suffix
    //     return item
    //   })
    // },
    watchLyric () {
      this.isLyricShow = !this.isLyricShow
      // const p = document.querySelector('p.active')
      // console.log(p.getBoundingClientRect())
      // // getBoundingClientRect().top
      // console.log(this.$refs.br.getBoundingClientRect())
      // if (p) {
      //   this.$refs.musicLyric.scrollTo({
      //     top: p.offsetTop + 300,
      //     behavior: 'smooth'
      //   })
      // }
    },
    async getCommentCount () {
      const res2 = await getMusicComment(this.musicList.id, 1)
      this.count = res2.data.total
      if (this.count > 999) {
        if (this.count > 100000) {
          this.count = '10w' + '+'
        } else this.count = 999 + '+'
      }
    },
    changePlayMode (type) {
      this.updatePlayMode(type)
      // this.playMode = type
      // console.log(this.playMode)
      this.$toast({
        message: this.playMode,
        position: 'bottom',
        duration: 500

      })
    },
    backHome: function () {
      // console.log(this.$route.path)
      if (this.$route.path === '/videoDetail') {
        document.getElementById('foot').style.zIndex = '-1'
      }
      this.isLyricShow = false
      this.updatedetailShow()
    },
    // 上一首/下一首
    changeMusic: function (num) {
      let index = this.playListIndex + num
      // console.log('触发了上一首/下一首')
      index = index % this.itemList.length

      if (index < 0) {
        index = this.itemList.length - 2
      }
      this.updateplayListIndex(index)
      // 先滚动到顶部，然后当下一句歌词时间之前一直保持在顶部
      const p = document.querySelector('p.active')
      if (p) {
        this.$refs.musicLyric.scrollTo({
          top: -p.offsetTop - 300,
          behavior: 'smooth'
        })
      }
      const interval = setInterval(() => {
        this.IntervalTime += 1000
        if (p) {
          this.$refs.musicLyric.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
          if (this.IntervalTime >= this.lyric1[0].next) clearInterval(interval)
        }
      }, 1000)
    },
    // 进度条点击事件
    changeProgressBar: function () {
      // console.log('change')
    },
    inputProgressBar: function () {
      // console.log('input')

      const length = document.getElementById('range').value
      this.updateCurrentTime(length)
      this.$emit('inputIsChange', true)
    },
    intoComment () {
      this.updatedetailShow()

      this.$router.push({ path: '/comment', query: { id: this.musicList.id } })
      // console.log(this.musicList.id)
    },
    async likeOrDislike (bool) {
      // if (JSON.stringify(this.userList) !== '{}') {
      const res = await like(this.musicList.id, bool)
      if (res.data.code === 200 && bool === true) {
        this.isLike = true
      } else if (res.data.code === 200 && bool === false) {
        this.isLike = false
      }
      // } else this.$router.push('/login')
    },
    // 处理时间
    formatSeconds (seconds) {
      if (seconds === 0) { return '00:00' }
      // 分钟
      const minutes = Math.floor(seconds / 60)
      // 秒
      const remainingSeconds = Math.floor(seconds % 60)

      // 使用padStart方法添加前导零
      const minutesString = minutes.toString().padStart(2, '0')
      const secondsString = remainingSeconds.toString().padStart(2, '0')
      return `${minutesString}:${secondsString}`
    }
  },
  props: ['musicList', 'isPlaying', 'play', 'addDuration', 'updateTime'],
  watch: {
    currentTime: function (newValue) {
      const p = document.querySelector('p.active')
      // 先获取p这个dom节点，判断p距顶端距离如果大于300就开始滚动
      if (p && p.offsetTop > 300) {
        this.$refs.musicLyric.scrollTo({
          top: p.offsetTop - 300,
          behavior: 'smooth'
        })
      }
      // console.log(this.duration)
      if (newValue >= this.duration) {
        if (this.playMode !== '单曲循环') {
          if (this.playMode === '列表循环') { this.changeMusic(1) } else {
            const random = Math.floor(Math.random() * this.itemList.length)
            // console.log(random)
            this.changeMusic(random)
          }
        }
      }
    },

    audioPlaying () {
      // setTimeout防止这个多次执行
      setTimeout(() => {
        if (this.audioPlaying === false) {
          this.updateIsPlaying()

          this.$toast('vip歌曲,无法免费播放')
          this.updateAudioPlaying()
          setTimeout(() => {
            this.changeMusic(1)
          }, 500)
        }
      }, 700)
    },
    lyricList: function () {
      if (this.lyricList.lrc.lyric) {
        const arr = this.lyricList.lrc.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          // 分
          const min = item.slice(item.indexOf('[') + 1, item.indexOf(':'))
          // 秒
          const sec = item.slice(item.indexOf(':') + 1, item.indexOf('.'))
          // 毫秒
          const mill = item.slice(item.indexOf('.') + 1, item.indexOf(']'))
          // 歌词
          const lrc = item.slice(item.indexOf(']') + 1, item.length)
          // 毫秒
          const time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
          return { min, sec, mill, lrc, time }
        })
        // 获取下一句歌词的时间
        arr.forEach((item
          , i) => {
          // 如果循环到了最后一句，固定为active样式
          if (i === arr.length - 1 || !arr[i + 1].time) {
            item.next = 100000
          } else { item.next = arr[i + 1].time }// 下一首歌的时间
        })
        // 处理翻译的歌词
        if (this.lyricList.tlyric) {
          if (this.lyricList.tlyric.lyric) {
            const arr2 = this.lyricList.tlyric.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
              // 分
              const min = item.slice(item.indexOf('[') + 1, item.indexOf(':'))
              // 秒
              const sec = item.slice(item.indexOf(':') + 1, item.indexOf('.'))
              // 毫秒
              const mill = item.slice(item.indexOf('.') + 1, item.indexOf(']'))
              // 歌词
              const lrc = item.slice(item.indexOf(']') + 1, item.length)
              // 总时间
              const time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)

              return { min, sec, mill, lrc, time }
            })
            // 处理一下翻译的歌词数组，把空的去掉
            arr.forEach((item
              , i) => {
              if (arr[i].lrc.includes('作词') || arr[i].lrc.includes('作曲') || arr[i].lrc.includes('编曲')) {
                arr.splice(i, 1)
              }
            })
            arr2.forEach((item
              , i) => {
              if (arr2[i].lrc === '') {
                arr2.splice(i, 1)
              }
            })
            arr.forEach((item
              , i) => {
              if (arr2.length > i) {
                if (arr[i].lrc && !arr[i].lrc.includes('作词') && !arr[i].lrc.includes('作曲') && !arr[i].lrc.includes('编曲')) {
                  arr[i].tlyric = arr2[i].lrc
                  // console.log(arr[i].lrc, arr2[i].lrc)
                } else {
                  arr[i].tlyric = ''
                }
              }
            })
          }
        }
        this.lyric1 = arr
        // 每次歌词变换说明切歌了，要滚动回顶部
        setTimeout(() => {
          this.addDuration()
        }, 1200)
      }
    },
    musicList: async function () {
      this.getCommentCount()

      this.isLike = false
      if (this.userList.profile) {
        const res = await likeList(this.userList.profile.userId, localStorage.getItem('cookie'))// this.userList.profile.userId
        if (res.data.ids.includes(this.musicList.id) === true) {
          // console.log('true')
          this.isLike = true
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
//兜底策略
.bgimg2 {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  background-color: #161824;
}
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(1rem);
}
//遮罩层
.bgimg-before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: black;
  opacity: 0.4;
  z-index: -1;
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  //   color: rgb(253, 253, 253);
  fill: rgb(250, 255, 255);

  .detailTopLeft {
    position: relative;
    padding-left: 0.39rem;
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      .Marquee {
        color: #fff;
        font-size: 0.358rem;
      }
      div::-webkit-scrollbar {
        display: none; //移除滚动条
      }
      div {
        overflow: scroll; //溢出滚动
        white-space: nowrap; //限定一行
        position: relative;

        span {
          font-size: 0.27rem;
          color: #999;
        }
        .icon {
          transform: translateY(0.055rem);
          width: 0.27rem;
          height: 0.27rem;
          fill: #999;
        }
      }
      .i {
        // position: fixed;
        bottom: 0.2rem;
        transform: translateX(2rem);
      }
    }
  }
  .detailTopRight {
    padding-right: 0.302rem;
    position: absolute;
    right: 0;
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    top: 0.71rem;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-18deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    top: 0.71rem;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(3deg);
    transition: all 2s;
  }
  .img_cd {
    width: 5.976rem;
    height: 5.976rem;
    position: absolute;
    // bottom: 0rem;
    top: 2.39rem;
    z-index: -1;
  }
  .img_ar {
    width: 3.904rem;
    height: 3.904rem;
    position: absolute;
    bottom: 1.78rem;
    border-radius: 50%;
    animation: rotate_ar 15000s linear; //确保永远旋转
  }
  .img_ar_active {
    //动画启动
    animation-play-state: running;
  }
  .img_ar_pauesd {
    //动画暂停
    animation-play-state: paused;
  }

  //旋转动画
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360000deg);
    }
  }
}
//歌词样式
.musicLyric::-webkit-scrollbar {
  display: none;
}
.musicLyric {
  width: 100%;
  height: 12.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  overflow: scroll;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  p {
    //   flex-shrink: 0;
    color: rgb(165, 164, 160);
    font-size: 0.334rem;
    margin-bottom: 0.628rem;
    text-align: center; // overflow: auto;
  }
  .active {
    color: #fff;
    font-size: 0.334rem !important;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    margin-left: 0.6rem;
    margin-right: 0.6rem;
    width: 84%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }

  .input {
    position: absolute;
    width: 93%;
    transform: translateY(1.4rem);
    display: flex;
    margin-left: 0.25rem;
    margin-right: 0.25rem;

    .left {
      font-size: 0.21rem;
      color: white;
      margin-right: 0.2rem;
    }
    .range {
      // width: 80%;
      transform: translateY(0.08rem);
      height: 0.06rem;
    }
    .right {
      margin-left: 0.2rem;
      font-size: 0.21rem;
      color: white;
    }
  }
  //输入框样式
  /*横条样式*/
  input[type="range"] {
    -webkit-appearance: none; /*清除系统默认样式*/
    width: 100%;
    background: -webkit-linear-gradient(#cdcdcd, #cdcdcd) no-repeat, #696969; /*设置左边颜色为#61bd12，右边颜色为#ddd*/
    background-size: 100% 100%; /*设置左右宽度比例*/
    height: 0.032rem; /*横条的高度*/
  }
  /*拖动块的样式*/
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; /*清除系统默认样式*/
    height: 0.1474rem; /*拖动块高度*/
    width: 0.1474rem; /*拖动块宽度*/
    background: #ffffff; /*拖动块背景*/
    border-radius: 50%; /*外观设置为圆形*/
    // border: solid 0.02rem #ddd; /*设置边框*/
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }

    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
  .icon2 {
    color: red;
    font-size: 0.5rem;
    width: 0.5rem;
    height: 0.5rem;
  }
}
</style>

<style lang="less">
.van-toast {
  background-color: white;
  color: black;
}
</style>
