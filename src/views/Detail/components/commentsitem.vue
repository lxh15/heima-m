<template>
  <div>
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
      <van-icon
        slot="right-icon"
        :class="{ liking: item.is_liking }"
        name="good-job-o"
        @click="clickLiking(item)"
      >
        {{ item.like_count > 0 ? item.like_count : '赞' }}
      </van-icon>
    </van-cell>
    <!-- 回复弹出层 -->
    <ReplyPopup
      ref="reply"
      :comment="comment"
      :list="commentsReplyList"
    ></ReplyPopup>
  </div>
</template>

<script>
import dayjs from '@/utlis/dayjs'
import ReplyPopup from './replyPopup.vue'
import { commentsReply, likingComment, noLikingComment } from '@/Apis'
export default {
  name: 'commentsitem',
  data () {
    return {
      comment: {},
      commentsReplyList: [] // 评论回复的数组
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
    ReplyPopup
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
    // 获取评论回复
    async PopupFn (item) {
      const { data } = await commentsReply('c', item.com_id)
      this.commentsReplyList = data.data.results
      // console.log(this.commentsReplyList)

      this.comment = item
      // console.log(this.comment)
      this.$refs.reply.show = true
      if (data.data.results.length === 0 || data.data.results === []) {
        this.$refs.reply.finished = true
      }
    },
    // 点赞评论
    async clickLiking (item) {
      // console.log(item)

      if (!item.is_liking) {
        // console.log(typeof 1)
        await likingComment(item.com_id)
        // console.log(res)
        item.like_count++
        item.is_liking = true
      } else {
        await noLikingComment(item.com_id)
        // console.log(res)
        item.like_count--
        item.is_liking = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.liking {
  &:before {
    color: #3296fa;
    font-weight: bold;
  }
}
</style>
>
