// initial state
import axios from 'axios'
const state = {
  visualizationCode:[]
}

// getters
const getters = {}

// actions
const actions = {
  getVisualizationcode({commit}) {
     axios.get('http://127.0.0.1:8000/api/visualizationcode/')
            .then(function (response) {
              //处理response json
              console.log(response.data)
              commit('setVisualizationcode', response.data)
            })
            .catch(function (error) {
              console.log(error);
            });

  }
}

// mutations
const mutations = {
  setVisualizationcode(state,visualizationCode) {
    state.visualizationCode = visualizationCode
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
