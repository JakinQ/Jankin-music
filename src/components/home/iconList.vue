<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
        <span>每日推荐</span>
      </svg>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhibo"></use>
        <span>私人FM</span>
      </svg>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
        <span>歌单</span>
      </svg>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
        <span>排行榜</span>
      </svg>
    </div>
    <div class="iconItem">
      <div class="icon iconfont i icon-geshou"></div>
      <span>全部歌手</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.iconList {
  margin-top: 0.2rem;
  display: flex;
  width: 100%;
  height: 2rem;
  justify-content: space-around;
  align-items: center;
  .iconItem {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .i {
      font-weight: 900;

      font-size: .9rem;
      color: #fe0000;
      // background-color: #fe0000;
      // border-radius: 0.4rem;
    }
  }
  .icon {
    width: 1rem;
    height: 1rem;
  }
}
</style>
