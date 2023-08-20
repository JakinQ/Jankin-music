<template>
  <div style="width: 7.5075rem">
    <div class="topNav" v-show="!detailShow && !movieIsPlaying">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true" @click="back()">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>

      <div class="topContent">
        <span v-if="this.$route.query.type === '3'">{{
          videoDetail.name
        }}</span>
        <span v-else>{{ videoDetail.title }}</span>
      </div>
    </div>
    <van-sticky>
      <video
        style="width: 100%; object-fit: fill; height: 4.2rem"
        :src="
          this.$route.query.type === '3' ? videoUrl.url : videoUrls.urls[0].url
        "
        ref="myVideoPlayer"
        autoplay="true"
        controls
        @play="onPlay"
        @pause="onPause"
      ></video>
    </van-sticky>

    <van-collapse v-model="activeNames" :border="false">
      <van-collapse-item
        :title="videoDetail.name"
        name="1"
        :border="false"
        title-class="collapseTitle"
      >
        <!-- 插槽用法  标题 -->
        <template v-slot:title>
          <p style="font-weight: 700" v-if="this.$route.query.type === '3'">
            {{ videoDetail.name }}
          </p>
          <p v-else>{{ videoDetail.title }}</p>
          <p
            style="
              font-weight: 0 !important;
              font-size: 0.245rem;
              margin-top: 0.35rem;
              color: #969799;
            "
          >
            {{
              this.$route.query.type === "3"
                ? changeCount(videoDetail.playCount)
                : changeCount(videoDetail.playTime)
            }}次观看
          </p>
        </template>
        <p style="padding-bottom: 0.1rem" v-if="this.$route.query.type === '3'">
          {{ videoDetail.publishTime }} 发布
        </p>
        <p style="padding-bottom: 0.1rem" v-else>
          {{ changeDate(videoDetail.publishTime) }} 发布
        </p>

        {{
          this.$route.query.type === "3"
            ? videoDetail.desc
            : videoDetail.description
        }}
      </van-collapse-item>
    </van-collapse>
    <!-- 图标列表 -->
    <div class="iconList">
      <div class="iconItem">
        <!-- <svg class="icon" aria-hidden="true" @click="router('/RecommendedDaily')">
        <use xlink:href="#icon-tuijian"></use>
      </svg> -->
        <i
          class="bi bi-hand-thumbs-up icon"
          @click="like0()"
          :class="this.liked0 ? 'iconActive' : ''"
        ></i>
        <span>
          {{
            this.liked0
              ? changeCount(count.likedCount) + 1
              : changeCount(count.likedCount)
          }}
        </span>
      </div>
      <div class="iconItem">
        <i class="bi bi-folder-plus i icon" v-if="true"></i>
        <i class="bi bi-folder-check i icon" v-else> </i>
        <span v-if="this.$route.query.type === '3'">
          <span v-if="true"> {{ videoDetail.subCount }}</span>
          <span v-else> {{ videoDetail.subCount }}</span></span
        >
        <span v-else>
          <span v-if="true"> {{ videoDetail.subscribeCount }}</span>
          <span v-else> {{ videoDetail.subscribeCount }}</span></span
        >
      </div>
      <div class="iconItem">
        <i class="bi bi-chat-text i icon" @click="srollIntoComment"></i>
        <span @click="srollIntoComment"> {{ count.commentCount }}</span>
      </div>
      <div class="iconItem">
        <svg class="icon i liebiao" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span> {{ count.shareCount }}</span>
      </div>
    </div>
    <!-- 歌手盒子 -->
    <van-sticky :offset-top="4.2 + 'rem'">
      <div class="artists" v-if="videoDetail.artists">
        <img :src="videoDetail.artists[0].img1v1Url" alt="" />
        <span>{{ videoDetail.artists[0].name }}</span>
        <i class="bi bi-chevron-right" @click="overlayShow = true"></i>
      </div>
      <div class="artists" v-if="videoDetail.creator">
        <img :src="videoDetail.creator.avatarUrl" alt="" />
        <span>{{ videoDetail.creator.nickname }}</span>
        <i class="bi bi-chevron-right" @click="overlayShow = true"></i>
      </div>
    </van-sticky>
    <div style="width: 100%; height: 0.105rem; background-color: #e8e8e8"></div>
    <van-overlay :show="overlayShow" @click="offOverlay()" z-index="9999">
      <div class="wrapper">
        <div class="block" v-if="videoDetail.artists">
          <div class="title">请选择要查看的歌手</div>
          <div
            class="list"
            v-for="(item, index) in videoDetail.artists"
            :key="index"
            @click="authorDetail2(item.id)"
          >
            <img :src="item.img1v1Url" alt="" />
            <div>{{ item.name }}</div>
          </div>
        </div>
        <div class="block" v-else>
          <div class="title">请选择要查看的歌手</div>
          <div class="list" @click="authorDetail2(videoDetail.creator.userId)">
            <img :src="videoDetail.creator.avatarUrl" alt="" />
            <div>{{ videoDetail.creator.nickname }}</div>
          </div>
        </div>
      </div>
    </van-overlay>

    <!-- 相关音乐 -->
    <div
      class="similarMusic"
      style="margin-top: 0.2rem"
      v-if="this.$route.query.type === '3' && musicDetail[0]"
    >
      相关音乐
    </div>
    <div class="music" v-if="this.$route.query.type === '3' && musicDetail[0]">
      <!-- 歌名 -->
      <div class="left" @click="playMusic(i)">
        <img :src="musicDetail[0].al.picUrl" alt="" />
        <div>
          <!-- 歌名和作者 -->
          <p>{{ musicDetail[0].name }}</p>
          <span v-for="(item, index) in musicDetail[0].ar" :key="index">{{
            item.name
          }}</span>
        </div>
      </div>
      <!-- mv和菜单 -->
      <div class="right">
        <!-- mv -->
        <svg class="icon bofang" aria-hidden="true" v-if="musicDetail[0].mv">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <!-- 列表 -->
        <i class="bi bi-three-dots-vertical icon vertical"></i>
        <!-- <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg> -->
      </div>
    </div>
    <!-- 相关视频 -->
    <div class="similarMusic">相关视频</div>
    <div
      @click="changeVideo(item.vid, item.type)"
      class="videoList"
      v-for="(item, index) in relatedVideo"
      :key="index"
      :class="{
        activeClass: index === relatedVideo.length - 1 ? true : false,
      }"
    >
      <img :src="item.coverUrl" alt="" />
      <div class="right">
        <!-- 歌名 -->
        <p>
          {{ item.title }}

          <!-- {{ item.creator[0].userName }} -->
          <!-- <span v-if="item.transNames" style="font-size: 0.27rem">
            ({{ item.transNames[0] }})</span
          > -->
        </p>
        <span>
          <!-- {{ changeDate(item.resource.mlogBaseData.pubTime) }} -->
          {{ duration(item.durationms) }} by
          {{ item.creator[0].userName }}
          <!-- <span v-for="item2 in item.ar" :key="item2.id">
            {{ item2.name }} - {{ item.al.name }}
          </span> -->
        </span>
      </div>
    </div>
    <div
      style="width: 100%; height: 0.105rem; background-color: #e8e8e8"
      ref="comment"
    ></div>
    <!-- 评论 -->
    <div class="similarMusic">精彩评论</div>
    <div class="commentList" v-for="(item, index) in mvHotComment" :key="index">
      <!-- 头像 -->
      <!-- .user.avatarUrl .user.nickname .timeStr -->
      <img :src="item.user.avatarUrl" alt="" />
      <div>
        <p>
          {{ item.user.nickname }}
          <span
            class="like"
            @click="like(index)"
            :class="this.liked[index] ? 'iconActive' : ''"
          >
            {{ this.liked[index] ? item.likedCount + 1 : item.likedCount }}
            <i
              :class="this.liked[index] ? 'iconActive' : ''"
              class="bi bi-hand-thumbs-up-fill"
            ></i>
          </span>
        </p>

        <span>{{ item.timeStr }}</span>

        <div class="content">
          {{ item.content }}
        </div>
        <!-- <div class="detail">100条回复 <i class="bi bi-chevron-right"></i></div> -->
      </div>
    </div>
    <div class="similarMusic">最新评论</div>
    <div class="commentList" v-for="(item, index) in mvNewComment" :key="index">
      <!-- 头像 -->
      <!-- .user.avatarUrl .user.nickname .timeStr -->
      <img :src="item.user.avatarUrl" alt="" />
      <div>
        <p>
          {{ item.user.nickname }}
          <span
            class="like"
            @click="like2(index)"
            :class="this.liked2[index] ? 'iconActive' : ''"
          >
            {{ this.liked2[index] ? item.likedCount + 1 : item.likedCount }}
            <i
              :class="this.liked2[index] ? 'iconActive' : ''"
              class="bi bi-hand-thumbs-up-fill"
            ></i>
          </span>
        </p>

        <span>{{ item.timeStr }}</span>

        <div class="content">
          {{ item.content }}
        </div>
        <!-- <div class="detail">100条回复 <i class="bi bi-chevron-right"></i></div> -->
      </div>
    </div>
    <div style="width: 100%; height: 1.5rem"></div>
  </div>
  <Bottoms :id="this.$route.query.id"></Bottoms>
