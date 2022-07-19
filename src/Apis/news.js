import request from '@/utlis/request'
/**
 *频道列表
 * @param {*} channelId id
 * @param {*} timestamp 时间戳
 * @returns promise
 */
export const getArticleList = (channelId, timestamp) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
