import * as types from './mutation-types'
// import {setCookie} from '../libs/cookie'
import {API} from '../libs/api'
import Vue from 'vue'
const showAlert = (state, type, message) => {
  state.alert.show = false
  state.alert.type = type
  state.alert.message = message
  Vue.nextTick(function () {
    state.alert.show = true
  })
}
export const mutations = {
  [types.INIT] (state, data) {
    showAlert(state, '2', '1')
  },
  [types.GETCODE] (state, data) {
    if (data.phone === '请输入手机号码') {
      showAlert(state, '1', '请输入手机号码')
    } else {
      API.getCode(data, (res) => {})
    }
  },
  [types.POSTLOGIN] (state, data) {
    API.login(data[0], (res) => {
      state.myphone = data[0].phone
      if (!res) console.log('null')
      if (data[1] && res) data[1](true)
    }, (res) => {
      if (data[1]) data[1](false)
      showAlert(state, '1', '登录失败')
    })
  },
  [types.GETINFO] (state, cb) {
    API.getinfo((res) => {
      if (cb) cb(res)
      state.myassets = res
    }, (res) => {
      showAlert(state, '1', '获取失败')
    })
  },
  [types.RECOMMENDLIST] (state, cb) {
    API.getcommendedlist((res) => {
      state.gromlists = res
    }, (res) => {
      showAlert(state, '1', '获取失败')
    })
  },
  [types.GETREBACK] (state, cb) {
    API.getreback((res) => {
      state.rebacklist = res
    }, (res) => {
      showAlert(state, '1', '获取失败')
    })
  },
  [types.GETINVITECODE] (state, cb) {
    API.getinvitecode((res) => {
      state.invitenum = res
    }, (res) => {
      showAlert(state, '1', '获取失败')
    })
  },
  [types.SUBSCRIBE] (state, cb) {
    let c = cb[0].count
    if (isNaN(+c)) {
      showAlert(state, '1', '输入认购数量')
      return false
    }
    if (cb[0].count <= 0) {
      showAlert(state, '1', '认购数量大于0')
      return false
    }
    API.subscribe(cb[0], (res) => {
      cb[1]()
    }, (res) => {
      showAlert(state, '1', '提交失败')
    })
  },
  [types.GETTOKEN] (state, cb) {
    API.gettoken((res) => {
      state.buyinfo = res
    }, (res) => {
      showAlert(state, '1', '获取失败')
    })
  },
  [types.LOGOUT] (state, cb) {
    API.logout((res) => {
      if (cb) cb()
    }, (res) => {
      showAlert(state, '1', '')
    })
  }
}
