<template>
  <div class="post-comment">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="80"
      show-word-limit
    ></van-field>
    <van-button @click="onPost" :disabled="!message">发布</van-button>
  </div>
</template>

<script>
import { addComments } from '@/api/comment.js'
export default {
  name: 'postComment',
  props: {
    target: {
      type: [Object, Number, String],
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      default: null
    }
  },
  components: {},
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onPost() {
      const { data } = await addComments({
        // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
        target: this.target.toString(),
        // 评论内容
        content: this.message,
        // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        art_id: this.articleId ? this.articleId.toString() : null
      })
      console.log(data)
      this.$emit('updatePopup', data.data.new_obj)
      this.$toast('评论成功')
      this.message = ''
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
.post-comment {
  padding: 5px 12px;
  display: flex;
  align-items: center;
  .van-button {
    width: 68px;
  }
  /deep/.van-cell__value {
    border: 1px rgba(206, 206, 206, 0.521) solid;
    box-sizing: border-box;
  }
}
</style>