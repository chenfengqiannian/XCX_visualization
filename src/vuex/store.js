import Vue from 'vue'
import Vuex from 'vuex'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
Vue.use(Vuex)
const state = {
  init: false,
  gromlists: [],
  rebacklist: [],
  invitenum: null,
  myphone: '',
  buyinfo: {
    price: '',
    count: '',
    percentage: 0
  },
  myassets: {
    total: '',
    lockup: '',
    available: '',
    buyback: ''
  },
  alert: {
    show: false,
    type: 1,
    message: ''
  }
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
