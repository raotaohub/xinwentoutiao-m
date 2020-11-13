/*
  请求模块
 */
import axios from 'axios'

const requset = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// 请求拦截

// 响应拦截

// 导出
export default requset