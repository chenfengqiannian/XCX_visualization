import * as types from './mutation-types'
export const actions = {
  init: ({ commit }) => commit(types.INIT),
  getCode: ({ commit }, data) => commit(types.GETCODE, data),
  postlogin: ({ commit }, data) => commit(types.POSTLOGIN, data),
  getinfo: ({ commit }, data) => commit(types.GETINFO, data),
  getrecommendedlist: ({ commit }, data) => commit(types.RECOMMENDLIST, data),
  getreback: ({ commit }, data) => commit(types.GETREBACK, data),
  getinvitecode: ({ commit }, data) => commit(types.GETINVITECODE, data),
  subscribe: ({ commit }, data) => commit(types.SUBSCRIBE, data),
  gettoken: ({ commit }, data) => commit(types.GETTOKEN, data),
  logout: ({ commit }, data) => commit(types.LOGOUT, data)
  // uploadfile: ({ commit }, data) => {
  //   let Formdata = new window.FormData()
  //   Formdata.append('file', data[0])
  //   data[0] = Formdata
  //   commit(types.QQ_UPDATAFILE, data)
  // }
}
