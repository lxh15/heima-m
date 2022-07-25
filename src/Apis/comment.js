import request from '@/utlis/request'

/**
 * 获取评论或评论回复
 * @param {} a 评论类型
 * @param {*} source 源id，文章id或评论id
 * @returns promise
 */
export const comments = (a, source, offset) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: a,
      source,
      offset
    }
  })
}

/**
 * 对文章进行评论
 * @param {String} target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {String} content 评论内容
 * @returns promise
 */
export const releaseComment = (target, content, artId) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: artId
    }
  })
}

/**
 * 获取评论回复
 * @param {*} c 评论类型 对评论(comment)的回复
 * @param {*} source 评论id
 * @param {*} offset 值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @returns
 */
export const commentsReply = (c, source, offset) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: c,
      source,
      offset
    }
  })
}
