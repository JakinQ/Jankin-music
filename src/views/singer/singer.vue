<template>
  <div>
    <button class="backTop" v-show="showBackToTop" @click="scrollToTop">
      top
    </button>
    <!-- 菜单栏 -->
    <div class="topNav" v-if="!detailShow">
      <div class="topLeft" @click="back()">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>

      <div class="topContent" style="font-weight: 700">
        <span>歌手分类</span>
      </div>
    </div>
    <!-- tab标签 -->
    <van-tabs
      style="top: 0.9rem; position: fixed; width: 100%"
      v-model:active="activePrimaryTab"
      lazy-render
      title-active-color="red"
      line-height="0"
      line-width="0"
      @click-tab="onClickPrimaryTabs()"
    >
      <van-tab
        v-for="(tab, index) in primaryTabs"
        :key="index"
        :title="tab.title"
        style="transform: translateY(-0.0175rem)"
      >
        <van-tabs
          v-model:active="activeSecondaryTab"
          lazy-render
          title-active-color="red"
          line-height="0"
          line-width="0"
          @click-tab="onClickSecondaryTabs()"
        >
          <van-tab
            v-for="(secondaryTab, index) in tab.secondaryTabs"
            :key="index"
            :title="secondaryTab.title"
          >
          </van-tab>
        </van-tabs>
      </van-tab>
    </van-tabs>

    <van-sticky :offset-top="2.4 + 'rem'">
      <div class="head">热门歌手</div>
    </van-sticky>

    <!-- <div class="head">热门歌手</div> -->
    <!-- 加载栏 -->
    <van-loading class="loading" size="1rem" type="spinner" v-if="loading"
      >加载中...</van-loading
    >

    <div style="margin-top: 2.4rem">
      <div
        v-for="(singer, index) in singers"
        :key="singer.id"
        class="singer-info"
      >
        <img
          v-bind:src="singer.img1v1Url"
          alt="头像"
          class="avatar"
          @click="intoDetails(singer)"
        />
        <div style="width: 4.6rem" @click="intoDetails(singer)">
          {{ singer.name }}
        </div>
        <!-- {{ singer.followed }} -->

        <button
          ref="b2"
          class="follow-button"
          @click="updateFollow(singer, false, index, this.unFollow[index].bool)"
          v-if="JSON.stringify(this.userList) !== '{}' && singer.followed"
        >
          <!-- 已关注 -->
          {{ this.unFollow[index].bool ? "关注" : "已关注" }}
        </button>
        <button
          ref="b0"
          class="follow-button"
          @click="updateFollow(singer, true, index, this.follow[index].bool)"
          v-else
        >
          <!-- 关注 -->
          {{ this.follow[index].bool ? "已关注" : "关注" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getTopSinger, getSinger, loginStatus, followSinger } from '@/request/api/singer.js'
import { mapMutations, mapState } from 'vuex'
import 'vant/es/dialog/style'
import { Dialog } from 'vant'

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component

  },
  data () {
    return {
      activePrimaryTab: null, // 当前选中的一级标签
      activeSecondaryTab: -1, // 当前选中的二级标签
      primaryTabs: [
        // type：-1:全部 1:男歌手 2:女歌手 3:乐队  area：-1:全部 7华语 96欧美 8:日本 16韩国0:其他
        {
          title: '华语',
          area: 7,
          secondaryTabs: [ // 二级标签数据
            { title: '男', type: 1 },
            { title: '女', type: 2 },
            { title: '乐队/组合', type: 3 }
          ]
        },
        {
          title: '欧美',
          area: 96,
          secondaryTabs: [ // 二级标签数据
            { title: '男', type: 1 },
            { title: '女', type: 2 },
            { title: '乐队/组合', type: 3 }
          ]
        },
        {
          title: '日本',
          area: 8,
          secondaryTabs: [ // 二级标签数据
            { title: '男', type: 1 },
            { title: '女', type: 2 },
            { title: '乐队/组合', type: 3 }
          ]
        },
        {
          title: '韩国',
          area: 16,
          secondaryTabs: [ // 二级标签数据
            { title: '男', type: 1 },
            { title: '女', type: 2 },
            { title: '乐队/组合', type: 3 }
          ]
        },
        {
          title: '其他',
          area: 0,
          secondaryTabs: [ // 二级标签数据
            { title: '男', type: 1 },
            { title: '女', type: 2 },
            { title: '乐队/组合', type: 3 }
          ]
        }
      ],
      singers: [

      ],
      scrollY: 0,
      offset: 1400,
      show: false,
      loading: false,
      follow: [{ bool: false }],
      unFollow: [{ bool: false }]
    }
  },
  async created () {
    this.loading = true

    // const res = await loginStatus()
    // console.log(res)

    const singerList = await getSinger(1, 7, localStorage.getItem('cookie'))

    // console.log(singerList)
    // this.follow.length = singerList.data.artists.length
    // console.log(this.follow)
    singerList.data.artists.forEach(element => {
      this.follow.push({ bool: false })
    })
    singerList.data.artists.forEach(element => {
      this.unFollow.push({ bool: false })
    })
    // this.follow.push({ bool: false })
    // this.follow.length = 1

    // this.follow.push({ bool: false })

    this.updateArray(singerList.data.artists)
    this.singers = singerList.data.artists.sort((a, b) => b.fansCount - a.fansCount)
    this.loading = false
    // console.log(this.singers)
  },

  methods: {
    ...mapMutations(['updateFollowSinger']),
    back () {
      this.$router.go(-1)
    },
    intoDetails (singer) {
      this.updateFollowSinger(singer.followed)

      this.$router.push({ path: '/userDetail', query: { id: singer.id } })
    },
    // 头像太大分辨率，处理一下
    addSuffix (array, suffix) {
      return array.map(item => {
        item.img1v1Url += suffix
        return item
      })
    },
    // showBtn (followed) {
    //   if (JSON.stringify(this.userList) !== '{}') {
    //     const result = followed || this.success ? '已关注' : '关注'

    //     return result
    //   } else return '关注'
    // },
    updateArray (array) {
      array = this.addSuffix(array, '?param=100y100')
    },
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    async onClickPrimaryTabs () {
      this.loading = true

      // 获取点击标签后的对应数据：点击的地区代码和 歌手类型代码
      const area = this.primaryTabs[this.activePrimaryTab].area
      const type = this.primaryTabs[this.activePrimaryTab].secondaryTabs[this.activeSecondaryTab].type
      const res = await getSinger(type, area, localStorage.getItem('cookie'))
      this.follow.length = 0
      this.unFollow.length = 0
      res.data.artists.forEach(element => {
        this.follow.push({ bool: false })
      })
      res.data.artists.forEach(element => {
        this.unFollow.push({ bool: false })
      })
      this.updateArray(res.data.artists)
      this.singers = res.data.artists.sort((a, b) => b.fansCount - a.fansCount)
      this.loading = false
    },
    async onClickSecondaryTabs () {
      this.loading = true
      const area = this.primaryTabs[this.activePrimaryTab].area
      const type = this.primaryTabs[this.activePrimaryTab].secondaryTabs[this.activeSecondaryTab].type
      const res = await getSinger(type, area, localStorage.getItem('cookie'))
      this.follow.length = 0
      this.unFollow.length = 0
      res.data.artists.forEach(element => {
        this.follow.push({ bool: false })
      })
      res.data.artists.forEach(element => {
        this.unFollow.push({ bool: false })
      })
      this.updateArray(res.data.artists)
      this.singers = res.data.artists.sort((a, b) => b.fansCount - a.fansCount)
      this.loading = false
      console.log(this.singers)
      //   console.log('onClickPrimaryTabs ', this.primaryTabs[this.activePrimaryTab].area)
      //   console.log('onClickSecondaryTabs', this.primaryTabs[this.activePrimaryTab].secondaryTabs[this.activeSecondaryTab].type)
    },
    async updateFollow (singer, bool, i, bool2) {
      // 处理关注逻辑
      // console.log(singer)
      if (JSON.stringify(this.userList) !== '{}') {
        if (!bool === bool2) {
          // console.log('关注')
          const res = await followSinger(singer.id, 1)// 夜游
          // console.log(res.data.message)
          if (res.data.message) {
            if (i === 0) {
              this.follow.splice(i, 0, { bool: true })
            } else { this.follow.splice(i, 0, { bool: true }) }
          }
          this.updateFollowSinger(true)

          // console.log(this.follow[i])
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
              const res = await followSinger(singer.id, 20)
              // console.log(res)
              if (res.data.message) {
                this.unFollow.splice(i, 0, { bool: true })
              }
              this.updateFollowSinger(false)

              // console.log(this.unFollow[i])
            })
            .catch(() => {
              // console.log('继续做朋友')
              // on cancel
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
      //   singer.followed = !singer.followed
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY
    })
  },
  computed: {
    ...mapState(['userList', 'followSinger', 'detailShow']),

    showBackToTop () {
      return this.scrollY > this.offset
    }
  }

}
</script>

