<template>
  <v-container>
    <v-form>
      <v-row>
        <input id="article-id" type="hidden" v-model="article.id" />
        <v-col cols="12">
          <v-text-field
            v-model="article.name"
            :rules="[rules.required]"
            label="Nome"
            :disabled="mode === 'remove'"
            placeholder="Informe o nome do artigo..."
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="article.description"
            label="Descrição"
            :disabled="mode === 'remove'"
            placeholder="Informe a descrição do artigo..."
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="article.imageUrl"
            label="Imagem (URL)"
            :disabled="mode === 'remove'"
            placeholder="Informe a URL da imagem..."
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-select
            v-model="article.categoryId"
            :rules="[rules.required]"
            :items="categories"
            label="Categoria"
            :disabled="mode === 'remove'"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="article.userId"
            :rules="[rules.required]"
            :items="users"
            label="Autor(a)"
            :disabled="mode === 'remove'"
            placeholder="Informe o nome do autor(a)..."
          ></v-select>
        </v-col>
        <VueEditor v-model="article.content" placeholder="Informe o conteudo do artigo" />
      </v-row>
      <v-row>
        <v-btn @click="save" color="primary" class="mr-5" v-if="mode === 'save'">Salvar</v-btn>
        <v-btn @click="remove" color="red" class="mr-5 white--text" v-if="mode === 'remove'">Excluir</v-btn>
        <v-btn color="grey" class="white--text">Cancelar</v-btn>
      </v-row>
    </v-form>  
    <v-data-table
      :headers="headers"
      :items="articles"
      class="elevation-1 mt-6"
    >
      <template v-slot:top>
        <v-toolbar flat color="#ECEFF1">
          <v-toolbar-title class="blue-grey--text title">Lista de Artigos</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="loadArticle(item, 'save')"
        >
          edit
        </v-icon>
        <v-icon
          small
          class="mr-2"
          @click="loadArticle(item, 'remove')"
        >
          del
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import { baseApiUrl } from '@/global'
import axios from 'axios'
export default {
    name: 'ArticleAdmin',
    components: { VueEditor },
    data: () => {
      return {
        mode: 'save',
        article: {},
        articles: [],
        categories: [],
        users: [],
        headers: [
          { text: 'Codigo', value: 'id' },
          { text: 'Nome', value: 'name' },
          { text: 'Descrição', value: 'description' },
          { text: 'Actions', value: 'action', sortable: false }
        ],
        rules: {
          required: value => !!value || 'Campo Obrigatorio!'
        }
      }
    },
    methods: {
      loadArticles() {
        const url = `${baseApiUrl}/articles`
        axios.get(url).then(res => {
          this.articles = res.data.data
        })
      },
      reset() {
          this.mode = 'save'
          this.article = {}
          this.loadArticles()
      },
      save() {
        const method = this.article.id ? 'put' : 'post'
        const id = this.article.id ? `/${this.article.id}` : ''
        axios[method](`${baseApiUrl}/articles${id}`, this.article)
          .then(() => {
            this.reset()
          })
      },
      remove() {
        const id = this.article.id
        axios.delete(`${baseApiUrl}/articles/${id}`)
          .then(() => {
            this.reset()
            console.log('Apagou usuario!')
          })
      },
      loadArticle(article, mode = 'save') {
        this.mode = mode
        // this.article = { ...article }

        axios.get(`${baseApiUrl}/articles/${article.id}`)
          .then(res => this.article = res.data)
          console.log(this.article)
      },
      loadCategories() {
        const url = `${baseApiUrl}/categories`
        axios.get(url).then(res => {
          this.categories = res.data.map(category => {
            return { value: category.id, text: category.path }
          })
        })
      },
      loadAutor() {
        const url = `${baseApiUrl}/users`
        axios.get(url).then(res => {
          this.users = res.data.map(user => {
            return { value: user.id, text: `${user.name} - ${user.email}`}
          })
        })
      }
    },
    mounted() {
      this.loadAutor()
      this.loadCategories()
      this.loadArticles()
    }
}
</script>

<style>

</style>