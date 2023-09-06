import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import menu from './menu/index'
import tab from './menu/tab'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    menu,
    tab
  }
})
