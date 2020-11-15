/*
  请求模块
 */
import axios from 'axios'
import store from '@/store/'
const requset = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// 请求拦截
// 添加请求拦截器
requset.interceptors.request.use(function (config) {
  const { user } = store.state
  // 在发送请求之前做些什么 若用户已经登录 统一给接口设置token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});
// 响应拦截

// 导出
export default requset