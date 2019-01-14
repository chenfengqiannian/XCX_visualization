import Vue from 'vue'
import axios from 'axios'
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development')
{
  axios.defaults.baseURL = 'http://127.0.0.1:8000';
}
else
{
  axios.defaults.baseURL = 'https://xcx.yibangbang99.com';
}

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
  getData(cb, id) {



    axios.get("/api/customapp/" + id + "/").then((response) => {
      cb(response)
    }).catch((err) => {
      console.log(err);
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
