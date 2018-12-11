const user = {
  state: {
    userInfo: '空'
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    setUserIfo({ commit }, info) {
      commit('SET_USER_INFO', info);
    }
  }
}

export default user