<template>
  <div style="overflow-x: hidden">
    <!-- 顶部栏 -->
    <div class="topNav" :class="Offset >= 4.8 ? 'top2' : ''" v-if="!detailShow">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true" @click="back()">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>
      <div class="topContent" style="font-weight: 570" v-show="Offset >= 4.8">
        <span>
          <p class="name">
            {{ singerDetail.artist.name }}
            <span
              class="name"
              v-if="singerDetail.artist.transNames.length !== 0"
            >
              ( {{ singerDetail.artist.transNames[0] }} )</span
            >
            <span
              class="name"
              v-else-if="singerDetail.artist.alias.length !== 0"
              >({{
                singerDetail.artist.alias[singerDetail.artist.alias.length - 1]
              }})
            </span>
          </p></span
        >
      </div>
    </div>
    <!-- 背景图 -->
    <div class="Top">
      <img :src="singerDetail.artist.cover" alt="" class="bgImg" />
      <img src="./black.jpg" alt="" class="bgImg bgImg2" />
      <!-- 顶部内容 -->
      <div class="topContent">
        <!-- 左边样式 -->
        <div class="contentLeft">
          <p class="name">
            {{ singerDetail.artist.name
            }}<span
              class="name"
              v-if="singerDetail.artist.transNames.length !== 0"
            >
              ( {{ singerDetail.artist.transNames[0] }} )</span
            >
            <span
              class="name"
              v-else-if="singerDetail.artist.alias.length !== 0"
            >
              (
              {{
                singerDetail.artist.alias[singerDetail.artist.alias.length - 1]
              }}
              )</span
            >
          </p>
          <div class="list">
            <div>
              <span v-if="singerDetail.artist.rank !== null">
                <div v-if="singerDetail.artist.rank.type === 1">
                  歌手榜华语地区 NO.{{ singerDetail.artist.rank.rank }}
                </div>
              </span>
            </div>
            <div>
              <span v-if="singerDetail.artist.rank !== null">
                <div v-if="singerDetail.artist.rank.type === 2">
                  歌手榜欧美地区 NO.{{ singerDetail.artist.rank.rank }}
                </div>
              </span>
            </div>
            <div>
              <span v-if="singerDetail.artist.rank !== null">
                <div v-if="singerDetail.artist.rank.type === 3">
                  歌手榜韩国地区 NO.{{ singerDetail.artist.rank.rank }}
                </div>
              </span>
            </div>
            <div>
              <span v-if="singerDetail.artist.rank !== null">
                <div v-if="singerDetail.artist.rank.type === 4">
                  歌手榜日本地区 NO.{{ singerDetail.artist.rank.rank }}
                </div>
              </span>
            </div>
          </div>
          <span style="font-size: 0.26rem">
            粉丝 {{ changeCount2(fansCount.fansCnt) }}</span
          >
          <div
            style="
              color: #f6f4f5;
              font-size: 0.24rem;
              margin-bottom: 0.16rem;
              margin-top: 0.16rem;
            "
            v-if="singerDetail.artist.identifyTag"
          >
            {{ singerDetail.artist.identifyTag[0] }}
          </div>
        </div>
        <!-- {{ fansCount.follow }} -->
        <!-- {{ this.follow }} -->
        <button
          :style="this.unFollow ? 'background-color: rgb(255, 56, 49)' : ''"
          class="follow-button"
          v-if="followSinger && JSON.stringify(this.userList) !== '{}'"
          @click="updateFollow(false, this.unFollow)"
        >
          <!-- 已关注 -->
          {{ this.unFollow ? "关注" : "已关注" }}
        </button>
        <button
          :style="this.follow ? '' : 'background-color: rgb(255, 56, 49)'"
          class="follow-button"
          v-else
          @click="updateFollow(true, this.follow)"
        >
          <!-- 关注 -->
          {{ this.follow ? "已关注" : "关注" }}
        </button>
        <!-- <van-dialog /> -->
      </div>
    </div>

    <!-- 标签栏 -->

    <van-tabs
      v-model:active="active"
      class="downTop"
      lazy-render
      title-active-color="red"
      style="margin-top: 1rem"
    >
      <van-tab
        title="主页"
        class="mainContent"
        title-style=" font-size: 0.3rem;"
      >
        <div class="tabs">
          <div class="left">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofanganniu"></use>
            </svg>
            <div class="bofang">
              <span style="font-size: 0.32rem; font-weight: 600">近期热门</span>
            </div>
          </div>
        </div>
        <!-- 近期热门栏目 -->
        <div
          class="hotSinger"
          v-for="item in hotSongsM"
          :key="item.id"
          @click="playMusic()"
        >
          <img :src="item.al.picUrl" alt="" />
          <div>
            <!-- 歌名 -->
            <p>
              {{ item.al.name }}
              <span>{{ tnsAndAlia(item) }}</span>
            </p>
            <span>
              <span v-for="item2 in item.ar" :key="item2.id">
                {{ item2.name }} - {{ item.al.name }}
              </span>
            </span>
          </div>
        </div>

        <!-- 个人信息栏目 -->
        <div class="userInfo">
          <div class="left">
            <div class="bofang">
              <span style="font-size: 0.32rem; font-weight: 600">基本信息</span>
            </div>
          </div>
          <div class="Info">
            <span v-if="singerDetail.user"
              >昵称: {{ singerDetail.user.nickname }}</span
            >
            <span v-if="singerDesc.briefDesc"
              >简介: {{ singerDesc.briefDesc }}</span
            >
            <span v-if="singerDetail.user"
              >个人介绍: <br />
              {{ singerDetail.user.signature }}</span
            >
            <span
              style="white-space: pre-wrap"
              v-if="JSON.stringify(singerDesc.introduction) !== '[]'"
              >概要:<br />{{ singerDesc.introduction[0].txt }}</span
            >
            <span
              style="white-space: pre-wrap"
              v-if="JSON.stringify(singerDesc.introduction[1])"
              >成员:<br /><span v-html="singerDesc.introduction[1].txt"> </span
            ></span>
          </div>
        </div>
      </van-tab>
      <van-tab title="歌曲" title-style=" font-size: 0.3rem;" class="songs">
        <div class="tabs">
          <!-- 左边按钮 -->
          <div class="left">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofanganniu"></use>
            </svg>
            <div class="bofang">
              <span style="font-size: 0.32rem; font-weight: 600">播放歌曲</span>
            </div>
          </div>
        </div>
        <songs :itemList2="this.hotSongs"></songs>
      </van-tab>
      <van-tab
        :title="albumTitle + singerDetail.artist.albumSize"
        title-style=" font-size: 0.3rem;"
      >
        <album :albumList="this.albumList"></album>
      </van-tab>
      <van-tab
        :title="videoTitle + singerDetail.videoCount"
        title-style=" font-size: 0.3rem;"
      >
        <Video :VideoCount="singerDetail.videoCount"></Video>
      </van-tab>
      <van-tab
        :title="eventList.size > 0 ? eventTitle + eventList.size : eventTitle"
        title-style=" font-size: 0.3rem;"
        v-if="JSON.stringify(this.singerDetail.user)"
      >
        <div
          class="commentList"
          v-for="(item, index) in this.eventList.events"
          v-show="this.eventList.events.length > 0"
          :key="index"
        >
          <!-- 头像 -->
          <!-- .user.avatarUrl .user.nickname .timeStr -->
          <img :src="item.user.avatarUrl" alt="" />
          <div>
            <p>
              {{ item.user.nickname }}
              <!-- <span
                class="like"
                @click="like(index)"
                :class="this.liked[index] ? 'active' : ''"
              >
                {{ this.liked[index] ? item.likedCount + 1 : item.likedCount }}
                <i
                  :class="this.liked[index] ? 'active' : ''"
                  class="bi bi-hand-thumbs-up-fill"
                ></i>
              </span> -->
            </p>

            <span>{{ changeDate(item.showTime) }}</span>

            <div class="content">
              {{ item.json.msg }}
            </div>
            <!-- <div class="detail">
              100条回复 <i class="bi bi-chevron-right"></i>
            </div> -->
          </div>
        </div>
        <div
          v-show="this.eventList.events.length <= 0"
          style="
            color: rgb(149, 150, 152);
            margin: 0.2rem;
            margin-top: 1rem;
            text-align: center;
            font-size: 0.27125rem;
          "
        >
          暂时还没有动态哦
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getSingerDetail, getAlbum, getSingerHot, getSingerDesc, getSingerToplist, getSingerFans, followUser, followSinger, getUserDynamic } from '../../request/api/userDetail'
import { concernList } from '@/request/api/item'

