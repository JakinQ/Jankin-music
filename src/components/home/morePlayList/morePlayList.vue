<template>
  <!-- <div class="bg" :style="`background: url(${this.swiperList[1].coverImgUrl})`"> -->
  <div>
    <img :src="bgUrl" alt="" class="bg" />
    <div class="topNav" v-if="!detailShow">
      <!-- 左边 -->
      <div class="left">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span style="font-weight: 700">歌单广场</span>
      </div>
    </div>
    <!-- 标签栏 -->
    <div class="tabs">
      <van-tabs
        v-model:active="active"
        class="downTop"
        lazy-render
        title-active-color="red"
        animated
        :change="changeTabs(active)"
      >
        <van-tab :title="tabsTitle[0]" title-style=" font-size: 0.3rem;">
          <div class="swiper">
            <div
              class="imgBox left masked-img"
              @click="handleClick($event, 'left')"
            >
              <div class="mask"></div>
              <span class="playCount">
                <i class="bi bi-play-fill icon"></i>
                {{ changeCount(this.swiperList[0].playCount) }}
              </span>
              <img
                id="image-bg"
                :src="this.swiperList[0].coverImgUrl"
                alt=""
                ref="left"
              />

              <i
                class="bi bi-play-circle-fill play2"
                @click="play(this.swiperList[0].id)"
              ></i>
              <p>{{ this.swiperList[0].name }}</p>
            </div>
            <div
              class="imgBox mid"
              @click="handleClick($event, 'mid')"
              ref="mid"
            >
              <span class="playCount">
                <i class="bi bi-play-fill icon"></i>
                {{ changeCount(this.swiperList[1].playCount) }}
              </span>
              <img :src="this.swiperList[1].coverImgUrl" alt="" />
              <i
                class="bi bi-play-circle-fill play"
                @click="play(this.swiperList[1].id)"
              ></i>
              <p>{{ this.swiperList[1].name }}</p>
            </div>
            <div
              class="imgBox right masked-img"
              @click="handleClick($event, 'right')"
              ref="right"
            >
              <div class="mask"></div>
              <span class="playCount">
                <i class="bi bi-play-fill icon"></i>
                {{ changeCount(this.swiperList[2].playCount) }}
              </span>
              <img id="image-bg" :src="this.swiperList[2].coverImgUrl" alt="" />
              <i
                class="bi bi-play-circle-fill play2"
                @click="play(this.swiperList[2].id)"
              ></i>
              <p>{{ this.swiperList[2].name }}</p>
            </div>
          </div>

          <div class="grid">
            <div class="grid-item" v-for="item in allList" :key="item.id">
              <!-- 图片框 -->

              <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
                <div class="image-box">
                  <span class="playCount">
                    <i class="bi bi-play-fill icon"></i>
                    {{ changeCount(item.playCount) }}
                  </span>

                  <img :src="item.coverImgUrl" alt="图片" />
                  <!-- <span>{{ item.updateFrequency }}</span> -->
                </div>
                <!-- 名字 -->
                <div class="name">{{ item.name }}</div>
              </router-link>
            </div>
          </div>
        </van-tab>
        <van-tab :title="tabsTitle[1]" title-style=" font-size: 0.3rem;">
          <div class="grid" style="margin-top: 0.4rem">
            <div class="grid-item" v-for="item in cloudList" :key="item.id">
              <!-- 图片框 -->
              <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
                <div class="image-box">
                  <span class="playCount">
                    <i class="bi bi-play-fill icon"></i>
                    {{ changeCount(item.playCount) }}
                  </span>
                  <img :src="item.coverImgUrl" alt="图片" />
                  <!-- <span>{{ item.updateFrequency }}</span> -->
                </div>
                <!-- 名字 -->
                <div class="name">{{ item.name }}</div>
              </router-link>
            </div>
          </div>
        </van-tab>
        <van-tab :title="tabsTitle[2]" title-style=" font-size: 0.3rem;">
          <div class="grid" style="margin-top: 0.4rem">
            <div class="grid-item" v-for="item in jpList" :key="item.id">
              <!-- 图片框 -->
              <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
                <div class="image-box">
                  <span class="playCount">
                    <i class="bi bi-play-fill icon"></i>
                    {{ changeCount(item.playCount) }}
                  </span>
                  <img :src="item.coverImgUrl" alt="图片" />
                  <!-- <span>{{ item.updateFrequency }}</span> -->
                </div>
                <!-- 名字 -->
                <div class="name">{{ item.name }}</div>
              </router-link>
            </div>
          </div>
        </van-tab>
        <van-tab :title="tabsTitle[3]" title-style=" font-size: 0.3rem;">
          <div class="grid" style="margin-top: 0.4rem">
            <div class="grid-item" v-for="item in acgList" :key="item.id">
              <!-- 图片框 -->
              <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
                <div class="image-box">
                  <span class="playCount">
                    <i class="bi bi-play-fill icon"></i>
                    {{ changeCount(item.playCount) }}
                  </span>
                  <img :src="item.coverImgUrl" alt="图片" />
                  <!-- <span>{{ item.updateFrequency }}</span> -->
                </div>
                <!-- 名字 -->
                <div class="name">{{ item.name }}</div>
              </router-link>
            </div>
          </div>
        </van-tab>
        <van-tab :title="tabsTitle[4]" title-style=" font-size: 0.3rem;">
          <div class="grid" style="margin-top: 0.4rem">
            <div class="grid-item" v-for="item in electronList" :key="item.id">
              <!-- 图片框 -->
              <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
                <div class="image-box">
                  <span class="playCount">
                    <i class="bi bi-play-fill icon"></i>
                    {{ changeCount(item.playCount) }}
                  </span>
                  <img :src="item.coverImgUrl" alt="图片" />
                  <!-- <span>{{ item.updateFrequency }}</span> -->
                </div>
                <!-- 名字 -->
                <div class="name">{{ item.name }}</div>
              </router-link>
            </div>
          </div>
        </van-tab>
        <van-tab :title="tabsTitle[5]" title-style=" font-size: 0.3rem;">
          <div class="grid" style="margin-top: 0.4rem">
            <div
              class="grid-item"
              v-for="item in easyListenList"
              :key="item.id"
            >
              <!-- 图片框 -->
              <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
                <div class="image-box">
                  <span class="playCount">
                    <i class="bi bi-play-fill icon"></i>
                    {{ changeCount(item.playCount) }}
                  </span>
                  <img :src="item.coverImgUrl" alt="图片" />
                  <!-- <span>{{ item.updateFrequency }}</span> -->
                </div>
                <!-- 名字 -->
                <div class="name">{{ item.name }}</div>
              </router-link>
            </div>
          </div>
        </van-tab>
        <van-tab :title="tabsTitle[6]" title-style=" font-size: 0.3rem;">
          <div class="grid" style="margin-top: 0.4rem">
            <div class="grid-item" v-for="item in popularList" :key="item.id">
              <!-- 图片框 -->
              <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
                <div class="image-box">
                  <span class="playCount">
                    <i class="bi bi-play-fill icon"></i>
                    {{ changeCount(item.playCount) }}
                  </span>
                  <img :src="item.coverImgUrl" alt="图片" />
                  <!-- <span>{{ item.updateFrequency }}</span> -->
                </div>
                <!-- 名字 -->
                <div class="name">{{ item.name }}</div>
              </router-link>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <i class="bi bi-border-all box" @click="selectPlayList"></i>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { getCatList, getPersonalized, getHot, getHighQuality, getPreMusic, getTop } from '@/request/api/morePlayList'

