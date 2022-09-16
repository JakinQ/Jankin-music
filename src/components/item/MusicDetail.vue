<template>
  <div>
    <!-- 背景图 -->
    <img
      :src="musicList.al.picUrl"
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
        @click="this.isLyricShow = !this.isLyricShow"
        :src="musicList.al.picUrl"
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <p
        v-for="(item, i) in lyric"
        :key="i"
        :class="
          currentTime * 1000 >= item.time && currentTime * 1000 < item.next
            ? 'active'
            : ''
        "
      >
        {{ item.lrc }}
      </p>
    </div>

    <!-- 底部组件 -->
    <div class="detailFooter">
      <!-- 上 -->
      <!-- <div v-show="isLyricShow"> -->
      <div>
        <div class="footerTop" v-show="!isLyricShow">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinlechangpian"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao-"></use>
          </svg>
        </div>
      </div>
      <div class="footerContent"></div>
      <!-- 进度条 -->
      <input
        type="range"
        class="range"
        ref="ProgressBar"
        min="0"
        :max="duration"
        v-model="currentTime"
        step="0.05"
        @click="changeProgressBar"
      />
      <!-- 下 -->
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
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
export default {
  data () {
    return {
      isLyricShow: false,
      list: ''
    }
  },
  components: {
    Vue3Marquee
  },
  computed: {
    ...mapState(['lyricList', 'currentTime', 'playListIndex', 'itemList', 'duration']),
    // 加工歌词数据
    lyric: function () {
      const arr = ''
      if (this.lyricList.lyric) {
        const arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
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
        // console.log(arr)

        return arr
      }

      return arr
      //   console.log(arr)
    }
  },
  mounted () {
    // console.log(this.isLyricShow)
    // console.log(this.lyricList)
    // console.log(this.lyricList.lyric)
    this.addDuration()
  },
  methods: {
    ...mapMutations([
      'updatedetailShow',
      'updateplayListIndex',
      'updateDuration', 'updateLyricList']),
    backHome: function () {
      this.isLyricShow = false
      this.updatedetailShow()
    },
    // 上一首/下一首
    changeMusic: function (num) {
      let index = this.playListIndex + num
      console.log('触发了上一首/下一首')
      index = index % this.itemList.length

      if (index < 0) {
        index = this.itemList.length - 2
      }
      console.log(index)

      // } else if (index === this.itemList.length) {
      //   index = 0
      // }

      this.updateplayListIndex(index)
    },
    // 进度条点击事件
    changeProgressBar: function () {
      // 不会做，空着
    }
  },
  props: ['musicList', 'isPlaying', 'play', 'addDuration'],
  watch: {
    currentTime: function (newValue) {
      const p = document.querySelector('p.active')
      // 先获取p这个dom节点，判断p距顶端距离如果大于300就开始滚动
      if (p && p.offsetTop > 300) {
        this.$refs.musicLyric.scrollTop = p.offsetTop - 300
      }

      if (newValue === this.duration) {
        // this.updateplayListIndex(this.playListIndex + 1)
        this.changeMusic(1)
        this.play()
        // if (this.playListIndex === this.itemList.length - 1) {
        //   this.updateplayListIndex(0)
        // }
      }
    }
    // isLyricShow: function () {
    //   console.log(this.isLyricShow)
    // }
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
  //   filter: blur(50px);
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
          //   padding-top: 20px;
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
    animation: rotate_ar 15s linear;
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
      transform: rotateZ(360deg);
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
    width: 100%;
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
  .range {
    width: 100%;
    height: 0.06rem;
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
