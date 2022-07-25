<template>
  <div class="history">
    <!-- 搜索历史头部 -->
    <van-cell title="搜索历史">
      <template>
        <van-icon v-if="isShow" name="delete-o" @click="isShow = !isShow" />
      </template>
      <template>
        <span style="margin-right: 8px" v-if="!isShow" @click="delAll()"
          >全部删除</span
        >
        <span v-if="!isShow" @click="isShow = !isShow">完成</span>
      </template>
    </van-cell>
    <!-- 搜索历史的列表 -->
    <van-cell v-for="(item, index) in historyList" :key="index" class="cell">
      <template #title>
        <div @click="getList(item)">{{ item }}</div>
      </template>
      <van-icon name="close" v-if="!isShow" @click="delFn(item)" />
    </van-cell>
  </div>
</template>

<script>
// 引入本地储存的方法
import storage from '@/utlis/storage'

export default {
  data () {
    return {
      isShow: true,
      keyList: [],
      historyList: storage.get('historyList') || []
    }
  },

  methods: {
    delFn (item) {
      const historyList = this.historyList.filter((ele) => ele !== item)
      storage.set('historyList', historyList)
      this.$router.go(0) // 原地刷新
    },
    // 全部删除
    delAll () {
      storage.remove('historyList')
      this.$router.go(0) // 原地刷新
    },
    //
    getList (val) {
      // console.log(val)
      this.$emit('getHistory', val)
      // this.$parent.keywords = val
    }
  }
}
</script>

<style lang="less" scoped>
.history {
  background-color: #f5f7f9;
  height: calc(100vh);
  .van-cell {
    font-size: 50px;
    :deep(.van-icon:before) {
      font-size: 50px !important;
    }
  }
}
</style>
