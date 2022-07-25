<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar" title="登录" left-arrow>
      <template #left>
        <van-icon name="cross" @click="backToPrePage"></van-icon>
      </template>
    </van-nav-bar>
    <!-- 注册 -->
    <van-form ref="form" @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRulres"
        ><template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
        ><template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <!-- 验证码倒计时 -->
          <van-count-down
            v-if="isshow"
            :time="3 * 1000"
            @finish="isshow = false"
          />
          <!-- 验证码发送 -->
          <van-button
            v-else
            round
            size="mini"
            class="code"
            @click.prevent="sendCode"
            >发送验证码
          </van-button>
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
// 引入校验规则
import { mobileRulres, codeRules } from './rules'
// 引入请求接口
import { login, sendCode1 } from '@/Apis/user'
export default {
  name: 'Login',
  data () {
    return { mobile: '', code: '', mobileRulres, codeRules, isshow: false }
  },
  methods: {
    backToPrePage () {
      this.$router.back() // 返回上一次访问的地方
    },
    // 登录
    async onSubmit () {
      // 轻提示
      this.$toast.loading({ message: '正在努力冲锋...', forbidClick: true })
      try {
        // console.log(this.mobile, this.code)
        const res = await login(this.mobile, this.code)
        // console.log(res.data.data)
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/profile') // 跳转到profile
        this.$toast.success('登录成功') // 成功提示
      } catch (error) {
        // this.$toast.fail('登陆失败') // 失败提示
        const status = error.response.status
        let message = error.response.message
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)

        // console.log(status)
        // switch (status) {
        // case 400:
        //   this.$toast.fail('手机或验证码格式错误')
        //   break
        // case 507:
        //   this.$toast.fail('登陆失败，请刷新重试')
        //   break

        // default:
        //   this.$toast.fail('登陆失败，请刷新重试')
        //   break
        // }
      }
    },
    async sendCode () {
      try {
        await this.$refs.form.validate('mobile')
        await sendCode1(this.mobile)
        this.isCountDownShouw = true
      } catch (err) {
        // console.log(err)
        // 1. 表单校验失败
        if (!err.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = err.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(err.response.data.message)
          }
        }
      }
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
