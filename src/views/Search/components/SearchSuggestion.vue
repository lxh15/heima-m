<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightDate"
      :key="index"
      @click="click(index)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 引入API
import { getSearchSuggestions } from '@/Apis'
// 引入本地储存的方法
import storage from '@/utlis/storage'

export default {
  data () {
    return {
      suggestions: []
    }
  },
  props: {
    // 搜索建议
    keywords: {
      type: String
    }
  },
  watch: {
    // 监视属性绑定的函数 如果是methods里面的函数 支持字符串的写法  会自己去找
    keywords: {
      immediate: true, // 先执行一次 避免第一次输入不会发起请求
      handler () {
        this.getSearchSuggestions()
      }
    }
  },
  methods: {
    async getSearchSuggestions () {
      // 获取搜索建议 并处理数据
      // console.log(1)
      try {
        const res = await getSearchSuggestions(this.keywords)
        // 没有关键词的提示
        if (res.data.data.options.length === 0) {
          this.$toast.fail('暂无关键词')
        }
        this.suggestions = res.data.data.options.filter(Boolean) // filter(Boolean) 过滤掉那些假值
      } catch (error) {
        console.log(error)
      }
    },
    async click (index) {
      // console.log(item.length)
      // const item = this.suggestions[index]
      // this.keywords = item
      const val = this.suggestions[index]
      this.$emit('getVal', val)
      // 数组去重 并且存到本地
      const historyList = [...new Set(this.$parent.historyList.unshift(val))]
      if (val.trim() === '') return
      storage.set('historyList', historyList)
    }
  },
  computed: {
    // 计算符合搜索关键词 变颜色
    highlightDate () {
      const reg = new RegExp(this.keywords, 'gi') // 定义正则
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      )
    }
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
}
</style>
>
