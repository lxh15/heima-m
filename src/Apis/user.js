import request from '@/utlis/request'
import store from '@/store'

/**
 *登录
 * @param {*} mobile 手机号
 * @param {*} code 验证码
 * @returns promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
/**
 *发送验证码
 * @param {String} mobile // 手机号
 * @returns promise
 */
export const sendCode1 = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 * 获取用户信息
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}

/**
 * 关注用户
 * @param {String || Number} target 关注用户的id
 * @returns promise
 */
export const userFollowing = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消关注用户
 * @param {String || Number} target 取消关注用户的id
 * @returns promise
 */
export const deleteFollow = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

/**
 * 获取编辑个人资料信息
 * @returns promise
 */
export const getUserEmit = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 * 编辑用户个人资料
 * @param {String} user 用户信息的集合
 * @param {String} name 昵称
 * @param {String} gender 性别，0-男，1-女
 * @param {String} birthday 生日，格式 '2018-12-20'
 * @returns  promise
 */
export const EditUserInfo = (user) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name: user.name,
      gender: user.gender,
      birthday: user.birthday
    }
  })
}

/**
 * 编辑用户头像
 * @param {file} photo 头像
 * @returns promise
 */
export const userPopup = (data) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
