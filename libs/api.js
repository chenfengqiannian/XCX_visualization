import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000'
export const API = {
    visualizationcode(success,failure){
      axios.get("/api/visualizationcode/").then(success).catch(failure)
    }
}
