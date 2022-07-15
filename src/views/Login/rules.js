// 手机号检验
export const mobileRulres = [
  { required: true, message: '请输入手机号' }
  //   {
  //     pattern: /^1[3|5|7|8]\d{9}$/,
  //     message: '手机格式不正确'
  //   }
]
//  验证码检验
export const codeRules = [
  { required: true, message: '请输入验证码' },
  {
    pattern: /^[0-9]{6}$/,
    message: '请输入6位验证码'
  }
]
