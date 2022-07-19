<template>
  <!-- 弹出层 -->
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '99%' }"
    closeable
    close-icon-position="top-left"
  >
    <div class="popupMain">
      <!-- 我的频道 -->
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            class="edit-btn"
            round
            size="small"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '推荐' }}</van-button
          >
        </van-cell>
        <!--  -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            v-for="(item, index) in myChannels"
            :key="item.id"
            :text="item.name"
            :class="{ 'current-channel': item.name === '推荐' }"
            @click="delMychannel(item, index)"
          >
            <template #icon>
              <van-icon v-show="isEdit && item.name != '推荐'" name="cross" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <van-cell title=" 推荐频道" />
        <van-grid>
          <van-grid-item
            v-for="item in recommendChannels"
            :key="item.id"
            icon="plus"
            :text="item.name"
            @click="addMyChannel(item)"
          ></van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/Apis'
export default {
  name: 'EditChannelPopup',
  data () {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    myChannels: {
      type: Array,
      requried: true
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      const { data } = await getAllChannels()
      // console.log(data)
      this.allChannels = data.data.channels
    },
    // 删除频道
    delMychannel (channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        // console.log(1)
        return this.$emit('delMychannel', channel.id)
      }
      // 切换频道
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    // 添加频道
    addMyChannel (channel) {
      this.$emit('add-channel', { ...channel }) // ...运算符实现浅拷贝
    }
  },
  computed: {
    recommendChannels () {
      // 在所有的频道中 筛选掉 我的频道
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((i) => i.id === item.id)

        // 我的频道的id 和 所有的频道id是否相同
        // const result = this.myChannels.find((i) => i.id === item.id)
        // if (result) {
        //   return false
        // } else {
        //   return true
        // }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.current-channel {
  :deep(.van-grid-item__text) {
    color: #fd69b4;
  }
}
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }
  // 我的频道
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      background-color: #eee;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        .van-icon {
          font-size: 10px;
        }
        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
        }
      }
    }
  }

  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      .van-grid-item__icon {
        font-size: 0.5rem;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
