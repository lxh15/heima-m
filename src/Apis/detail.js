import request from '@/utlis/request'
/**
 *文章详情的接口
 * @param {Number} articleId  文章的id
 * @returns Promise
 */
export const getArticlesDetail = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}
