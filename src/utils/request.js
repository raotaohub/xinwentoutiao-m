/*
  请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'
import router from "@/router/"
// 在非组件模块获取 store 必须通过如下方式引入
import store from '@/store/'
import { Toast } from 'vant'

const refreshToken = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // console.log(data)

    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }
    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }]
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
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
request.interceptors.response.use(function (response) {
  // 响应成功进入这里
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, async function (error) {
  // 响应请求失败进入这里
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const status = error.response.status
  if (status === 400) {
    // 客户端请求参数错误
    Toast.fail('客户端请求参数异常')
  } else if (status === 401) {
    // token无效
    const { user } = store.state
    if (!user || user.token) {
      return redirectLogin()
    }
    // 重新请求 token 的请求 用另一个 axios 实例来发送，否则会被刚刚自己设置的拦截器给拦截了
    try {
      const { data } = await refreshToken({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 请求成功 更新user的token
      user.token = data.data.token
      // 更新user
      store.commit('setUser', user)
      // 重新发送失败的请求  error.config 就是失败请求的相关配置
      return request(error.config)
    } catch (error) {
      // 如果刷新失败 则跳转到登录界面让用户重新登录
      redirectLogin()
    }
  } else if (status === 403) {
    // 没有权限
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    // 服务器异常
    Toast.fail('服务器异常，请稍后重试')
  }
  return Promise.reject(error);
});

function redirectLogin() {
  router.replace({
    // 跳转
    name: 'login',
    query: {
      // 保存当前的路由 路径
      redirect: router.currentRoute.fullPath
    }
  })
}
// 导出
export default request