</template>

<script >
import { getVideoDetail, getVideoUrl, getMvUrl, getMvDetail, getMvCount, getVideoCount, search, getMusic, checkMusicFree, getRelatedVideo, getVideoId, getMvComment, getVideoComment } from '../../request/api/video'
import Bottoms from '../Comment/bottom.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    Bottoms
  },
  data () {
    return {
      activeNames: ['0'],
      videoDetail: { artists: [{ img1v1Url: '', name: '' }] },
      count: {},
      mvUrl: { url: '' },
      videoUrl: {},
      vid: '', // 视频真实id
      videoUrls: { urls: [{}] },
      volume: 0.5, // 音量
      showTop: false,
      showError: false,
      overlayShow: false,
      musicDetail: [{ al: { picUrl: '' } }],
      musicSource: {},
      relatedVideo: [{ creator: [{ username: '' }] }], // 相关视频
      mvComment: {},
      mvHotComment: [{
        timeStr: '',
        user: {
          nickname: '',
          avatarUrl: ''
        }
      }],
      mvNewComment: [{
        timeStr: '',
        user: {
          nickname: '',
          avatarUrl: ''
        }
      }],
      liked0: false,
      liked: [false],
      liked2: [false],
      searchResult: { songs: [{ ar: [] }] },
      playerOptions: {
        // bigPlayButton: false,
        // 是否等浏览器准备好后自动播放
        autoplay: false,
        controls: true, // 控制条
        // 是否静音
        muted: false,
        // 结束后是否重新开始
        loop: false,
        // 语言
        language: 'zh-CN',
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 播放速度
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应
        // 播放视频源
        // sources: [
        //   {
        //     type: 'video/mp4',
        //     src: '/flv/diaosi.mov'
        //   }
        // ],
        // 视频比例
        // aspectRatio: '4:3',

        // 封面
        // poster: '/static/images/author.jpg'
        controlBar: {
          // 当前时间和持续时间的分隔符
          timeDivider: true,
          // 显示持续时间
          durationDisplay: true,
          // 是否显示剩余时间功能
          remainingTimeDisplay: false,
          // 全屏按钮
          // fullscreenToggle: true,
          // 播放暂停按钮
          playToggle: true,
          // 音量控制
          volumeMenuButton: true,
          // 当前播放时间
          currentTimeDisplay: true,
          // 点播流时，播放进度条，seek控制
          progressControl: true,
          // 直播流时，显示LIVE
          liveDisplay: true,
          // 播放速率，当前只有html5模式下才支持设置播放速率
          playbackRateMenuButton: true
        }
      }

    }
  },
  async created () {
    document.getElementById('foot').style.zIndex = '-1'

    // console.log(this.$route.query.id)
    // console.log(this.$route.query.type)

    // mv
    if (this.$route.query.type === '3') {
      // 获取mv详情
      const mv = await getMvDetail(this.$route.query.id)
      this.videoDetail = mv.data.data
      // console.log(this.videoDetail)
      // 获取相关音乐  先搜索相关歌曲，找到名字完全相同的，然后还可以找歌手相同的，否则不显示相关音乐
      // 处理视频名字方便搜索
      const index = this.videoDetail.name.indexOf('(')
      if (index >= 0) { this.videoDetail.name = this.videoDetail.name.substring(0, index) }
      const search1 = await search(this.videoDetail.name, 1)
      // const search1 = await search(this.videoDetail.artistName + ' ', 1)
      this.searchResult = search1.data.result
      // console.log(search1.data.result.songs[0])
      // console.log(this.searchResult)

      // 假如没有搜索结果，则直接将musicDetail[0]未定义，不能显示相关音乐
      if (this.searchResult.songs) {
        const filter1 = this.searchResult.songs.filter(item => item.ar[0].name === this.videoDetail.artistName || item.ar[item.ar.length - 1].name === this.videoDetail.artistName)
        // console.log(filter1)
        // 搜索结果匹配
        if (filter1 !== '[]') {
          this.musicDetail[0] = filter1[0]
          // console.log(this.musicDetail)
          // 获取音乐资源
          const music = await getMusic(search1.data.result.songs[0].id)
          // console.log(music.data.data)
          this.musicSource = music.data.data
        }
      } else this.musicDetail[0] = undefined

      // 获取mv资源
      const url = await getMvUrl(this.$route.query.id)
      this.videoUrl = url.data.data
      // 获取相关视频
      const rVideo = await getRelatedVideo(this.$route.query.id)
      this.relatedVideo = rVideo.data.data
      // console.log('rvideo', this.relatedVideo)
      // console.log(this.videoUrl)
      // console.log(this.videoDetail)
      // 获取评论
      const comment = await getMvComment(this.$route.query.id)
      // console.log(comment.data)
      this.mvHotComment = comment.data.hotComments
      this.mvNewComment = comment.data.comments

      // console.log('mvHotComment', this.mvHotComment)
      // console.log('mvNewComment', this.mvNewComment)
      // 获取播放次数
      const Count = await getMvCount(this.$route.query.id)
      this.count = Count.data
      // this.videoUrl = url.data.data
      // console.log(Count)
    } else if (this.$route.query.type === '2' || this.$route.query.type === '1') {
      // 获取视频id
      const id = await getVideoId(this.$route.query.id)
      this.vid = id.data.data
      // console.log(this.vid)
      // 获取视频
      // const video = await getMvDetail(this.$route.query.id)
      const video = await getVideoDetail(this.vid)
      this.videoDetail = video.data.data
      const url = await getVideoUrl(this.vid)
      // const url2 = url.data.url.find(item => item.id === id.data.data)
      // console.log('URL2', url2)
      this.videoUrls = url.data
      // console.log(this.videoDetail)
      // console.log(this.videoUrl)
      // 获取播放次数
      const Count = await getVideoCount(this.vid)
      this.count = Count.data
      // console.log('Count', this.count)
      // 获取相关视频
      const rVideo = await getRelatedVideo(this.vid)
      this.relatedVideo = rVideo.data.data
      // console.log('rvideo', this.relatedVideo)
      // console.log('videoUrl', this.videoUrls)
      // console.log('videoDetail', this.videoDetail)
      // 获取评论
      const comment = await getVideoComment(this.vid)
      // console.log(comment.data)
      this.mvHotComment = comment.data.hotComments
      this.mvNewComment = comment.data.comments

      // console.log('mvHotComment', this.mvHotComment)
      // console.log('mvNewComment', this.mvNewComment)
      //
    }// 视频
  },
  mounted () {
    // this.$refs.myVideoPlayer.addEventListener('click', this.onClick)
  },

  computed: {
    ...mapState(['isPlaying', 'playListIndex', 'detailShow', 'musicChange', 'audioPlaying', 'itemList', 'movieIsPlaying'])

  },
  watch: {
    // itemList: function () {
    //   console.log('1111111111111111111')
    // },
    movieIsPlaying: function () {
      if (this.movieIsPlaying === false) {
        this.$refs.myVideoPlayer.pause()
      }
    }
  },
  methods: {
    ...mapMutations(['updateInVideoPage', 'updatedetailShow', 'updateMusicChange', 'updateItemList', 'updateAudioPlaying', 'updateIsPlaying', 'updateplayListIndex', 'updatePerFm', 'updateMovieIsPlaying']),
    duration: function (time) {
      const minutes = Math.floor(time / 60000)
      const seconds = ((time % 60000) / 1000).toFixed(0)
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    },
    changeDate (time) {
      const date = new Date(time)
      // console.log(time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const formattedDate = `${year}-${month}-${day}`
      this.time = formattedDate
      return formattedDate
    },
    like0 () {
      this.liked0 = !this.liked0
    },
    like (index) {
      // console.log(index)
      this.liked[index] = !this.liked[index]
    },
    like2 (index) {
      // console.log(index)
      this.liked2[index] = !this.liked2[index]
    },
    srollIntoComment () {
      this.$refs.comment.scrollIntoView({ behavior: 'smooth' })
    },
    back () {
      // this.updateInVideoPage(false)
      document.getElementById('foot').style.zIndex = '1'
      // this.updateMovieIsPlaying(false)
      this.$router.go(-1)
    },
    offOverlay () {
      this.overlayShow = false
    },
    authorDetail2 (id) {
      // console.log(id)
      this.$router.push({ path: '/userDetail', query: { id: id } })
      this.overlayShow = false
    },
    changeCount (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(0) + '亿'
      } else if (num >= 100000) {
        return (num / 10000).toFixed(0) + '万'
      } else { return num }
    },
    async playMusic (i) {
      // console.log(this.itemList)
      // console.log(this.musicDetail)
      // debugger
      this.updatePerFm(false)
      this.updateMovieIsPlaying(false)
      // 检测是否是vip
      const check = checkMusicFree(this.musicSource.fee)
      if (!check) {
        return this.$toast({
          message: 'vip歌曲,无法免费播放',
          position: 'midlle',
          duration: 1000
        })
      }

      this.updatedetailShow()

      this.updateItemList(this.musicDetail)
      // console.log(this.musicChange)
      this.updateplayListIndex(0)

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
      // 改变播放器层级,让detail显示出来
      document.getElementById('foot').style.zIndex = '1'
    },
    onPlay () {
      // console.log('Video is playing')

      this.updateMovieIsPlaying(true)
    },
    onPause () {
      // console.log('Video is paused')
      this.updateMovieIsPlaying(false)
    },
    onError () {
      // this.showError = true
    },
    // 跳转到新视频
    changeVideo (id, type) {
      // console.log(id, type)
      this.$router.push({ path: '/videoDetail', query: { id: id, type: type } })
    }

  }

}
</script>

