<template>
  <van-cell class="article-item">
    <!-- 使用 title 插槽来自定义标题 -->
    <div class="title" slot="title">{{ article.title }}</div>
    <div class="label" slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <van-image
          class="cover-wrap-item"
          fit="cover"
          v-for="(img, index) in article.cover.images"
          :key="index"
          :src="img"
        />
      </div>
      <div class="label-wrap">
        <span class="article">{{ article.aut_name }}</span>
        <span class="article">{{ article.comm_count }}评论</span>
        <span class="article">{{ article.pubdate | relativeTime }} </span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  activated() {},
};
</script>
<style lang='less' scoped>
.article-item {
  min-height: 100px;
  position: relative;
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/.cover-wrap {
    padding: 15px 0;
    display: flex;
    .cover-wrap-item {
      width: 100%;
      height: 73px;
      &:not(:last-child) {
        padding-right: 3px;
      }
    }
  }
  /deep/.van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
  }
  .label-wrap {
    .article {
      color: #b4b4b4;
      font-size: 10px;
      margin-right: 12px;
    }
  }
  .van-cell__label {
    .label-wrap {
      display: inline;
      position: absolute;
      bottom: 5px;
    }
  }
}
</style>