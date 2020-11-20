// 搜索相关请求模块
import request from '@/utils/request'

// 获取搜索联想建议
export const getSearchSuggestions = (q) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取搜索联想建议
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

// 获取用户搜索历史记录
export const getSearchHistory = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories',
  })
}