export default {
  data () {
    return {
      active: 0,
      tabsTitle: ['推荐', '官方', '日语', 'ACG', '电子', '轻音乐', '流行'],
      // list: [{
      //   src: './3.jpg'
      // }, {
      //   src: './2.png'
      // }, {
      //   src: './1.jpg'
      // }],

      bgUrl: '',
      // currentImage: 'middle'
      list: [{ coverImgUrl: '' }, { coverImgUrl: '' }, { coverImgUrl: '' }],
      swiperList: [{ coverImgUrl: './1.jpg' }, { coverImgUrl: './2.jpg' }, { coverImgUrl: './3.jpg' }],
      jpList: [{ coverImgUrl: '', name: '' }],
      acgList: [{ coverImgUrl: '', name: '' }],
      allList: [{ coverImgUrl: '', name: '' }, { coverImgUrl: '', name: '' }],
      cloudList: [{ coverImgUrl: '', name: '' }],
      popularList: [{ coverImgUrl: '', name: '' }],
      easyListenList: [{ coverImgUrl: '', name: '' }],
      electronList: [{ coverImgUrl: '', name: '' }],
      swiperList2: []
    }
  },
  computed: {
    ...mapState(['userList', 'detailShow'])

  },
  async created () {
    // const res = await getCatList()
    // console.log(res)
    // const res1 = await getHot()
    // console.log(res1)
    // const res = await getPersonalized()
    // console.log(res)
    const jp = await getTop('日语')
    // console.log(jp.data.playlists)
    this.jpList = jp.data.playlists
    this.updateArray(this.jpList)

    const acg = await getTop('ACG')
    this.acgList = acg.data.playlists
    this.updateArray(this.acgList)

    const all = await getTop('全部')
    this.list = all.data.playlists
    this.updateArray(this.list)

    this.allList = this.list
    // for (let i = 0; i < 3; i++) {
    //   this.swiperList[i] = this.list[i]
    // }
    this.swiperList[0] = this.list[0]
    this.swiperList[1] = this.list[1]
    this.swiperList[2] = this.list[2]

    this.bgUrl = this.swiperList[1].coverImgUrl
    this.updateArray(this.allList)
    const electron = await getTop('电子')
    this.electronList = electron.data.playlists
    this.updateArray(this.electronList)

    // console.log('cloudList', this.cloudList)
    const gf = await getTop('官方')
    this.cloudList = gf.data.playlists
    this.updateArray(this.cloudList)
    // console.log(this.cloudList)

    const easyListening = await getTop('轻音乐')
    this.easyListenList = easyListening.data.playlists
    this.updateArray(this.easyListenList)

    const popular = await getTop('流行')
    this.popularList = popular.data.playlists
    this.updateArray(this.popularList)

    // this.list.sort((a, b) => b.playCount - a.playCount)
  },
  methods: {
    // 处理图片分辨率
    addSuffix (array, suffix) {
      return array.map(item => {
        item.img1v1Url += suffix
        return item
      })
    },
    updateArray (array) {
      array = this.addSuffix(array, '?param=100y100')
    },
    changeTabs (index) {
      // tabsTitle: ['推荐', '官方', '日语', 'ACG', '电子', '轻音乐', '流行']
      switch (index) {
        case 0:
          this.bgUrl = this.swiperList[1].coverImgUrl
          break
        case 1:
          this.bgUrl = this.cloudList[0].coverImgUrl
          break
        case 2:
          this.bgUrl = this.jpList[0].coverImgUrl
          break
        case 3:
          this.bgUrl = this.acgList[0].coverImgUrl
          break
        case 4:
          this.bgUrl = this.electronList[0].coverImgUrl
          break
        case 5:
          this.bgUrl = this.easyListenList[0].coverImgUrl
          break
        case 6:
          this.bgUrl = this.popularList[0].coverImgUrl
          break
        default:
          break
      }
    },
    selectPlayList () {
      // console.log(1)
    },
    changeCount (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(0) + '亿'
      } else if (num >= 100000) {
        return (num / 10000).toFixed(0) + '万'
      } else { return num }
    },
    play (id) {
      this.$router.push({ path: '/itemMusic', query: { id: id } })
    },
    handleClick (e, name) {
      // console.log(e.target)
      // console.log(this.$refs[name].classList.contains('mid'))
      // console.log(this.swiperList)
      if (name === 'right') {
        const firstElement = this.swiperList.shift()
        this.swiperList.push(firstElement)
        // console.log(this.swiperList)
      }
      if (name === 'left') {
        this.swiperList.unshift(this.swiperList[this.swiperList.length - 1])

        this.swiperList.pop()
      }
      this.bgUrl = this.swiperList[1].coverImgUrl
    }

  },
  watch: {
    // 打开弹出层时候会出现问题，底下样式暴露在弹出层，除去该样式，修改层级
    detailShow: function () {
      if (this.detailShow === true) {
        document.getElementsByClassName('van-tabs__line')[0].style.zIndex = '0'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bg {
  position: absolute;
  width: 100%;
  height: 38%;
  z-index: 1;
  pointer-events: none;
  top: 0;
  opacity: 0.15;
  filter: blur(0.175rem);
}
.topNav {
  z-index: 2;
  top: 0;
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  position: fixed;
  //   padding: 0.2rem;
  .icon:last-of-type {
    fill: black;
  }
  .left {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    position: relative;
    align-items: center;
    margin: 0 0.2rem;
    span {
      font-weight: 400;
      font-size: 0.35rem;
      color: black;
    }
    .svg {
      height: 0.5rem;
      width: 0.5rem;
    }
    .i {
      font-size: 0.4rem;
      position: absolute;
      right: 0rem;
    }
  }
}
.tabs {
  margin-top: 1rem;
  // background-color: transparent;
  // pointer-events: none;

  width: 100%;
  display: flex;
  .downTop {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding-right: 0.28rem;
    margin-top: 0.2rem;
    // border-top-left-radius: 0.4rem;
    // border-top-right-radius: 0.4rem;
    img {
      width: 3.15rem;
      height: 3.15rem;
    }
  }
  .box {
    position: absolute;
    padding-top: 0.35rem;
    right: 3%;
    font-size: 0.35rem;
  }

  .swiper {
    margin: 0.2rem;
    margin-right: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
    .masked-img {
      position: relative;
    }

    .masked-img img {
      display: block;
    }

    .masked-img .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      opacity: 0.35;
    }

    .imgBox {
      border-radius: 0.1rem;
      width: 3.6rem;
      background-color: white;
      margin-top: 0.175rem;
      overflow: hidden;
      position: relative;
      .playCount {
        position: absolute;
        right: 0.3rem;
        color: white;
        padding: 0;
        padding-right: 0.1rem;

        .icon {
          font-size: 0.4rem;
        }
      }
      img {
        z-index: 2;
        width: 3.255rem;
        height: 3.255rem;
      }
      p {
        padding-left: 0.2rem;
        padding-right: 0.2rem;

        overflow: hidden;
        text-overflow: ellipsis;
        // white-space: nowrap;
        // word-wrap: break-word;
        // white-space: normal;
      }
      .play {
        position: absolute;
        font-size: 0.62rem;
        color: red;
        z-index: 3;
        right: 0.2rem;
        bottom: 1.2rem;
        border-radius: 50%;
      }
      .play2 {
        position: absolute;
        font-size: 0.62rem;
        color: red;
        z-index: 2;
        right: 0.55rem;
        bottom: 1rem;
        border-radius: 50%;
      }
    }
    .mid {
      margin-top: 0rem;
      height: 4.69rem;
      position: absolute;
      transform: translateX(48%);
      z-index: 3;
      box-shadow: 0 0.0175rem 0 #88888888;
      img {
        width: 3.6rem;
        height: 3.6rem;
      }
    }
    .left .right {
      background-color: white;
      // z-index: 10;
      padding-bottom: 0.175rem;
      opacity: 0.4;
      position: relative;
      background-image: url(./black.jpg);
    }
    .right {
      transform: translateX(0.15rem);
    }
  }
  .grid {
    margin-top: 1rem;
    margin-left: 0.07rem;

    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 1rem;
  }
  .grid-item {
    margin-bottom: 0.2rem;
    width: 33.33%;
    height: 3.325rem;
    //   text-align: center;
  }
  .image-box {
    width: 2.168rem;
    height: 2.168rem;
    padding-bottom: 80%;
    position: relative;
    margin: 0 auto;
    color: white;
    .playCount {
      position: absolute;
      top: 0;
      left: 0.9rem;
      z-index: 2;
      height: 0.5rem;
      // right: 0.3rem;
      color: white;
      padding: 0;
      .icon {
        font-size: 0.3rem;
      }
    }
  }
  .image-box img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .image-box span {
    line-height: 0.25rem;
    padding: 0;
    font-size: 0.24rem;
    content: "";
    position: absolute;
    bottom: -0.02rem;
    left: -0.12rem;
    color: white;
    padding: 0.0875rem 0.175rem;
  }
  .name {
    max-height: 0.78rem;
    padding-left: 0.1rem;
    margin-right: 0.05rem;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    font-size: 0.27rem;
    overflow: hidden;
    text-overflow: ellipsis;
    // white-space: nowrap;
  }
}
</style>

<style lang="less">
.van-tab--grow {
  //   flex: 1 0 auto;
  padding-right: 0.56rem !important;
}
.van-tabs__line {
  left: -0.1575rem;
}
.van-tabs__content {
  width: 100%;
}
.van-swipe-item {
  width: 3.535rem;
}
</style>
