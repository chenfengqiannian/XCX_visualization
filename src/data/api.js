import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000'
export const API = {
  visualizationcode(cb) {
    axios.get("/api/visualizationcode/").then((response) => {
      for (let item of response.data)
      {
        item.code=JSON.parse(item.code)
      }
       console.log(response.data)
      cb(response)
    })
  }
}
