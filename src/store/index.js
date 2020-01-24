import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {},
    token: undefined
  },
  mutations: {
    setCurrentUser(state, value) {
      state.currentUser = value;
    },
    setToken(state, value) {
      state.token = value;
    }
  },
  getters: {
    currentUser: state => state.currentUser,
    token: state => state.token
  },
  modules: {}
});
