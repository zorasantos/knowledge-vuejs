<template>
  <v-container>
    <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria"/>
    <v-card color="transparent" flat v-for="article in articles" :key="article.id">
      <ArticleItem :article="article" />
    </v-card>
  </v-container>
</template>

<script>
import { baseApiUrl } from '../../global'
import axios from 'axios'
const PageTitle = () => import('../templates/PageTitle')
const ArticleItem = () => import('../article/ArticleItem')
export default {
  name: 'ArticleByCategory',
  components: { PageTitle, ArticleItem },
  data: () => {
    return {
      category: {},
      articles: [],
    }
  },
  methods: {
    getCategory() {
      const url = `${baseApiUrl}/categories/${this.category.id}`
      axios(url).then(res => this.category = res.data)
    },
    getArticles() {
      const url = `${baseApiUrl}/categories/${this.category.id}/articles`
      axios(url).then(res => {
        this.articles = this.articles.concat(res.data)
        console.log(this.articles, 'Artigos')
      })
    }
  },
  mounted() {
    this.category.id = this.$route.params.id
    this.getCategory()
    this.getArticles()
  }
}
</script>

<style>

</style>