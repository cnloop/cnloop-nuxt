import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    user: '',
    isShow: {
      isTrue: false,
      parentClassName: ''
    }
  },
  mutations: {
    changeUser(state, user) {
      state.user = user;
    },
    changeIsShow(state, isShow) {
      state.isShow = isShow
    }
  }
})

export default store