// 获取文章相关的请求模块
import request from '@/utils/request'

// 频道新闻推荐_V1.1
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}