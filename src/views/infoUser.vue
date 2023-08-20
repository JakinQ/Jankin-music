<template>
  <!-- <div class="infoUserTop">
    <img :src="userList.data.profile.avatarUrl" alt="" class="profileimg" />
    <div class="name">{{ userList.data.profile.nickname }}</div>
  </div> -->
  <div>
    <!-- 顶部栏 -->
    <TopNav class="TopNav" v-show="!detailShow"></TopNav>
    <!-- 空盒子 -->
    <div class="space"></div>
    <!-- 整个大模块固定位置, -->
    <div class="fixed">
      <div class="userTop">
        <!-- 四个图标 -->
        <div class="userTopContent">
          <div>
            <svg
              t="1663654506966"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2516"
              width="200"
              height="200"
            >
              <path
                d="M903.6 95.3c0-9-4.3-17.3-11.5-22.6-7.3-5.3-16.6-6.7-25.1-3.9L390.2 225.9c-11.4 3.7-19.1 14.3-19.2 26.3l-2.5 439.1c-26.2-21.6-59.7-34.6-96.2-34.6-83.4 0-151.3 67.9-151.3 151.3s67.9 151.3 151.3 151.3c83.3 0 151.1-67.7 151.3-151.1v-0.1l2.5-445.2L700 273c9.8-3.2 15.1-13.7 11.8-23.5-3.2-9.8-13.7-15.1-23.5-11.9l-262 86.2 0.3-51.2 421.1-138.7V185l-70 23c-9.8 3.2-15.1 13.7-11.8 23.5 2.6 7.8 9.8 12.8 17.7 12.8 1.9 0 3.9-0.3 5.8-0.9l58.5-19.3v329.1c-26.1-21.3-59.3-34.1-95.5-34.1-83.5 0-151.4 67.9-151.4 151.3s67.9 151.3 151.3 151.3 151.3-67.9 151.3-151.3c0-4.1-0.3-8.1-0.6-12.1 0.4-1.9 0.6-3.8 0.6-5.8V95.3zM272.4 903.6c-52.7 0-95.5-42.9-95.5-95.5 0-52.7 42.9-95.5 95.5-95.5 52.7 0 95.5 42.9 95.5 95.5 0.1 52.7-42.8 95.5-95.5 95.5z m479.9-137.7c-52.7 0-95.6-42.9-95.6-95.5 0-52.7 42.9-95.6 95.6-95.6 52.7 0 95.5 42.9 95.5 95.6 0 52.7-42.8 95.5-95.5 95.5z"
                fill="#4F4F4F"
                p-id="2517"
              ></path>
              <path
                d="M791.8 652c-10.3 0-18.6 8.3-18.6 18.6 0 11.5-9.4 21-21 21s-21-9.4-21-21c0-7.5 4.1-14.5 10.6-18.2 8.9-5.1 11.9-16.5 6.8-25.4-5.1-8.9-16.5-11.9-25.4-6.8-18 10.4-29.2 29.7-29.2 50.4 0 32.1 26.1 58.1 58.2 58.1s58.2-26.1 58.2-58.1c0.1-10.2-8.3-18.6-18.6-18.6zM312 786.9c-10.3 0-18.6 8.3-18.6 18.6 0 11.5-9.4 21-21 21s-21-9.4-21-21c0-7.5 4-14.5 10.5-18.2 8.9-5.2 11.9-16.5 6.8-25.4-5.1-8.9-16.5-12-25.4-6.8-18 10.4-29.2 29.7-29.2 50.4 0 32.1 26.1 58.1 58.1 58.1 32.1 0 58.1-26.1 58.1-58.1 0.3-10.3-8-18.6-18.3-18.6z"
                fill="#4F4F4F"
                p-id="2518"
              ></path>
            </svg>

            <div class="text">本地音乐</div>
          </div>
          <div>
            <svg
              t="1663655084111"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5924"
              width="200"
              height="200"
            >
              <path
                d="M822.496 473.152l52.053333 29.290667C869.461333 306.56 709.098667 149.333333 512 149.333333c-200.298667 0-362.666667 162.368-362.666667 362.666667s162.368 362.666667 362.666667 362.666667c122.538667 0 234.645333-61.194667 301.578667-161.152a32 32 0 1 1 53.173333 35.616C788.064 866.634667 656.117333 938.666667 512 938.666667 276.362667 938.666667 85.333333 747.637333 85.333333 512S276.362667 85.333333 512 85.333333s426.666667 191.029333 426.666667 426.666667c0 10.954667-0.853333 26.357333-2.517334 46.528-1.930667 23.242667-27.274667 36.682667-47.594666 25.248l-97.450667-54.848a32 32 0 1 1 31.392-55.786667z m-493.12 176.213333L480 498.762667V320a32 32 0 0 1 64 0v192a32 32 0 0 1-9.376 22.624l-160 160a32 32 0 1 1-45.248-45.248z"
                p-id="5925"
              ></path>
            </svg>
            <div class="text">最近播放</div>
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg>
            <div class="text">下载管理</div>
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-aixin"></use>
            </svg>
            <div class="text t2">我的收藏</div>
          </div>
        </div>
      </div>
      <!-- 创建歌单 -->
      <van-collapse v-model="activeNames" @click="a">
        <van-collapse-item name="1">
          <template #title>
            <div>
              <van-icon name="arrow-down" v-if="this.isShowCollapse1" />
              <van-icon name="arrow" v-else />
              创建的歌单<span class="count"
                >( {{ this.songCount.createdPlaylistCount }} )</span
              >
            </div>
          </template>
          <template #right-icon>
            <van-icon name="plus add" />
            <svg
              t="1663661055979"
              class="icon svg"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="12001"
              width="200"
              height="200"
              @click="ab"
            >
              <path
                d="M512 814.545455c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z m0-232.727273c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z m0-232.727273c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z"
                fill=""
                p-id="12002"
              ></path>
            </svg>
          </template>
          <!-- 歌单列表通用样式 -->
          <div
            class="playList"
            v-for="item in this.playList"
            :key="item.id"
            @click="intoPlayList(item.id)"
          >
            <div v-show="userList.profile.nickname === item.creator.nickname">
              <img :src="item.coverImgUrl" alt="" />
              <div>
                <span class="listName">
                  {{ item.name }}
                </span>
                <span class="number">{{ item.trackCount }}首</span>
              </div>
              <svg
                t="1663661055979"
                class="icon svg"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="12001"
                width="200"
                height="200"
              >
                <path
                  d="M512 814.545455c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z m0-232.727273c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z m0-232.727273c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z"
                  fill=""
                  p-id="12002"
                ></path>
              </svg>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
      <!-- 收藏的歌单 -->
      <van-collapse v-model="activeNames" @click="b">
        <van-collapse-item name="2">
          <template #title>
            <div>
              <van-icon name="arrow-down" v-if="this.isShowCollapse2" />
              <van-icon name="arrow" v-else />
              收藏的歌单<span class="count"
                >( {{ this.songCount.subPlaylistCount }} )</span
              >
            </div>
          </template>
          <template #right-icon>
            <svg
              t="1663661055979"
              class="icon svg"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="12001"
              width="200"
              height="200"
            >
              <path
                d="M512 814.545455c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z m0-232.727273c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z m0-232.727273c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z"
                fill=""
                p-id="12002"
              ></path>
            </svg>
          </template>
          <!-- 只渲染私人雷达歌单 -->
          <span class="per">官方动态歌单</span>
          <div
            class="playList"
            v-for="item in this.playList"
            :key="item.id"
            @click="intoPlayList(item.id)"
          >
            <div
              v-show="
                userList.profile.nickname !== item.creator.nickname &&
                item.creator.nickname === '云音乐私人雷达'
              "
            >
              <img :src="item.coverImgUrl" alt="" />
              <div>
                <span class="listName">{{ item.name }}</span>
                <span class="number"
                  >{{ item.trackCount }}首 by {{ item.creator.nickname }}</span
                >
              </div>
              <svg
                t="1663661055979"
                class="icon svg"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="12001"
                width="200"
                height="200"
              >
                <path
                  d="M512 814.545455c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z m0-232.727273c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z m0-232.727273c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z"
                  fill=""
                  p-id="12002"
                ></path>
              </svg>
            </div>
          </div>
          <!-- 渲染其他歌单 -->
          <span class="pub">其他歌单</span>
          <div
            class="playList"
            v-for="item in this.playList"
            :key="item.id"
            @click="intoPlayList(item.id)"
          >
            <div
              v-show="
                userList.profile.nickname !== item.creator.nickname &&
                item.creator.nickname !== '云音乐私人雷达'
              "
            >
              <img :src="item.coverImgUrl" alt="" />
              <div>
                <span class="listName">{{ item.name }}</span>
                <span class="number"
                  >{{ item.trackCount }}首 by {{ item.creator.nickname }}</span
                >
              </div>
              <svg
                t="1663661055979"
                class="icon svg"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="12001"
                width="200"
                height="200"
              >
                <path
                  d="M512 814.545455c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z m0-232.727273c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z m0-232.727273c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z"
                  fill=""
                  p-id="12002"
                ></path>
              </svg>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ref } from 'vue'
