<template>
  <div class="img">
    <img style="margin-top: 60px" :src="popup" ref="img" width="100%" alt="" />
    <van-button type="default" class="left" @click="backUser">取消</van-button>
    <van-button type="default" class="right" @click="onConfirm"
      >完成</van-button
    >
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { userPopup } from '@/Apis'
export default {
  data () {
    return {
      // cropper: null
    }
  },
  props: {
    popup: {
      type: [String, Object],
      required: true
    }
  },

  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 视图控制-限制裁剪框不能超出图片的范围
      dragMode: 'move', // 拖拽图片模式-图片可移动
      aspectRatio: 1, // 设置裁剪框为固定的宽高比
      autoCropArea: 1, // 设置裁剪区域占图片的大小
      cropBoxMovable: false, // 是否可以拖拽裁剪框
      cropBoxResizable: false, // 是否可以改变裁剪框的尺寸
      background: false, // 是否在容器内显示网格状的背景
      movable: true // 是否可以移动图片
    })
  },
  methods: {
    backUser () {
      this.$emit('cancel')
    },
    onConfirm () {
      const fm = new FormData()
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        fm.append('photo', blob)
        this.userPopup(fm)
      })
    },
    async userPopup (fm) {
      const { data } = await userPopup(fm)
      // this.$parend.imgShow = false
      this.$emit('popupHidden')
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.img {
  width: 100%;
  height: 1334px;
  background-color: #000;
}
img {
  width: 100%;
}
.left {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: transparent;
  border: none;
  color: #fff;
}
.right {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: transparent;
  border: none;
  color: #fff;
}
</style>
>
