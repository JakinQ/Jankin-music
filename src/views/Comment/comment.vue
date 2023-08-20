<template>
  <div>
    <div class="topNav">
      <div>
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>评论({{ this.MusicComment.total }})</span>
        <!-- <span v-if="this.type === 'song'"
          >评论({{ this.MusicComment.total }})</span
        > -->
        <!-- <span v-else-if="this.type === 'list'"
          >评论({{ this.listDetail.total }})</span
        >
        <span v-else>评论({{ this.MusicComment.total }})</span>-->
      </div>
    </div>
    <!-- 歌曲 -->
    <div class="songsInfo" v-if="this.type === 'song'">
      <div class="left">
        <img :src="songsDetail.al.picUrl" alt="" />
      </div>
      <div class="right">
        <p class="name">
          {{ songsDetail.name
          }}<span v-if="songsDetail.alia.length !== 0">
            ({{ songsDetail.alia[0] }})</span
          >
        </p>
        <div class="right_img">
          <div>
            <span v-for="(item, index) in songsDetail.ar" :key="item.id"
              >{{ item.name
              }}<span v-if="songsDetail.ar.length - 1 > index">/</span>
            </span>
            <i class="bi bi-chevron-compact-right icon" @click="details"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 专辑 -->
    <div class="songsInfo" v-else-if="this.type === 'album'">
      <div class="left">
        <img :src="albumDetail.picUrl" alt="" />
      </div>
      <div class="right">
        <p class="name">
          {{ albumDetail.name }}
        </p>
        <div class="right_img">
          <div>
            <span v-for="(item, index) in albumDetail.artists" :key="item.id"
              >{{ item.name
              }}<span v-if="albumDetail.artists.length - 1 > index">/</span>
            </span>
            <i class="bi bi-chevron-compact-right icon" @click="details"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 歌单 -->
    <div class="songsInfo" v-else>
      <div class="left">
        <img :src="listDetail.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <p class="name">
          {{ listDetail.name }}
        </p>
        <div class="right_img">
          <div>
            <span style="color: black">by </span>
            <span>{{ listDetail.creator.nickname }}</span>
            <i class="bi bi-chevron-compact-right icon" @click="details"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="top">
      <span class="a">评论区</span>
      <van-tabs
        v-model:active="active"
        lazy-render
        line-height="0"
        line-width="0"
        title-active-color="red"
        title-iniactive-color="Gray"
        sticky
        offset-top="110"
        @change="change()"
      >
        <van-tab
          id="disabled"
          title=""
          disabled
          style="color: black !important"
        ></van-tab>
        <van-tab title=" " disabled></van-tab>
        <van-tab title="" disabled></van-tab>
        <van-tab title=" " disabled></van-tab>
        <van-tab title=" " disabled></van-tab>
        <van-tab title=" " disabled></van-tab>
        <van-tab title=" " disabled></van-tab>
        <van-tab title=" " disabled></van-tab>
        <van-tab title=" " disabled></van-tab>
        <van-tab title=" " disabled></van-tab>

        <van-tab title="" disabled> </van-tab>
        <van-tab title="最热">
          <van-loading class="loading" size="1rem" type="spinner" v-if="loading"
            >加载中...</van-loading
          >
          <div
            class="commentList"
            v-for="(item, index) in HotComment"
            :key="index"
          >
            <!-- 头像 -->
            <!-- .user.avatarUrl .user.nickname .timeStr -->
            <img :src="item.user.avatarUrl" alt="" />
            <div>
              <p>
                {{ item.user.nickname }}
                <span
                  class="like"
                  @click="like(index)"
                  :class="this.liked[index] ? 'active' : ''"
                >
                  {{
                    this.liked[index] ? item.likedCount + 1 : item.likedCount
                  }}
                  <i
                    :class="this.liked[index] ? 'active' : ''"
                    class="bi bi-hand-thumbs-up-fill"
                  ></i>
                </span>
              </p>

              <span>{{ item.timeStr }}</span>

              <div class="content">
                {{ item.content }}
              </div>
              <div class="detail">
                100条回复 <i class="bi bi-chevron-right"></i>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="最新 ">
          <van-loading class="loading" size="1rem" type="spinner" v-if="loading"
            >加载中...</van-loading
          >
          <div
            class="commentList"
            v-for="(item, index) in newComment"
            :key="index"
          >
            <!-- 头像 -->
            <!-- .user.avatarUrl .user.nickname .timeStr -->
            <img :src="item.user.avatarUrl" alt="" />
            <div>
              <p>
                {{ item.user.nickname }}
                <span
                  class="like"
                  @click="like2(index)"
                  :class="this.liked2[index] ? 'active' : ''"
                >
                  {{
                    this.liked2[index] ? item.likedCount + 1 : item.likedCount
                  }}
                  <i
                    :class="this.liked2[index] ? 'active' : ''"
                    class="bi bi-hand-thumbs-up-fill"
                  ></i>
                </span>
              </p>

              <span>{{ item.timeStr }}</span>

              <div class="content">
                {{ item.content }}
              </div>
              <div class="detail">
                100条回复 <i class="bi bi-chevron-right"></i>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <Bottoms :id="this.$route.query.id" :type="boolType()"></Bottoms>
    <!-- <Bottoms id="489970551"></Bottoms> -->
  </div>
