<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <van-icon v-if="isDeleteShow" name="delete" @click="allDelete" />
      <span v-else>无</span>
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistory"
      :key="index"
      :title="item"
      @click="onSearch(item, index)"
    >
      <van-icon
        name="close"
        v-show="0 <= index"
        @click.stop="deleteHistory(index)"
      ></van-icon>
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage.js'
// import { debounce } from '@/utils/debounce.js'
export default {
  name: 'searchhistory',
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  components: {},
  data() {
    return {
      historyLength: 0
    }
  },
  computed: {
    isDeleteShow: {
      get: function () {
        return this.historyLength + this.searchHistory.length
      },
      set: function () {
        this.historyLength = this.searchHistory.length
      }
    }
  },
  watch: {},
  methods: {
    onSearch(item, index) {
      this.$emit('search', item)
    },
    deleteHistory(index) {
      // 删除数据
      this.searchHistory.splice(index, 1)
      // 本地持久化
      setItem('search-history', this.searchHistory)
      console.log('deletehistory')
    },
    allDelete() {
      // 任何 prop 数据都不应该修改,这里的修改指的是: xx=xx 不允许 ; xx.xx = xx 允许
      // this.searchHistory = [] 不允许
      this.searchHistory.splice(0, this.isDeleteShow)
      setItem('search-history', this.searchHistory)
      this.isDeleteShow = false
      this.$toast('全部删除完成')
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
<style lang='' scoped>
/* @import url(); 引入公共css类 */
</style>