<template>
  <v-container>
    <PageTitle main="Dashboard"
      sub="Base de Conhecimento" />
    <div class="d-flex">
      <Stat title="Categorias" :value="stat.categories"
      icon="" color="#d54d50"
    />
    <Stat title="Artigos" :value="stat.articles"
      icon="" color="#3bc480"
    />
    <Stat title="Usuario" :value="stat.users"
      icon="" color="#d54d50"
    />
    </div>
  </v-container>
</template>

<script>
import PageTitle from '../templates/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import { baseApiUrl } from '@/global'
export default {
  nmae: 'Home',
  components: { PageTitle, Stat },
  data: () => {
    return {
      stat: {}
    }
  },
  methods: {
    getStats() {
      axios.get(`${baseApiUrl}/stats`)
        .then(res => this.stat = res.data)
      console.log(this.stat)
    }
  },
  mounted() {
    this.getStats()
  }
}
</script>

<style>

</style>