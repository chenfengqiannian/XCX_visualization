// initial state
import axios from 'axios'
import {API} from '../../data/api'

const state = {
  visualizationCode: [],
  activeIndex: undefined,
  itemList:[],
  pageList:[]
}

// getters
const getters = {}

// actions
const actions = {
  getCode({commit}) {
    console.log("getCode")
    API.visualizationcode((response) => {
      console.log("getCode")
      commit('CODE', response.data)
    })

  }

}

// mutations
const mutations = {
  SETINDEX(state,index)
  {
    state.activeIndex=index
  },
  CODE(state, visualizationCode) {
    state.visualizationCode = visualizationCode;
  },
  SETITEM(state, itemList) {

    state.itemList=itemList;
  }
  ,
  SETPAGE(state,pageList)
  {
    state.pageList=pageList;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