import {
  getUserMore,
  getUserSongList, loginStatus
} from '@/request/api/home'
import TopNav from '@/components/home/TopNav.vue'

export default {
  data () {
    return {
      isShowCollapse1: true,
      isShowCollapse2: true,
      songCount: {
        createdPlaylistCount: '',
        subPlaylistCount: ''
      },
      playList: {}
    }
  },
  setup () {
    const activeNames = ref(['1', '2'])
    return { activeNames }
  },
  computed: {
    ...mapState(['userList', 'detailShow'])

  },
  async mounted () {
    // const res1 = await loginStatus(localStorage.getItem('cookie'))
    // console.log(localStorage.getItem('cookie'))
    // console.log(res1)
    // this.userList = res.data.profile
    // const uid = this.userList.profile.userId
    // console.log('this.userList', this.userList.profile.userId)
    // 获取歌单数量信息
    // const res = await getUserMore(localStorage.getItem('cookie'))
    // console.log(localStorage.getItem('cookie'))
    const res = await getUserMore(localStorage.getItem('cookie'))
    this.songCount = res.data
    // 获取用户的歌单
    const res2 = await getUserSongList(this.userList.profile.userId)
    this.playList = res2.data.playlist
  },
  methods: {
    a: function () {
      this.isShowCollapse1 = !this.isShowCollapse1
    },
    b: function () {
      this.isShowCollapse2 = !this.isShowCollapse2
    },
    ab: function () {
      alert(1)
    },
    intoPlayList: function (id) {
      this.$router.push({
        path: '/itemMusic',
        query: {
          id: id
        }
      })
    }
  }
}
</script >

