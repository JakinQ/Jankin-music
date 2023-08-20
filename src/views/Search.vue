<template>
  <div>
    <div class="search">
      <!-- 返回 -->
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <!-- 搜索框 -->
      <input
        type="text"
        :placeholder="this.defaultWord"
        @keydown.enter="enterKey"
        v-model="searchKey"
      />
      <!-- 查看歌手 -->
      <div
        class="icon iconfont i icon-geshou"
        v-if="!isFalseShow"
        @click="this.$router.push('/singer')"
      ></div>
      <!-- 叉号 -->
      <svg
        @click="deleteKey"
        v-else
        t="1663161967054"
        class="icon i"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2391"
        width="200"
        height="200"
      >
        <path
          d="M557.3 512l329.3-329.4a32 32 0 1 0-45.2-45.2L512 466.7 182.6 137.4a32 32 0 1 0-45.2 45.2L466.7 512 137.4 841.4a31.9 31.9 0 0 0 0 45.2 31.9 31.9 0 0 0 45.2 0L512 557.3l329.4 329.3a31.9 31.9 0 0 0 45.2 0 31.9 31.9 0 0 0 0-45.2z"
          fill="#333333"
          p-id="2392"
        ></path>
      </svg>
    </div>
    <!-- 历史记录 -->
    <div class="searchHistory" v-show="isSearchShow">
      <div>
        <span class="searchSpan">历史记录</span>
        <svg class="icon" aria-hidden="true" @click="deleteHistory">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
      </div>

      <span>
        <span
          @click="searchHistory(item)"
          class="spanKey"
          v-for="item in keyWordList"
          :key="item"
          >{{ item }}</span
        >
      </span>
    </div>

    <!-- 搜索到的歌曲数据 -->
    <div class="itemList">
      <div class="noResult" v-if="!searchList">暂无{{ searchKey }}的结果</div>
      <!-- <div class="noResult" v-if="!searchList">暂无搜索结果</div> -->
      <div class="item" v-for="(item, i) in searchList" :key="i">
        <!-- 序号和歌名 -->
        <!-- 播放时不显示序号显示喇叭图标 -->
        <div class="left" @click="updateIndex(item, i)">
          <span class="index">{{ i + 1 }}</span>
          <div>
            <!-- 歌名和作者 -->
            <p>{{ item.name }}</p>
            <span v-for="(item2, i2) in item.ar" :key="i2">{{
              item2.name
            }}</span>
          </div>
        </div>
        <!-- mv和菜单 -->
        <div class="right">
          <!-- mv -->
          <svg class="icon bofang" aria-hidden="true" v-show="item.mvid">
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <!-- 列表 -->
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDefaultWord } from '@/request/api/item'
import { getSearchMusic, checkMusicFree } from '@/request/api/home'

