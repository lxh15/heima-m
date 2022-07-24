import request from '@/utlis/request'

/**
 * 获取评论或评论回复
 * @param {} a 评论类型
 * @param {*} source 源id，文章id或评论id
 * @returns promise
 */
export const comments = (a, source) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: a,
      source
    }
  })
}
