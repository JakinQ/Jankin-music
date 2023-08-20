<template>
  <div>
    <!-- 菜单栏 -->
    <div class="topNav">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true" @click="showPopup()">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>

      <div class="topContent">
        <span @click="me" :class="this.foundActive === true ? '' : 'active'"
          >我的</span
        >
        <span :class="this.foundActive === true ? 'active' : ''" @click="found"
          >发现</span
        >
        <!-- <span>云村</span>
        <span>视频</span> -->
      </div>

      <!-- 搜索栏 -->
      <div class="topRight">
        <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
    </div>

    <!-- 弹出层 -->
    <van-popup
      style="overflow-y: hidden"
      v-model:show="show"
      position="left"
      class="popup"
      :style="{ height: '100%', width: '83%' }"
    >
      <div class="popup-top">
        <!-- <img
          class="profileimg"
          src="http://p1.music.126.net/CyXErwS-ognOuMxDG4pZpA==/18688399139396417.jpg"
          alt=""
        /> -->
        <div v-if="userList.profile">
          <!-- 背景虚化 -->
          <img :src="userList.profile.avatarUrl" alt="" class="bgImg" />

          <img
            :src="userList.profile.avatarUrl"
            alt=""
            class="profileimg"
            @click="intoDetail(userList.profile.userId)"
          />
          <p class="name">
            {{ userList.profile.nickname }}
            丨Lv.{{ level }}
            <button
              class="btn"
              @click="signIn"
              v-if="!(userList.pcSign || userList.mobileSign)"
              :disabled="isDisable"
            >
              签到
            </button>
            <button class="btn" style="color: #cbccc7" v-else>已签到</button>
          </p>
        </div>
        <div v-else class="notLogin">
          <p>登录账号,享受海量高品质音乐</p>
          <button @click="login">立即登录</button>
        </div>
      </div>
      <div class="popup-mid">
        <div class="icon">
          <p @click="myFriend">
            <i class="bi bi-people"></i>
            <span>我的好友</span>
          </p>

          <p @click="me">
            <i class="bi bi-house-door"></i>
            <span>个人主页</span>
          </p>
        </div>
        <div class="icon2">
          <p @click="myConcernList()">
            <i class="bi bi-people-fill"></i> <span>我的关注</span>
          </p>
          <p><i class="bi bi-envelope"></i> <span>我的消息</span></p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-fire"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"
              />
            </svg>
            <span @click="this.$router.push('/list')"> 排行榜</span>
          </p>
        </div>
      </div>
      <div class="space"></div>
      <div class="popup-bottom" v-if="userList.profile">
        <button @click="loginOut">退出登录</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ref } from 'vue'
import { yunbei, getLevel } from '@/request/api/item'
import { getUser, logOut } from '@/request/api/home'
import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      userlist1: {
        profile: {
          avatarUrl: ''
        }
      },
      foundActive: true,
      show: ref(false),
      level: 0,
      isDisable: false
    }
  },
  async created () {
    // const level = await getLevel()
    // this.level = level.data.data.level
    // console.log(document.cookie)
    this.level = this.userList.level
  },
  computed: {
    ...mapState(['userList', 'isQianDao', 'isLogin'])

  },
  async mounted () {
    if (this.$route.path === '/infoUser') {
      this.foundActive = false
    }
    // console.log(this.userList)
    // const res = await getYunbeiStatus()
    // const res2 = await getYunbeiStatus2()

    // console.log('res', res)
    // console.log('2', res2)
    // const res = await getUser(505673461)
    // console.log(res)
    // console.log(this.userList)
  },

  methods: {
    ...mapMutations([
      'updateQiandao', 'updateIsLogin'
    ]),
    intoDetail (id) {
      this.$router.push({
        path: '/generalUserDetail',
        query: { id: id }
      })
    },
    login: function () {
      this.$router.push('/infoUser')
    },
    loginOut: async function () {
      if (this.userList.profile) {
        this.updateIsLogin(false)
        this.$router.push('/login')
      } else {
        this.$toast({
          message: '未登录',
          position: 'bottom',
          duration: 1000
        })
      }
      // const res = await logOut()

      // console.log(this.isLogin)
    },
    showPopup: function () {
      this.show = true
    },
    me: function () {
      this.foundActive = false
      this.$router.push('/infoUser')
      // this.intoDetail(this.userList.profile.userId)
    },
    myFriend: function () {
      this.$router.push('/concernList')
    },
    found: function () {
      this.$router.push('/')
    },
    myConcernList: function () {
      if (this.userList.profile) { this.$router.push('/concernList') } else {
        this.$toast({
          message: '请登录再进入',
          position: 'bottom',
          duration: 1000
        })
      }
    },
    myMessage: function () {
      if (this.userList.profile) { this.$router.push('/concernList') } else {
        this.$toast({
          message: '请登录再进入',
          position: 'bottom',
          duration: 1000
        })
      }
    },
    signIn: async function () {
      this.isDisable = true
      const yunbei1 = await yunbei()

      if (yunbei1.data.code === 200) {
        this.$toast({
          message: '签到成功',
          position: 'bottom',
          duration: 1000
        })
        this.updateQiandao()
      }
    }
  }

}
</script>

