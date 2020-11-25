<template>
  <div class="video-container">
    <van-nav-bar
      class="app-nav-bar"
      title="视频直播"
      left-text
      @click-left="$router.back()"
    />
  </div>
</template>

<script>
export default {
  name: 'Video',
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  beforeCreate() {},
  // 生命周期-创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {},
  // 生命周期-挂载完成（可以访问DOM元素）
  mounted() {},
  beforeUpdate() {},
  // 生命周期-更新之后
  updated() {},
  // keep-alive组件激活时
  activated() {
    this.$toast.loading({
      message: '模块功能开发中···',
      forbidclick: false,
      duration: 800
    })
  },
  // keep-alive组件停用时
  deactivated() {},
  // 生命周期-销毁之前,
  beforeDestroy() {},
  // 生命周期-销毁完成
  destroyed() {}
}
</script>
<style lang='' scoped>
/* @import url(); 引入公共css类 */
</style>