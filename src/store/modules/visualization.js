// initial state
import axios from 'axios'
import {API} from '../../data/api'

const state = {
  visualizationCode: [],
  activeIndex: undefined,
  pageList: [],
  activePageId: 1
}

// getters
const getters = {
  itemList: (state, getters) => {
    if (getters.activePage) {
      return getters.activePage.itemList
    }
    return []

  },

  activePage: state => {
    let activepage;
    for (let page of state.pageList) {
      if (page.id === state.activePageId) {
        activepage = page;
      }
    }
    return activepage;
  }
}

// actions
const actions = {
  getCode({commit}) {
    API.visualizationcode((response) => {
      commit('CODE', response.data)
    })

  }

}

// mutations
const mutations = {
  SETINDEX(state, index) {
    state.activeIndex = index
  },
  CODE(state, visualizationCode) {
    state.visualizationCode = visualizationCode;
  },
  SETITEM(state, itemList) {
    let array = state.pageList
    for (let i = 0; i <= array.length - 1; i++) {
      if (array[i].id === state.activePageId) {
        array[i].itemList = itemList
        break
      }
    }
    console.log(JSON.stringify(array))
    // state.itemList = itemList;
  }
  ,
  SETPAGE(state, pageList) {
    state.pageList = pageList;
  },
  SETACTIVEID(state, id) {
    state.activePageId = id
  },
  ADDPAGE(state, id) {
    console.log(id)
    state.pageList.push({id: id, text: "新页面", template: "custom", name: "page" + id, itemList: []})
    this.commit("SETACTIVEID", id)
  },
  DELPAGE(state, id) {
    let array = state.pageList
    for (let i = 0; i <= array.length - 1; i++) {
      if (array[i].id === id) {
        array.splice(i, 1)
        break
      }
    }

  }


}

export default {
  state,
  getters,
  actions,
  mutations
}
