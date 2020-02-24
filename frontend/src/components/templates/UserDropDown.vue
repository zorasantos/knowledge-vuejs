<template>
  <v-menu offset-y>
      <template v-slot:activator="{ on }">
          <v-btn
            class="white--text"  
            text  
            width="250"
            height="65"
            v-on="on"
          >
            <span>{{ user.name }}</span>
            <div class="img-gravatar ml-3">
              <Gravatar :email="user.email" alt="User" />
            </div>  
          </v-btn>  
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="menu"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'
export default {
    name: 'UserDropDown',
    components: { Gravatar },
    computed: mapState(['user']),
    data: () => ({
      items: [
        { title: 'Administração' },
        { title: 'Sair' }
      ]
    }) 
}
</script>

<style>
  .img-gravatar {
      display: flex;
      align-items: center;
  }    
  .img-gravatar > img {
      max-height: 40px;
      border-radius: 5px;
  }
</style>