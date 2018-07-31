// initial state
import axios from 'axios'
import {API} from '../../data/api'
import _ from "lodash"

const state = {
  visualizationCode: [],
  activeIndex: undefined,
  pageList: [],
  activePageId: 1,
  activeGroupId: 1,
  v_groupItems: []
}


const getters = {
  itemList: (state, getters) => {
    if (getters.activePage) {
      return getters.activePage.itemList
    }
    return []

  }
  ,
  lastGroupId: state => {
    let obj = _.last(state.v_groupItems)
    if (obj && 'id' in obj) {
      return obj.id
    }

    return 0

  },
  lastPageId: (state, getters) => {
    let groupObj = _.last(state.v_groupItems)
    if (groupObj) {
      let pageObj = _.last(groupObj.pageItems)
      if (pageObj && "id" in pageObj) {
        return pageObj.id
      }
    }
    return 0;
  }
  ,

  activePage: state => {
    let page=undefined
   let obj = state.v_groupItems.find((val) => {
      return val.id===state.activeGroupId
    })
    if(obj) {
      page = obj.pageItems.find((val) => {
        return val.id === state.activePageId
      })
    }
    return page;
  }
}

// actions
const actions = {
  getCode({commit}) {
    API.visualizationcode((response) => {
      commit('CODE', response.data)
    })
  },
  getData({commit}, id) {
    API.getData((response) => {
      let appJson = JSON.parse(response.data.appJson)
      commit('SETGUROP', appJson)
    }, id)
  },
  sendGroupList({commit, state}) {

    function getQueryVariable(variable) {
      let query = window.location.search.substring(1);
      let vars = query.split("&");
      for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) {
          return pair[1];
        }
      }
      return (false);
    }

    let id = getQueryVariable("id")
    console.log(id)
    if (state.v_groupItems && id) {
      API.pushData((response) => {
        console.log(response)
      }, id, state.v_groupItems)
    }
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
    let self = this


    let obj = state.v_groupItems.find((val) => {
      return val.id===state.activeGroupId
    })
    let page=obj.pageItems.find((val)=>
    {
      return val.id===state.activePageId
    })
    page.itemList=itemList
    // let array = state.pageList
    // for (let i = 0; i <= array.length - 1; i++) {
    //   if (array[i].id === state.activePageId) {
    //     array[i].itemList = itemList
    //     break
    //   }
    // }
    // console.log(JSON.stringify(array))
    // state.itemList = itemList;
  }
  ,
  SETPAGE(state, pageList) {
    state.pageList = pageList;
  },
  SETACTIVEGRUOPID(state, id)
  {
    state.activeGroupId = id
  },
  SETACTIVEID(state, id) {
    state.activePageId = id
  },
  ADDPAGE(state, id) {
    console.log(id)
    state.pageList.push({id: id, text: "新页面", template: "custom", name: "page" + id, itemList: []})
    this.commit("SETACTIVEID", id)
  },
  SETGUROP(state, groupList) {
    state.v_groupItems = groupList
  }
  ,
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
