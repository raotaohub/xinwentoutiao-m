<template>
  <div v-cloak class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      left-arrow
      class="app-nav-bar"
      title="文章详情"
      @click-left="$router.back()"
    />
    <div class="article-wrap">
      <!-- 标题 -->
      <h2 class="title" v-html="articleDetails.title"></h2>
      <!-- 作者头像和名字 -->
      <van-cell v-cloak center :title="articleDetails.aut_name">
        <span slot="label">{{ articleDetails.pubdate | relativeTime }}</span>
        <van-image
          slot="icon"
          width="35"
          height="35"
          round
          fit="cover"
          :src="articleDetails.aut_photo"
        />
        <van-button
          round
          size="small"
          :loading="isFollowLoading"
          :icon="articleDetails.is_followed ? '' : 'plus'"
          :type="articleDetails.is_followed ? 'default' : 'info'"
          @click="onFollow"
        >
          {{ articleDetails.is_followed ? '已关注' : '关注' }}
        </van-button>
      </van-cell>
      <div
        class="markdown-body"
        v-html="articleDetails.content"
        ref="article-content"
      ></div>
      <!-- 评论 -->
      <comment-List
        @update-total-count="updateTotalCount = $event"
        @comment-update-popup="onCommentUpdate"
        :list="commentList"
        :source="articleId"
      ></comment-List>
    </div>
    <!-- 底部功能导航 -->
    <div class="article-bottom">
      <van-cell>
        <van-button slot="title" round size="small" @click="isShowPopup = true"
          >写评论
        </van-button>
        <van-icon name="comment-o" :badge="updateTotalCount" />
        <van-icon
          :loading="isCollectLoading"
          :color="articleDetails.is_collected ? 'orange' : '#777'"
          :name="articleDetails.is_collected ? 'star' : 'star-o'"
          @click="onStar"
        />
        <van-icon
          :loading="isLikingsLoading"
          :color="articleDetails.attitude == 1 ? 'red' : '#777'"
          :name="articleDetails.attitude == 1 ? 'good-job' : 'good-job-o'"
          @click="onLike"
        />
        <van-icon name="share" />
      </van-cell>
    </div>

    <!-- 1级弹出层 -->
    <van-popup
      class=""
      v-model="isShowPopup"
      position="bottom"
      get-container="body"
    >
      <post-Comment :target="articleId" @updatePopup="onUpdate"></post-Comment>
    </van-popup>

    <!-- 2级弹出层 -->
    <van-popup
      class="comment-popup"
      v-model="isCommentPopup"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
      get-container="body"
    >
      <comment-Reply
        :target="articleId"
        :isCommentPopup="isCommentPopup"
        :userCommentList="userCommentList"
      ></comment-Reply>
    </van-popup>
  </div>
</template>

<script>
import './github-markdown.css'
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from '@/api/article.js'
import { addFollow, deleteFollow } from '@/api/user.js'
import { ImagePreview } from 'vant'
import commentList from './components/comment-list'
import postComment from './components/post-comment'
import commentReply from './components/comment-reply'
// 在组件中获取动态路由参数
//    方式一: this.$route.params.xxx
//    方式二: props 传参 需要在路由配置中设置 props:true
export default {
  name: 'articleDetails',
  props: {
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  components: {
    commentList,
    postComment,
    commentReply
  },
  data() {
    return {
      articleDetails: {},

      isFollowLoading: false,

      isCollectLoading: false,

      isLikingsLoading: false,

      isShowPopup: false, // 1级弹出层 控制发布评论的弹出层

      isCommentPopup: false, // 2级弹出层 控制对其他用户评论回复的弹出层 及 3级回复

      userCommentList: {},

      commentList: [],

      updateTotalCount: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    async loadArticleById() {
      const { data } = await getArticleById(this.articleId)
      this.articleDetails = data.data

      // console.log(data)
      this.$nextTick(() => {
        this.handlePoreviewImage()
      })
    },

    handlePoreviewImage() {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        // 遍历每个img标签 把图片的src添加到数组中
        imgPaths.push(img.src)
        // 为每个img标签注册点击事件
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },
    // 点击关注
    async onFollow() {
      this.isFollowLoading = true
      if (this.articleDetails.is_followed) {
        await deleteFollow(this.articleDetails.aut_id)
        this.$toast('取消成功')
      } else {
        await addFollow(this.articleDetails.aut_id)
        this.$toast('关注成功')
      }
      this.articleDetails.is_followed = !this.articleDetails.is_followed

      this.isFollowLoading = false
    },

    async onStar() {
      this.isCollectLoading = true
      if (this.articleDetails.is_collected) {
        await addCollect(this.articleId)
        this.$toast('取消成功')
      } else {
        await deleteCollect(this.articleId)
        this.$toast('关注成功')
      }
      this.articleDetails.is_collected = !this.articleDetails.is_collected

      this.isCollectLoading = false
    },
    // 点击喜欢
    async onLike() {
      this.isLikingsLoading = true

      if (this.articleDetails.attitude !== 1) {
        await addLike(this.articleId)

        this.articleDetails.attitude = 1
      } else if (this.articleDetails.attitude !== -1) {
        await deleteLike(this.articleId)

        this.articleDetails.attitude = -1
      }
      this.isLikingsLoading = false
    },
    // 发布评论 1级
    onUpdate(comment) {
      // 把新发布的评论数据方法列表顶部
      this.commentList.unshift(comment)
      // 评论总数+1
      this.updateTotalCount++
      // 關閉遮罩層
      this.isShowPopup = false
    },
    // 发布评论 2级
    onCommentUpdate(event) {
      console.log('远程接力biu~biu~', event)
      this.userCommentList = event
      // 弹出 2级评论弹出层
      this.isCommentPopup = true
      console.log('2级评论')
    },
    postComment() {
      // 把新发布的评论数据方法列表顶部
      // 评论总数+1
      this.updateTotalCount++
      // 關閉遮罩層
      this.isCommentPopup = false
    }
  },
  // 生命周期-创建完成（可以访问当前this实例）
  created() {
    this.loadArticleById()
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
.article-container {
  .article-wrap {
    position: fixed;
    top: 46px;
    bottom: 44px;
    left: 0;
    right: 0;
    overflow-y: auto;
    .title {
      background: #ffffff !important;
      margin: 0;
      padding: 10px 16px 10px 16px;
    }
    .van-cell {
      .van-cell__title {
        margin-left: 8px;
      }
    }
    .van-nav-bar__content {
      position: relative;
    }
    .van-button {
      width: 80px;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .article-bottom {
    .van-button {
      width: 150px;
      margin-right: 20px;
      font-size: 14px;
    }
    .van-cell__value {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .van-icon {
        font-size: 20px;
      }
    }
  }
}
.markdown-body {
  padding: 10px 16px 10px 16px;
  background: #ffffff !important;
  margin: 0;
}
</style>
<style >
[v-cloak] {
  display: none;
}
</style>