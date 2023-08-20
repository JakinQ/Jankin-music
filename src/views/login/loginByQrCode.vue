<template>
  <div style="overflow-y: hidden">
    <div class="top">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
    </div>
    <img src="@/assets/摇滚.jpg" alt="" class="bg" />
    <div class="qrBackground">
      <img class="" :src="this.qrCodeImg" alt="" />
    </div>
    <div class="qrBackground-before" v-show="isOverdue"></div>
    <div>
      <span class="text" v-show="isOverdue">二维码已经失效</span>
      <button class="update" v-show="huoqu" @click="login">
        点击获取二维码
      </button>

      <button class="update" v-show="isOverdue" @click="update">
        点击刷新
      </button>
    </div>
    <div class="tips">使用网易云app扫码登录</div>

    <img src="v-else" alt="" />
    <!-- <button @click="login">点击</button> -->
    <button @click="getUser" class="linshi">快捷通道</button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import {
  qrCodeLoginKey,
  qrCodeLoginImg,
  qrCodeLoginCheck,
  getUser, getUser1, loginStatus
} from '@/request/api/home'
export default {
  computed: {
    ...mapState(['isLogin', 'cookie', 'userList'])

  },

  data () {
    return {
      userList: '',
      qrCodeImg: '',
      uid: '',
      usNName: '',
      headImg: '',
      isOverdue: false,
      huoqu: true

    }
  },
  mounted () {
    // this.login()
  },

  methods: {
    ...mapMutations(['updateCookie', 'updateIsLogin']),

    login: async function () {
      this.huoqu = !this.huoqu
      const nowtime = Date.now()
      //   console.log(nowtime)
      // 调第一个接口拿key
      const key = (await qrCodeLoginKey(nowtime)).data.data.unikey
      // 调第二个接口拿二维码图片
      this.qrCodeImg = (await qrCodeLoginImg(key)).data.data.qrimg
      //   this.$store.state.signShow = true
      //   this.$store.state.signURL = sginImgURL
      // 800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功
      // 每三秒check一次
      const check = setInterval(async () => {
        // 判断是否登录，登录则直接停止定时器
        // if (this.isLogin) {
        //   alert(1)
        //   clearInterval(check)
        // }
        const nowtime2 = new Date().getTime()
        const res = await qrCodeLoginCheck(key, nowtime2).then()
        // console.log(res.data.message, '---')
        // console.log(res)
        // console.log(this.cookie)
        if (res.data.code === 800) {
          this.isOverdue = true
          clearInterval(check)
        }
        if (res.data.code === 803) {
          this.updateIsLogin(true)
          this.updateCookie(res.data.cookie)

          this.cookie = res.data.cookie

          localStorage.setItem('cookie', this.cookie)

          // 更新cookie
          console.log(res.data.cookie)

          const user = await getUser1(this.cookie, nowtime)

          console.log(user)

          if (user.data.account && user.data) {
            const result = await getUser(user.data.account.id)
            this.$store.commit('updateUserList', result.data)

            // if (result.data) {
            //   this.updateIsLogin(true)
            // }
            this.$router.push({
              path: '/infoUser'
            })

            clearInterval(check)
          }
        }
      }, 3000)

      //   this.uid = res.data.account.id
      //   this.usNName = res.data.profile.nickname
      //   this.headImg = res.data.profile.avatarUrl
    },
    getUser: async function () {
      const nowtime = new Date().getTime()

      const user = await getUser1(this.cookie, nowtime)
      // const user2 = await loginStatus(this.cookie)

      console.log(user)

      if (user.data.account && user.data) {
        const result = await getUser(user.data.account.id)
        this.$store.commit('updateUserList', result.data)
        if (result.data) {
          this.updateIsLogin(true)
        }
        localStorage.setItem('cookie', this.cookie)
        // console.log(result.data)

        this.$router.push({
          path: '/infoUser'
        })
      } else {
        return this.$toast({
          message: 'cookie失效,请重新扫码登录',
          position: 'bottom',
          duration: 1000
        })
      }
    },
    // 更新二维码
    update: function () {
      this.login()
      this.isOverdue = false
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  position: fixed;
  display: flex;
  margin: 0.2rem;
  .icon {
    width: 0.5rem;
    height: 0.5rem;
  }
  div {
    font-weight: 550;
    font-size: 0.382rem;
    padding-left: 0.406rem;
  }
}
.bg {
  width: 100%;
  // height: 16.2rem;
  height: 100%;

  z-index: -1;
  overflow: hidden;
}
.qrBackground-before {
  content: "";
  position: absolute;
  top: 1.75rem;
  left: 27%;
  background-color: white;
  height: 3.15rem;
  width: 3.2rem;
  opacity: 0.8;
  z-index: 2;
}

.qrBackground {
  position: absolute;
  top: 1.8rem;
  left: 27%;
  z-index: 1;
  width: 3.6rem;
  height: 3.6rem;
  //   background-color: white;
}
.update {
  position: absolute;
  top: 2.9rem;
  left: 32%;
  background-color: rgb(39, 200, 15);
  height: 0.8rem;
  width: 2.4rem;
  z-index: 2;
  border-radius: 0.2rem;
  border: 0;
  color: rgb(255, 255, 255);
}
.text {
  z-index: 2;
  position: absolute;
  top: 2.2rem;
  left: 31%;
  font-size: 0.37rem;
  font-weight: 550;
}
.tips {
  z-index: 2;
  position: absolute;
  top: 1rem;
  left: 27%;
  color: aliceblue;
  // color: white;

  font-weight: 600;
  opacity: 0.8;
}
.linshi {
  position: fixed;
  border: none;
  background-color: transparent;
  outline: none; //消除默认点击蓝色边框效果
  padding: 0.0875rem;
  border: 0.0175rem solid red;
  border-radius: 15%;
  top: 0.2rem;
  right: 0.2rem;
}
</style>
