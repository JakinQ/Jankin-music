<template>
  <div>
    <!-- 顶部栏 -->
    <div class="topNav" :class="Offset >= 240 ? 'top2' : ''" v-if="!detailShow">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true" @click="back()">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>
      <div class="topContent" style="font-weight: 570" v-show="Offset >= 240">
        <span>
          <p class="name">
            {{ userDetail.profile.nickname }}
          </p></span
        >
      </div>
    </div>
    <!-- 背景图 -->
    <div class="Top">
      <img :src="userDetail.profile.avatarUrl" alt="" class="bgImg" />
      <img src="" alt="" class="bgImg bgImg2" />
      <!-- 顶部内容 -->
      <div class="topContent">
        <!-- 左边样式 -->
        <div class="contentLeft">
          <p class="name">
            {{ userDetail.profile.nickname }}
          </p>
          <span style="margin-top: 0.2rem; font-size: 0.3rem">
            关注 {{ changeCount2(userDetail.profile.follows) }}
          </span>
          <span style="font-size: 0.26rem">
            | 粉丝
            {{ changeCount2(userDetail.profile.followeds) }}</span
          >

          <div class="list">
            <div
              class="age"
              :class="
                (userDetail.profile.gender === 1 ? 'man' : 'level',
                userDetail.profile.gender === 2 ? 'women' : 'level')
              "
              v-if="userDetail.profile.birthday > 0"
            >
              <i
                v-if="userDetail.profile.gender === 2"
                class="bi bi-gender-female"
                style="color: rgb(230, 143, 177)"
              ></i>
              <i
                class="bi bi-gender-male"
                v-else-if="userDetail.profile.gender === 1"
              ></i>
              <!-- <i class="bi bi-gender-male" v-else></i> -->
              {{ getAge(userDetail.profile.birthday) }}后
            </div>
            <div class="level">Lv.{{ userDetail.level }}</div>
          </div>
        </div>

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
        <!-- 听歌排行 -->
        <div
          class="playList"
          @click="
            this.$router.push({
              path: '/userAllListenSongs',
              query: {
                id: userDetail.profile.userId,
              },
            })
          "
          style="
            margin-left: 0.28rem;
            margin-top: 0.4rem;
            margin-bottom: 0.4rem;
          "
        >
          <div>
            <img src="./1.png" alt="" />
            <div>
              <span class="listName">
                {{ userDetail.profile.nickname }}的听歌排行
              </span>
              <span class="number">累计听歌{{ userDetail.listenSongs }}首</span>
            </div>
          </div>
        </div>
        <!-- 喜欢的音乐 -->
        <div
          class="playList"
          v-for="item in this.playList.playlist"
          :key="item.id"
          @click="intoPlayList(item.id)"
          style="
            margin-left: 0.28rem;
            margin-top: 0.4rem;
            margin-bottom: 0.4rem;
          "
        >
          <div v-if="userDetail.profile.nickname + '喜欢的音乐' === item.name">
            <img :src="item.coverImgUrl" alt="" />
            <div>
              <span class="listName">
                {{ item.name }}
              </span>
              <span class="number">{{ item.trackCount }}首</span>
            </div>
          </div>
        </div>
        <!-- 创建歌单 -->
        <van-collapse
          v-model="activeNames"
          @click="a"
          style="margin-top: 0.2rem"
        >
          <van-collapse-item name="1">
            <template #title>
              <div style="font-weight: 600; font-size: 0.35rem; margin: 0">
                <!-- <van-icon name="arrow-down" v-if="this.isShowCollapse1" />
                <van-icon name="arrow" v-else /> -->
                创建的歌单
              </div>
              <span></span>
            </template>
            <template #right-icon> </template>
            <!-- 歌单列表通用样式 -->
            <div
              class="playList"
              v-for="item in this.playList.playlist"
              :key="item.id"
              @click="intoPlayList(item.id)"
              v-show="userDetail.profile.nickname + '喜欢的音乐' !== item.name"
            >
              <div v-if="userDetail.profile.nickname === item.creator.nickname">
                <img :src="item.coverImgUrl" alt="" />
                <div>
                  <span class="listName">
                    {{ item.name }}
                  </span>
                  <span class="number">{{ item.trackCount }}首</span>
                </div>
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
        <!-- 收藏歌单 -->
        <van-collapse v-model="activeNames" @click="b">
          <van-collapse-item name="2">
            <template #title>
              <div style="font-weight: 600; font-size: 0.35rem; margin: 0">
                <!-- <van-icon name="arrow-down" v-if="this.isShowCollapse1" />
                <van-icon name="arrow" v-else /> -->
                收藏的歌单
              </div>
            </template>
            <template #right-icon> </template>
            <!-- 歌单列表通用样式 -->
            <div
              class="playList"
              v-for="item in this.playList.playlist"
              v-show="userDetail.profile.nickname !== item.creator.nickname"
              :key="item.id"
              @click="intoPlayList(item.id)"
            >
              <div>
                <img :src="item.coverImgUrl" alt="" />
                <div>
                  <span class="listName">
                    {{ item.name }}
                  </span>
                  <span class="number">{{ item.trackCount }}首</span>
                </div>
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
        <!-- 个人信息栏目 -->
        <div class="userInfo">
          <div class="left">
            <div class="bofang">
              <span
                style="
                  font-size: 0.32rem;
                  font-weight: 600;
                  padding-left: 0.28rem;
                "
                >基本信息</span
              >
            </div>
          </div>
          <div class="Info" style="padding-left: 0.28rem">
            <span v-if="userDetail.profile.createTime"
              >村龄: {{ age }}年(
              {{ getCreateTime(userDetail.profile.createTime) }}注册)</span
            >
            <span v-if="userDetail.profile.birthday > 0"
              >年龄: {{ getAge(userDetail.profile.birthday) }}后</span
            >
            <span style="margin-bottom: 0.5rem" v-if="singerDetail.user"
              >地区:
              {{ getProvinceName(provinceData, userDetail.profile.province) }}
              {{
                getCityName(
                  provinceData,
                  userDetail.profile.province,
                  userDetail.profile.city
                )
              }}</span
            >
          </div>
          <div class="bofang">
            <span
              style="
                font-size: 0.32rem;
                font-weight: 600;
                padding-left: 0.28rem;
              "
              >个人介绍</span
            >
          </div>
          <div class="Info" style="padding-left: 0.28rem">
            <span
              style="white-space: pre-wrap"
              v-if="JSON.stringify(userDetail.profile.signature) !== ''"
              >{{ userDetail.profile.signature }}</span
            >
          </div>
        </div>
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
          <img :src="item.user.avatarUrl" alt="" />
          <div>
            <p>
              {{ item.user.nickname }}
            </p>

            <span>{{ changeDate(item.showTime) }}</span>

            <div class="content">
              {{ item.json.msg }}
            </div>
          </div>
        </div>
        <div
          v-show="this.eventList.events.length <= 0"
          style="
            color: rgb(149, 150, 152);
            margin: 0.2rem;
            margin-top: 1rem;
            text-align: center;
            font-size: 0.271rem;
          "
        >
          暂时还没有动态哦
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  getUserMore,
  getUserSongList
  , checkMusicFree
} from '@/request/api/home'
import { singerDetail } from '@/request/api/item'
import province from '@/assets/province.json'

