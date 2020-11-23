<template>
  <!-- :default-index="defaultIndex" 显示被选中的索引 -->
  <div class="update-gender">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'

export default {
  name: 'UpdateGender',
  props: {
    gender: {
      type: Number
    }
  },
  components: {},
  data() {
    return {
      columns: ['男', '女'],
      defaultIndex: this.gender
    }
  },
  computed: {},
  watch: {},
  methods: {
    // vant-picker @change接口 获得选中的索引
    onChange(picker, value, index) {
      this.defaultIndex = index
    },
    async onConfirm() {
      this.$toast.loading({
        message: '修改中',
        forbidclick: true
      })

      // 请求接口 提交更新用户昵称
      await updateUserProfile({
        gender: this.defaultIndex
      })

      // 更新成功 修改父组件中的 namm
      // this.$emit('update-name', this.localName)
      this.$emit('update:gender', this.defaultIndex)

      // 关闭当前弹出层
      this.$emit('close')

      this.$toast.success('保存成功')
    }
  },
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
  activated() {},
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