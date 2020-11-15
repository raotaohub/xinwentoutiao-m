<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        type="info"
        round
        size="small"
        icon="search"
        slot="title"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 标签页组件 -->
    <van-tabs v-model="active">
      <van-tab v-for="(i, id) in channels" :key="id" :title="i.name">
        <!-- 文章列表 组件通过v-bind传参给子组件 -->
        <Article-List :chennel="i">{{ i.name }}的内容</Article-List>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChanneLs } from "@/api/user.js";
import ArticleList from "./components/article-list";
export default {
  components: {
    ArticleList,
  },
  data() {
    return {
      channels: [],
      active: 0,
    };
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      const { data } = await getUserChanneLs();
      this.channels = data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  /deep/.van-nav-bar__title {
    max-width: none;
  }
  .app-nav-bar {
    .search-btn {
      width: 277px;
      height: 32px;
      background: #5babfb;
      .van-button__text {
        font-size: 14px;
      }
      .van-icon {
        font-size: 14px;
      }
    }
  }
}
</style>
