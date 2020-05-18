<template>
  <v-container>
    <router-link :to="{ name: 'articlesById', params: { id: article.id } }">
      <v-card class="d-flex">
        <v-img
          v-if="article.imageUrl"
          :src="article.imageUrl"
          class="img-style" alt="Article" />

        <v-img class="img-style" v-else src="@/assets/logo.png"/>

        <v-card-text>
          <h2>{{ article.name }}</h2>
          <p>{{ article.description }}</p>
          <span>
            <strong>Autor: </strong>{{ article.author }}
          </span>
        </v-card-text>
      </v-card>
    </router-link>
  </v-container>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: ['article']
}
</script>

<style scoped>
  .img-style {
    width: 150px;
    height: 150px;
    margin: 10px;
  }
  a {
    text-decoration: none;
  }
</style>