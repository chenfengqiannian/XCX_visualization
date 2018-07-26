import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000';
export const API = {
  visualizationcode(cb) {
    axios.get("/api/visualizationcode/").then((response) => {
      for (let item of response.data) {
        item.code = JSON.parse(item.code)
      }
      cb(response)
    })
  },
  pushData(cb, id, pageList) {
    axios.put("/api/customapp/" + id + "/", {
      appJson: JSON.stringify(pageList),
    }).then((response) => {
      cb(response)
    }).catch((err) => {
      console.log(err.response);
      // err.response 是 undefined
    })
  },

  login(cb) {
    axios.post("login/", {
      username: 'root',
      password: '1234569'
    }, {headers: {'Content-Type': 'application/json'}}).then((response) => {
      if (cb)
        cb(response)
    })
  }


}
