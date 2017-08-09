import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  age: 100
}
const mutations = {
  updateAge (state, playload) {
      state.age = playload
  }
}
const getters = {
}
const actions = {
}
export default new Vuex.Store({
  mutations,
  getters,
  actions,
  state
})