</template>

<script>
import Bottoms from './bottom.vue'
import { getMusicDetail, getHotComment, getMusicComment, getFloorComment, getAlbumComment, getPlaylistComment, getPlaylist, getAlbumInfo } from '../../request/api/comment'
export default {
  components: {
    Bottoms
  },
  data () {
    return {
      type: '', // 评论区类型
      active: 0,
      loading: false,
      listDetail: { name: '', coverImgUrl: '', creator: { nickname: '' } },
      albumDetail: {},
      songsDetail: {
        alia: [],
        al: {
          picUrl: ''
        },
        ar: []

      },
      MusicComment: {
        total: 0
      },
      HotComment: [{
        timeStr: '',
        user: {
          nickname: '',
          avatarUrl: ''
        }
      }],
      newComment: [{
        timeStr: '',
        user: {
          nickname: '',
          avatarUrl: ''
        }
      }],
      liked: [false],
      liked2: [false]

    }
  },
  async created () {
    // 33211444
    // 489970551
    // console.log(this.$route.query.isList)

    this.bool()
    if (this.$route.query.isList) {
      const detail = await getPlaylist(this.$route.query.id)
      // console.log(detail.data.playlist)
      this.listDetail = detail.data.playlist
      const Comment = await getPlaylistComment(this.$route.query.id, 200)
      // console.log(Comment.data)
      this.MusicComment.total = Comment.data.total
      this.HotComment = Comment.data.hotComments
      this.newComment = Comment.data.comments
    } else if (this.$route.query.isAlbum) {
      const detail = await getAlbumInfo(this.$route.query.id)
      this.albumDetail = detail.data.album
      // console.log(this.albumDetail)
      const Comment = await getAlbumComment(this.$route.query.id, 200)
      // console.log(Comment.data)
      this.MusicComment.total = Comment.data.total
      this.HotComment = Comment.data.hotComments
      this.newComment = Comment.data.comments
    } else {
      const detail = await getMusicDetail(this.$route.query.id)
      this.songsDetail = detail.data.songs[0]
      // console.log(this.songsDetail)
      const hot = await getHotComment(this.$route.query.id, 0, 100)
      // console.log(hot)
      this.HotComment = hot.data.hotComments
      const res2 = await getMusicComment(this.$route.query.id, 100)
      this.MusicComment = res2.data
      this.newComment = this.MusicComment.comments
    }
  },

  methods: {
    boolType () {
      if (this.$route.query.isList) {
        return 'list'
      } else if (this.$route.query.isAlbum) {
        return 'album'
      } else return 'song'
      // if()
      // this.type
    },
    // 判断是专辑还是歌曲或者歌单的评论区
    bool () {
      if (this.$route.query.isList) {
        this.type = 'list'
      } else if (this.$route.query.isAlbum) {
        this.type = 'album'
      } else this.type = 'song'
      // if()
      // this.type
    },
    change () {
      // console.log(this.active)
      // this.liked = []
    },
    details () {
      this.$router.go(-1)
    },
    like (index) {
      // console.log(index)
      this.liked[index] = !this.liked[index]
    },
    like2 (index) {
      // console.log(index)
      this.liked2[index] = !this.liked2[index]
    },
    async floorComment () {
      const res = await getFloorComment()
    }
  }
}
</script>

