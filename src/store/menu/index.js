export default {
  state: {
    isCollapse: false
  },
  mutations: {
    changeMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  }
}
