// 引入axios
import axios from 'axios'

// 配置axios 利用axios的create方法创建一个新的axios对象 ，克隆

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  timeout: 3000
})

export default request
