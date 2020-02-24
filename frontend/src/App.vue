<template>
  <v-app id="app">
    <Header :hideUserDropDown="false" title="COD3R - Base de Conhecimento" />
    <v-content class="content">
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/templates/Header'
import Footer from './components/templates/Footer'
export default {
  name: 'App',

  components: {
    Header,
    Footer
  },
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
