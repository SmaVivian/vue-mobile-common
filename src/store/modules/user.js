const user = {
  state: {
    userInfo: '空',

    defaultImg: 'this.src="' + require('@/assets/images/no-data.png') + '"',  // 默认图片
    defaultHeadImg: 'this.src="' + require('@/assets/images/default-head-pic.svg') + '"'   // 默认头像
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