<template >
  <div style="height: 100vh; overflow: scroll" @scroll="handleScroll($event)">
    <div class="top">
      <div class="left">
        <span style="font-size: 0.32rem; font-weight: 700"
          >全部
          <span style="left: 0.1rem; position: relative; bottom: 0.04rem"
            >(共{{ VideoCount }}个)</span
          ></span
        >
      </div>
      <div class="right">
        <i class="bi bi-justify"></i>
        <!-- 排序 -->
      </div>
    </div>
    <div
      class="videoList"
      @click="videoDetail(item.id, item.resource.mlogBaseData.type)"
      v-for="(item, index) in videoList.records"
      :key="item.id"
      :class="{
        activeClass: index === videoList.records.length - 1 ? true : false,
      }"
    >
      <img :src="item.resource.mlogBaseData.coverUrl" alt="" />
      <div class="right">
        <!-- 歌名 -->
        <p>
          {{ item.resource.mlogBaseData.text }}
          <!-- <span v-if="item.transNames" style="font-size: 0.27rem">
            ({{ item.transNames[0] }})</span
          > -->
        </p>
        <span>
          {{ changeDate(item.resource.mlogBaseData.pubTime) }}
          <!-- <span v-for="item2 in item.ar" :key="item2.id">
            {{ item2.name }} - {{ item.al.name }}
          </span> -->
        </span>
      </div>
    </div>
    <van-loading class="loading" size="1rem" type="spinner" v-if="loading"
      >加载中...</van-loading
    >
  </div>
</template>

<script >
// import Eplayer from 'https://unpkg.com/eplayer?module'
import { mapMutations, mapState } from 'vuex'

import { getVideo, getMv } from '../../request/api/video'

export default {
  props: ['VideoCount'],

  data () {
    return {
      cursor: 0,
      loading: false,
      videoList: {
        page: {},
        records: [

          {
            id: 0,
            resource: {
              mlogBaseData: {
                coverUrl: '',
                text: '',
                pubTime: ''
                // type:3为mv，2为普通视频
              }
            }
          }]
      },
      mvList: {}
    }
  },
  created () {

  },
  computed: {
    // ...mapState(['detailShow', 'movieIsPlaying'])
  },
  async mounted () {
    const timestamp = Date.now()
    const video = await getVideo(this.$route.query.id, this.cursor, 10, timestamp)
    // const video2 = await getVideo(this.$route.query.id, timestamp + 120000)
    this.videoList = video.data.data
    // const mv = await getMv(this.$route.query.id, 0, 20)
    // const video2 = await getVideo(this.$route.query.id, timestamp + 120000)
    // this.mvList = mv.data
    this.cursor = this.videoList.page.cursor

    // console.log(this.videoList)
  },
  methods: {
    ...mapMutations(['updateInVideoPage']),

    changeDate (time) {
      const date = new Date(time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const formattedDate = `${year}.${month}.${day}`
      this.time = formattedDate
      return formattedDate
    },
    videoDetail (id, type) {
      // console.log(type)
      // this.updateInVideoPage(true)
      document.getElementById('foot').style.zIndex = '-2'
      this.$router.push({ path: '/videoDetail', query: { id: id, type: type } })
    },
    async handleScroll (event) {
      // console.log(event.target.scrollHeight)
      // console.log(event.target.scrollTop)
      // console.log(event.target.clientHeight)
      const timestamp = Date.now()

      if (event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight + 1) {
        // console.log(event.target.scrollHeight)
        // console.log(event.target.scrollTop)
        this.loading = true
        const video2 = await getVideo(this.$route.query.id, this.cursor, 10, timestamp)
        this.cursor = parseInt(this.cursor) + parseInt(this.videoList.page.cursor) + ''
        for (let i = 0; i < video2.data.data.records.length; i++) {
          this.videoList.records.push(video2.data.data.records[i])
        }
        this.loading = false
        // console.log(video2.data.data)
        // console.log('--')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  color: black;
  font-family: "Microsoft YaHei";
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.25rem;
  padding-left: 0rem;

  .left {
    width: 3rem;
    height: 100%;
    display: flex;
    //   justify-content: space-between;
    align-items: center;
    .icon {
      stroke-width: 20;
      width: 0.46rem;
      height: 0.46rem;
      color: rgb(75, 76, 78);
      transform: translateX(-0.1rem);
    }
    span {
      span {
        font-weight: 400;
        color: rgb(149, 150, 152);
        font-size: 0.24rem;
      }
    }
  }
  .right {
    position: relative;
    transform: translateX(-0.25rem);
  }
}
.videoList {
  width: 100%;
  height: 1.9rem;
  display: flex;
  // justify-content: space-around;
  align-content: center;
  overflow: hidden;
  text-overflow: ellipsis; /* 加省略号 */
  white-space: nowrap; /* 强制不换行 */
  img {
    margin: 0.2rem 0 0.2rem 0;
    width: 2.66rem;
    height: 1.505rem;
    border-radius: 5%;
  }
  .right {
    width: 100%;
    height: 1.505rem;
    margin: 0.2rem 0 0 0.3rem; //上 右 下 左
    // position: absolute;
    // transform: translateX(3rem);
    align-items: center; /* 垂直居中 */
    line-height: 0.7525rem;
    overflow: hidden;

    p {
      width: 88%;
      overflow: hidden;
      text-overflow: ellipsis; /* 加省略号 */
      white-space: nowrap; /* 强制不换行 */

      padding-top: 0.052rem;
      font-size: 0.3rem;
      font-weight: 400;
      margin-top: 0.05rem;
      margin-bottom: 0.1rem;
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    span {
      width: 88%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.24rem;
      color: rgb(139, 139, 141);
    }
  }
}
.activeClass {
  //最后一个视频加一个margin防止被挡住
  margin-bottom: 1.1rem;
}
.loading {
  transform: translateY(-1rem);
  width: 4rem;
  margin: 0 auto;
  text-align: center;
}
</style>
