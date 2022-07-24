<template>
  <div @click="click(articleInfo.art_id)">
    <!-- 没有图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    />
    <!-- 一张图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <template>
        <van-image :src="articleInfo.cover.images[0]" />
      </template>
    </van-cell>

    <!-- 三张图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 3"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <template #label>
        <div>
          <van-image
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 引入dayjs
import dayjs from '@/utlis/dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleDesc () {
      const art = this.articleInfo
      const time = dayjs(art.pubdate).fromNow() // 转换一下多少年以前
      return `${art.aut_name} ${art.comm_count}评论 ${time}`
    }
  },
  methods: {
    click (id) {
      this.$router.push({
        path: '/detail/' + id
        // query: {
        //   id
        // }
      })
    }
  }
}
</script>

<style></style>
