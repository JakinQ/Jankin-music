<template>
  <div id="swiperTop">
    <van-swipe
      :autoplay="3000"
      lazy-render
      indicator-color="rgb(219, 130, 130)"
    >
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
// import axios from 'axios'
import { getBanner } from '@/request/api/home'
import { reactive, onMounted } from 'vue'
export default {
  setup () {
    const state = reactive({
      images: [
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'
      ]
    })
    onMounted(async () => {
      const res = await getBanner()
      state.images = res.data.banners
      //   console.log(res.data)
    })
    return { state }
  }
}

</script>

<style lang="less" scoped>
#swiperTop {
  margin-top: 1rem;
  .van-swipe {
    width: 100%;
    .van-swipe__track {
      .van-swipe-item {
        img {
          width: 100%;
          height: 3rem;
        }
      }
    }
  }
}
</style>
