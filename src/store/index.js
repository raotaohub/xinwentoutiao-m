import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

const USER_KEY = 'xinwenUser'
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) // 当前用户的登录状态 Token等数据
  },
  mutations: {
    // 为了防止页面刷新数据丢失，需要把数据放到本地中存储，且本地中只存 字符串
    setUser(state, data) {
      state.user = data
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
