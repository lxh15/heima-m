import request from '@/utlis/request'

/**
 * 搜索关键词的接口
 * @param {*} q 搜索关键词
 * @returns promise
 */
export const getSearchSuggestions = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 * @param {*} q 搜索关键词
 * @returns  Promise
 */

export const getSearchInterface = (page, perPage, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      perPage,
      q
    }
  })
}
