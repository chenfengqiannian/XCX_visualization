// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Vue from 'vue'
import store from './store'
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(Vuex)
Vue.prototype.getQueryVariable = function(variable) {
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
Vue.use(require('vue-wechat-title'))
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
