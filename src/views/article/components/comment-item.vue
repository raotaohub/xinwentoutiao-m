<template>
  <van-cell class="comment-item">
    <van-cell v-cloak center :title="item.aut_name">
      <span slot="label">{{ item.pubdate | datetime('MM:DD HH:mm') }}</span>
      <van-image
        slot="icon"
        width="36"
        height="36"
        round
        fit="cover"
        :src="item.aut_photo"
      />
      <van-button round size="small" type="primary" @click="onComment()">
        回复{{ item.reply_count }}
      </van-button>
    </van-cell>
    <van-cell>{{
      item.content
        ? item.content
        : '没有就只好显示我咯~,没有就只好显示我咯~,没有就只好显示我咯~'
    }}</van-cell>
  </van-cell>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    item: {
      type: [Object, Array],
      required: true
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    async onComment() {
      this.$emit('comment-update-popup', this.item)
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
.comment-item {
  .van-cell {
    padding: 0 !important;
    margin-bottom: 10px;
  }
  .van-cell__title {
    margin-left: 10px;
  }
}
</style>