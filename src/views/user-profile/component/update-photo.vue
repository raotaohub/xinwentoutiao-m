<template>
  <div class="update-photo">
    <van-nav-bar
      class="app-nav-bar"
      left-text="返回"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <img class="preview-img" :src="previewImage" ref="image" />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  props: {
    fileObj: {
      type: [Object, String, File],
      required: true
    }
  },
  components: {},
  data() {
    return {
      previewImage: window.URL.createObjectURL(this.fileObj),
      cropper: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    getCroppedCanvas() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    },
    async onConfirm() {
      this.$toast.loading({
        message: '正在保存',
        forbidclick: true
      })
      // FormData 接口提供了一种表示表单数据的键值对 key/value 的构造方式
      // 若接口要求为 Content-Type:multipart/form-data 则一定要提交 FormData 对象👈

      // 获得裁切后的 图像
      const file = await this.getCroppedCanvas()
      // 1. 构造一个 FormData 对象 👈
      const fd = new FormData()
      // 2. 添加一个属性 👈第1个参数 接口要求的数据名 第2个参数 传表单对象
      // fd.append('photo', this.fileObj)
      fd.append('photo', file)
      // 3. 发送请求 传送 FormData 对象👈
      // await updateUserPhoto(fd)
      await updateUserPhoto(fd)

      // 4. 更新父组件中的用户头像
      this.$emit('update-fileObj', window.URL.createObjectURL(file))

      this.$toast.success('保存成功')

      this.$emit('close')
    }
  },
  beforeCreate() {},
  // 生命周期-创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {},
  // 生命周期-挂载完成（可以访问DOM元素）
  mounted() {
    // 1. 获得DOM 在Vue中获得DOM 需要使用refs
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move', // 拖动模式
      aspectRatio: 1, // 比例
      cropBoxMovable: false, // 裁切框是否可以改变移动
      cropBoxResizable: false, // 裁切框是否可以改变大小
      background: false, // 背景
      movable: true // 是否可以移动
    })
  },
  beforeUpdate() {},
  // 生命周期-更新之后
  updated() {},
  // keep-alive组件激活时
  activated() {},
  // keep-alive组件停用时
  deactivated() {},
  // 生命周期-销毁之前,
  beforeDestroy() {},
  // 生命周期-销毁完成
  destroyed() {}
}
</script>
<style lang='less' scoped>
/* @import url(); 引入公共css类 */
.update-photo {
  height: 100vh;
  width: 100vw;
  /deep/.app-nav-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    color: #000000 !important;
    background: #ffffff !important;
    .van-nav-bar__title {
      color: #000000 !important;
    }
  }
  .preview-img {
    display: block;
    max-width: 100%;
  }
}
</style>