<template>
  <v-container class="menu">
    <v-navigation-drawer
      v-model="sideNav"
      temporary
      hide-overlay
      app
    >
      <v-list>
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
        >
          <v-list-item-content>
            <v-list-item-title class="mb-5 ml-2">
              <router-link :to="link.url">
                {{ link.title }}
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-btn
            class="ml-5"
            rounded
            color="primary"
            to="/login"
          >
            Login
          </v-btn>
        </v-list>
    </v-navigation-drawer>
      <v-app-bar-nav-icon
        class="hidden-lg-and-up white--text"
        @click.stop="sideNav = !sideNav"
      />
  </v-container>
</template>

<script>
export default {
  data: () => ({
      sideNav: false,
      links: [
        {
          title: 'Home',
          url: '/',
          color: '#DF2167'
        },
        {
          title: 'Vacinas',
          url: '/vacina',
          color: 'primary'
        },
        {
          title: 'Calendário',
          url: '/calendario',
          color: 'primary'
        }
      ]
  }),
}
</script>

<style>
  .container.menu {
    width: auto;    
  }
</style>