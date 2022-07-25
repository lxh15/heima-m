<template>
  <div>
    <!-- 回复的评论 -->
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 头部回复数量 -->
      <van-nav-bar>
        <template #title>
          {{
            comment.reply_count == 0
              ? '暂无回复'
              : `${comment.reply_count}条回复`
          }}
        </template>
      </van-nav-bar>

      <!-- 楼主 -->
      <van-cell>
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="comment.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ comment.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ comment.content }}</p>
          <p>
            <span style="margin-right: 10px"></span>

            <van-button size="mini" type="default">
              回复 {{ comment.reply_count }}
            </van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="good-job-o">
          {{ comment.like_count > 0 ? comment.like_count : '赞' }}
        </van-icon>
      </van-cell>
      <!-- 全部回复 -->
      <van-cell title="全部回复" />

      <!-- 对此评论的回复 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-cell v-for="(item, index) in list" :key="index">
          <van-image
            slot="icon"
            round
            width="30"
            height="30"
            style="margin-right: 10px"
            :src="item.aut_photo"
          />
          <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
          <div slot="label">
            <p style="color: #363636">{{ item.content }}</p>
            <p>
              <span style="margin-right: 10px">{{ time(item.pubdate) }}</span>

              <van-button size="mini" type="default" @click="PopupFn(item)">
                回复 {{ item.reply_count }}
              </van-button>
            </p>
          </div>
          <van-icon slot="right-icon" name="good-job-o">
            {{ item.like_count > 0 ? item.like_count : '赞' }}
          </van-icon>
        </van-cell>
      </van-list>

      <!-- 评论 -->

      <!-- 底部 -->

      <div class="foot">
        <van-button type="default" round @click="ejectPopup">评论</van-button>
      </div>
      <!--  -->
      <Popup ref="popupIsshow" :comment="comment"></Popup>
    </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utlis/dayjs'
import { commentsReply } from '@/Apis'
import Popup from './Reply_Popup.vue'
export default {
  name: 'replyPopup',
  data () {
    return {
      show: false,
      loading: false,
      finished: false,
      error: false
    }
  },
  props: {
    comment: {
      type: Object,
      default: () => ({}),
      required: true
    },
    list: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    Popup
  },
  computed: {
    // 格式化时间
    time () {
      return function (pubdate) {
        return dayjs(pubdate).fromNow()
      }
    }
  },
  methods: {
    async onLoad () {
      // 滚动加载下一页
      try {
        const offset = this.list[this.list.length - 1].com_id
        const { data } = await commentsReply('c', this.comment.com_id, offset)
        console.log(data.data.results)
        // 判断返回的数据是否为空
        if (data.data.results.length === 0 || data.data.results === []) {
          return (this.finished = true)
        }
        // 追加到数组
        this.$parent.commentsReplyList.push(...data.data.results)
        // console.log(this.$parent.commentsReplyList)
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    ejectPopup () {
      this.$refs.popupIsshow.show = true
    }
  }
}
</script>

<style lang="less" scoped>
// 底部
.foot {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 96px;
  background-color: #ff69b4;
  :deep(.van-button) {
    width: 640px;
    height: 80px;
  }
}
</style>
