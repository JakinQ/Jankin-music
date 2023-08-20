<template>
  <div>
    <!-- 菜单栏 -->
    <div class="topNav">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>

      <div class="topContent">
        <span>我的好友</span>
      </div>

      <!-- 搜索栏 -->
      <div class="topRight">
        <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
    </div>
    <van-tabs v-model:active="active" style="margin-bottom: 1.068rem">
      <van-tab title="关注" title-style="font-size: 0.36rem">
        <!-- 关注列表 -->
        <div
          class="concernList"
          v-for="(item, i) in concernList"
          :key="i"
          @click="concernDetails(item)"
        >
          <!-- 头像 -->
          <img :src="item.avatarUrl" alt="" />
          <!-- 名字和签名 -->
          <div class="name" style="overflow: hidden">
            <span>{{ item.nickname }}</span>
            <span class="signature ellipsis">{{ item.signature }}</span>
          </div>
        </div>
      </van-tab>
      <van-tab title="粉丝" title-style="font-size: 0.36rem;">
        <!-- 粉丝列表 -->
        <div
          class="concernList"
          v-for="(item, i) in followedsList"
          :key="i"
          @click="concernDetails(item)"
        >
          <!-- 头像 -->
          <img :src="item.avatarUrl" alt="" />
          <!-- 名字和签名 -->
          <div class="name" style="overflow: hidden">
            <span>{{ item.nickname }}</span>
            <span class="signature ellipsis">{{ item.signature }}</span>
          </div>
        </div></van-tab
      >
    </van-tabs>
  </div>
</template>

<script>
import { concernList, singerDetail, followedsList } from '@/request/api/item'
import { mapMutations, mapState } from 'vuex'
export default {

  data () {
    return {
      concernList:
        [{
          accountStatus: 0,
          authStatus: 0,
          avatarDetail: null,
          avatarUrl: '',
          blacklist: false,
          eventCount: 0,
          expertTags: null,
          experts: null,
          followed: true,
          followeds: 1,
          follows: 10,
          gender: 0,
          mutual: true,
          nickname: '英特纳xn',
          playlistCount: 4,
          py: 'ytnxn',
          remarkName: null,
          signature: 'UNIDOTS乐队主唱',
          time: 0,
          userId: 8032845392,
          userType: 0
        }],
      followedsList: [],
      userId1: 505673461
    }
  },
  computed: {
    ...mapState(['userList', 'detailShow', 'isLogin'])
  },
  watch: {
    // 打开弹出层时候会出现问题，底下样式暴露在弹出层，除去该样式，修改层级
    detailShow: function () {
      if (this.detailShow === true) {
        document.getElementsByClassName('van-tabs__line')[0].style.zIndex = '0'
      }
    }
  },
  async mounted () {
    // if (JSON.stringify(this.userList) !== '{}') {  isLogin
    if (this.isLogin) {
      const res = await concernList(this.userList.userPoint.userId)
      // const res = await concernList(this.userId)
      // 获取关注列表和粉丝列表 按粉丝数排序
      this.concernList = res.data.follow.sort((a, b) => b.followeds - a.followeds)
      const res2 = await followedsList(this.userList.userPoint.userId)
      this.followedsList = res2.data.followeds.sort((a, b) => b.followeds - a.followeds)
    } else {
      alert('登录过期,点击重新登录')
      this.$router.push('/login')
    }
  },
  methods: {
    ...mapMutations([
      'updateQiandao'
    ]),
    async concernDetails (id) {
      // console.log(id)

      const res = await singerDetail(id.userId)
      // console.log(res.data.profile)
      if (res.data.profile.artistId) {
        this.$router.push({ path: '/userDetail', query: { id: res.data.profile.artistId } })
      } else {
        this.$router.push({ path: '/generalUserDetail', query: { id: res.data.profile.userId } })
      }
    }
  }

}
</script>

<style lang="less" scoped>
.van-tabs__line {
  color: red;
  z-index: 0;
}
.topNav {
  width: 100%;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .topContent {
    color: black;
    width: 65%;
    height: 100%;
    font-size: 0.36rem;
  }
}
.concernList {
  display: flex;
  margin: 0.1575rem;
  img {
    margin: 0.2275rem;
    border-radius: 50%;
    height: 1.225rem;
    width: 1.225rem;
  }
  .name {
    justify-content: center;
    display: flex;
    flex-direction: column;

    .signature {
      font-size: 0.2625rem !important;
      color: #7f7f7f;
    }
  }
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
