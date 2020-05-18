<template>
  <v-container>
    <PageTitle :main="article.name" :sub="article.description" />
    <v-card
      v-html="article.content"
      class="mt-12"
    >
    </v-card>
  </v-container>
</template>

<script>
import { baseApiUrl } from '../../global'
import axios from 'axios'
const PageTitle = () => import('../templates/PageTitle')

export default {
  name: 'ArticleById',
  components: { PageTitle },
  data: () => {
    return {
      article: {}
    }
  },
  mounted () {
    const url = `${baseApiUrl}/articles/${this.$route.params.id}`
    axios.get(url).then(res => this.article = res.data)
  }
}
</script>

<style>

</style>