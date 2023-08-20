<template>
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
            >播放全部<span> (共{{ itemList2.length }}首)</span></span
          >
        </div>
      </div>
      <!-- 右边按钮 -->
      <div class="right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span
          >收藏<span>({{ changeCount2(subscribedCount) }})</span></span
        >
      </div>
    </div>
    <!-- 歌曲列表渲染 -->
    <div class="itemList">
      <div class="item" v-for="(item, i) in itemList2" :key="i">
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
            v-if="showHorn(i, itemList2)"
          >
            <!-- {{ this.itemList.length }} -->
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
import { checkMusicFree, getSearchMusic } from '@/request/api/home.js'

import 'vant/es/toast/style'

export default {
  // data () {
  //   return {
  //     id: itemList.id
  //   }
  // },

  // 通过setup接受参数
  setup (props) {
    // console.log(props)
    // 对播放量的处理
    function changeCount (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
    function changeCount2 (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(0) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(0) + '万'
      }
      return num
    }
    return { changeCount, changeCount2 }
  },
  props: ['itemList2', 'subscribedCount'],
  computed: {
    ...mapState(['isPlaying', 'playListIndex', 'detailShow', 'musicChange', 'audioPlaying', 'itemList', 'idList'])

  },

  methods: {
    // 点击播放选中歌单中的音乐，传下标判断点击的是哪个歌曲
    async playMusic (i) {
      this.updatePerFm(false)
      // this.updateIsPlaying()
      // this.id = this.itemList[i].id
      // console.log(this.itemList[i].id)
      // console.log(this.itemList[i].fee)
      // if (this.itemList[i].fee) {
      //   console.log('vip歌曲无法播放')
      // }
      // 检测歌曲版权和vip
      // const res = await getMusicDetail(this.itemList[i].id)
      // 检测是否是vip
      const check = await checkMusicFree(this.itemList2[i].fee)
      this.updateMusicChange(false)
      if (check) {
        // 寻找同名歌曲
        const searchRes = await getSearchMusic(this.itemList2[i].ar[0].name + ' ' + this.itemList2[i].name)
        console.log(searchRes.data.result)
        // 筛选免费版
        const filter = searchRes.data.result.songs.filter(item => item.fee === 0)
        if (filter.length === 0) {
          // await this.updateItemList(this.itemList2)
          this.$toast({
            message: 'vip歌曲,无法免费播放',
            position: 'midlle',
            duration: 1000
          })
          this.updateIsPlaying()
          this.updateAudioPlaying()
          this.updateItemList(this.itemList2)
          this.updateplayListIndex(i)
          this.changeMusic(1)

          if (!this.musicChange) {
            this.updatedetailShow()
          }
          // 恢复状态
          this.updateMusicChange(false)
          return
        } else {
          const obj = {
            music: filter[0],
            index: i
          }
          this.updateItemList(this.itemList2)
          this.updateItemList2(obj)
        }

        // console.log(this.musicChange)
        this.updateplayListIndex(i)
        // setTimeout(() => {
        //   this.updateplayListIndex(i)
        // }, 1200)
        // return this.$toast({
        //   message: 'vip歌曲,无法免费播放',
        //   position: 'midlle',
        //   duration: 1000
        // })
        await this.$toast({
          message: 'vip歌曲,无法免费播放,已替换成免费版',
          position: 'midlle',
          duration: 1000
        })
      } else {
        await this.updateItemList(this.itemList2)
        // console.log(this.musicChange)
        await this.updateplayListIndex(i)
      }

      // 如果经过更新下标和列表音乐没有实际播放，说明这首歌没有版权，就要停止按钮改变

      // setTimeout(() => {
      //   if (!this.audioPlaying) {
      //     this.$toast('vip歌曲,无法免费播放')
      //     this.updateIsPlaying()
      //     this.updateAudioPlaying()
      //     // setTimeout(() => {
      //     //   this.changeMusic(1)
      //     // }, 500)
      //     return
      //   }
      // }, 500)
      // if (!this.audioPlaying) {
      //   this.$toast('vip歌曲,无法免费播放')
      //   this.updateIsPlaying()
      //   this.updateAudioPlaying()
      //   // setTimeout(() => {
      //   //   this.changeMusic(1)
      //   // }, 500)
      //   return
      // }

      // 当上述两个执行没反应，即不能改变播放状态，意味着点到了同一个音乐，此时跳转到详情页面
      // 要先等待一会等上面两个异步执行完成
      // setTimeout(() => {
      //   // 方法区
      //   if (!this.musicChange) {
      //     this.updatedetailShow()
      //   }
      // }, 250)
      if (!this.musicChange) {
        this.updatedetailShow()
      }
      // 恢复状态
      this.updateMusicChange(false)
    },
    // 判断是否显示喇叭
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
      console.log('触发了上一首/下一首', this.playListIndex)
      index = index % this.itemList.length

      if (index < 0) {
        index = this.itemList.length - 2
      }
      this.updateplayListIndex(index)
    },
    ...mapMutations(['updateItemList', 'updateItemList2', 'updateplayListIndex', 'updateIsPlaying', 'updatedetailShow', 'updateMusicChange', 'updateAudioPlaying', 'updatePerFm', 'updateIdList'])

  }

}
</script>

<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  height: 1.5rem;
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
    padding-bottom: 0.15rem;

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
