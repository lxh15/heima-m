<template>
  <van-popup
    v-model="show"
    position="bottom"
    closeable
    :style="{ height: '20%' }"
    class="comment"
  >
    <!-- 输入框 -->
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="说点什么吧"
      show-word-limit
    />
    <van-button type="primary" size="small" @click="releaseFn">发布</van-button>
  </van-popup>
</template>

<script>
import { releaseComment } from '@/Apis'
// import { comments } from '@/Apis'
export default {
  name: 'Popup',
  data () {
    return {
      show: false,
      message: ''
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  methods: {
    async releaseFn () {
      try {
        // 点击发布评论 发布成功关闭弹出层
        await releaseComment(this.id, this.message)
        this.$toast.success('评论成功')
        this.show = false
        this.message = ''
        this.$parent.comments()
      } catch (error) {
        this.$toast.fail('评论失败，请重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
  // 输入框样式
  :deep(.van-cell) {
    width: 80%;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  //  按钮样式
  :deep(.van-button) {
    height: 200px;
    font-size: 32px;
  }
  .van-button--primary {
    color: #6ba3d8;
    background-color: #fff;
    border: none;
  }
}
</style>
