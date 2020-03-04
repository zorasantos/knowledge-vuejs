<template>
  <v-app id="app" :class="{'hide-menu': !user}">
    <Header :hideUserDropDown="!user" title="COD3R - Base de Conhecimento" />
    <Loading v-if="validatingToken" />
    <v-content v-else class="content">
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import { mapState } from 'vuex'
import Header from './components/templates/Header'
import Footer from './components/templates/Footer'
import Loading from './components/templates/Loading'
export default {
  name: 'App',

  components: {
    Header,
    Footer,
    Loading
  },
  computed: mapState(['isMenuVisible', 'user']),
  data: () => ({
    validatingToken: true
  }),
  methods: {
    async validateToken() {
      this.validatingToken = true

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
      this.$store.commit('setUser', null)

      if(!userData) {
        this.validatingToken = false
        this.$router.push('/auth')
        return
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

      if(res.data) {
        this.$store.commit('setUser', userData)
      } else {
        localStorage.removeItem(userKey)
        this.$router.push('/auth')
      }

      this.validatingToken = false
    }
  },
  created() {
    this.validateToken()
  }
}
</script>
<style>
  #app {
    -webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
  }
  .content {
        grid-area: content;
        background-color: #efefef;
        padding: 20px;
    }
</style>
