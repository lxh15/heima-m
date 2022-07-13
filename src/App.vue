<template>
  <div>
    <!-- 一级路由 -->
    <router-view></router-view>
  </div>
</template>

<script>
import request from '@/utlis/request'
export default {
  data () {
    return {}
  },
  created () {
    console.log(request)
  }
}
</script>

<style scoped>
.login {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
}
</style>
