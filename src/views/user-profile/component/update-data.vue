<template>
  <div class="update-data">
    <van-nav-bar
      class="app-nav-bar"
      title="修改昵称"
      left-text="返回"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="data-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="10"
        placeholder="请输入留言"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name: 'Update-data',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  components: {},
  data() {
    return {
      localName: this.value
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '修改中',
        forbidclick: true
      })

      try {
        // 请求接口 提交更新用户昵称
        await updateUserProfile({
          name: this.localName
        })

        // 更新成功 修改父组件中的 namm
        // this.$emit('update-name', this.localName)
        this.$emit('input', this.localName)

        // 关闭当前弹出层
        this.$emit('close')

        this.$toast.success('保存成功')
      } catch (error) {
        if (error && error.response && error.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  },
  // 生命周期-创建完成（可以访问当前this实例）
  created() {},
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
.update-data {
  /deep/.app-nav-bar {
    color: #000000 !important;
    background: #ffffff !important;
    .van-nav-bar__title {
      color: #000000 !important;
    }
  }
  .data-wrap {
    padding: 10px;
  }
}
</style>