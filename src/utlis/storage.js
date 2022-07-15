// 封装存储token
class Storage {
  // 存储token
  set (key, val) {
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    }
    localStorage.setItem(key, val)
  }

  // 获取token
  get (key) {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }

  // 删除本地存储
  remove (key) {
    localStorage.removeItem(key)
  }
}

const storage = new Storage()
// 默认导出
export default storage
