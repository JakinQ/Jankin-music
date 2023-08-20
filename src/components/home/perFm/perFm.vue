<template>
  <div>
    <!-- 背景图 -->
    <!-- {{ musicList.album }} -->
    <img
      :src="musicList.album.picUrl"
      :class="musicList.album.picUrl ? 'bgimg' : 'bgimg2'"
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
      </div>
      <span class="fm">私人FM</span>

      <!-- 右边 -->
      <div class="detailTopRight">
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <!-- 中间内容 -->
    <div class="detailContent" v-show="!isLyricShow">
      <!-- 添加点击事件  点击后出现歌词-->
      <img
        @click="this.isLyricShow = !this.isLyricShow"
        :src="musicList.album.picUrl"
        class="img_ar"
      />
      <!-- 歌曲信息 -->
      <div class="musicInfo">
        <div class="name">{{ musicList.name }}</div>

        <div class="author">
          <span
            v-for="(item, index) in musicList.artists"
            :key="item"
            class="spa"
            @click="authorDetail(musicList.artists)"
          >
            {{ item.name }}
            <span v-if="musicList.artists.length - 1 > index"> / </span>
          </span>
          <svg
            class="liebiao i"
            aria-hidden="true"
            @click="authorDetail(musicList.artists)"
          >
            <use xlink:href="#icon-youjiantou1"></use>
          </svg>
        </div>
      </div>
      <van-overlay :show="overlayShow" @click="offOverlay()">
        <div class="wrapper">
          <div class="block">
            <div class="title">请选择要查看的歌手</div>
            <div
              class="list"
              v-for="(item, index) in musicList.artists"
              :key="index"
              @click="authorDetail2(item.id)"
            >
              <!-- <img :src="item.img1v1Url" alt="" /> -->
              <div>{{ item.name }}</div>
            </div>
          </div>
        </div>
      </van-overlay>
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
        <i
          @click="deleteFm(musicList.id)"
          class="bi bi-heartbreak"
          style="font-size: 0.5rem; color: white; opacity: 0.5"
        ></i>
        <i
          v-if="!isLike"
          class="bi bi-heart"
          style="font-size: 0.5rem; color: white"
          @click="likeOrDislike(true)"
        ></i>
        <i
          v-else
          class="bi bi-heart-fill"
          style="font-size: 0.6rem; color: red"
          @click="likeOrDislike(false)"
        ></i>
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
        <van-icon name="chat-o" @click="intoComment" :badge="count" />
        <!-- <svg class="icon" aria-hidden="true" @click="intoComment">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg> -->
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex'
import { like, likeList } from '@/request/api/item.js'
import { getPreFm, fmTrash } from '@/request/api/home.js'
import { getMusicComment } from '@/request/api/comment'
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
      overlayShow: false,
      bgImg: [],
      newList: [
        {
          album: { picUrl: '' },
          artists: { name: '' }
        }
      ],
      count: 0, // 评论数
      IntervalTime: 0
    }
  },
  components: {

  },
  computed: {
    ...mapState(['userList', 'lyricList', 'currentTime', 'playListIndex', 'itemList', 'duration', 'audioPlaying', 'perFmList', 'detailShow'])

  },
  updated () {
  },
  async created () {
    // 第一次进入sirenfm先获取一次新数组，当本来的三首歌用完后再用这个
    this.addNewList()
    this.getCommentCount()

    // this.musicDetail = this.itemList[this.playListIndex]
    // console.log(this.musicDetail)
    if (JSON.stringify(this.userList) !== '{}') {
      const res = await likeList(this.userList.profile.userId, localStorage.getItem('cookie')
      )// this.userList.profile.userId
      if (res.data.ids.includes(this.perFmList[this.playListIndex].id) === true) {
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
      'updatedetailShow', 'updateItemList', 'updateplayListIndex', 'updateDuration',
      'updateLyricList', 'updateAudioPlaying', 'updateIsPlaying', 'updateCurrentTime', 'updatePerFm', 'updatePerFmList']),

    async getCommentCount () {
      const res2 = await getMusicComment(this.musicList.id, 1)
      this.count = res2.data.total
      if (this.count > 999) {
        if (this.count > 100000) {
          this.count = '10w' + '+'
        } else this.count = 999 + '+'
      }
    },
    backHome: async function () {
      // this.updatePerFm(false)
      // const nowtime = Date.now()
      // const res = await getPreFm(nowtime)
      // this.updatePerFmList(res.data.data)
      this.isLyricShow = false
      this.updatedetailShow()
    },
    offOverlay () {
      this.overlayShow = false
    },
    // 进入作者详情
    authorDetail (arr) {
      // console.log(arr)
      if (arr.length <= 1) {
        this.$router.push({ path: '/userDetail', query: { id: arr[0].id } })
        this.updatedetailShow()
      } else { this.overlayShow = true }
      // this.overlayShow = false
    },
    // 跳转到歌手详情
    authorDetail2 (id) {
      // console.log(id)
      this.$router.push({ path: '/userDetail', query: { id: id } })
      this.overlayShow = false
      this.updatedetailShow()
    },
    async addNewList () {
      const timestamp = Date.now()
      const res = await getPreFm(timestamp + 10000)
      this.newList = res.data.data
      // console.log('new', this.newList)
    },
    // 下一首
    changeMusic: function (num) {
      if (this.playListIndex === this.perFmList.length - 1) {
        this.perFmList.splice(0, this.perFmList.length - 1)
        // const res = this.perFmList
        // console.log('删除后的数组', res)
        // console.log('新数组', this.newList)
        // 修改前的接口一次获取三首歌，可以用这个代码
        // this.perFmList.push(this.newList[0])
        // this.perFmList.push(this.newList[1])
        // this.perFmList.push(this.newList[2])
        this.perFmList.push(this.newList[0])
        // console.log('新添加后的数组', this.perFmList)
        // 添加完了要换新数组
        this.addNewList()
        this.updateplayListIndex(0)
      }
      let index = this.playListIndex + num
      // console.log('触发了上一首/下一首')
      index = index % this.perFmList.length
      // console.log(index)
      if (index < 0) {
        index = this.perFmList.length - 2
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
      // setTimeout(() => {
      //   this.updateTime()
      // }, 500)
      // console.log(this.audioPlaying)
      // 如果经过更新下标和列表音乐没有实际播放，说明这首歌没有版权，就要停止按钮改变
      // setTimeout(() => {
      //   if (!this.audioPlaying) {
      //     this.$toast('应版权方要求,该歌曲无法免费播放')
      //     this.updateIsPlaying()
      //     this.updateAudioPlaying()
      //     return
      //   }
      // }, 1000)
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

      // console.log(this.currentTime)
    },
    intoComment () {
      this.updatedetailShow()

      this.$router.push({ path: '/comment', query: { id: this.musicList.id } })
      // console.log(this.musicList.id)
    },
    async likeOrDislike (bool) {
      // if (JSON.stringify(this.userList) !== '{}') {
      const res = await like(this.musicList.id, bool, localStorage.getItem('cookie'))
      if (res.data.code === 200 && bool === true) {
        this.isLike = true
      } else if (res.data.code === 200 && bool === false) {
        this.isLike = false
      }
      // } else this.$router.push('/login')
    },
    async deleteFm (id) {
      // console.log('fmTrash', id)
      const res = await fmTrash(id, localStorage.getItem('cookie'))
      if (res.data.code === 200) {
        this.$toast({
          message: '我们会努力向你推荐更喜欢的内容',
          position: 'bottom',
          duration: 1000
        })
        this.changeMusic(1)
      } else {
        this.$toast({
          message: '操作失败',
          position: 'bottom',
          duration: 1000
        })
      }
      // console.log(res)
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
  props: ['isPlaying', 'play', 'addDuration', 'updateTime', 'musicList'],
  watch: {
    currentTime: function (newValue) {
      const p = document.querySelector('p.active')

      // 先获取p这个dom节点，判断p距顶端距离如果大于300就开始滚动
      if (p && p.offsetTop > 300) {
        this.$refs.musicLyric.scrollTop = p.offsetTop - 300
        this.offsetTop = -p.offsetTop
      }
      // console.log(this.duration)
      // console.log(newValue)

      // console.log(this.currentTime)
      if (newValue >= this.duration) {
        this.changeMusic(1)
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
          }
        }

        this.lyric1 = arr
        // 每次歌词变换说明切歌了，要滚动回顶部
        this.$refs.br.scrollIntoView({
          behavior: 'smooth'
        })
        setTimeout(() => {
          this.addDuration()
        }, 1200)
      }
    },
    musicList: async function () {
      this.getCommentCount()

      this.isLike = false
      if (JSON.stringify(this.userList) !== '{}') {
        const res = await likeList(this.userList.profile.userId, localStorage.getItem('cookie'))// this.userList.profile.userId
        if (res.data.ids.includes(this.perFmList[this.playListIndex].id) === true) {
          // console.log('true')
          this.isLike = true
        }
      }
    },
    // 每次打开私人fm都要获取一次新数组
    detailShow: async function () {
      if (this.detailShow === true) {
        this.addNewList()
        // console.log('new', this.newList)
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
  }
  .fm {
    margin-left: 0.2rem;
    font-size: 0.35rem;
    color: white;
  }
  .detailTopRight {
    padding-right: 0.302rem;
    position: absolute;
    right: 0;
  }
}
.detailContent {
  width: 100%;
  height: 11rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .musicInfo {
    position: absolute;
    bottom: 0%;
    overflow: hidden;
    width: 100%;
    padding-left: 0.83rem;
    margin-right: 0.75rem;
    .name {
      text-align: center;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: white;
      font-size: 0.35rem;
    }
    .author {
      margin-top: 0.3rem;
      text-align: center;
      font-size: 0.28rem;
      color: aqua;
      .i {
        // position: absolute;
        margin-left: 0.035rem;
        transform: translateX(0.0175rem);
        height: 0.245rem;
        width: 0.2625rem;
        fill: aqua;
      }
    }
  }

  .img_ar {
    width: 87%;
    // height: 6.6rem;
    position: absolute;
    bottom: 1.78rem;
    top: 25%;
    // border-radius: 50%;
    // animation: rotate_ar 15000s linear; //确保永远旋转
  }

  // //旋转动画
  // @keyframes rotate_ar {
  //   0% {
  //     transform: rotateZ(0deg);
  //   }
  //   100% {
  //     transform: rotateZ(360000deg);
  //   }
  // }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    //   align-items: center; /* 垂直居中 */
  }

  .block {
    // display: flex;
    border-radius: 0.2rem;
    width: 6.3rem;
    // height: 3.024rem;
    background-color: #fff;
    flex-direction: column;
    justify-content: center; /* 水平居中 */
    //   align-items: center;
    .title {
      line-height: 0.9rem;
      font-weight: 600;
      margin-left: 0.4rem;
      margin-top: 0.2rem;
      margin-bottom: 0.1rem;

      font-size: 0.34rem;
    }

    .list {
      display: flex;
      margin-left: 0.4rem;
      line-height: 0.9rem;
      font-size: 0.28rem;
      img {
        border-radius: 10%;
        height: 0.9rem;
        width: 0.9rem;
      }
      div {
        // margin-left: 0.4rem;
      }
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
}
</style>
<style lang="less">
.van-icon-chat-o:before {
  font-size: 0.6rem;
  color: white;
}
.van-badge {
  border: none;
  background: none;
  transform: translate(64%, -50%);
}
</style>
