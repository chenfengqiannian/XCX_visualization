// initial state
const state = {
  visualizationcode:[]
}

// getters
const getters = {}

// actions
const actions = {
  getVisualizationcode({commit}) {
    commit('setVisualizationcode', products)
  }
}

// mutations
const mutations = {
  setVisualizationcode(items) {
    state.all = products
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
