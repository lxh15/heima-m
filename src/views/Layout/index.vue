<template>
  <div>
    <!-- <h1>首页</h1> -->
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/home">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
        </template>
        首页
      </van-tabbar-item>

      <van-tabbar-item to="/video">
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
        </template>
        视频
      </van-tabbar-item>

      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="toutiao toutiao-wenda"></span>
        </template>
        问答
      </van-tabbar-item>

      <van-tabbar-item to="/profile">
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
        </template>
        <!-- 两个叹号代表把这个表达式转为布尔值 true或者false -->
        {{ !!$store.state.user.token ? '我的' : '未登录' }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
      // active: 0
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-tabbar) {
  .van-tabbar-item__text {
    font-size: 30px;
  }
  .toutiao {
    font-size: 40px;
  }
}
</style>
