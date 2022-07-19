<template>
  <div class="my">
    <!-- 头部区域 -->
    <header>
      <!-- 登陆的头部盒子 -->
      <div v-if="isLogin" class="user-info banner">
        <!-- 占位盒子 -->
        <van-row></van-row>
        <!-- 用户的信息 -->
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <!--  -->
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button class="code-btn" size="mini" round
                >编辑资料
              </van-button>
            </van-row>
          </van-col>
        </van-row>
        <!--  -->
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }} </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }} </template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登陆的头部盒子 -->
      <div v-else class="login-registetr banner">
        <div class="warp" @click="loginFn">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="require('../../assets/images/mobile.png')"
          />
          <span>登录 / 注册</span>
        </div>
      </div>
    </header>

    <!-- 主体区域 -->
    <main>
      <!-- 历史/收藏 -->
      <div>
        <van-grid column-num="2" class="grid" clickable>
          <van-grid-item text="收藏">
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
            </template>
          </van-grid-item>
          <van-grid-item text="历史">
            <template #icon>
              <span class="toutiao toutiao-lishi"></span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 消息通知/小智同学 -->
      <div class="link">
        <van-cell title="消息通知" is-link></van-cell
        ><van-cell title="小智同学" is-link></van-cell>
      </div>
    </main>
    <!-- 底部退出按钮 -->
    <van-button v-if="isLogin" block class="login-btn" @click="logOut"
      >退出</van-button
    >
  </div>
</template>

<script>
// 引入API
import { getUserInfo } from '@/Apis/user'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    isLogin () {
      // 两个叹号代表把这个表达式转为布尔值 true或者false
      return !!this.$store.state.user.token
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    logOut () {
      // 弹出层确认
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否退出登录'
        })
        .then(() => {
          // 点击确认退出登录
          // 退出登录给token清空 传递一个空对象
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
          // console.log('用户取消')
        })
    },
    loginFn () {
      this.$router.push('/login')
    },
    async getUser () {
      // 如果用户登陆了 再去获取信息
      if (this.isLogin) {
        try {
          const {
            data: { data }
          } = await getUserInfo()
          this.userInfo = data //
          // console.log(this.userInfo)
        } catch (error) {
          this.$toast.fail('请重新登录')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.login-registetr {
  background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
  .warp {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .van-image {
      margin-bottom: 10px;
    }
    span {
      font-size: 40px;
    }
  }
}
// 用户
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 32px;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }
  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
// 主体区域
main {
  .grid {
    color: #646566; // 字体图标
    .toutiao {
      font-size: 0.6rem;
      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
  .link {
    margin: 10px 0;
  }
}
.login-btn {
  color: red;
}
</style>
>
