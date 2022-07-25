<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <CommentItem :list="list"></CommentItem>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <!-- <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group> -->
    <!-- /发布评论 -->
  </div>
</template>

<script>
// 引入item组件
import CommentItem from './commentsitem.vue'

import { comments } from '@/Apis/comment'
export default {
  name: 'comments',
  data () {
    return {
      loading: false,
      finished: false,
      error: false
    }
  },
  props: {
    list: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    CommentItem
  },
  methods: {
    async onLoad () {
      try {
        const id = this.$parent.id
        const lastId = this.list[this.list.length - 1].com_id
        const res = await comments('a', id, lastId)
        console.log(res.data.data.results)
        if (
          res.data.data.results.length === 0 ||
          res.data.data.results.length === []
        ) {
          return (this.finished = true)
        }
        this.$parent.commentslist.push(...res.data.data.results)
        // console.log(res.data.data.results)
      } catch (error) {
        this.error = true
      }
      // this.$emit('getcomment')

      // console.log(lastId)
      this.loading = false
    }
  }
}
</script>

<style></style>