import { Dialog } from 'vant'
import songs from './songs'
import album from './album'
import Video from './video'
import 'vant/es/dialog/style'
import { checkMusicFree } from '@/request/api/home.js'

import { mapMutations, mapState } from 'vuex'

export default {

  components: {
    [Dialog.Component.name]: Dialog.Component,
    songs,
    album,
    Video

  },
  data () {
    return {
      albumList: {
        artist: {
          albumSize: 0
        }
      },
      active: 0,
      albumTitle: '专辑',
      eventTitle: '动态',
      videoTitle: '视频',
      singerDetail: {
        artist: {
          albumSize: 23,
          cover: '',
          name: '无',
          transNames: [''],
          rank: {
            rank: 0,
            type: 0
          }
        },
        user: {
          nickname: '',
          signature: ''
        }

      },
      type:
        [{
          value: 1,
          name: '歌手榜华语地区'
        }, {
          value: 2,
          name: '歌手榜欧美地区'
        }, {
          value: 3,
          name: '歌手榜韩国地区'
        }, {
          value: 4,
          name: '歌手榜日本地区'
        }],
      fansCount: {
        fansCnt: 8276449,
        follow: false, // 是否关注，返回字符串
        followCnt: 0, // 粉丝数量
        followDay: '', // 关注天数
        isFollow: '' // 是否关注，返回字符串
      },
      hotSongs: [],
      hotSongsM: [],
      singerDesc: {
        briefDesc: '这个人什么都没有留下....',
        introduction: [{ ti: '1', txt: '1' }, { ti: '1', txt: '1' }, { ti: '1', txt: '1' }]
      },
      follow: false,
      unFollow: false,
      eventList: [], // 动态列表
      Offset: 0,
      blockTop: 0
    }
  },
  async created () {
    const album = await getAlbum(this.$route.query.id)
    // console.log(album)
    this.albumList = album.data
    this.albumList.hotAlbums.sort((a, b) => b.publishTime - a.publishTime)
    // console.log(this.follow)
    const res = await getSingerDetail(this.$route.query.id, localStorage.getItem('cookie'))
    this.singerDetail = res.data.data
    // if (JSON.stringify(this.userList) !== '{}') {
    //   // 如果登录，判断是否关注。先获取用户关注列表
    //   const arr = await concernList(this.userList.userPoint.userId)
    //   // 通过关注列表查找歌手id，返回不为空则表示关注了
    //   const bool = arr.data.follow.find(item => item.userId === this.singerDetail.user.userId)
    //   if (bool) this.follow = true
    // }
    // console.log(this.singerDetail)
    this.updateArray(this.singerDetail.artist, 500)
    // console.log('歌手数据', res.data.data)
    if (JSON.stringify(this.singerDetail.user)) {
      const dynamic = await getUserDynamic(this.singerDetail.user.userId)
      this.eventList = dynamic.data
      // console.log(dynamic.data)

      // console.log(JSON.parse(this.jsonList[0].json))
      this.eventList.events.forEach(item => {
        item.json = JSON.parse(item.json)
        // console.log(item.json)
      })

      // console.log(this.eventList)
    }
    // const res2 = await getSingerDetail(5781)
    // console.log('res2', res2.data.data)
    // console.log('res2', res2.data.data.artist.transNames)
    const res3 = await getSingerDesc(this.$route.query.id)
    this.singerDesc = res3.data
    // console.log('singerDesc', this.singerDesc)
    // console.log(JSON.stringify(this.singerDesc.introduction[0]))
    // console.log('singerDesc', JSON.stringify(this.singerDesc.introduction))

    // const res4 = await getSingerToplist(4)
    // console.log(res4)
    const result = await getSingerFans(this.$route.query.id)
    // console.log(result)
    this.fansCount = result.data.data

    const hot = await getSingerHot(this.$route.query.id)
    this.hotSongs = hot.data.songs
    // console.log('热门歌曲', this.hotSongs)
    this.hotSongsM = this.hotSongs.slice(0, 3)
    this.updateArray2(this.hotSongsM)
    // console.log(this.hotSongsM)
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
  },
  computed: {
    ...mapState(['userList', 'detailShow', 'followSinger'])

  },
  watch: {
    // 打开弹出层时候会出现问题，底下样式暴露在弹出层，除去该样式，修改层级
    detailShow: function () {
      if (this.detailShow === true) {
        document.getElementsByClassName('van-tabs__line')[0].style.zIndex = '0'
      }
    }
  },
  methods: {
    ...mapMutations(['updateFollowSinger', 'updatePerFm']),
    updateArray (object, size) {
      object = this.addSuffix(object, '?param=' + size + 'y' + size)
      // console.log(object)
    },
    addSuffix (object, suffix) {
      object.cover += suffix
      return object
    },
    updateArray2 (array) {
      array = this.addSuffix2(array, '?param=100y100')
    },
    addSuffix2 (array, suffix) {
      return array.map(item => {
        item.al.picUrl += suffix
        return item
      })
    },
    // handleScroll () {
    //   console.log(1)
    // },
    back () {
      this.$router.go(-1)
    },
    // 获取页面滚动距离
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.Offset = scrollTop / 50
      this.blockTop = scrollTop / 50
      // if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
      //   console.log(111)
      // }
      // console.log(this.Offset, '滚动距离')
    },
    changeCount2 (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(0) + '亿'
      } else if (num >= 100000) {
        return (num / 10000).toFixed(0) + '万'
      } else { return num }
    },
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
    // 将时间戳转换成年月日
    changeDate (time) {
      const date = new Date(time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const formattedDate = `${year}.${month}.${day}`
      this.time = formattedDate
      return formattedDate
    },
    playMusic () {
      // alert(1)
      this.updatePerFm()
      this.active = 1
    },
    async updateFollow (bool, bool2) {
      // console.log(bool2)
      if (JSON.stringify(this.userList) !== '{}') {
        if (!bool === bool2) {
          // console.log('关注')
          const res = await followSinger(this.$route.query.id, 1)// 夜游
          if (res.data.message) {
            this.follow = true
          }
          this.updateFollowSinger(true)

          // console.log(this.follow)
        } else {
          Dialog.confirm({
            title: '取消关注',
            confirmButtonText: '取消关注',
            confirmButtonColor: '#ff3831',
            cancelButtonColor: '#ff3831',
            cancelButtonText: '继续做朋友',
            message:
              '取消关注关注时长将重新计算,真的要取消?'

          })
            .then(async () => {
              // on confirm
              // console.log('取消关注')
              const res = await followSinger(this.$route.query.id, 3)// 夜游
              if (res.data.message) {
                this.unFollow = true
              }
              this.updateFollowSinger(false)

              // console.log(this.unFollow)
            })
            .catch(() => {
              // on cancel
              // console.log(11)
              // console.log('继续做朋友')
            })
        }
      } else {
        Dialog.alert({
          message: '必须登录才能操作。'

          // theme: 'round-button'
        }).then(async () => {
          // const res = await followUser(this.$route.query.id, 1)// 夜游
          // console.log(res)
          this.$router.push('/login')
        })
      }
    }
  }

}
</script>

