<template>
  <div>
    <textarea
      v-model="comment"
      type="text"
      placeholder="千头万绪,落笔汇成评论一句"
      @focus="getFocus"
    />
    <button @click="submit">发送</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { comment } from '../../request/api/comment'
import { comment2, getVideoId } from '../../request/api/video'

export default {
  data () {
    return {
      comment: '',
      ids: '',
      mvOrVideo: ''
    }
  },
  async created () {
    const id = await getVideoId(this.$route.query.id)
    // const id = await getVideoId(14583606)
    if (!this.type) {
      if (id.data.code === 400) {
        this.ids = this.id
        this.mvOrVideo = 'mv'
      } else {
        this.ids = id.data.data
        this.mvOrVideo = 'video'
      }
    }
    // console.log(this.ids)
    // console.log(this.type)

    // console.log(this.$route.path)
  },
  computed: {
    ...mapState(['userList', 'timeS'])
  },
  methods: {
    // comment2
    getFocus () {
      if (JSON.stringify(this.userList) === '{}') { this.$router.push('/login') }
    },
    async submit () {
      if (JSON.stringify(this.userList) === '{}') { this.$router.push('/login') }

      //   t, type, content, id, type:0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
      if (this.mvOrVideo === 'mv') {
        const res = await comment2(1, this.comment, this.ids, 1, this.timeS)
        // console.log(res)
        if (res.data.code === 200) this.$toast('评论成功')
      } else if (this.mvOrVideo === 'video') {
        const res = await comment2(1, this.comment, this.ids, 5, this.timeS)
        // console.log(res)
        if (res.data.code === 200) this.$toast('评论成功')
      } else {
        if (this.type === 'song') {
          const res = await comment2(1, this.comment, this.$route.query.id, 0, this.timeS)
          // console.log(res)
          if (res.data.code === 200) {
            this.$toast('评论成功')
          }
        }
        if (this.type === 'album') {
          const res = await comment2(1, this.comment, this.$route.query.id, 3, this.timeS)
          //   console.log(res)
          if (res.data.code === 200) this.$toast('评论成功')
        }
        if (this.type === 'list') {
          const res = await comment2(1, this.comment, this.$route.query.id, 2, this.timeS)
          // console.log(res)
          if (res.data.code === 200) this.$toast('评论成功')
        }
      }
      this.comment = ''
    }
  },
  props: ['id', 'type']
}
</script>

<style lang="less" scoped>
div {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.98rem;
  background-color: white;
  textarea {
    height: 100%;
    padding: 0.1rem;
    padding-left: 0.2rem;
    padding-top: 0.3rem;
    border: none;
    font-size: 0.2625rem;
    width: 80%;
  }
  input {
    height: 100%;
    padding: 0.1rem;
    padding-left: 0.2rem;
    border: none;
    font-size: 0.2625rem;
    width: 80%;
  }
  button {
    font-size: 0.2625rem;
    background: none;
    border: none;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    cursor: pointer;
    color: #989898;
    position: absolute;
    right: 0.2rem;
    top: 25%;
  }
}
</style>
<style >
.van-toast {
  background-color: black;
  color: white;
}
</style>