import 'vant/es/toast/style'
// import { onBeforeMount } from 'vue'
import { mapMutations, mapState } from 'vuex'
// import { Toast } from 'vant'
export default {

  data () {
    return {
      // 历史记录数组
      keyWordList: [],
      // 输入框值
      searchKey: '',
      // 输入框默认值
      defaultWord: '',
      // 判断是否显示历史记录
      isSearchShow: true,
      // 判断显示歌手还是叉号
      isFalseShow: false,
      // 搜索列表
      searchList: []
    }
  },
  async mounted () {
    // 获取默认搜索值
    const res = await getDefaultWord()
    this.defaultWord = res.data.data.realkeyword
    // console.log('搜索值:', res.data.data.realkeyword)
    // 当渲染完界面
    this.keyWordList = JSON.parse(localStorage.getItem('keyWordList')) || []
    // 判断localStorage里面的keyWordList是否为空，如果为空，那么历史记录不存在，则不显示历史记录栏目
    if (!localStorage.getItem('keyWordList')) {
      this.isSearchShow = false
    }

    // console.log(this.keyWordList)
    this.isFalseShow = false
  },
  updated () {
    if (this.keyWordList === []) {
      this.isSearchShow = false
    }
  },
  methods: {
    ...mapMutations(['updatePerFm']),
    // 搜索歌曲事件
    enterKey: async function () {
      // const xss = require('xss')
      // const option = {} // 自定义设置
      // const myxss = new xss.FilterXSS(option)
      // this.searchKey = myxss.process(this.searchKey)
      // const html = this.searchKey
      // document.write(html)
      // alert(line2)
      // 如果没输入就回车，则搜索默认值
      if (!this.searchKey) {
        this.keyWordList.push(this.defaultWord)
      } else { this.keyWordList.unshift(this.searchKey) }

      // 搜索数据去重
      this.keyWordList = [...new Set(this.keyWordList)]
      // 储存到浏览器
      localStorage.setItem('keyWordList', JSON.stringify(this.keyWordList))

      // 发送请求获取搜索数据
      const res = await getSearchMusic(this.searchKey)
      // console.log(res)
      // 获得数据
      this.searchList = res.data.result.songs
      //   this.searchList = res.data.result.songs
      console.log(this.searchList)
      // 置空搜索框
      //   this.searchKey = ''
      // 显示历史记录
      this.isSearchShow = true
      // 显示叉号
      this.isFalseShow = true
      // 如果获取到了数据，就隐藏搜索记录
      if (this.searchList) {
        this.isSearchShow = false
      }
      // this.isSearchShow = false
    },
    // 在历史记录搜索歌曲
    searchHistory: async function (item) {
      // 发送请求获取搜索数据
      const res = await getSearchMusic(item)
      //   console.log(res)
      this.searchList = res.data.result.songs
      // 如果获取到了数据，就隐藏搜索记录
      if (this.searchList) {
        this.isSearchShow = false
      } else {
        this.$toast({
          message: item + '暂无版权,无法查看',
          position: 'midlle',
          duration: 1000
        })
      }
      //   console.log(res)
    },

    // 删除历史记录
    deleteHistory: function () {
      localStorage.removeItem('keyWordList')
      this.keyWordList = []
      this.isSearchShow = false
    },
    // 删除输入框值
    deleteKey: function () {
      this.searchKey = ''
      //   this.isSearchShow = true
      this.isFalseShow = false
    },
    // 点击搜索到的歌曲,加入列表
    updateIndex: function (item, i) {
      this.updatePerFm(false)

      // 检测是否是vip
      const check = checkMusicFree(this.searchList[i].fee)
      if (!check) {
        return this.$toast({
          message: 'vip歌曲,无法免费播放',
          position: 'midlle',
          duration: 1000
        })
      }

      //   console.log(this.searchList)
      // console.log('改变前的列表', this.itemList)

      this.$store.commit('pushItemList', item)
      this.$store.commit('updateplayListIndex', this.$store.state.itemList.length - 1)
    }
  },
  computed: {
    ...mapState(['itemList'])
  }
}
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 1rem;
  padding: 0.6134rem 0.343rem 0.2rem 0.343rem;
  display: flex;
  align-items: center;
  div {
    width: 100%;
    display: flex;
    margin-top: 0.5736rem;
  }
  .icon {
    width: 0.462rem;
    height: 0.462rem;
    margin-right: 0.343rem;
  }
  input {
    font-size: 0.2868rem;
    color: rgb(176, 176, 176);
    margin: left 0.2rem;
    border: none;
    border-bottom: 0.0175rem solid rgb(132, 132, 132);
    width: 76.4%;
    padding-left: 0.1rem;
    padding-bottom: 0.215rem;
    margin-right: 0.129rem;
    //文本溢出用...省略
    text-overflow: ellipsis;
  }
  .i {
    position: fixed;
    font-size: 0.482rem;
    margin: 0 0.343rem 0 0rem;
    right: 0;
    color: black;
  }
}

.searchHistory {
  margin: 0.932rem 0 0 0;
  width: 100%;
  padding-left: 0.3664rem;

  position: relative;
  div {
    margin-bottom: 0.398rem;

    .searchSpan {
      font-size: 0.278rem;
      font-weight: 550;
    }
    .icon {
      position: absolute;
      width: 0.3664rem;
      height: 0.3664rem;
      right: 0.403rem;
    }
  }
  span::-webkit-scrollbar {
    display: none; //移除滚动条
  }
  span {
    overflow: scroll; //溢出滚动
    white-space: nowrap; //限定一行

    .spanKey {
      padding: 0.1912rem;
      margin-right: 0.1912rem;
      font-size: 0.2868rem;
      background-color: rgb(242, 242, 242);
      border-radius: 0.4rem;
    }
  }
}

.itemList {
  width: 100%;
  padding: 0.3664rem;
  .noResult {
    color: rgb(152, 152, 151);
    width: 100%;
    text-align: center;
    margin: 0.2rem;
    margin-top: 0.5rem;
  }
  .item {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;
      .index {
        display: inline-block;
        width: 0.2rem;
        text-align: center;
      }
      div {
        p {
          width: 4.54rem;
          height: 0.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 400;
        }
        span {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
        }
        margin-left: 0.3rem;
      }
    }
    .right {
      width: 20%;
      height: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      position: relative;
      .icon {
        fill: #999;
      }
      .bofang {
        position: absolute;
        left: 0;
        height: 0.4rem;
        width: 0.44rem;
      }
      .liebiao {
        font-size: 0.44rem;
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
