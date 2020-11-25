<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in searchResult"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="heightStr(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search.js'
import { debounce } from '@/utils/debounce.js'

export default {
  name: 'SeacchSuggestion',
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  components: {},
  data() {
    return {
      searchResult: [],
      htmlstr: `<span style="color:red">{{str}}</span>`
    }
  },
  computed: {},
  watch: {
    searchValue: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchValue)
        this.searchResult = data.data.options
      }, 800),
      // async handler() {
      //   console.log(this)
      //   const { data } = await getSearchSuggestions(this.searchValue)
      //   this.searchResult = data.data.options
      //   console.log(this.searchResult)
      // },
      immediate: true,
      deep: true
    }
  },
  methods: {
    heightStr(str) {
      const regStr = new RegExp(this.searchValue, 'ig')
      return str.replace(
        regStr,
        `<span style="color:red">${this.searchValue}</span>`
      )
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