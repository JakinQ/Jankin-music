<template>
  <div>
    <div class="home">
      <!-- <img class="bg" src="@/assets/loginBg.jpg" alt="" /> -->
      <div class="home_container">
        <button class="phone" @click="getPhone">手机号登录</button>
        <button class="go">
          <router-link to="/loginByQrCode" style="color: black">
            立即体验
          </router-link>
        </button>
        <div>
          <span>网易邮箱登录</span>
        </div>

        <div class="message" v-if="message">
          请勾选同意《用户协议》和《隐私政策》
        </div>

        <div class="text">
          <span
            class="icon iconfont icon-fuxuankuang"
            v-if="flag"
            @click="flag = !flag"
          ></span>
          <span
            class="icon iconfont icon--fuxuankuang"
            v-else
            @click="flag = !flag"
          ></span>
          <span>同意</span>
          《用户协议》和《隐私政策》
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: false,
      message: false
    }
  },
  methods: {
    getPhone () {
      if (this.flag) {
        this.message = true
        setTimeout(() => {
          this.message = false
        }, 1000)
      } else {
        this.$router.push({
          path: '/login2'
        })
      }
    }
  }
}
</script >

<style lang="less" scoped>
.home {
  position: relative;
  height: 16.2rem;
  width: 100%;
  // background: url("../assets/loginBg.jpg");
  background: url("@/assets/loginBg2.jpg");

  background-size: 100% 100%;

  .home_container {
    width: 80%;
    height: 100%;
    margin: 0 auto;

    .phone {
      width: 100%;
      height: 1.4rem;
      border-radius: 0.8rem;
      background: rgb(193, 137, 140);
      color: black;
      border: none;
      opacity: 0.6;
      transform: translateY(11rem);
      font-size: 0.31rem;
    }
    .go {
      width: 100%;
      height: 1.4rem;
      border-radius: 0.8rem;
      margin-top: 0.334rem;
      background: rgb(143, 161, 175);
      color: #fff;
      opacity: 0.6;
      transform: translateY(11rem);
      font-size: 0.31rem;
    }
    .message {
      align-items: center;
      position: absolute;
      width: 5.6rem;
      height: 1.4rem;
      border-radius: 0.8rem;
      background-color: rgb(105, 105, 105);
      color: black;
      font-weight: 600;
      left: 12.6%;
      top: 40%;
      opacity: 0.6;
      display: flex;
      justify-content: center; /*水平居中*/
      align-items: Center; /*垂直居中*/
    }
    div {
      position: absolute;
      color: rgb(255, 207, 193);
      right: 3.1rem;
      bottom: 1.2rem;
      margin-top: 0.494rem;
      span {
        font-size: 0.23rem;
      }
    }

    .text {
      position: absolute;
      right: 2rem;
      bottom: 3%;
      font-size: 0.1752rem;
      color: rgb(255, 207, 193);

      .icon {
        color: rgb(192, 192, 192);
        font-size: 0.3rem;
      }
    }
  }
}
</style>
