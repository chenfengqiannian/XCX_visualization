import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000'
export const API = {
  visualizationcode(cb) {
    axios.get("/api/visualizationcode/").then((response) => {
      cb(response)
    })
  }
}
