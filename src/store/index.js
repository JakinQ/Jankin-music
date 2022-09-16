import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'

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
    musicChange: false, // 反映是否切换歌曲成功，如果不成功意味着点击了同一首，此时应该跳转到详情
    currentTime: 0, // 进度条时间
    duration: 0// 歌曲总时长

  },
  getters: {
  },
  mutations: {
    // 更新播放/暂停状态
    updateIsPlaying: function (state) {
      state.isPlaying = !state.isPlaying
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
      console.log(state.detailShow)
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
    }
  },
  actions: {
    // 异步请求获取歌词数据
    getLyric: async function (context, value) {
      const res = await getMusicLyric(value)
      // console.log(res)
      context.commit('updateLyricList', res.data.lrc)
    }
  },
  modules: {
  }
})
