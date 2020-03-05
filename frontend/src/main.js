import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './config/store'
import router from './config/router'
import './config/axiosIntercept'

Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlpvcmEgU2FudG9zIiwiZW1haWwiOiJ6b3JhQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1ODI5NzEyNTIsImV4cCI6MTU4MzIzMDQ1Mn0.MJ5JdAw7yIjuAgTyZTKS-oahOH-SK9tFM-YlWg0VS68'

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
