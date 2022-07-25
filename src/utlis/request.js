// 引入axios
import axios from 'axios'
import store from '@/store'
// 配置axios 利用axios的create方法创建一个新的axios对象 ，克隆

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net', // 基础路径
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = store.state.user.token
    // 在发送请求之前做些什么
    if (token) {
      config.headers.Authorization = `Bearer ${token} `
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
