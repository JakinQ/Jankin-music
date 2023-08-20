<template>
  <!-- 顶部栏 -->
  <div class="itemMusicTop">
    <img :src="albumDetail.album.blurPicUrl" alt="" class="bgImg" />
    <img src="./black.jpg" alt="" class="bgImg bgImg2" />

    <!-- 左边 -->
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>专辑</span>
    </div>
    <!-- 右边 -->
    <div class="itemRight">
      <svg class="icon svg" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <div class="icon i iconfont icon-more-vertical"></div>
    </div>
  </div>
  <div class="itemTopContent">
    <!-- 左边头像 -->
    <div class="contentLeft">
      <img :src="albumDetail.album.blurPicUrl" alt="" />
    </div>
    <!-- 右边样式 -->
    <div class="contentRight">
      <p class="rightP_one">{{ albumDetail.album.name }}</p>
      <div class="right_img">
        <div v-if="albumDetail.album.artists">
          <span>歌手:{{ albumDetail.album.artists[0].name }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
      </div>
      <span class="time">发行时间:{{ this.$route.query.time }}</span>
      <p class="rightP_two">
        <span v-if="albumDetail.album.description == ''">介绍:无</span>
        <span v-else style="white-space: pre-wrap">{{
          albumDetail.album.description
        }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
    </div>
  </div>
  <div class="itemTopFooter">
    <div class="footerItem">
      <svg class="icon" aria-hidden="true" @click="intoComment">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <span>{{ changeCount(albumDetailDynamic.commentCount) }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ changeCount(albumDetailDynamic.shareCount) }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>

  <div class="itemMusicList">
    <!-- 顶部按钮 -->
    <div class="itemListTop">
      <!-- 左边按钮 -->
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <div class="bofang">
          <span
            >播放全部<span> (共{{ albumDetail.album.size }}首)</span></span
          >
        </div>
      </div>
      <!-- 右边按钮 -->
      <div class="right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span
          >收藏<span
            >({{ changeCount(albumDetailDynamic.subCount) }})</span
          ></span
        >
      </div>
    </div>
    <!-- 歌曲列表渲染 -->
    <div class="itemList">
      <div class="item" v-for="(item, i) in albumDetail.songs" :key="i">
        <!-- 序号和歌名 -->
        <!-- 播放时不显示序号显示喇叭图标 -->
        <div class="left" @click="playMusic(i)">
          <!-- 当状态处于正在播放,播放歌曲的下标和歌单相同时,触发喇叭图标 -->
          <svg
            t="1662619791927"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1417"
            width="200"
            height="200"
            v-if="showHorn(i, albumDetail.songs)"
          >
            {{ this.albumDetail.songs[i].id }} {{ item.id }}
            <path
              d="M448 282.4v459.2L301.6 594.4 282.4 576H192V448h90.4l18.4-18.4L448 282.4M512 128L256 384H128v256h128l256 256V128z m64 5.6v64.8c145.6 29.6 256 159.2 256 313.6s-110.4 284-256 313.6v64.8c181.6-30.4 320-188 320-378.4S757.6 164 576 133.6z m0 188.8v65.6c55.2 14.4 96 64 96 124s-40.8 109.6-96 124v65.6C666.4 686.4 736 607.2 736 512s-69.6-174.4-160-189.6z"
              p-id="1418"
              fill="#d81e06"
            ></path>
          </svg>
          <span class="index" v-else>{{ i + 1 }}</span>
          <div>
            <!-- 歌名和作者 -->
            <p>{{ item.name }}</p>
            <span v-for="(item2, i2) in item.ar" :key="i2">{{
              item2.name
            }}</span>
          </div>
        </div>
        <!-- mv和菜单 -->
        <div class="right">
          <!-- mv -->
          <svg class="icon bofang" aria-hidden="true" v-show="item.mv">
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <!-- 列表 -->
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
// import { musicCopyright } from '@/request/api/item.js'
import { checkMusicFree } from '@/request/api/home.js'
import 'vant/es/toast/style'
import { getAlbumInfo, getAlbumDetail } from '../../request/api/userDetail'

export default {

  data () {
    return {
      albumDetail: {
        album: {
          size: 0
        },
        songs: []
      },
      albumDetailDynamic: {}
    }
  },

  // 通过setup接受参数
  setup (props) {
    function changeCount (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(0) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(0) + '万'
      }
      return num
    }

    return { changeCount }
  },
  props: ['subscribedCount'],
  computed: {
    ...mapState(['isPlaying', 'playListIndex', 'detailShow', 'musicChange', 'audioPlaying', 'itemList'])

  },
  async created () {
    // console.log(this.itemList)
    // console.log(this.$route.query.id)
    // console.log(this.$route.query.time)
    const album = await getAlbumInfo(this.$route.query.id)
    const album2 = await getAlbumDetail(this.$route.query.id)

    this.albumDetail = album.data
    this.albumDetailDynamic = album2.data
    // console.log(this.albumDetail.album.id)

    // console.log(album)
    // console.log(album2)
  },
  methods: {

    // 点击播放选中歌单中的音乐，传下标判断点击的是哪个歌曲
    async playMusic (i) {
      this.updatePerFm(false)
      // 检测歌曲版权和vip
      // const res = await getMusicDetail(this.itemList[i].id)
      // 检测是否是vip
      const check = checkMusicFree(this.albumDetail.songs[i].fee)
      if (!check) {
        return this.$toast({
          message: 'vip歌曲,无法免费播放',
          position: 'midlle',
          duration: 1000
        })
      }

      this.updateItemList(this.albumDetail.songs)
      // console.log(this.musicChange)
      this.updateplayListIndex(i)

      // 如果经过更新下标和列表音乐没有实际播放，说明这首歌没有版权，就要停止按钮改变

      setTimeout(() => {
        if (!this.audioPlaying) {
          this.$toast('vip歌曲,无法免费播放')
          this.updateIsPlaying()
          this.updateAudioPlaying()
          // setTimeout(() => {
          //   this.changeMusic(1)
          // }, 500)
          return
        }
      }, 500)

      // 当上述两个执行没反应，即不能改变播放状态，意味着点到了同一个音乐，此时跳转到详情页面
      // 要先等待一会等上面两个异步执行完成
      setTimeout(() => {
        // 方法区
        if (!this.musicChange) {
          this.updatedetailShow()
        }
      }, 250)
      // 恢复状态
      this.updateMusicChange(false)
    },
    showHorn (i, item) {
      // this.itemList2[i].id == item.id &&
      //   i == playListIndex &&
      //   this.isPlaying
      if (this.itemList.length === item.length) {
        if (this.itemList[i].id === item[i].id &&
          i === this.playListIndex &&
          this.isPlaying) { return true } else return false
      } else return false
    },
    changeMusic: function (num) {
      let index = this.playListIndex + num
      // console.log('触发了上一首/下一首')
      index = index % this.itemList.length

      if (index < 0) {
        index = this.itemList.length - 2
      }
      this.updateplayListIndex(index)
    },
    intoComment () {
      this.$router.push({ path: '/comment', query: { id: this.albumDetail.album.id, isAlbum: true } })
    },
    ...mapMutations(['updateItemList', 'updateplayListIndex', 'updateIsPlaying', 'updatedetailShow', 'updateMusicChange', 'updateAudioPlaying', 'updatePerFm'])

  }

}
</script>

<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(253, 253, 253);

  //   padding: 0.2rem;
  .icon:last-of-type {
    fill: rgb(253, 253, 253);
  }
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    position: relative;
    align-items: center;
    margin: 0 0.2rem;
    span {
      font-weight: 400;
      font-size: 0.35rem;
      color: rgb(253, 253, 253);
    }
    .svg {
      height: 0.5rem;
      width: 0.5rem;
    }
    .i {
      font-size: 0.4rem;
      position: absolute;
      right: 0rem;
    }
  }

  .bgImg {
    // top: 0.01rem;
    bottom: 63%;
    width: 100%;
    height: 6.3rem;
    position: absolute;
    z-index: -1;
    //图片虚化
    filter: blur(0.525rem);
  }
  .bgImg2 {
    z-index: -2;
    opacity: 0.15;
  }
}
.itemTopContent {
  width: 100%;
  height: 3rem;
  padding: 0.334rem;
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-between;
  .contentLeft {
    width: 36%;
    height: 2.6rem;
    position: relative;

    img {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 0.2rem;
      position: absolute;
      z-index: -1;
    }
    .palyCount {
      position: absolute;
      right: 0.1rem;
      margin-top: 0.1rem;
      .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.02rem;
        vertical-align: middle;
      }
      span {
        font-size: 0.26rem;
        color: #fff;
      }
    }

    .icon {
      width: 0.26rem;
      height: 0.26rem;
      margin-top: -0.08rem;
      vertical-align: middle;
      color: rgb(254, 254, 254);
    }
  }
  .contentRight {
    width: 60%;
    height: 2.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 0.2rem;

    //歌单名字
    .rightP_one {
      font-size: 0.34rem;
      font-weight: 500;
      color: rgb(254, 254, 254);
      //   font-family: "黑体";
    }
    .right_img {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;

      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      .icon {
        height: 0.2rem;
        width: 0.25rem;
        // top: 0.2rem;
      }

      //作者信息
      span {
        color: rgb(240, 244, 243);
        font-size: 0.28rem;
      }
    }
    .time {
      font-size: 0.24rem;
      color: rgb(228, 228, 228);
    }
    .rightP_two {
      width: 97%;
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      //   .text-box {
      //     //解析换行符
      //     white-space: pre-line;
      //   }
      //歌单描述
      span {
        display: inline-block;
        width: 95%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.24rem;
        color: rgb(228, 228, 228);
      }
      .icon {
        width: 0.24rem;
        height: 0.24rem;
      }
    }
  }
}
.itemTopFooter {
  width: 100%;
  height: 0.8rem;
  display: flex;
  justify-content: space-around;
  margin-top: 0.46rem;
  .footerItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .icon {
      fill: rgb(250, 250, 250);
      height: 0.44rem;
      width: 0.44rem;
    }
    span {
      font-size: 0.286rem;
      margin-top: 0.1rem;
      color: rgb(208, 209, 203);
    }
  }
}
.itemMusicList {
  width: 100%;
  height: 10rem;
  background-color: #fff;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  //顶部样式
  .itemListTop {
    font-family: "Microsoft YaHei";
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.15rem;
    .left {
      width: 3rem;
      height: 100%;
      display: flex;
      //   justify-content: space-between;
      align-items: center;
      .icon {
        stroke-width: 20;
        width: 0.46rem;
        height: 0.46rem;
        color: rgb(75, 76, 78);
        transform: translateX(-0.1rem);
      }
      .bofang {
        // margin-left: .34rem;
      }
      span {
        span {
          font-weight: 400;
          color: rgb(149, 150, 152);
          font-size: 0.24rem;
        }
      }
    }
    .right {
      height: 0.852rem;
      display: flex;
      align-items: center;
      background-color: red;
      padding: 0.15rem;
      border-radius: 0.4rem;
      color: #fff;
      .icon {
        width: 0.25rem;
        height: 0.25rem;
        fill: #fff;
        margin-right: 0.1rem;
        stroke: #fff;
        stroke-width: 50;
        font-size: 0.254rem;
      }
      span {
        font-size: 0.254rem;
      }
    }
  }
  //歌曲列表样式
  .itemList {
    width: 100%;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .index {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          p {
            width: 4.54rem;
            height: 0.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 400;
          }
          span {
            font-weight: 400;
            font-size: 0.24rem;
            color: #999;
          }
          margin-left: 0.3rem;
        }
      }
      .right {
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        position: relative;
        .icon {
          fill: #999;
        }
        .bofang {
          position: absolute;
          left: 0;
          height: 0.4rem;
          width: 0.44rem;
        }
        .liebiao {
          font-size: 0.44rem;
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>
