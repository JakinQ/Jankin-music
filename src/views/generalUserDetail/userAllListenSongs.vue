<template>
  <div>
    <van-sticky>
      <!-- 菜单栏 -->
      <div class="topNav">
        <div class="topLeft">
          <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
          </svg>
        </div>

        <div class="topContent">
          <span>{{ userDetail.profile.nickname }}的听歌排行</span>
        </div>
      </div>
    </van-sticky>

    <van-tabs
      v-model:active="active"
      title-active-color="red"
      style="margin-bottom: 1.068rem"
      sticky
      ellipsis
      swipeable
      animated
      lazy-render
      offset-top="0.963rem"
    >
      <van-tab title="最近一周" title-style="font-size: 0.36rem">
        <div class="itemMusicList">
          <!-- 歌曲列表渲染 -->
          <div class="itemList">
            <div class="item" v-for="(item, i) in oneWeekList1" :key="i">
              <!-- 序号和歌名 -->
              <!-- 播放时不显示序号显示喇叭图标 -->
              <div class="left" @click="playMusic(i, oneWeekList1)">
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
                  v-if="
                    this.oneWeekList1[i].id == item.id &&
                    i == playListIndex &&
                    this.isPlaying
                  "
                >
                  <path
                    d="M448 282.4v459.2L301.6 594.4 282.4 576H192V448h90.4l18.4-18.4L448 282.4M512 128L256 384H128v256h128l256 256V128z m64 5.6v64.8c145.6 29.6 256 159.2 256 313.6s-110.4 284-256 313.6v64.8c181.6-30.4 320-188 320-378.4S757.6 164 576 133.6z m0 188.8v65.6c55.2 14.4 96 64 96 124s-40.8 109.6-96 124v65.6C666.4 686.4 736 607.2 736 512s-69.6-174.4-160-189.6z"
                    p-id="1418"
                    fill="#d81e06"
                  ></path>
                </svg>
                <span class="index" v-else>{{ i + 1 }}</span>
                <div>
                  <!-- 歌名和作者 -->
                  <p>{{ item.song.name }}</p>
                  <span v-for="(item2, i2) in item.song.ar" :key="i2">{{
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
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="所有时间" title-style="font-size: 0.36rem;">
        <div class="itemMusicList">
          <!-- 歌曲列表渲染 -->
          <div class="itemList">
            <div class="item" v-for="(item, i) in allList" :key="i">
              <!-- 序号和歌名 -->
              <!-- 播放时不显示序号显示喇叭图标 -->
              <div class="left" @click="playMusic(i, allList)">
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
                  v-if="
                    this.allList[i].id == item.id &&
                    i == playListIndex &&
                    this.isPlaying
                  "
                >
                  <path
                    d="M448 282.4v459.2L301.6 594.4 282.4 576H192V448h90.4l18.4-18.4L448 282.4M512 128L256 384H128v256h128l256 256V128z m64 5.6v64.8c145.6 29.6 256 159.2 256 313.6s-110.4 284-256 313.6v64.8c181.6-30.4 320-188 320-378.4S757.6 164 576 133.6z m0 188.8v65.6c55.2 14.4 96 64 96 124s-40.8 109.6-96 124v65.6C666.4 686.4 736 607.2 736 512s-69.6-174.4-160-189.6z"
                    p-id="1418"
                    fill="#d81e06"
                  ></path>
                </svg>
                <span class="index" v-else>{{ i + 1 }}</span>
                <div>
                  <!-- 歌名和作者 -->
                  <p>{{ item.song.name }}</p>
                  <span v-for="(item2, i2) in item.song.ar" :key="i2">{{
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
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { singerDetail } from '@/request/api/item'
import { getSingerList } from '../../request/api/userDetail'
import { checkMusicFree } from '@/request/api/home.js'

import { mapMutations, mapState } from 'vuex'
export default {

  data () {
    return {
      userDetail: {
        profile: {
          nickname: ''
        }
      },
      oneWeekList1: [{ song: { name: '', al: {}, ar: {} } }],
      allList: []
      // playList: new Array(100).fill({ al: {}, ar: [], id: 0, name: '' }), // 处理后的播放列表，与vuex的itemList的格式一样
    }
  },
  computed: {
    ...mapState(['isPlaying', 'playListIndex', 'detailShow', 'musicChange', 'audioPlaying', 'userList', 'detailShow', 'itemList'])

  },
  watch: {
    // 打开弹出层时候会出现问题，底下样式暴露在弹出层，除去该样式，修改层级
    detailShow: function () {
      if (this.detailShow === true) {
        document.getElementsByClassName('van-tabs__line')[0].style.zIndex = '0'
      }
    }
  },
  async mounted () {
    const oneWeek = await getSingerList(this.$route.query.id, 1)
    this.oneWeekList1 = oneWeek.data.weekData
    // console.log(this.oneWeekList1)
    const all = await getSingerList(this.$route.query.id, 0)
    this.allList = all.data.allData
    // console.log(this.allList)
    // if (JSON.stringify(this.userList) !== '{}') {  isLogin
    const detail = await singerDetail(this.$route.query.id)
    this.userDetail = detail.data
  },
  methods: {
    ...mapMutations(['updateItemList', 'updateplayListIndex', 'updateIsPlaying', 'updatedetailShow', 'updateMusicChange', 'updateAudioPlaying', 'updatePerFm']),

    async concernDetails (id) {
      // console.log(id)

      const res = await singerDetail(id.userId)
      // console.log(res.data.profile)
      if (res.data.profile.artistId) {
        this.$router.push({ path: '/userDetail', query: { id: res.data.profile.artistId } })
      } else {
        this.$router.push({ path: '/generalUserDetail', query: { id: res.data.profile.userId } })
      }
    },
    async playMusic (i, itemList1) {
      const playList = new Array(1).fill(itemList1[0].song)
      for (let index = 1; index <= itemList1.length - 1; index++) {
        playList.push(itemList1[index].song)
      }
      // console.log(i)
      // console.log(itemList1)
      // console.log(this.playListIndex)

      this.updatePerFm(false)

      // 检测是否是vip
      // console.log(this.itemList[i])
      const check = checkMusicFree(playList[i].fee)
      if (!check) {
        return this.$toast({
          message: 'vip歌曲,无法免费播放',
          position: 'midlle',
          duration: 1000
        })
      }

      // this.updateItemList(playList)
      // console.log(this.musicChange)
      this.updateplayListIndex(i)
      this.updateItemList(playList)
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
    }
  }

}
</script>

<style lang="less" scoped>
.van-tabs__line {
  color: red;
  z-index: 0;
}
.topNav {
  width: 100%;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  background-color: white;
  .topContent {
    font-weight: 600;
    margin-left: 0.2rem;
    color: black;
    width: 65%;
    height: 100%;
    font-size: 0.36rem;
  }
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.itemMusicList {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0 0.2rem;
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
    .left {
      width: 3rem;
      height: 100%;
      display: flex;
      //   justify-content: space-between;
      align-items: center;
      .icon {
        // stroke-width: 20;
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
    padding-bottom: 1.1rem;
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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
      }
    }
  }
}
</style>
