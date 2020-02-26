import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlpvcmEgU2FudG9zIiwiZW1haWwiOiJ6b3JhQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1ODI2NDQzNDcsImV4cCI6MTU4MjkwMzU0N30.2KGWewlhBMgTyjJgGJGORfyGWmyaCvTWM1K4Xfbeh8A'

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
