<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar" title="登录" left-arrow>
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 注册 -->
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="用户名"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
        ><template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="密码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
        ><template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button round size="mini" class="code">发送验证码 </van-button>
        </template>
      </van-field>
      <!-- 提交表单 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/Apis/user'
export default {
  name: 'Login',
  data () {
    return { mobile: '', code: '' }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
      const res = login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon-cross {
    color: #fff;
  }
}
// 表单样式
.form {
  :deep(.van-field__label) {
    flex: 1;
    .toutiao {
      font-size: 40px;
    }
  }
  :deep(.van-field__value) {
    flex: 20;
  }
  .van-button--block {
    background-color: #6db4fb;
    border: none;
  }
  .code {
    background-color: #eee;
    padding: 0 10px;
    color: #666;
  }
}
</style>
