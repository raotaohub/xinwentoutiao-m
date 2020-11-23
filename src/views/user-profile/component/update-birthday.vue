<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    birthday: {
      type: [String, Number],
      required: true
    }
  },
  components: {},
  data() {
    return {
      minDate: new Date(1990, 5, 10),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.birthday)
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

      // 请求接口 提交更新用户昵称
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      await updateUserProfile({
        birthday: date
        // birthday: `${this.currentDate.getFullYear()}-${
        //   this.currentDate.getMonth() + 1
        // }-${this.currentDate.getDate}`
      })
      console.log(date)
      // 更新成功 修改父组件中的 birthday
      this.$emit('update:birthday', date)

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