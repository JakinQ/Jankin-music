<template>
  <div>
    <div class="top">
      <div class="left">
        <span style="font-size: 0.32rem; font-weight: 600">按发行时间排序</span>
      </div>
      <div class="right" @click="show()">
        <i class="bi bi-justify"></i>
        排序
      </div>
    </div>
    <van-overlay :show="overlayShow" @click="sort()">
      <div class="wrapper">
        <div class="block">
          <div @click="selectSortType(true)">
            按发行时间排序
            <van-icon v-if="select" class="icon" name="success" />
          </div>
          <div @click="selectSortType(false)">
            按热度排序 <van-icon v-if="!select" class="icon" name="success" />
          </div>
        </div>
      </div>
    </van-overlay>
    <div
      class="hotSinger"
      v-for="(item, index) in albumList.hotAlbums"
      :key="item.id"
      @click="getAlbumDetail(item.id, item.publishTime)"
      :class="{
        activeClass: index === albumList.hotAlbums.length - 1 ? true : false,
      }"
    >
      <img :src="item.blurPicUrl" alt="" />
      <div>
        <!-- 歌名 -->
        <p>
          {{ item.name }}
          <span v-if="item.transNames" style="font-size: 0.27rem">
            ({{ item.transNames[0] }})</span
          >
          <!-- <span>{{ tnsAndAlia(item) }}</span> -->
        </p>
        <span>
          {{ changeDate(item.publishTime) }} 歌曲 {{ item.size }}
          <!-- <span v-for="item2 in item.ar" :key="item2.id">
            {{ item2.name }} - {{ item.al.name }}
          </span> -->
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getAlbumDetail, getAlbumInfo } from '../../request/api/userDetail'
// import albumDetail from './albumDetail'

export default {
  props: ['albumList'],

  // components: {
  //   albumDetail

  // },
  data () {
    return {
      hotSongsM: [],
      overlayShow: false,
      select: true,
      albumDetail: {},
      time: 0
    }
  },
  async created () {
    // console.log('album', this.albumList.hotAlbums)
    // const album = await getAlbumDetail(this.$route.query.id)
    // console.log(album)
    // this.albumList = album.data
    this.updateArray(this.albumList.hotAlbums)
    // console.log(this.albumList.hotAlbums)
  },
  methods: {
    changeDate (time) {
      const date = new Date(time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const formattedDate = `${year}.${month}.${day}`
      this.time = formattedDate
      return formattedDate
    },

    sort () {
      this.overlayShow = false
    },
    async getAlbumDetail (id, time) {
      // const album = await getAlbumDetail(id)

      this.$router.push({
        path: '/albumDetail',
        query: {
          id: id,
          time: this.changeDate(time)
        }
      })

      // console.log(album)
      // alert(1)
    },
    selectSortType (bool) {
      this.select = bool
      if (bool) {
        // 时间排序
        // console.log('time')
      } else {
        // 热度排序
        // console.log('hot')
      }
      this.overlayShow = false
    },
    show () {
      this.overlayShow = true
    },
    updateArray (array) {
      array = this.addSuffix(array, '?param=100y100')
    },
    addSuffix (array, suffix) {
      return array.map(item => {
        item.blurPicUrl += suffix
        return item
      })
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
    position: absolute;
    transform: translateX(5.6rem);
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  //   align-items: center; /* 垂直居中 */
}

.block {
  display: flex;
  border-radius: 0.2rem;
  width: 6.3rem;
  height: 3.024rem;
  background-color: #fff;
  flex-direction: column;
  justify-content: center; /* 水平居中 */
  //   align-items: center;
  div {
    line-height: 0.9rem;
    margin: 0.2625rem;
    flex: 1;
    font-size: 0.2975rem;
  }
  .icon {
    color: red;
    position: absolute;
    right: 0.7rem;
    font-size: 0.43rem;
    transform: translateY(0.22rem);
  }
}
.activeClass {
  //最后一个专辑加一个margin防止被挡住
  margin-bottom: 1.1rem;
}
.hotSinger {
  width: 100%;
  height: 100%;
  display: flex;
  // justify-content: space-around;
  align-content: center;
  overflow: hidden;
  text-overflow: ellipsis; /* 加省略号 */
  white-space: nowrap; /* 强制不换行 */
  img {
    margin: 0.2rem 0 0.2rem 0;
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 10%;
  }
  div {
    width: 100%;
    margin: 0.2rem 0 0 0;
    position: absolute;
    transform: translateX(1.32rem);
    overflow: hidden;

    p {
      width: 88%;
      overflow: hidden;
      text-overflow: ellipsis; /* 加省略号 */
      white-space: nowrap; /* 强制不换行 */

      padding-top: 0.052rem;
      font-size: 0.27rem;
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
</style>
