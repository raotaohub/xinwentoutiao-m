<template>
  <div class="comment-reply">
    <!-- 头部信息 -->
    <van-nav-bar :title="userCommentList.reply_count + '条回复'"></van-nav-bar>
    <!-- 当前评论项目 -->
    <comment-item :item="userCommentList"> </comment-item>
    <!-- 评论的评论组件，list是评论的评论的列表 list是其渲染的消息数组-->
    <comment-list
      :source="userCommentList.com_id"
      :type="'c'"
      :list="commentList"
    ></comment-list>
    <!-- 底部评论 -->
    <div class="article-bottom">
      <van-cell>
        <van-button slot="title" round size="small" @click="isShowPopup = true"
          >写评论
        </van-button>
      </van-cell>
    </div>
    <!-- 弹出层 -->
    <van-popup
      class="comment-popup"
      v-model="isShowPopup"
      closeable
      position="bottom"
      get-container="body"
    >
      <!-- 父组件监听 updatePopup 接收参数（新添加的评论）然后将参数添加到当前评论列表的第一项，完成评论完就添加到第一行的逻辑 -->
      <post-Comment
        :target="userCommentList.com_id"
        :articleId="articleId"
        @updatePopup="onPostSuccess"
      >
      </post-Comment>
    </van-popup>
  </div>
</template>

<script>
import commentItem from './comment-item'
import commentList from './comment-list'
import postComment from './post-comment'
export default {
  name: 'CommentReply',
  props: {
    userCommentList: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  },
  components: { commentItem, commentList, postComment },
  data() {
    return {
      isShowPopup: false,
      commentList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    onPostSuccess(comment) {
      this.commentList.unshift(comment)
      this.userCommentList.reply_count++
      this.isShowPopup = false
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
.comment-reply {
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    .van-button {
      width: 100%;
      height: 30px;
      margin-right: 20px;
      font-size: 14px;
    }
  }
}
</style>