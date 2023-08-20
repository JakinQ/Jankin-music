<template>
  <div>
    <!-- 整体16.2rem 961p -->
    <!-- 顶部栏 -->

    <div class="topNav">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>每日推荐</span>
      </div>
    </div>

    <div class="Top">
      <span class="date"
        >{{ this.date.d }}<span> / {{ this.date.m }}</span>
      </span>
      <img src="./2.jpg" alt="" class="bgImg" />
    </div>

    <div class="content">
      <div class="contentTop">
        <!-- 左边按钮 -->
        <div class="left">
          <svg class="icon" aria-hidden="true" @click="playMusic(0)">
            <use xlink:href="#icon-bofanganniu"></use>
          </svg>
          <div class="bofang">
            <span style="font-size: 0.32rem; font-weight: 600">播放全部</span>
          </div>
        </div>
        <div class="right">
          <i class="bi bi-justify"></i>
          多选
        </div>
      </div>

      <div
        class="songs"
        v-for="(item, index) in this.songsList.dailySongs"
        :key="item.id"
        :class="{
          activeClass:
            index === this.songsList.dailySongs.length - 1 ? true : false,
        }"
        @click="playMusic(index)"
      >
        <img :src="item.al.picUrl" alt="" />
        <div>
          <!-- 歌名 -->
          <p>
            {{ item.name }}
            <span>{{ tnsAndAlia(item) }}</span>
          </p>

          <p
            style="
              font-size: 0.24rem;
              color: rgb(139, 139, 141);
              padding-top: 0;
              margin-top: 0;
              margin-bottom: 0;
            "
          >
            <span v-for="(item2, index2) in item.ar" :key="item2.id">
              {{ item2.name }}
              <span v-if="!index2 && index2 < item.ar.length - 1">/ </span>
            </span>
            - {{ item.al.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommendedDailySongs, checkMusicFree } from '@/request/api/home'
import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      date: {
        m: 0,
        d: 0
      },
      songsList: {
        dailySongs: [{
          alia: [],
          al: {
            picUrl: '',
            tns: []
          }
        }]
      }
    }
  },
  async created () {
    // console.log(1)
    const aData = new Date()
    this.date.m = aData.getMonth() + 1
    this.date.d = aData.getDate()

    const res = await getRecommendedDailySongs(localStorage.getItem('cookie'))
    this.songsList = res.data.data
    this.updateArray(this.songsList.dailySongs)
  },
  computed: {
    ...mapState(['isPlaying', 'playListIndex', 'detailShow', 'musicChange', 'audioPlaying'])

  },
  methods: {
    ...mapMutations(['updateItemList', 'updateplayListIndex', 'updateIsPlaying', 'updatedetailShow', 'updateMusicChange', 'updateAudioPlaying', 'updatePerFm']),

    tnsAndAlia (item) {
      // 没有译名且不是主题曲，直接返回空
      if (item.alia.length === 0 && item.al.tns.length === 0) return ''
      // 都有则返回译名和主题曲信息
      else if (item.alia.length !== 0 && item.al.tns.length !== 0) {
        return '(' + item.al.tns[0] + ' (' + item.alia[0] + '))'
      } else if (item.alia.length === 0) { // 返回译名
        if (item.al.tns.length !== 0) {
          return '(' + item.al.tns[0] + ')'
        } else return ''
      } else { // 返回主题曲信息
        if (item.alia[0].length !== 0) return '( ' + item.alia[0] + ' )'
      }
    },
    async playMusic (i) {
      this.updatePerFm(false)
      const check = checkMusicFree(this.songsList.dailySongs[i].fee)
      if (!check) {
        return this.$toast({
          message: 'vip歌曲,无法免费播放',
          position: 'midlle',
          duration: 1000
        })
      }
      this.updateItemList(this.songsList.dailySongs)
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
    updateArray (array) {
      array = this.addSuffix(array, '?param=100y100')
    },
    addSuffix (array, suffix) {
      return array.map(item => {
        item.picUrl += suffix
        return item
      })
    }
  }
}
</script>

<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  color: white;
  .icon:last-of-type {
    fill: rgb(253, 253, 253);
  }
  .topLeft {
    .icon {
      font-weight: 700;
    }
    span {
      position: absolute;
      margin-left: 0.175rem;
      font-weight: 400;
      font-size: 0.35rem;
      color: rgb(253, 253, 253);
    }
  }
}
.Top {
  width: 100%;
  height: 2.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(253, 253, 253);
  overflow: hidden;
  .date {
    padding: 0.2rem;
    font-size: 0.60725rem;
    span {
      font-size: 0.3255rem;
    }
  }
  .bgImg {
    height: 100%;
    width: 100%;
    top: 0%;
    position: absolute;
    z-index: -1;
    transform: translateY(-5.5rem);
    // filter: blur(35px);
  }
}
.content {
  z-index: 2;
  padding: 0 3.7% 0 3.7%;
  height: 12.6rem;
  width: 100%;
  background-color: white;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .contentTop {
    color: black;
    font-family: "Microsoft YaHei";
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding-top: 0.25rem;
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
      span {
        span {
          font-weight: 400;
          color: rgb(149, 150, 152);
          font-size: 0.24rem;
        }
      }
    }
  }
  .songs {
    width: 100%;
    display: flex;
    // justify-content: space-around;
    align-content: center;
    overflow: hidden;
    // text-overflow: ellipsis; /* 加省略号 */
    // white-space: nowrap; /* 强制不换行 */

    img {
      margin: 0.2rem 0 0.2rem 0;
      width: 0.88rem;
      height: 0.88rem;
      border-radius: 10%;
    }
    div {
      // min-width: 0;
      width: 100%;
      margin: 0.2rem 0 0 0;
      // position: absolute;
      transform: translateX(0.3rem);
      overflow: hidden;
      text-overflow: ellipsis; /* 加省略号 */
      white-space: nowrap; /* 强制不换行 */

      p {
        width: 88%;
        overflow: hidden;
        text-overflow: ellipsis; /* 加省略号 */
        white-space: nowrap; /* 强制不换行 */

        padding-top: 0.052rem;
        font-size: 0.27rem;
        font-weight: 400;
        margin-top: 0.05rem;
        margin-bottom: 0.1rem;
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
.activeClass {
  //最后加一个margin防止被挡住
  padding-bottom: 1.1rem;
}
</style>