<style lang="less" scoped>
.topNav {
  top: 0;
  z-index: 3;
  background-color: white;
  position: fixed;
  width: 100%;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  .topLeft {
    // z-index: 999;
  }
  .topContent {
    margin-left: 0.4rem;
    transform: translateY(-0.04rem);
    color: black;
    width: 65%;
    height: 100%;
    font-size: 0.36rem;
  }
}
.head {
  padding-left: 0.2rem;
  height: 0.5775rem;
  line-height: 0.5775rem;
  background-color: #f3f3f3;
  color: #808080;
  width: 100%;
  font-size: 0.25rem;
  // transform: translateY(2.4rem);
}
.loading {
  transform: translateY(2.4rem);
  width: 4rem;
  margin: 0 auto;
  text-align: center;
}

.singer-info {
  padding: 0.2rem;
  display: flex;
  align-items: center;
}
.follow-button {
  border-radius: 0.3rem; /* 圆角 */
  width: 1.4rem; /* 宽度 */
  height: 0.525rem; /* 高度 */
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  display: inline-block; /* 行内块元素 */
  border: none; /* 去掉边框 */
  outline: none; /* 去掉聚焦边框 */
  cursor: pointer; /* 可点击样式 */
  border: 0.0175rem solid red;
  background-color: white; /* 背景色 */
  color: red; /* 文字颜色 */
  font-size: 0.245rem; /* 字体大小 */
  padding: 0.08rem 0.16rem; /* 内边距 */
}

.avatar {
  border-radius: 50%; /* 圆角边框 */
  margin-right: 0.14rem; /* 右边距 */
  height: 1.1rem;
  width: 1.1rem;
}
.backTop {
  border: none; /* 去掉边框 */
  outline: none; /* 去掉聚焦边框 */
  cursor: pointer; /* 可点击样式 */
  background-color: #f3f3f3;
  line-height: 0.8rem;
  justify-content: center; /* 水平居中 */
  height: 0.8rem;
  width: 0.8rem;
  border-radius: 50%;
  position: fixed;
  bottom: 15%;
  right: 8%;
  opacity: 0.5;
}
</style>
