<template>
  <div class="itemMusicTop">
    <img :src="changeImg(playlist.coverImgUrl)" alt="" class="bgImg" />
    <!-- 左边 -->
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
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
      <img :src="changeImg(playlist.coverImgUrl)" alt="" />

      <div class="palyCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gl-play-copy"></use>
        </svg>
        <span>{{ changeCount(playlist.playCount) }}</span>
      </div>
    </div>
    <!-- 右边样式 -->
    <div class="contentRight">
      <p class="rightP_one">{{ playlist.name }}</p>
      <div class="right_img">
        <div v-if="playlist.creator">
          <img :src="changeImg(playlist.creator.avatarUrl)" alt="" />
          <span>{{ playlist.creator.nickname }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
      </div>
      <p class="rightP_two">
        <span v-if="playlist.description == ''">介绍:无</span>
        <span v-else style="white-space: pre-wrap">{{
          playlist.description
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
      <span>{{ changeCount(playlist.commentCount) }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ changeCount(playlist.shareCount) }}</span>
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
</template>

<script>
import { useRoute } from 'vue-router'
import { getItemMusicList, getItemList } from '../../request/api/item'

export default {
  //   const dres = '介绍:无
  setup (props) {
    // 对播放量的处理
    const isGuanFang = false
    function changeCount (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(0) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(0) + '万'
      } else { return num }
    }
    // console.log(props)
    return { changeCount, isGuanFang }
  },
  props: ['playlist'],
  mounted () {

    // this.updateArray(this.playlist, 100)
    // console.log(this.playlist)
  },
  methods: {
    changeImg (src) {
      src += '?param=100y100'
      return src
    },
    updateArray (object, size) {
      // console.log(object)
      object = this.addSuffix(object, '?param=' + size + 'y' + size)
    },
    addSuffix (object, suffix) {
      object.coverImgUrl += suffix
      return object
    },

    intoComment () {
      // console.log(this.playlist)
      // $router.push({ path: '/comment', query: { id: this.musicList.id } })
      this.$router.push({ path: '/comment', query: { id: this.playlist.id, isList: true } })
    }
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

    //图片虚化  30px
    filter: blur(0.6125rem);
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
      font-weight: 570;
      color: rgb(254, 254, 254);
      // font-family: "黑体";
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
        margin-left: 0.22rem;
        font-size: 0.28rem;
      }
    }
    .rightP_two {
      width: 62%;
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
</style>
