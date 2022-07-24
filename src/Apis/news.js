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

/**
 * 收藏文章
 * @param {*} target 收藏的目标文章id
 * @returns promise
 */
export const collections = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 * @param {*} target 取消收藏的文章的id
 * @returns promise
 */
export const noCollections = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

/**
 * 对文章点赞
 * @param {*} target 点赞的文章id
 * @returns promise
 */
export const likings = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消对文章点赞
 * @param {*} target 取消对文章点赞的id
 * @returns promise
 */
export const noLikings = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
