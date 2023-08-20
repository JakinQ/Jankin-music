<template>
  <div>
    <!-- 菜单栏 -->
    <div class="topNav">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>

      <div class="topContent" style="font-weight: 700">
        <span>排行榜</span>
      </div>
    </div>
    <div style="font-size: 0.36rem; padding: 0.2rem; font-weight: 700">
      榜单推荐
    </div>
    <!-- 九宫格榜单 -->
    <div class="grid">
      <div class="grid-item" v-for="item in command" :key="item.id">
        <!-- 图片框 -->
        <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
          <div class="image-box">
            <img :src="item.coverImgUrl" alt="图片" />
            <span>{{ item.updateFrequency }}</span>
          </div>
          <!-- 名字 -->
          <div class="name">{{ item.name }}</div>
        </router-link>
      </div>
    </div>

    <!-- 官方榜 -->
    <div style="font-size: 0.36rem; padding: 0.2rem; font-weight: 700">
      官方榜
    </div>
    <div class="rankings-container">
      <div class="ranking" v-for="ranking in rankings" :key="ranking.id">
        <router-link :to="{ path: '/itemMusic', query: { id: ranking.id } }">
          <div class="ranking-header">
            <img :src="ranking.coverImgUrl" alt="Ranking Image" />
            <span>{{ ranking.updateFrequency }}</span>
          </div>
        </router-link>

        <div class="ranking-list">
          <div
            class="ranking-item"
            v-for="(song, index) in ranking.tracks"
            :key="index"
          >
            <div class="ranking-song">
              {{ index + 1 }}.{{ song.first }}-{{ song.second }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 曲风榜 -->
  <div style="font-size: 0.36rem; padding: 0.2rem; font-weight: 700">
    曲风榜
  </div>
  <div class="grid">
    <div class="grid-item" v-for="item in styleList" :key="item.id">
      <!-- 图片框 -->
      <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
        <div class="image-box">
          <img :src="item.coverImgUrl" alt="图片" />
          <span>{{ item.updateFrequency }}</span>
        </div>
        <!-- 名字 -->
        <div class="name">{{ item.name }}</div>
      </router-link>
    </div>
  </div>
  <!-- 全球榜 -->
  <div style="font-size: 0.36rem; padding: 0.2rem; font-weight: 700">
    全球榜
  </div>
  <div class="grid">
    <div class="grid-item" v-for="item in globeList" :key="item.id">
      <!-- 图片框 -->
      <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
        <div class="image-box">
          <img :src="item.coverImgUrl" alt="图片" />
          <span>{{ item.updateFrequency }}</span>
        </div>
        <!-- 名字 -->
        <div class="name">{{ item.name }}</div>
      </router-link>
    </div>
  </div>
  <!-- 语种榜 -->
  <div style="font-size: 0.36rem; padding: 0.2rem; font-weight: 700">
    语种榜
  </div>
  <div class="grid">
    <div class="grid-item" v-for="item in languageList" :key="item.id">
      <!-- 图片框 -->
      <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
        <div class="image-box">
          <img :src="item.coverImgUrl" alt="图片" />
          <span>{{ item.updateFrequency }}</span>
        </div>
        <!-- 名字 -->
        <div class="name">{{ item.name }}</div>
      </router-link>
    </div>
  </div>
  <!-- 其他 -->
  <div style="font-size: 0.36rem; padding: 0.2rem; font-weight: 700">
    其他榜单
  </div>
  <div class="grid" style="margin-bottom: 1.4rem">
    <div class="grid-item" v-for="item in other" :key="item.id">
      <!-- 图片框 -->
      <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
        <div class="image-box">
          <img :src="item.coverImgUrl" alt="图片" />
          <span>{{ item.updateFrequency }}</span>
        </div>
        <!-- 名字 -->
        <div class="name">{{ item.name }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { allList, allListDetail } from '@/request/api/list'

export default {
  name: 'Grid',
  data () {
    return {
      //   items: [
      //     { id: 1, name: 'Item 1', image: 'https://picsum.photos/id/1/200/200' },
      //     { id: 2, name: 'Item 2', image: 'https://picsum.photos/id/2/200/200' },
      //     { id: 3, name: 'Item 3', image: 'https://picsum.photos/id/3/200/200' }

      //   ],
      rankings: [

      ], // 官方榜
      command: [], // 推荐榜单
      languageList: [], // 语种榜
      styleList: [],
      globeList: [],
      other: []
    }
  },
  async mounted () {
    const res = await allListDetail()
    // console.log(res)
    // 筛选含有ToplistType的 官方榜
    const res2 = res.data.list.filter(item => Object.keys(item).includes('ToplistType'))
    // console.log(res)
    this.rankings = res2
    // 推荐榜
    this.command = res.data.list.filter(item => item.name === '赏音榜' || item.name === '云音乐说唱榜' || item.name === '云音乐ACG榜')
    // 筛选语种榜单
    this.languageList = res.data.list.filter(item => item.name.includes('语') || item.name.includes('欧美'))
    // 筛选曲风榜单
    this.styleList = res.data.list.filter(item => item.name.includes('云音乐') && !item.name.includes('欧美') && !item.name.includes('语'))
    // 筛选全球榜单
    this.globeList = res.data.list.filter(item => item.name.includes('美国') || item.name.includes('全球') || item.name.includes('日本') || item.name.includes('俄罗斯') || item.name.includes('法国') || item.name.includes('UK'))
    // 筛选剩下的
    this.other = res.data.list.filter(item => !this.languageList.includes(item) && !this.styleList.includes(item) && !this.globeList.includes(item) && !this.rankings.includes(item) && !this.command.includes(item))
    // console.log(this.other)

    //  this.rankings = res.data.list
    // console.log(this.rankings)
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.topNav {
  width: 100%;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  .topContent {
    margin-left: 0.4rem;
    transform: translateY(-0.04rem);
    color: black;
    width: 65%;
    height: 100%;
    font-size: 0.36rem;
  }
}
.grid {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.grid-item {
  width: 33.33%;
  //   text-align: center;
}
.image-box {
  width: 2.168rem;
  height: 2.168rem;
  padding-bottom: 80%;
  position: relative;
  margin: 0 auto;
}
.image-box img {
  border-radius: 0.0875rem;
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
  padding-left: 0.2rem;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  font-size: 0.29rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rankings-container {
  display: flex;
  flex-wrap: wrap;
}
.ranking {
  padding: 0.2rem;
  height: 2.36rem;
  width: 100%;
  display: flex;
}
.ranking-header {
  position: relative;
  width: 1.96rem;
  height: 100%;
}
.ranking-header img {
  width: 100%;
  height: 100%;
}

.ranking-header span {
  line-height: 0.25rem;
  padding: 0;
  font-size: 0.25rem;
  content: "";
  position: absolute;
  bottom: -0.02rem;
  left: -0.12rem;
  color: white;
  padding: 0.0875rem 0.175rem;
}
.ranking-list {
  flex: 1;
  padding-left: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.ranking-item {
  margin: 0.158rem 0 0.158rem 0;
  display: flex;
}

.ranking-song {
  flex: 1;
}
</style>
