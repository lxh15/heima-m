<template>
  <div class="userInfo">
    <!-- 头部导航 -->
    <div class="emitnav">
      <van-nav-bar title="个人信息">
        <template #left>
          <van-icon name="arrow-left" @click="back" />
        </template>
      </van-nav-bar>
    </div>

    <!-- 头像弹出层 -->
    <van-popup v-model="imgShow" position="bottom" :style="{ height: '100%' }">
      <UserPopup
        :popup="popup"
        @cancel="cancel"
        @popupHidden="popupHidden"
      ></UserPopup>
    </van-popup>

    <!-- 上传文件 -->
    <input type="file" ref="file" hidden accept=".png,.jpg" />

    <van-cell title="头像" is-link>
      <template #default>
        <van-image
          round
          width="30px"
          height="30px"
          :src="user.photo"
          @click="$refs.file.click()"
        />
      </template>
    </van-cell>

    <!-- 编辑昵称弹出层 -->
    <van-popup
      class="popup-navbar"
      v-model="nameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 头部 -->
      <van-nav-bar
        class="popup-navbar"
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="nameShow = false"
        @click-right="saveEditName"
      ></van-nav-bar>
      <!-- 文本编辑区域 -->
      <van-field
        class="editNameArea"
        v-model.trim="user.nickname"
        placeholder="请输入新的昵称"
        type="textarea"
        maxlength="7"
        show-word-limit
      />
    </van-popup>

    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="nameShow = true"
    />

    <!-- 性别 弹出层  -->
    <van-popup v-model="sexShow" position="bottom" :style="{ height: '40%' }">
      <van-picker
        title="更改性别"
        show-toolbar
        :columns="columns"
        @cancel="sexShow = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-cell
      title="性别"
      is-link
      :value="user.gender == 1 ? '女' : '男'"
      @click="sexShow = true"
    />

    <!-- 生日 弹出层 -->
    <van-popup
      v-model="birthdayShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="birthdayShow = false"
        @confirm="birthdayEdit"
      />
    </van-popup>
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="birthdayShow = true"
    />
  </div>
</template>

<script>
import { getUserEmit, EditUserInfo } from '@/Apis'
import dayjs from '@/utlis/dayjs'
import UserPopup from './UserPopup.vue'
export default {
  data () {
    return {
      user: {
        nickname: '',
        gender: 0,
        photo: ''
      },
      imgShow: false, // 头像
      nameShow: false, // 昵称
      sexShow: false, // 性别
      birthdayShow: false, // 生日
      columns: ['男', '女'],
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: '',
      popup: ''
    }
  },
  components: {
    UserPopup
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户的信息
    async getUserInfo () {
      try {
        const { data } = await getUserEmit()
        // console.log(data.data)
        this.user = data.data
        this.currentDate = new Date(data.data.birthday)

        // console.log(this.user)
      } catch (error) {
        this.$toast.fail('获取失败')
      }
    },
    // 左侧图标回到上一级
    back () {
      this.$router.go(-1)
    },
    // 昵称保存
    async saveEditName () {
      try {
        await EditUserInfo({ name: this.user.nickname })
        // console.log(res)
        this.user.nickname = ''
        this.getUserInfo()
        this.nameShow = false
        this.$toast.success('更改昵称成功')
      } catch (error) {
        this.$toast.fail('更改昵称失败，请稍后重试')
      }
    },
    // 性别选择 点击完成按钮时触发
    async onConfirm (value, index) {
      try {
        await EditUserInfo({ gender: index })
        // console.log(res)
        this.getUserInfo()
        this.sexShow = false
        this.$toast.success('更改性别成功')
      } catch (error) {
        this.$toast.fail('更改性别失败，请稍后重试')
      }
    },
    // 更改生日
    async birthdayEdit (value) {
      try {
        const time = dayjs(value).format('YYYY-MM-DD')
        await EditUserInfo({ birthday: time })
        // console.log(res)
        this.getUserInfo()
        this.birthdayShow = false
        this.$toast.success('更改生日成功')
      } catch (error) {
        this.$toast.fail('更改生日失败，请稍后重试')
      }
    },
    cancel () {
      this.imgShow = false
    },
    fileFn () {
      // 获取上传文件
      const file = this.$refs.file.files[0]
      const imagUrl = window.URL.createObjectURL(file)
      this.imgShow = true
      console.log(imagUrl)
    },
    popupHidden () {
      this.imgShow = false
      this.getUserInfo()
    }
  },
  mounted () {
    // 监听输入框变化  拿到触发事件的元素
    this.$refs.file.addEventListener('change', (e) => {
      //   console.log(e.target.files[0])
      const file = e.target.files[0]
      //   file = URL.createObjectURL(file) // 将file对象转化为图片可识别的url
      const fr = new FileReader()
      fr.readAsDataURL(file)

      fr.onload = (e) => {
        this.popup = e.target.result
        // console.log(this.photo)
        this.imgShow = true
      }
    })
  }
}
</script>

<style lang="less" scoped>
.emitnav {
  :deep(.van-nav-bar__content) {
    background-color: #3296fa;
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
}
</style>
