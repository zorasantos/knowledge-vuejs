<template>
  <v-container class="menu" v-show="isMenuVisible">
    <v-treeview
    rounded
    hoverable
    activatable
    :data="treeData"
  ></v-treeview>
    <!-- <v-navigation-drawer
      v-model="sideNav"
      temporary
      hide-overlay
      app
    >
    <Tree :treeData="treeData" :treeOptions="treeOptions" />
    </v-navigation-drawer>
      <v-app-bar-nav-icon
        class="hidden-lg-and-up white--text"
        @click="sideNav = !sideNav"
      /> -->
  </v-container>
</template>

<script>
// import Tree from 'liquor-tree'
import { mapState } from 'vuex'
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
  // components: { Tree },
  name: 'Menu',
  data: () => {
    return {
      sideNav: false,
      treeData: this.getTreeData(),
      treeOptions: { propertyNames: { 'text' : 'name' } }
    }
  },
  methods: {
    getTreeData () {
      const url = `${baseApiUrl}/categories/tree`
      return axios.get(url)
        .then(res => {
           res.data
          console.log(res.data, 'Tree')

        })
    }
  },
  computed: mapState(['isMenuVisible'])
}
</script>

<style>
  .container.menu {
    width: auto;
  }
</style>