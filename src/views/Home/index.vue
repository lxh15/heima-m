<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="标题" class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')"
          ><van-icon name="search" />搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- tabs选项卡 -->
    <van-tabs v-model="active" :swipeable="true">
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <!-- 把id传给复用子组件 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <!-- 更多的按钮 -->
      <span class="toutiao toutiao-gengduo" @click="ShowPopup"></span>
    </van-tabs>

    <!-- 弹出层 -->
    <EditChannelPopup
      ref="popup"
      :myChannels="myChannels"
      @delMychannel="delMychannelFn"
      @change-active="changeActive"
      @add-channel="addChannelFn"
    ></EditChannelPopup>
  </div>
</template>

<script>
import {
  getMyChannels,
  getMyChannelsByLocal,
  setMyChannelToLocal,
  delChannel,
  addMyChannel
} from '@/Apis/channels.js'
// 引入复用组件
import ArticleList from './component/ArticleList.vue'
import EditChannelPopup from './component/EditChannelPopup.vue'
export default {
  data () {
    return {
      active: 0,
      myChannels: []
    }
  },
  components: {
    ArticleList,
    EditChannelPopup
  },
  created () {
    // 获取频道列表
    this.getMyChannels()
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    // 获取频道列表
    async getMyChannels () {
      try {
        if (!this.isLogin) {
          const myChannels = getMyChannelsByLocal()
          if (myChannels) {
            this.myChannels = myChannels
          } else {
            const { data } = await getMyChannels()
            this.myChannels = data.data.channels
          }
        } else {
          // 如果你是登陆状态
          const { data } = await getMyChannels()
          this.myChannels = data.data.channels
        }

        // console.log(this.myChannels)
      } catch (error) {
        this.$toast.fail('请重新获取频道列表')
      }
    },
    // 弹出层
    ShowPopup () {
      this.$refs.popup.isShow = true
    },
    async delMychannelFn (id) {
      this.myChannels = this.myChannels.filter((item) => item.id !== id)
      if (!this.isLogin) {
        setMyChannelToLocal(this.myChannels)
      } else {
        //
        try {
          await delChannel(id) // 删除接口
        } catch (error) {
          return this.$toast.fail('删除用户频道失败')
        }
      }
      this.$toast.success('删除用户频道成功')
    },
    // 切换频道
    changeActive (active) {
      this.active = active
    },
    // 添加频道
    async addChannelFn (channel) {
      this.myChannels.push(channel)
      if (!this.isLogin) {
        //
        setMyChannelToLocal(this.myChannels)
      } else {
        //
        try {
          await addMyChannel(channel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加失败')
        }
      }
      this.$toast.success('添加频道成功')
    }
  }
}
</script>

<style lang="less" scoped>
// 头部导航
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0; /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    } /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
} /* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
// 头部固定的样式 .navbar { position: sticky; top: 0; left: 0; }
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}
:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
>
