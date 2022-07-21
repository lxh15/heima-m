<template>
  <div>
    <!-- 头部搜索框 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="visibleSearchSuggestion"
        @cancel="backToPrePage"
        background="#3296fa"
        class="search"
      />
    </form>
    <!--搜索结果 / 历史 /建议  -->
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->
    <component
      :is="componentName"
      :keywords="keywords"
      :list="list"
      :historyList="historyList"
      @getVal="clickFn"
      @getHistory="getHistory"
    ></component>
  </div>
</template>

<script>
//
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
// 引入本地储存的方法
import storage from '@/utlis/storage'
export default {
  data () {
    return {
      keywords: '',
      isShowSearchResult: false,
      list: [], // 搜索的结果
      historyList: storage.get('historyList') || [], // 搜索的关键词
      page: 1,
      perPage: 10
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  computed: {
    componentName () {
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
    // 把搜索历史数组存在本地
  },
  methods: {
    // 回到上一页
    backToPrePage () {
      this.$router.go(-1)
    },
    // 搜索
    onSearch () {
      // 点击回车 显示搜索结果页面
      this.isShowSearchResult = true
      // 数组去重 并且存到本地
      const index = this.historyList.findIndex((ele) => ele === this.keywords)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(this.keywords)
      storage.set('historyList', this.historyList)
    },
    // 显示搜索建议
    visibleSearchSuggestion () {
      // 如果keywords 没有值 显示搜索历史
      // 如果keywords有值 显示搜索建议
      this.isShowSearchResult = false
    },
    // 点击搜索建议发送请求
    clickFn (val) {
      // 子组件点击传过来的值赋值给keywords
      this.keywords = val
      // 数组去重 并且存到本地
      const index = this.historyList.findIndex((ele) => ele === this.keywords)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(this.keywords)
      storage.set('historyList', this.historyList)

      // 点击 显示搜索结果页面
      this.isShowSearchResult = true
    },
    getHistory (val) {
      // 子组件点击传过来的值赋值给keywords
      this.keywords = val
      // 数组去重 并且存到本地
      const index = this.historyList.findIndex((ele) => ele === this.keywords)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(this.keywords)
      storage.set('historyList', this.historyList)

      // 点击显示搜索结果页面
      this.isShowSearchResult = true
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
>
