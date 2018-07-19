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
  pushData(cb, pageList) {
    axios.post("/api/")
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
