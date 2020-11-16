import Vue from "vue"
// 初始化 dayjs 相关配置
import dayjs from 'dayjs'
// 引入中文语言包
import 'dayjs/locale/zh-cn'
// 引入使用相对事件
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用中文语言包
dayjs.locale('zh-cn')

dayjs.extend(relativeTime)

// Vue 过滤器其实就是一个可以在 模板中调用的函数而已
// 组件中 使用 {{ message | capitalize }}  或  v-bind:id="rawId | formatId"
Vue.filter('relativeTime', value => {
  return dayjs(value).to(dayjs())
})