<style lang="less" scoped>
.top2 {
  background-color: black;
  opacity: 0.5;
}
.topNav {
  z-index: 2;
  position: fixed;
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
  }
  .topContent {
    margin-left: 0.4rem;
    transform: translateY(0.03rem);
    color: white;
    width: 65%;
    height: 100%;
    font-size: 0.36rem;
  }
}
.Top {
  width: 100%;
  height: 1rem;
  height: 4.56rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(253, 253, 253);
  .bgImg2 {
    z-index: -2;
    opacity: 0.12;
  }
  .bgImg {
    object-fit: cover;
    bottom: 58%;
    width: 100%;
    height: 7.56rem;
    position: absolute;
    z-index: -1;

    // filter: blur(35px);
  }
  //顶部内容
  .topContent {
    position: absolute;
    bottom: 63%;
    width: 100%;
    // height: 3rem;
    padding: 0.18rem;
    padding-bottom: 0rem;
    display: flex;

    .contentLeft {
      width: 85%;
      height: 2.6rem;
      flex-direction: column;
      padding-left: 0.2rem;
      color: white;

      //名字
      .name {
        margin-bottom: 0.2rem;
        font-size: 0.38rem;
        font-weight: 570;
        color: white;
        // font-family: "黑体";
      }
      .list {
        margin-bottom: 0.16rem;
        width: 100%;
        // color: #cad4dd;
        color: white;
      }

      //作者信息
      span {
        color: #f8f6f7;
        font-size: 0.26rem;
      }
    }
    .follow-button {
      position: absolute;
      transform: translateY(0.175rem);
      right: 0.435rem;
      bottom: 0.8rem;
      border: none; /* 去掉边框 */
      // opacity: 0.8;
      border-radius: 0.3rem; /* 圆角 */
      width: 1.4rem; /* 宽度 */
      height: 0.525rem; /* 高度 */
      display: flex; /* 弹性布局 */
      align-items: center; /* 垂直居中 */
      justify-content: center; /* 水平居中 */
      display: inline-block; /* 行内块元素 */
      outline: none; /* 去掉聚焦边框 */
      cursor: pointer; /* 可点击样式 */
      background-color: #b5b5b5; /* 背景色 */
      color: white; /* 文字颜色 */
      font-size: 0.245rem; /* 字体大小 */
      padding: 0.08rem 0.16rem; /* 内边距 */
    }
    // .contentRight {
    // }
  }
}
.tabTitle {
  font-size: 0.32rem;
}
.downTop {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0 0.28rem;
  margin-top: 0.2rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  // z-index: -1;
  .mainContent {
    .hotSinger {
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
        width: 0.88rem;
        height: 0.88rem;
        border-radius: 10%;
      }
      div {
        width: 100%;
        margin: 0.2rem 0 0 0;
        position: absolute;
        transform: translateX(1.1rem);
        overflow: hidden;

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
    .userInfo {
      margin-top: 0.6rem;
      margin-bottom: 2rem;
      .Info {
        margin-top: 0.2rem;
        font-size: 0.245rem;
        color: #8b8b8d;
        width: 100%;
        display: flex;
        flex-direction: column;
        span {
          padding: 0.1rem 0 0.1rem 0;
        }
      }
    }
  }
  .songs {
  }
  .commentList {
    margin-bottom: 0.2rem;
    width: 100%;
    max-height: 6.5rem;
    display: flex;
    margin-right: 0.2rem;
    // justify-content: space-around;
    align-content: center;
    overflow: hidden;
    text-overflow: ellipsis; /* 加省略号 */
    // white-space: nowrap; /* 强制不换行 */
    img {
      margin: 0.2rem 0 0.2rem 0.2rem;
      width: 0.8rem;
      height: 0.8rem;
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
        max-height: 5.3rem;
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
  //下方顶部样式
  .tabs {
    color: black;
    font-family: "Microsoft YaHei";
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.25rem;
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
}
</style>

<style >
.van-tabs__line {
  left: 0;
}
</style>
