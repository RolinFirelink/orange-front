export default {
    namespaced: true,
    state: {
      loginuser: {
        username: '',
        password: ''
      },
      loginStatus: '',
    },
    getters: {
  
    },
    mutations: {
      save_login(state, user) {
        state.loginuser.username = user.username
        state.loginuser.password = user.password
        console.log(user)
      },
      login_status(state, loginStatus_get) {
        state.loginStatus = loginStatus_get;
      }
    },
    actions: {
  
    }
  }
  