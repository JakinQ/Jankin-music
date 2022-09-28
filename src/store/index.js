import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'
import { getPhoneLogin } from '@/request/api/home.js'

export default createStore({
  state: {
    // 歌单列表里面的信息
    itemList: [
      {
        al: {
          id: 63263,
          name: '残酷な天使のテーゼ / FLY ME TO THE MOON',
          pic: 109951163549396160,
          picUrl: 'https://p1.music.126.net/45hISoQHiPTbPg9oapc7DQ==/109951163549396167.jpg',
          pic_str: '109951163549396167'
        },

        ar:
[
  {
    id: 17909,
    name: '高橋洋子',
    tns: [],
    alias: []
  }
],
        id: 657666,
        name: '残酷な天使のテーゼ'
      }
    ],
    playListIndex: 0, // 默认下标为0
    isPlaying: false, // 暂停播放按钮的显示
    detailShow: false,
    lyricList: {}, // 歌词
    tlyricList: {}, // 翻译后的歌词
    aboutLyric: {}, // 歌词的其他相关信息
    musicChange: false, // 反映是否切换歌曲成功，如果不成功意味着点击了同一首，此时应该跳转到详情
    currentTime: 0, // 进度条时间
    duration: 0, // 歌曲总时长
    isLogin: false, // 判断是否登录
    isFooterMusic: true, // 判断底部组件是否显示
    audioPlaying: true, // 播放器是否真的播放音乐
    cookie: 'MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_U=ec17cd46ae20806e489b21b54919d543aeddb5b57cf247416e07dd1ec4956a7a519e07624a9f00536127eba943566844f59aaaa79d646fd9d903412fde637e3dcb70d3bd2ce9bdd6a0d2166338885bd7; Max-Age=15552000; Expires=Sun, 26 Mar 2023 14:44:36 GMT; Path=/; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/api/feedback; HTTPOnly;__csrf=8daf8596af9b01c8982ca4be8d666972; Max-Age=1296010; Expires=Wed, 12 Oct 2022 14:44:46 GMT; Path=/;;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Tue, 27 Sep 2022 14:44:36 GMT; Path=/;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Sun, 15 Oct 2090 17:58:43 GMT; Path=/weapi/feedback; HTTPOnly',
    // cookie: 'MUSIC_R_T=1486980742819; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1486980588611; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1486980742819; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1486980588611; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1486980742819; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_A_T=1486980588611; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_R_T=1486980742819; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1486980588611; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1486980588611; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1486980588611; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1486980588611; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Sun, 18 Sep 2022 14:47:04 GMT; Path=/;MUSIC_R_T=1486980742819; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/wapi/feedback; HTTPOnly;__csrf=19cc7851286c84412a4a70b63f8f5605; Max-Age=1296010; Expires=Mon, 03 Oct 2022 14:47:14 GMT; Path=/;;MUSIC_A_T=1486980588611; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1486980588611; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1486980742819; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1486980742819; Max-Age=2147483647; Expires=Fri, 06 Oct 2090 18:01:11 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1486980742819; Max-Age',
    userList: {}
  },
  getters: {
  },
  mutations: {
    // 更新播放/暂停状态
    updateIsPlaying: function (state) {
      state.isPlaying = !state.isPlaying
    },
    // 更新音乐器实际播放状态
    updateAudioPlaying: function (state) {
      state.audioPlaying = !state.audioPlaying
    },
    // 更新歌单信息
    updateItemList: function (state, value) {
      state.itemList = value
    },
    // 更新index下标
    updateplayListIndex: function (state, value) {
      state.playListIndex = value
    },
    // 更新歌曲展示状态
    updatedetailShow: function (state) {
      state.detailShow = !state.detailShow
      // console.log(state.detailShow)
    },
    // 更新歌词
    updateLyricList: function (state, value) {
      state.lyricList = value
    },
    // 更新音乐状态
    updateMusicChange: function (state, value) {
      state.musicChange = value
    },
    updateCurrentTime: function (state, value) {
      state.currentTime = value
      // console.log(state.currentTime)
    },
    updateDuration: function (state, value) {
      state.duration = value
      // console.log(state.currentTime)
    },
    // 搜索到歌曲后插入到播放列表
    pushItemList: function (state, value) {
      state.itemList.push(value)
      console.log('push后的列表', state.itemList)
    },
    // 更新登录状态
    updateIsLogin: function (state, value) {
      state.isLogin = true
    },
    // 更新cookie
    updateCookie: function (state, value) {
      state.cookie = value
    },
    // 更新用户列表
    updateUserList: function (state, value) {
      state.userList = value
      // console.log(state.userList)
    }
  },
  actions: {
    // 异步请求获取歌词数据
    getLyric: async function (context, value) {
      const res = await getMusicLyric(value)
      // console.log(res)
      context.commit('updateLyricList', res.data)

      // context.commit('updateLyricList', res.data.lrc)
    },
    // 异步请求获取歌词数据
    getLogin: async function (context, value) {
      const res = await getPhoneLogin(value)
      // console.log(res)
      // context.commit('updateLyricList', res.data.lrc)
    }
  },
  modules: {
  }
})
