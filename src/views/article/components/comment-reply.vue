<template>
  <div class="comment-reply">
    <!-- 头部信息 -->
    <van-nav-bar :title="userCommentList.reply_count + '条回复'"></van-nav-bar>
    <!-- 当前评论项目 -->

    <comment-item :item="userCommentList"> </comment-item>
  </div>
</template>

<script>
import commentItem from './comment-item'
export default {
  name: 'CommentReply',
  props: {
    userCommentList: {
      type: Object,
      required: true
    }
  },
  components: { commentItem },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
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
<style lang='' scoped>
/* @import url(); 引入公共css类 */
</style>