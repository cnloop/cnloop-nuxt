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
    noticeCount: 0,
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
    },
    changeNoticeCount(state, count) {
      state.noticeCount = count
    }
  }
})

export default store
