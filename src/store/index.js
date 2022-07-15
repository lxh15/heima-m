import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utlis'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 从本地储存拿到token
    user: getToken || {}
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      // 把token 存储到本地储存
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