<style lang="less" scoped>
.topNav {
  // background-color: #f3f3f3;
  top: 0;
  z-index: 999;
  position: fixed;
  width: 100%;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  color: white;
  // overflow: hidden;

  .icon {
    color: white;
    fill: white;
  }
  .topContent {
    margin-left: 0.4rem;
    transform: translateY(-0.04rem);
    color: white;
    width: 65%;
    height: 100%;
    font-size: 0.36rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.iconList {
  margin-top: 0.2rem;
  display: flex;
  width: 100%;
  height: 1rem;
  justify-content: space-around;
  align-items: center;
  .iconItem {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      margin-top: 0.1rem;
      color: #969799;
      font-size: 0.22rem;
    }
  }
  .icon {
    font-size: 0.45rem;
    width: 0.45rem;
    height: 0.45rem;
  }
}
// 歌手
.artists {
  background-color: #fff;
  width: 100%;
  height: 1.05rem;
  padding: 0.175rem 0.28rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-top: 0.0175rem solid #e8e8e8;
  img {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
  }
  span {
    margin-left: 0.2rem;
    font-size: 0.2975rem;
  }
  i {
    position: absolute;
    right: 0.24rem;
  }
}
// 弹出框
.wrapper {
  // display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  //   align-items: center; /* 垂直居中 */
  position: fixed;
  top: 37.5%;
  left: 8%;
}
//弹出框
.block {
  // position: fixed;
  // bottom: 50%;
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
    padding-bottom: 0.2rem;
    img {
      border-radius: 10%;
      height: 0.9rem;
      width: 0.9rem;
    }
    div {
      margin-left: 0.4rem;
    }
  }
}
.similarMusic {
  margin: 0.2rem;
  font-weight: 570;
}
.music {
  width: 100%;
  height: 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.2rem;

  .left {
    width: 85%;
    height: 100%;
    display: flex;
    align-items: center;
    img {
      margin: 0.2rem 0 0.2rem 0;
      width: 0.88rem;
      height: 0.88rem;
      border-radius: 10%;
    }
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
    margin-right: 0.3rem;
    .icon {
      fill: #999;
      color: #999;
    }
    .bofang {
      position: absolute;
      left: 0;
      height: 0.4rem;
      width: 0.44rem;
    }
    .vertical {
      font-size: 0.44rem;
      position: absolute;
      right: 0;
    }
  }
}
.videoList {
  margin: 0.2rem;
  width: 100%;
  height: 100%;
  display: flex;
  // justify-content: space-around;
  align-content: center;
  overflow: hidden;
  text-overflow: ellipsis; /* 加省略号 */
  white-space: nowrap; /* 强制不换行 */
  img {
    margin: 0.2rem 0 0.2rem 0;
    width: 2.66rem;
    height: 1.505rem;
    border-radius: 5%;
  }
  .right {
    width: 100%;
    height: 1.505rem;
    margin: 0.2rem 0 0 0.3rem; //上 右 下 左
    // position: absolute;
    // transform: translateX(3rem);
    align-items: center; /* 垂直居中 */
    line-height: 0.7525rem;
    overflow: hidden;

    p {
      width: 88%;
      overflow: hidden;
      text-overflow: ellipsis; /* 加省略号 */
      white-space: nowrap; /* 强制不换行 */

      padding-top: 0.052rem;
      font-size: 0.3rem;
      font-weight: 400;
      margin-top: 0.05rem;
      margin-bottom: 0.1rem;
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    span {
      width: 88%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.24rem;
      color: rgb(139, 139, 141);
    }
  }
}
.activeClass {
  // border-bottom: 6 solid #e8e8e8;
}
.commentList {
  margin: 0.2rem;
  width: 100%;
  max-height: 5.9rem;
  display: flex;
  margin-right: 0.2rem;
  // justify-content: space-around;
  align-content: center;
  overflow: hidden;
  text-overflow: ellipsis; /* 加省略号 */
  // white-space: nowrap; /* 强制不换行 */
  img {
    margin: 0.2rem 0 0.2rem 0;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
  }
  div {
    height: 100%;
    width: 100%;
    margin: 0.2rem 0 0 0.2rem;
    padding-right: 0.2rem;

    p {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis; /* 加省略号 */
      white-space: nowrap; /* 强制不换行 */

      padding-top: 0.052rem;
      font-size: 0.27rem;
      font-weight: 400;
      margin-top: 0.05rem;
      margin-bottom: 0.05rem;
      .like {
        color: #989898;
        height: 0.32rem;
        font-size: 0.28rem;
        position: absolute;
        right: -71%;
      }
    }
    span {
      width: 88%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.24rem;
      color: rgb(139, 139, 141);
    }
    .content {
      margin: 0.2rem 0 0 0;
      padding: 0;
      width: 96%;
      max-height: 4.7rem;
      line-height: 1.6;
    }
    .detail {
      color: #79b6e5;
      font-size: 0.26rem;
      margin-left: 0;
      padding-bottom: 0.2rem;
      border-bottom: 0.0175rem solid #e8e7ec;
    }
  }
}
.iconActive {
  color: red !important;
}
</style>

<style lang="less">
.vjs-big-play-button {
  top: 37.5% !important;
  left: 37.5% !important;
}
.video-js .vjs-tech {
  //   transform: rotate(90deg);
}
.video-js .vjs-play-progress {
  background-color: red;
}
.video-js .vjs-play-progress:before {
  color: red;
}

.collapseTitle {
  //   font-weight: 700;
  font-size: 0.36rem;
}
.collapseLabel {
  color: red;
}
</style>
