<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-duration="1200"
      :success-text="successText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 渲染到子组件 把值传递过去 -->
        <Article-Item
          v-for="(article, index) in articles"
          :key="index"
          :title="article.title"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      count: 0,
      isLoading: false,
      successText: ''
    }
  },
  methods: {
    async onLoad() {
      // 1. 异步更新数据 setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getArticles({
        // 频道id
        channel_id: this.channel.id,
        // 时间戳 相当于页码 请求最新数据
        timestamp: this.timestamp || Date.now(),
        // 是否包含置顶 1-包含；0-不包含；
        with_top: 1
      })
      // 2. 把数据 push 进 list 中
      const { results } = data.data
      this.articles.push(...results)
      // 3. 设置 加载状态结束
      this.loading = false
      // 4. 数据全部加载完成 不再触发
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh() {
      // 1. 下拉刷新 显示 loading 状态
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      // 2. 把数据追加到 数组 的顶部
      const { results } = data.data
      this.articles.unshift(...results)
      // 3. 关闭
      this.isLoading = false
      this.successText = `更新了 ${results.length} 条数据`
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>