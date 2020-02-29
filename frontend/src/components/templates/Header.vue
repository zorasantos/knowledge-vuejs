<template>
  <v-container>
    <v-app-bar
      color="primary"
      app
    >
      <Menu />
      <v-row justify="center">
        <h1 class="title">{{ title }}</h1>
      </v-row>
      <UserDropDown v-if="!hideUserDropDown" />
    </v-app-bar>
  </v-container>
</template>

<script>
import Menu from './Menu'
import UserDropDown from './UserDropDown'
export default {
    components: { UserDropDown, Menu },
    props: {
      title: String,
      hideToggle: Boolean,
      hideUserDropDown: Boolean
    },
  computed: {
    
  },
  methods: {
      
  }
}
</script>

<style>
  .title {
    color: #fff;
  }
</style>