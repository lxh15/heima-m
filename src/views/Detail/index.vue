<template>
  <div class="container">
    <!-- 头部导航 -->
    <van-nav-bar class="navbar" title="黑马头条" left-arrow>
      <template #left>
        <van-icon name="arrow-left" @click="back"></van-icon>
      </template>
    </van-nav-bar>
    <!-- 标题 -->
    <div class="nav">{{ detailList.title }}</div>

    <!-- 内容区域 -->
    <main>
      <!-- 个人信息栏 -->
      <div class="author">
        <div class="avator">
          <van-image width="38" height="38" round :src="detailList.aut_photo" />
        </div>

        <div class="text">
          <div class="name">{{ detailList.aut_name }}</div>

          <div class="time">3年前</div>
        </div>

        <!-- 未关注 -->
        <div class="follow1" v-if="isFollowed">
          <button>
            <span class="followtext" @click="noFollowFn(detailList.aut_id)"
              >已关注</span
            >
          </button>
        </div>

        <!-- 关注 -->
        <div class="follow" v-else>
          <button>
            <span class="add">＋</span>
            <span class="followtext" @click="followFn(detailList.aut_id)"
              >关注</span
            >
          </button>
        </div>
      </div>
    </main>

    <!-- 文章详情 -->
    <div class="article-container article-detail">
      <!-- 文章内容 -->
      <div
        class="article-content markdown-body"
        v-html="detailList.content"
      ></div>
    </div>

    <!-- 正文结束 -->
    <div class="hr"><van-divider>正文结束 </van-divider></div>

    <!-- 评论区域 -->
    <commentList></commentList>

    <!-- 弹出层 -->

    <Popup ref="popup"></Popup>

    <!-- 分享 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />

    <!-- 底部 -->
    <footer>
      <div class="left">
        <div class="content" @click="showpopup">写评论</div>
      </div>

      <div class="right">
        <div class="icon">
          <div class="num">0</div>
          <van-icon name="comment-o" />
        </div>
        <!-- 收藏 -->
        <div class="icon">
          <van-icon v-if="isCollected" name="star" @click="noCollected" />
          <van-icon v-else name="star-o" @click="collected" />
        </div>
        <!-- 点赞 -->
        <div class="icon">
          <van-icon v-if="isShow" name="good-job" @click="noLikings" />
          <van-icon v-else name="good-job-o" @click="likings" />
        </div>
        <!-- 分享按钮 -->
        <div class="icon">
          <van-icon name="share" @click="showShare = true" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import {
  getArticlesDetail,
  userFollowing,
  deleteFollow,
  collections,
  noCollections,
  likings,
  noLikings,
  comments
} from '@/Apis'

// 引入want组件的图片预览函数
import { ImagePreview } from 'vant'

