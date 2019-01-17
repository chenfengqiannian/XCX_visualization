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
    let page = undefined
    let obj = state.v_groupItems.find((val) => {
      return val.id === state.activeGroupId
    })
    if (obj) {
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
    let code = [
      {
        "id": 3,
        "name": "文本",
        "description": "文本",
        "code": "{\"htmlTag\": \"p\",\"wxmlTag\": \"text\",\"attrs\": {\"style\": {\"color\":\"black\",\"padding\":\"19px\"}},\"child\": [],\"innerHTML\":\"予丰科技\"}\r\n",
        "images": "https://xcx.yibangbang99.com/media/images/text.png"
      },
      {
        "id": 4,
        "name": "图片",
        "description": "image",
        "code": "{\"htmlTag\": \"img\",\"wxmlTag\": \"image\",\"attrs\": {\"mode\":\"widthFix\",\"src\":\"https://xcx.yibangbang99.com/media/201701111406359467%20(1)_20180201142611_417.jpg\",\"style\": {\"width\":\"240px\",\"height\":\"240px\"}},\"child\": [],\"innerHTML\":\"\"}\r\n",
        "images": "https://xcx.yibangbang99.com/media/images/1.jpg"
      }
    ]
    commit('CODE', code)
    return
    API.visualizationcode((response) => {
      commit('CODE', response.data)
    })
  },
  getData({commit}, id) {
    let appJ = [{
      "id": 1,
      "text": "新组",
      "pageItems": [{
        "id": 1,
        "text": "新页面",
        "template": "custom",
        "name": "page1",
        "itemList": [{
          "id": 4,
          "name": "图片",
          "description": "image",
          "code": {
            "htmlTag": "img",
            "wxmlTag": "image",
            "attrs": {
              "mode": "widthFix",
              "src": "https://xcx.yibangbang99.com/media/201701111406359467%20(1)_20180201142611_417.jpg",
              "style": {"width": "240px", "height": "240px"}
            },
            "child": [],
            "innerHTML": ""
          },
          "images": "https://xcx.yibangbang99.com/media/images/1.jpg"
        }, {
          "id": 3,
          "name": "文本",
          "description": "文本",
          "code": {
            "htmlTag": "p",
            "wxmlTag": "text",
            "attrs": {"style": {"color": "black", "padding": "19px"}},
            "child": [],
            "innerHTML": "予丰科技"
          },
          "images": "https://xcx.yibangbang99.com/media/images/text.png"
        }]
      }]
    }, {"id": 2, "text": "新组", "pageItems": []}, {"id": 3, "text": "新组", "pageItems": []}]
    commit('SETGUROP', appJ)

    return
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
      return val.id === state.activeGroupId
    })
    let page = obj.pageItems.find((val) => {
      return val.id === state.activePageId
    })
    page.itemList = itemList
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
  SETACTIVEGRUOPID(state, id) {
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
  // DELPAGE(state, index) {
  //   let array = state.pageList
  //   for (let i = 0; i <= array.length - 1; i++) {
  //     if (array[i].id === id) {
  //       array.splice(i, 1)
  //       break
  //     }
  //   }
  // delete with id
  //
  // }
  DELPAGE(state, index) {
    for (let i = 0; i <= state.v_groupItems.length - 1; i++) {
      if (state.v_groupItems[i].id === state.activeGroupId) {
        state.v_groupItems[i].pageItems.splice(index,1)
        break
      }
    }

  },

  DELGROUP(state, index) {
    state.v_groupItems.splice(index,1)


  },
  DELEL(state) {
    for (let i = 0; i <= state.v_groupItems.length - 1; i++) {
      if (state.v_groupItems[i].id === state.activeGroupId) {
        for (let j = 0; j <= state.v_groupItems[i].pageItems.length - 1; j++) {
          if (state.v_groupItems[i].pageItems[j].id === state.activePageId) {
            state.v_groupItems[i].pageItems[j].itemList.splice(state.activeIndex,1)
            break
          }
        }
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
