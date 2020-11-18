<template>
  <div class="home-container">
    <!-- 搜索栏 -->
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
      <div class="wap-nav-wrap" slot="nav-right" @click="isChannelShow = true">
        <van-icon name="wap-nav" />
      </div>
      <div class="zhanwei" slot="nav-right"></div>
      <van-tab
        v-for="(channel, id) in channels"
        :key="id"
        :title="channel.name"
      >
        <!-- 占位元素 -->

        <!-- 文章列表 组件通过v-bind传参给子组件 -->
        <Article-List :channel="channel"></Article-List>
      </van-tab>
    </van-tabs>
    <!-- 弹出层 应该属于body -->
    <van-popup
      class="channel-popup"
      v-model="isChannelShow"
      closeable
      get-container="body"
      close-icon-position="top-left"
      position="bottom"
      style="height: 100%"
    >
      <!--  @update-active="avtive = $event" 找个$event就是自定义事件携带的参数 -->
      <ChannelEdit
        @update-active="onUpdateActive"
        @close="isChannelShow = false"
        :userChannels="channels"
        :active="active"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChanneLs } from "@/api/user.js";
import ArticleList from "./components/article-list";
import ChannelEdit from "./components/channel-edit";
export default {
  name: "HomeIndex",
  components: {
    ArticleList,
    ChannelEdit,
  },
  data() {
    return {
      isChannelShow: false,
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
    onUpdateActive(index) {
      this.active = index;
      console.log(index);
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
  .zhanwei {
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    height: 44px;
    background: #ffffff;
    width: 33px;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
  }
}
</style>
