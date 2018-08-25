import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    user: "",
    isShow: {
      isTrue: false,
      parentClassName: ''
    },
    replyEndAndLoad: false
  },
  mutations: {
    changeUser(state, user) {
      state.user = user;
    },
    changeIsShow(state, isShow) {
      state.isShow = isShow
    },
    changeReplyEndAndLoad(state) {
      state.replyEndAndLoad = !state.replyEndAndLoad
    }
  }
})

export default store
