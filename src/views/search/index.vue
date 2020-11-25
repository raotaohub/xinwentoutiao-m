<template>
  <keep-alive>
    <div class="search-container">
      <!-- 搜索栏目 -->
      <form action="">
        <van-search
          v-model="searchValue"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch(searchValue)"
          @cancel="$router.back()"
          @focus="isResultShow = false"
        />
      </form>

      <!-- 搜索结果 利用焦点事件来使搜索结果回到历史记录-->
      <SearchResult :search-value="searchValue" v-if="isResultShow" />
      <!-- 联想建议 -->
      <SeacchSuggestion
        @search="onSearch"
        :search-value="searchValue"
        v-else-if="searchValue"
      />
      <!-- 历史记录 -->
      <SeacchHistory
        @search="onSearch"
        :search-history="searchHistory"
        v-else
      />
    </div>
  </keep-alive>
</template>

<script>
import SeacchSuggestion from './components/search-suggestion'
import SeacchHistory from './components/search-history'
import SearchResult from './components/search-result'
// import { getSearchHistory } from '@/api/search.js'
import { mapState } from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
export default {
  name: 'search',
  props: {},
  components: {
    SeacchSuggestion,
    SeacchHistory,
    SearchResult
  },
  data() {
    return {
      searchValue: '',
      isResultShow: false,
      searchHistory: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {
    // 搜索事件
    onSearch(searchValue) {
      // 把输入框设置为要搜索的文本
      this.searchValue = searchValue

      // 记录搜索历史记录
      const index = this.searchHistory.indexOf(searchValue)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      // 把最新的搜索历史记录放到数组的顶部
      this.searchHistory.unshift(searchValue)

      // 数据持久化: 若用户登录状态 则发请求保存到先上，若非登录则保存到本地Storage
      setItem('search-history', this.searchHistory)

      // 展示搜索结果
      this.isResultShow = true
    },
    onCancel() {
      console.log('cancel')
    },
    // 获取搜索历史 以及将线上记录与本地记录合并
    async loadSearchHistory() {
      const loadHistory = getItem('search-history') || []
      // 由于线上接口只有 4 调历史数据 干脆不获取了
      // if (this.user) {
      //   const { data } = await getSearchHistory()
      //   const { keywords } = data.data
      //   // set去重 + 数组合并 +set展开为数组
      //   loadHistory = [...new Set([...keywords, ...loadHistory])]
      // }

      this.searchHistory = loadHistory
    }
  },
  // 生命周期-创建完成（可以访问当前this实例）
  created() {
    this.loadSearchHistory()
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
<style lang='' scoped>
/* @import url(); 引入公共css类 */
</style>