import Vue from 'vue'
import Vuex from 'vuex'
import visualization from './modules/visualization'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    visualization
  },
  strict: debug,
})
