<template>
  <div>
    <!-- 点击屏幕往下拉 -->
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPage"
      success-text="刷新成功"
    >
      <!-- load事件 代表触底事件 offset 设置为0 滚动条到底部再去加载下一页 -->
      <van-list
        @load="loadNextPage"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了~~~"
        :error.sync="error"
        error-text="加载失败，点击重新加载"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/Apis'
//
import ArticleItem from './ArticleItem.vue'
export default {
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    ArticleItem
  },
  // 调用请求接口的方法
  created () {
    this.getArticleList()
  },
  methods: {
    // 调用请求接口的方法
    async getArticleList () {
      try {
        // console.log(this.id)
        // console.log(+new Date())
        const { data } = await getArticleList(this.id, new Date())
        // console.log(data)
        this.articles = data.data.results // 添加数据
        this.pre_timestamp = data.data.pre_timestamp // 时间戳 记录第一页的页码
      } catch (error) {
        // 获取状态码
        const status = error.response.status
        if (status) {
          throw new Error(error.response.data.message) // 错误提示
        } else {
          this.$toast.fail('获取文化列表失败,请刷新重试')
        }
      }
    },
    // 加载下一页的数据
    async loadNextPage () {
      try {
        // 模拟错误
        // if (Math.random() < 0.7) {
        //   throw new Error('出错了')
        // }
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // console.log(data)
        if (this.refreshLoading) {
          // 第n页的数据添加到数组中开头...数组解构一下
          this.articles.unshift(...data.data.results)
        } else {
          // 第n页的数据添加到数组中最后...数组解构一下
          this.articles.push(...data.data.results)
        }
        this.pre_timestamp = data.data.pre_timestamp // 记录时间戳方便加载下一页数据
      } catch (error) {
        this.error = true
      } finally {
        //   在try 和catch 后面  不管他俩谁执行  最后一定会执行finally
        this.loading = false // 是否已加载完成，加载完成后不再触发load事件
        this.refreshLoading = false // 是否已加载完成
      }
    }
  }
}
</script>

<style></style>
