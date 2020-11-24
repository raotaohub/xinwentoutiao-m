<template>
  <div class="user-profile">
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-text
      left-arrow
      @click-left="$router.back()"
    />
    <!-- accept 'image/*' 表示只能选择图片 -->
    <input
      type="file"
      ref="file"
      hidden
      accept="image/*"
      @change="onFileChange"
    />
    <van-cell center title="头像" is-link @click="$refs.file.click()">
      <van-image round fit="cover" width="36" height="36" :src="user.photo" />
    </van-cell>
    <van-cell
      center
      title="昵称"
      is-link
      :value="user.name"
      @click="isShowPopup = true"
    ></van-cell>
    <van-cell
      center
      title="性别"
      is-link
      :value="user.gender == 0 ? '男' : '女'"
      @click="isGenderPopup = true"
    ></van-cell>
    <van-cell
      center
      title="生日"
      is-link
      :value="user.birthday"
      @click="isBirthdayPopup = true"
    ></van-cell>
    <!-- 编辑昵称的弹出层 -->
    <van-popup
      v-model="isShowPopup"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!--如果父组件需要传递一个值给子组件，它被子组件 仅使用又要修改 通常我们如下写
      :name="user.name"
      @update-name="user.name = $event" 简写👇
          v-model="user.name"
          它 === :value="user.name" @input="user.name=$event"
          本质上依然是 父子组件通信 ，所以子组件$emit('input',xxx) 需要传''value''
        -->
      <!-- 但是在一个组件标签内只能用一次 v-model 此时可以使用 .sync 修饰符
      :gender="user.gender"
      @update-gender="user.gender = $event"  简写👇
          :gender.sync="user.gender" 子组件需在props:{声明接收} 修改@click="$emit('update:abc', 参)
      官方文档 https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6
      -->
      <update-data
        v-if="isShowPopup"
        v-model="user.name"
        @close="isShowPopup = !isShowPopup"
      ></update-data>
    </van-popup>

    <!-- 编辑性别 -->
    <van-popup v-model="isGenderPopup" position="bottom">
      <update-gender
        v-if="isGenderPopup"
        :gender.sync="user.gender"
        @close="isGenderPopup = !isGenderPopup"
      ></update-gender>
    </van-popup>
    <!-- 编辑生日 -->
    <van-popup v-model="isBirthdayPopup" position="bottom">
      <update-birthday
        v-if="isBirthdayPopup"
        :birthday.sync="user.birthday"
        @close="isBirthdayPopup = !isBirthdayPopup"
      ></update-birthday>
    </van-popup>
    <!-- 修改用户头像 -->
    <van-popup v-model="isPhotoPopup" position="bottom" style="height: 100%">
      <update-photo
        v-if="isPhotoPopup"
        :fileObj="fileObj"
        @close="isPhotoPopup = !isPhotoPopup"
        @update-fileObj="user.photo = $event"
      ></update-photo>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdateData from './component/update-data'
import UpdateGender from './component/update-gender.vue'
import UpdateBirthday from './component/update-birthday.vue'
import UpdatePhoto from './component/update-photo.vue'
export default {
  name: 'UserProfile',
  props: {},
  components: { UpdateData, UpdateGender, UpdateBirthday, UpdatePhoto },
  data() {
    return {
      user: {}, // 用户数据
      isShowPopup: false, // 昵称
      isGenderPopup: false, // 性别
      isBirthdayPopup: false, // 生日
      isPhotoPopup: false, // 头像
      fileObj: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    async loadUserProfile() {
      const { data } = await getUserProfile()
      // 把数据放到组件的 user 中
      this.user = data.data
    },

    // 修改头像的弹出层事件
    onFileChange() {
      // ♥♥♥♥♥1. 把Blob对象传递给子组件 用来展示该图
      // const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      const file = this.$refs.file.files[0]

      this.fileObj = file

      // 2. 打开弹出层
      this.isPhotoPopup = true
      // 清空 value 的值 不然选择相同的文件不会触发该 onchange 事件
      this.$refs.file.value = ''
    }
  },
  // 生命周期-创建完成（可以访问当前this实例）
  created() {
    this.loadUserProfile()
  },
  // 生命周期-挂载完成（可以访问DOM元素）
  mounted() {},
  // 生命周期-创建之前
  beforeCreate() {},
  // 生命周期-挂载之前
  beforeMount() {},
  // 生命周期-更新之前
  beforeUpdate() {},
  // 生命周期-更新之后
  updated() {},
  // 生命周期-销毁之前,
  beforeDestroy() {},
  // 生命周期-销毁完成
  activated() {}
}
</script>
<style lang='less' scoped>
/* @import url(); 引入公共css类 */
.van-popup {
  background: #f5f7f9;
}
</style>