<style lang="less" scoped>
.TopNav {
  position: fixed;
  width: 100%;
  z-index: 999;
  top: 0;
  opacity: 1 !important;
  background-color: white;
}
.space {
  height: 0.97rem;
  width: 100%;
}
.fixed {
  //   position: fixed;
  //   transform: translateY(0.97rem);
  //   width: 100%;
  .userTop {
    // position: fixed;
    // margin-top: 0.97rem;
    width: 100%;
    height: 4.46rem;
    border-bottom: 0.215rem solid rgb(246, 246, 246);

    .userTopContent {
      // position: fixed;
      height: 100%;
      padding: 0 0.2rem 0 0.2rem;
      div {
        height: 25%;
        // border-bottom: 0.01rem solid rgb(177, 177, 177);
        display: flex;
        // margin: auto;

        .icon {
          color: rgb(77, 77, 77);
          height: 0.486rem;
          width: 0.468rem;
          margin: 0.222rem;
          margin-right: 0.54rem;
        }
        .text {
          width: 100%;
          height: 100%;
          font-size: 0.302rem;
          padding: 0.374rem;
          padding-left: 0;
          align-items: center;
          border-bottom: 0.01rem solid rgb(177, 177, 177);
        }
        .t2 {
          border-bottom: 0;
        }
      }
    }
  }
  .van-cell__title {
    // position: fixed;
    // display: flex;
    div {
      font-size: 0.34rem;
      font-weight: 550;
    }
  }
  .add {
    position: relative;
    font-weight: 750;
    font-size: 0.318rem;
    top: 0.08rem;
    right: 0.315rem;
  }
  .svg {
    position: relative;
    font-weight: 550;
    font-size: 0.318rem;
    right: 0;
  }
  .count {
    margin-left: 0.1832rem;
    font-size: 0.1594rem;
    position: relative;
    top: -0.08rem;
    font-weight: 100 !important;
    color: rgb(166, 166, 166);
  }
  .per,
  .pub {
    margin-top: 0.334rem;
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
}
</style>