<style lang="less" scoped>
.topNav {
  position: fixed;
  background-color: white;
  width: 100%;
  z-index: 10;
  div {
    width: 100%;
    height: 100%;
    display: flex;
    //   justify-content: space-around;
    position: relative;
    align-items: center;
    margin: 0.2rem 0.2rem;
    span {
      margin-left: 0.2rem;
      font-weight: 570;
      font-size: 0.35rem;
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
.songsInfo {
  transform: translateY(1rem);
  padding: 0.2rem;
  display: flex;
  border-bottom: 0.175rem solid #f9f9f9;
  .left {
    width: 1.424rem;
    height: 1.424rem;
    position: relative;

    img {
      width: 1.424rem;
      height: 1.424rem;
      border-radius: 0.2rem;
      position: absolute;
      z-index: -1;
    }

    .icon {
      width: 0.26rem;
      height: 0.26rem;
      margin-top: -0.08rem;
      vertical-align: middle;
      color: black;
    }
  }
  .right {
    width: 68%;
    height: 1.424rem;
    // display: flex;
    flex-direction: column;
    padding-left: 0.2rem;

    //歌单名字
    .name {
      font-size: 0.34rem;
      // font-weight: 570;
      color: black;
      max-height: 0.875rem;
      overflow: hidden;
      text-overflow: ellipsis; /* 加省略号 */
      // font-family: "黑体";

      span {
        max-height: 0.875rem;
        overflow: hidden;
        text-overflow: ellipsis; /* 加省略号 */
      }
    }
    .right_img {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      .icon {
        position: absolute;
        right: 0.4rem;
        top: 0.4rem;
        height: 0.34rem;
        width: 0.22rem;
        color: #ababab;
      }

      //作者信息
      span {
        // color: rgb(146, 189, 224);
        color: #79b6e5;
        // font-weight: 570;
        font-size: 0.28rem;
      }
    }
  }
}
.top {
  margin: 0.2rem;
  transform: translateY(1rem);
  van-tabs {
    van-tab {
      // padding-right: 0 !important;
    }
  }
  .a {
    position: absolute;
    font-size: 0.24rem;
    z-index: 999;
    transform: translateX(0.2rem);
    transform: translateY(0.25rem);
  }
  // display: flex;
  span {
    height: 0.175rem;
    line-height: 0.175rem;
  }
}

.commentList {
  width: 100%;
  max-height: 5.9rem;
  display: flex;
  margin-right: 0.2rem;
  // justify-content: space-around;
  align-content: center;
  overflow: hidden;
  text-overflow: ellipsis; /* 加省略号 */
  // white-space: nowrap; /* 强制不换行 */
  img {
    margin: 0.2rem 0 0.2rem 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  div {
    height: 100%;
    width: 100%;
    margin: 0.2rem 0 0 0.2rem;
    padding-right: 0.2rem;

    p {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis; /* 加省略号 */
      white-space: nowrap; /* 强制不换行 */

      padding-top: 0.052rem;
      font-size: 0.27rem;
      font-weight: 400;
      margin-top: 0.05rem;
      margin-bottom: 0.05rem;
      .like {
        color: #989898;
        height: 0.32rem;
        font-size: 0.28rem;
        position: absolute;
        right: -71%;
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
    .content {
      margin: 0.2rem 0 0 0;
      padding: 0;
      width: 96%;
      max-height: 4.7rem;
      line-height: 1.6;
    }
    .detail {
      color: #79b6e5;
      font-size: 0.26rem;
      margin-left: 0;
      padding-bottom: 0.2rem;
      border-bottom: 0.0175rem solid #e8e7ec;
    }
  }
}
.active {
  color: red !important;
}
</style>
<style >
.van-tab--grow {
  padding-right: 0;
}
.van-toast {
  background-color: black;
  color: white;
}
</style>
