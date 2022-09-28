<template>
  <div>
    <!-- 菜单栏 -->
    <div class="topNav">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      foundActive: true
    }
  },
  mounted () {
    if (this.$route.path === '/infoUser') {
      this.foundActive = false
    }
  },
  methods: {
    me: function () {
      // this.foundActive = false
      this.$router.push('/infoUser')
    },
    found: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
