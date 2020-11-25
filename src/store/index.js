import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

const USER_KEY = 'xinwenUser'
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY), // 当前用户的登录状态 Token等数据
    cachePages: ['layoutIndex']
  },
  mutations: {
    // 为了防止页面刷新数据丢失，需要把数据放到本地中存储，且本地中只存 字符串
    setUser(state, data) {
      state.user = data
      setItem(USER_KEY, state.user)
    },
    // 添加缓存页面
    addCachePages(state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    // 移除缓存页面
    removeCachePages(state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