import '@/assets/styles/news.css'
import commentList from './components/commentList.vue'
import Popup from './components/Popup.vue'
export default {
  data () {
    return {
      imgAllList: [],
      detailList: {},
      isFollowed: false, // 关注
      isCollected: false, // 收藏
      isShow: false, // 点赞
      id: this.$route.params.id,
      showShare: false, // 分享
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ]
    }
  },
  components: {
    commentList,
    Popup
  },
  created () {
    // 初始获取文章详情
    this.getArticlesDetail()
    // 获取评论列表
    this.comments()
  },
  methods: {
    // 获取文章详情
    async getArticlesDetail () {
      // 轻提示
      // this.$toast.loading({ message: '加载中...', forbidClick: true })
      const { data } = await getArticlesDetail(this.id)
      this.detailList = data.data
      console.log(this.detailList)
      // 赋值状态
      this.isFollowed = this.detailList.is_followed // 关注
      this.isCollected = this.detailList.is_collected // 收藏
      // console.log(this.detailList)

      // $nextTick 等数据渲染完页面，再执行该事件
      this.$nextTick(() => {
        const imgAll = document.querySelectorAll('img')
        this.imgAllList = imgAll
        // console.log(this.imgAllList)
        // 把图片地址添加到数组中
        const images = []
        this.imgAllList.forEach((item, index) => {
          images.push(item.src)
          // 循环添加点击事件  和添加图片地址
          item.onclick = () => {
            ImagePreview({ images, startPosition: index, closeable: true })
          }
        })
      })
    },
    // 获取评论
    async comments () {
      const res = await comments('a', this.id)
      console.log(res)
    },
    // 按钮回退
    back () {
      this.$router.go(-1)
    },
    // 点击关注
    async followFn (id) {
      await userFollowing(id)
      try {
        this.$toast.success('关注')
        this.isFollowed = !this.isFollowed
        console.log(this.detailList)
      } catch (error) {
        this.$toast.fail('关注失败，请重试')
      }
      // console.log(res.status)
    },
    // 点击取消关注
    async noFollowFn (id) {
      try {
        await deleteFollow(id)
        this.$toast.success('取消关注')
        this.isFollowed = !this.isFollowed
      } catch (error) {
        this.$toast.fail('取消失败，请重试')
      }
    },
    // 收藏
    async collected () {
      try {
        await collections(this.id)
        this.isCollected = !this.isCollected
        this.$toast.success('收藏')
      } catch (error) {
        this.$toast.fail('收藏失败，请重试')
      }
    },
    // 取消收藏
    async noCollected () {
      try {
        await noCollections(this.id)
        this.isCollected = !this.isCollected
        this.$toast.success('取消收藏')
      } catch (error) {
        this.$toast.fail('取消收藏失败，请重试')
      }
    },
    // 点赞
    async likings () {
      try {
        const res = await likings(this.id)
        console.log(res)
        this.isShow = !this.isShow
        this.$toast.success('点赞')
      } catch (error) {
        this.$toast.fail('点赞失败，请重试')
      }
    },
    // 取消点赞
    async noLikings () {
      try {
        const res = await noLikings(this.id)
        console.log(res)
        this.isShow = !this.isShow
        this.$toast.success('取消点赞')
      } catch (error) {
        this.$toast.fail('取消点赞失败，请重试')
      }
    },
    showpopup () {
      this.$refs.popup.show = true
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.container {
  margin-bottom: 160px;
}

// 头部导航栏
.navbar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon-arrow-left {
    color: #fff;
  }
}
.nav {
  font-size: 0.53333rem;
  font-weight: bolder;
  padding: 53.3336px 34.1336px;
  color: #3a3a3a;
  margin-top: 92px;
}
main {
  width: 100%;
  .author {
    display: flex;
    width: 100%;
    height: 90px;
    .avator {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 1;
      height: 100%;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex: 3.5;
      height: 100%;
      font-size: 20px;
      .name {
        margin-left: 22px;
      }
      .time {
        margin-left: 22px;
        color: #b7b7b7;
      }
    }
    .follow {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 2;
      height: 100%;
      button {
        height: 62px;
        width: 2.3rem;
        border-radius: 31px;
        background-color: #3296fa;
        display: flex;
        font-size: 30px;
        align-items: center;
        justify-content: center;
        color: #fff;
        border: none;
        padding-right: 30px;
        .add {
          padding-bottom: 8px;
          margin-top: 5px;
          font-size: 50px;
          font-weight: 100;
        }
      }
    }

    .follow1 {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 2;
      height: 100%;
      > button {
        height: 62px;
        width: 2.3rem;
        border-radius: 31px;
        // background-color: #3296fa;
        background-color: #fff;
        border: 1px solid #eee;
        color: #323233;
        padding: 10px 20px;
        display: flex;
        font-size: 30px;
        align-items: center;
        justify-content: center;
        // color: #fff;
        // border: none;
      }
    }
  }
}

.article-container {
  padding: 40px;
}
.article-content {
  line-height: 60px;
}
// 底部
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 88px;
  display: flex;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .left {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center; // background-color: pink;
    .content {
      width: 278px;
      height: 46px;
      border: 1px solid #eee;
      border-radius: 23px;
      text-align: center;
      line-height: 46px;
      font-size: 30px;
      color: #a7a7a7;
    }
  }
  .right {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex: 1.2;
    text-align: center; // background-color: blue;
    .icon {
      flex: 1;
      position: relative;
      .num {
        position: absolute;
        top: -6px;
        right: 16px;
        width: 28px;
        height: 28px;
        background-color: #e22829;
        border-radius: 50%;
        text-align: center;
        line-height: 28px;
        font-size: 24px;
        color: #fff;
        z-index: 1;
      }
      .van-icon {
        font-size: 40px;
        color: #777;
      }
      .van-icon-good-job:before,
      .van-icon-star:before {
        color: #3296fa;
      }
    }
  }
}
</style>
>
