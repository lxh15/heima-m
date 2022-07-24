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
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button type="primary" size="small">发布</van-button>
  </van-popup>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: ''
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
