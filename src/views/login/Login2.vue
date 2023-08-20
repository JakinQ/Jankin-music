<template>
  <!-- 顶部 -->
  <div class="phone_login" style="background: #fff">
    <div class="top">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div>手机号登录</div>
    </div>

    <div class="container">
      <p>未注册手机号登录后将自动创建账号</p>
      <div>
        <input
          class="phone"
          v-model="phone"
          type="number"
          name="phone"
          placeholder="请输入手机号"
        />
        <!-- 叉号 -->
        <svg
          v-show="phone"
          @click="deleteKey"
          t="1663161967054"
          class="icon i"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2391"
          width="200"
          height="200"
        >
          <path
            d="M557.3 512l329.3-329.4a32 32 0 1 0-45.2-45.2L512 466.7 182.6 137.4a32 32 0 1 0-45.2 45.2L466.7 512 137.4 841.4a31.9 31.9 0 0 0 0 45.2 31.9 31.9 0 0 0 45.2 0L512 557.3l329.4 329.3a31.9 31.9 0 0 0 45.2 0 31.9 31.9 0 0 0 0-45.2z"
            fill="#333333"
            p-id="2392"
          ></path>
        </svg>
      </div>

      <input
        class="phone"
        name="password"
        v-model="password"
        type="password"
        placeholder="请输入密码"
      />
      <a href="">忘记密码?</a>
      <button @click="Login">登录</button>

      <div class="message" v-if="message">请输入正确的手机号</div>
    </div>
  </div>
</template>

<script>
import { getUser } from '@/request/api/home'

export default {
  data () {
    return {
      phone: '',
      password: '',
      message: false

    }
  },
  methods: {
    deleteKey: function () {
      this.phone = ''
    },
    // 登录
    Login: async function () {
      const user = await this.$store.dispatch('getLogin', { phone: this.phone, password: this.password })
      // console.log(user)
      const result = await getUser(user.data.account.id)
      this.$store.commit('updateUserList', result.data)

      if (this.phone) {
        this.$store.commit('updateIsLogin', true)
        localStorage.setItem('cookie', this.cookie)
        this.$router.push('/infoUser')
      } else {
        this.$toast('账号或密码错误')
        this.password = ''
      }
    }

  }
}
</script>

<style lang="less" scoped>
.phone_login {
  width: 100%;
  height: auto;
  padding: 0.32rem;
  .top {
    display: flex;

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
  .container {
    width: 100%;
    height: auto;
    padding-right: 0.32rem;

    p {
      color: rgb(127, 127, 127);
      margin: 1.036rem 0 0.736rem 0;
    }
    input::-webkit-input-placeholder {
      color: rgb(213, 213, 213);
      font-size: 0.318rem;
    }
    svg {
      position: absolute;
      right: 0.3rem;
      top: 3.6rem;
      color: rgb(176, 176, 176);
      height: 0.318rem;
      width: 0.318rem;
    }
    input {
      font-size: 0.318rem;
      margin: 0.3rem;
      width: 100%;
      height: 0.82rem;
      outline: none;
      border-style: none;
      border-bottom: 0.02rem solid rgb(213, 213, 213);
    }
    a {
      position: absolute;
      font-size: 0.23rem;
      right: 0.3rem;
      top: 5rem;
      color: rgb(128, 150, 196);
    }
    button {
      width: 100%;
      height: 0.908rem;
      margin-top: 0.876rem;
      text-align: center;
      border: none;
      border-radius: 0.8rem;
      background-color: rgb(251, 58, 56);
      color: #fff;
    }

    .message {
      position: absolute;
      bottom: 300px;
      width: 300px;
      margin: 0 200px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: rgba(0, 0, 0, 0.7);
    }
  }
}
</style>
