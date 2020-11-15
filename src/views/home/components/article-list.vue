<template>
  <div class="article-list"></div>
</template>

<script>
export default {
  name: "ArticleList",
  props: {
    i: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      data: {},
    };
  },
};
</script>

<style lang="less" scoped>
</style>