import { getSingerList, getSingerToplist, followSinger, getUserDynamic } from '../../request/api/userDetail'
import { Dialog } from 'vant'

import 'vant/es/dialog/style'

import { mapMutations, mapState } from 'vuex'

export default {

  components: {
    [Dialog.Component.name]: Dialog.Component

  },
  data () {
    return {
      active: 0,
      eventTitle: '动态',
      userDetail: {
        profile: { nickname: '' }
      },
      age: 0,

      playList: [],
      isShowCollapse1: true,
      isShowCollapse2: true,
      activeNames: [1, 2],
      provinceData: [],
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

      follow: false,
      unFollow: false,
      eventList: [], // 动态列表
      Offset: 0,
      blockTop: 0,
      oneWeekList: [{
        song: {
          al: {
            picUrl: ''
          }
        }
      }]
    }
  },
  async created () {
    this.provinceData = province
    const detail = await singerDetail(this.$route.query.id)
    this.userDetail = detail.data
    // console.log(this.singerDetail)
    // console.log(detail.data)

    // const info = await getUserMore(this.$route.query.id)
    // console.log(info)
    const singerList = await getUserSongList(this.$route.query.id)
    this.playList = singerList.data
    // console.log(this.playList)
    // 获得最近听歌
    const oneWeek = await getSingerList(this.$route.query.id, 1)
    this.oneWeekList = oneWeek.data.weekData
    // console.log(this.oneWeekList[0])

    // const res = await getSingerDetail(this.$route.query.id)
    // this.singerDetail = res.data.data
    // console.log('歌手数据', res.data.data)

    const dynamic = await getUserDynamic(this.$route.query.id)
    this.eventList = dynamic.data
    // console.log(JSON.parse(this.jsonList[0].json))
    this.eventList.events.forEach(item => {
      item.json = JSON.parse(item.json)
    })
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
    getCreateTime (time) {
      const date2 = new Date()
      const date = new Date(time)
      // this.age = date2.getFullYear() - date.getFullYear()
      this.age = date2 - date
      this.age = new Date(this.age).getFullYear() - 1970
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const formattedDate = `${year}年${month}月`
      this.time = formattedDate
      return formattedDate
    },
    getAge (time) {
      const date = new Date(time)
      const year = date.getFullYear()
      if (year >= 2000) {
        return '00'
      } else if (year >= 1995) {
        return '95'
      } else if (year >= 1990) {
        return '90'
      } else if (year >= 1980) {
        return '80'
      } else if (year >= 1970) {
        return '70'
      }
    },
    // 转化省市code为名字
    getProvinceName (data, data2) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].province_code + '0' === data2 + '') {
          return data[i].province
        }
      }
    },
    getCityName (data, data2, data3) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].province_code + '0' === data2 + '') {
          for (let j = 0; j < data[i].cities.length; j++) {
            if (data[i].cities[j].city_code === data3 + '') {
              return data[i].cities[j].city
            }
          }
        }
      }
    },
    // handleScroll () {
    //   console.log(1)
    // },
    a: function () {
      this.isShowCollapse1 = !this.isShowCollapse1
    },
    b: function () {
      this.isShowCollapse2 = !this.isShowCollapse2
    },
    intoPlayList: function (id) {
      this.$router.push({
        path: '/itemMusic',
        query: {
          id: id
        }
      })
    },
    back () {
      this.$router.go(-1)
    },
    // 获取页面滚动距离
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.Offset = scrollTop
      this.blockTop = scrollTop
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
        margin-top: 0.16rem;
        width: 100%;
        // color: #cad4dd;
        color: white;
        display: flex;

        .women {
          // background-color: rgb(230, 143, 177, 0.9);
          background-color: rgb(182, 121, 147);
          i::before {
            color: rgb(244, 95, 152);
            transform: rotate(45deg);
            // transform: translateY(0.02rem);
          }
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          padding: 0 auto;
          width: 1.2rem;
          border-radius: 0.6rem;
          font-size: 0.236rem;
        }
        .man {
          background-color: rgb(128, 168, 198);
          i::before {
            color: rgb(120, 193, 239);
          }
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          padding: 0 auto;
          width: 1.2rem;
          border-radius: 0.6rem;
          font-size: 0.236rem;
          // background-color: rgb(230, 143, 177, 0.9);
        }
        .level {
          background-color: rgba(255, 255, 255, 0.5);
          margin-left: 0.2rem;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          padding: 0 auto;
          width: 0.9rem;
          border-radius: 0.6rem;
          font-size: 0.236rem;
          // background-color: rgb(230, 143, 177, 0.9);
        }
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
    border-bottom: 0.0175rem solid #f3f3f3ea;
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
        margin: 0.2rem 0 0.2rem 0;
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

.count {
  margin-left: 0.1832rem;
  font-size: 0.1594rem;
  position: relative;
  top: -0.08rem;
  font-weight: 100 !important;
  color: rgb(166, 166, 166);
}
.playList {
  margin-top: 0.334rem;

  // width: 100%;
  div {
    display: flex;
    height: 1.0998rem;
    margin-bottom: 0.1912rem;
    position: relative;
    img {
      height: 100%;
      width: 1.0998rem;
      margin-right: 0.1912rem;
      border-radius: 10%;
    }
    div {
      display: flex;
      flex-direction: column;
      margin-right: 0.2rem;

      .listName {
        width: 5.1rem;
        font-size: 0.2876rem;
        padding: 0.13rem 0 0.11rem 0;
        color: black;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
      }
      .number {
        font-size: 0.23rem;
        padding-bottom: 0.05rem;
      }
    }
    .icon {
      position: absolute;
      font-weight: 550;
      font-size: 0.318rem;
      right: 0;
      top: 0.3144rem;
      fill: rgb(177, 177, 177);
    }
  }
}
</style>

<style >
.van-tabs__line {
  left: 0;
}
</style>
