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
      },
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
    idList: [],
    perFmList: [
      {
        album: { picUrl: '' },
        artists: { name: '' }
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
    showTopNav: true, // 在个人界面点击播放器时控制topnav显示
    cookie: 'MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_U=00B58339E04DF7BEFB0498E2DBF97E759E74558A1B480C418DEB2AE07F9508AD9040E791EC17CA1A7003F7410AA4DC3A8BC3009B1F3051B66D00074D2950383AE767EB8B2973FA232205DF71C6B9AE2B7F44FEF84600A185F333FA5FA4E877128B546DB37E0A07C1BE2A65D15F56610DF46647ADFB3140A6C1D4E8FA9232A2AECDD2D340CB494BE9851E486A8056AFB83949EF5096FF9B5A771E52316122078835E8254C96AC955B7D50C61A41A70E768CF14A1B56BEFDD112AA93E72C25DF9652; Max-Age=15552000; Expires=Wed, 14 Feb 2024 07:44:48 GMT; Path=/; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Fri, 18 Aug 2023 07:44:48 GMT; Path=/;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1497195337111; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/weapi/feedback; HTTPOnly;__csrf=617b135c54edbc7a707e0c3a40044f45; Max-Age=1296010; Expires=Sat, 02 Sep 2023 07:44:58 GMT; Path=/;;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1497195304115; Max-Age=2147483647; Expires=Wed, 05 Sep 2091 10:58:55 GMT; Path=/wapi/feedback; HTTPOnly',
    userList: {},
    isQianDao: false,
    followSinger: false,
    perFm: false,
    playMode: '列表循环',
    inVideoPage: false,
    movieIsPlaying: false,
    timeS: new Date().getTime() // 时间戳
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
    // 修改歌单信息  替换免费音乐
    updateItemList2: function (state, value) {
      state.itemList[value.index] = value.music
    },
    // 更新私人fm
    updatePerFmList: function (state, value) {
      state.perFmList = value
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
      // console.log(value)
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
    },
    // 更新登录状态
    updateIsLogin: function (state, value) {
      state.isLogin = value
    },
    // 更新cookie
    updateCookie: function (state, value) {
      state.cookie = value
    },
    // 更新用户列表
    updateUserList: function (state, value) {
      state.userList = value
      // console.log(state.userList)
    },
    // 更新用户列表
    updateQiandao: function (state, value) {
      state.isQianDao = true
      // console.log(state.userList)
    },

    // 更新播放/暂停状态
    updateFollowSinger: function (state, value) {
      state.followSinger = value
    },
    // 更新fm状态(是否在fm页面)
    updatePerFm: function (state, value) {
      state.perFm = value
    },
    // 更新播放模式
    updatePlayMode: function (state, value) {
      state.playMode = value
    },
    // 更新是否在 视频页面
    updateInVideoPage: function (state, value) {
      state.inVideoPage = value
    },
    updateIsFooterMusic: function (state, value) {
      state.isFooterMusic = value
    },
    updateMovieIsPlaying: function (state, value) {
      state.movieIsPlaying = value
    },
    updateIdList: function (state, value) {
      state.idList = value
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
    getLogin: async function (context, value) {
      const res = await getPhoneLogin(value)
      // console.log(res)
      return res
      // console.log(res)
    }
  },
  modules: {
  }
})
