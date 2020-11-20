<template>
  <div class="serach-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in resultList"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SerachResult',
  props: {
    searchValue: {
      type: String,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      resultList: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.searchValue,
      })
      const { results } = data.data
      this.resultList.push(...results)
      // 关闭本次的 loding
      this.loading = false
      if (results.length) {
        this.page++
      } else {
        this.finished = false
      }
    },
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
  activated() {},
}
</script>
<style lang='less' scoped>
.serach-result {
  position: fixed;
  top: 54px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>