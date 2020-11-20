<template>
  <div v-cloak class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      left-arrow
      class="app-nav-bar"
      title="文章详情"
      @click-left="$router.back()"
    />
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
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleById } from '@/api/article.js'
import { addFollow, deleteFollow } from '@/api/user.js'
import { ImagePreview } from 'vant'
// 在组件中获取动态路由参数
//    方式一: this.$route.params.xxx
//    方式二: props 传参 需要在路由配置中设置 props:true
export default {
  name: 'articleDetails',
  props: {
    articleId: {
      type: [String, Object, Number],
      required: true,
    },
  },
  components: {},
  data() {
    return {
      articleDetails: {},
      isFollowLoading: false,
    }
  },
  computed: {},
  watch: {},
  methods: {
    async loadArticleById() {
      const { data } = await getArticleById(this.articleId)
      this.articleDetails = data.data

      console.log(data)
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
            startPosition: index,
          })
        }
      })
    },
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
  activated() {},
}
</script>
<style lang='less' scoped>
.article-container {
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