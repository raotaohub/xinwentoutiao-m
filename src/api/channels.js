
// 获取文章相关的请求模块
import request from '@/utils/request'

// 频道新闻推荐_V1.1
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels',
  })
}

// 批量修改用户频道列表（重置式）
export const addUserChannels = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}

// 删除指定用户频道
export const deleteUserChannels = (channelId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`,
  })
}