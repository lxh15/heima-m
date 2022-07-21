<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
// 引入API
import { getSearchInterface } from '@/Apis'
// 引入本地储存的方法
// import storage from '@/utlis/storage'

export default {
  data () {
    return {
      loading: false,
      finished: false,
      page: 1,
      error: false,
      perPage: 10,
      list: []
    }
  },
  props: {
    keywords: {
      type: String,
      default: () => '',
      required: true // 必须项
    }
  },
  watch: {
    list: {
      handler () {}
    }
  },
  created () {
    this.getSearchInterface()
  },
  methods: {
    // 搜索框回车 发起请求
    async getSearchInterface () {
      // this.$parent.historyList.push(this.keywords)
      const { data } = await getSearchInterface(
        this.page,
        this.perPage,
        this.keywords
      )
      this.list = data.data.results

      // console.log(data)
    },
    // 滚动触底发起请求
    async onLoad () {
      try {
        this.page++
        const {
          data: { data }
        } = await getSearchInterface(this.page, this.perPage, this.keywords)
        // 返回的数据为空
        if (data.results.length === 0) {
          this.finished = true
          return
        }
        this.list.push(...data.results)
      } catch (error) {
        this.error = true // 出错的时候会提示
      } finally {
        this.loading = false // 当前状态为加载完毕
      }
    }
  }
}
</script>

<style></style>
