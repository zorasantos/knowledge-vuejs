<template>
  <v-container>
      <PageTitle main="Administração do Sistema"
        sub="Cadastros & Cia" />
      <v-tabs class="mt-5">
        <v-tab>Artigos</v-tab>
        <v-tab>Categorias</v-tab>
        <v-tab>Usuarios</v-tab>
        <v-tab-item>
          <v-card flat>
            <ArticleAdmin />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <CategorieAdmin />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <UserAdmin />
          </v-card>
        </v-tab-item>
      </v-tabs>
  </v-container>
</template>

<script>
import PageTitle from '../templates/PageTitle'
import ArticleAdmin from '../admin/ArticleAdmin'
import CategorieAdmin from '../admin/CategorieAdmin'
import UserAdmin from '../admin/UserAdmin'
export default {
    name: 'AdminPages',
    components: { PageTitle, ArticleAdmin, CategorieAdmin, UserAdmin }
}
</script>

<style>

</style>