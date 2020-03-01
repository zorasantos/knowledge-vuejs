<template>
  <v-app id="app" :class="{'hide-menu': !user}">
    <Header :hideUserDropDown="!user" title="COD3R - Base de Conhecimento" />
    <v-content class="content">
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/templates/Header'
import Footer from './components/templates/Footer'
import { mapState } from 'vuex'
export default {
  name: 'App',

  components: {
    Header,
    Footer
  },
  computed: mapState(['isMenuVisible', 'user']),
  data: () => ({
    //
  }),
};
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