<style lang="less" scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");

.topNav {
  width: 100%;
  z-index: 2;
  padding: 0.2rem;
  background-color: white;
  top: 0;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .topContent {
    color: rgb(126, 126, 126);
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 0.36rem;
    .active {
      color: black;
      font-weight: 550;
    }
  }
}
.popup {
  width: 100%;
  position: relative;

  .popup-top {
    height: 23.7%;
    .bgImg {
      bottom: 63%;
      width: 100%;
      height: 6.3rem;
      position: absolute;
      z-index: -1;

      //图片虚化  30px
      filter: blur(0.7rem);
    }
    // background-color: aqua;
    .profileimg {
      margin: 5.8%;
      margin-top: 22.8%;
      width: 20%;
      height: 36.3%;
      border-radius: 50%;
    }
    .name {
      margin-left: 5.8%;
      font-size: 0.34rem;
      font-weight: 700;
    }

    .btn {
      position: fixed;
      margin: 0 auto;
      right: 0.4rem;
      /* 清除默认边框 */
      border: none;
      border: #cbccc7 solid 0.0175rem;
      // opacity: 0.4;
      /*清除默认背景 */
      background-color: transparent;
      // margin-left: 32%;
      // height: 17.6%;
      height: 0.5rem;
      width: 17.3%;
      border-radius: 0.4rem;
      font-size: 0.3rem;
      font-weight: 400 !important;
    }
    .notLogin {
      // position: absolute;
      display: grid;
      width: 100%;
      height: 100%;
      align-content: center;
      justify-content: center;
      // left: 25%;
      // top: 11.85%;
      p {
        text-align: center;
        margin-bottom: 0.4rem;
        font-size: 0.28rem;
      }
      button {
        transform: translateX(25%);
        border-radius: 0.8rem;
        background: red;
        color: white;
        border: none;
        opacity: 0.6;
        height: 0.6rem;
        width: 2.412rem;
        font-size: 0.31rem;
      }
    }
  }
  .popup-mid {
    height: 30%;
    background-color: white;
    border-top: #ebebeb solid 0.0175rem;

    .icon {
      width: 92%;
      height: 30%;
      display: flex;
      overflow: visible;
      margin: 0.3rem;

      border-bottom: #ebebeb solid 0.02rem;
      p {
        height: 39.7%;
        align-items: center;
        // flex: 0.88;
        flex-grow: 1;
        display: flex;
        flex-flow: column;
        font-size: 0.52rem;
        color: red;
        span {
          color: black;
          font-size: 0.28rem;
        }
      }
    }
  }
  .icon2 {
    display: flex;
    flex-direction: column;
    margin: 0rem 0.3rem 0.3rem 0.3rem;
    p {
      margin-top: 0.23rem;
      margin-bottom: 0.23rem;
      font-size: 0.298rem;
    }
  }
  .space {
    width: 100%;
    height: 7.5rem;
    background-color: #ebebeb;
  }
  .popup-bottom {
    position: fixed;
    bottom: 0rem;
    width: 100%;
    height: 0.7rem;
    background-color: white;
    button {
      transform: translateX(1.75rem);
      margin-top: 0.05rem;
      align-items: center;
      border-radius: 0.8rem;
      background: red;
      color: white;
      border: none;
      opacity: 0.6;
      height: 0.6rem;
      width: 2.412rem;
      font-size: 0.31rem;
    }
  }
}
</style>
