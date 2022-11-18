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
        <!-- <Share style="width: 1em; height: 1em; margin-right: 8px" /> -->

        <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
    </div>

    <!-- 弹出层 -->
    <van-popup
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

          <img :src="userList.profile.avatarUrl" alt="" class="profileimg" />
          <p class="name">
            {{ userList.profile.nickname }}
            <button class="btn" @click="signIn">签到</button>
          </p>
        </div>
        <div v-else class="notLogin">
          <p>登录账号,享受海量高品质音乐</p>
          <button @click="login">立即登录</button>
        </div>
      </div>
      <div class="popup-mid">
        <div class="icon">
          <p>
            <i class="bi bi-people-fill"></i>
            <span>我的好友</span>
          </p>

          <p>
            <i class="bi bi-house-door"></i>
            <span>个人主页</span>
          </p>
        </div>
        <div class="icon2">
          <p><i class="bi bi-people-fill"></i> <span>我的好友</span></p>
          <p><i class="bi bi-people-fill"></i> <span>我的好友</span></p>
          <p><i class="bi bi-people-fill"></i> <span>我的好友</span></p>
        </div>
      </div>
      <div class="space"></div>
      <div class="popup-bottom">1</div>
    </van-popup>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      userlist1: {
        profile: {
          avatarUrl: ''
        }
      },
      foundActive: true,
      show: ref(false)
    }
  },
  created () {

  },
  computed: {
    ...mapState(['userList'])

  },
  mounted () {
    if (this.$route.path === '/infoUser') {
      this.foundActive = false
    }

    // this.userlist1 = this.userlist.profile
    console.log(this.userList)
  },

  methods: {
    login: function () {
      this.$router.push('/infoUser')
    },
    showPopup: function () {
      this.show = true
    },
    me: function () {
      this.foundActive = false
      this.$router.push('/infoUser')
    },
    found: function () {
      this.$router.push('/')
    },
    signIn: function () {
      alert('签到成功')
    }
  }

}
</script>

<style lang="less" scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");

.topNav {
  width: 100%;
  padding: 0.2rem;
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
      border: none;
      margin-left: 52%;
      height: 17.6%;
      width: 17.3%;
      border-radius: 25%;
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
    height: 27%;
    background-color: white;
    border-top: #ebebeb solid 1px;

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
  }
  .space {
    width: 100%;
    height: 8rem;
    background-color: #ebebeb;
  }
  .popup-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 6.2%;
    background-color: white;
  }
}
</style>
