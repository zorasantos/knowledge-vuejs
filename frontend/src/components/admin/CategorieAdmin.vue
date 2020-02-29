<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="category.name"
            :rules="[rules.required]"
            label="Name"
            :disabled="mode === 'remove'"
            placeholder="Informe seu Nome..."
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="category.parentId"
            :disabled="mode === 'remove'"
            :items="categories"
            oultlined
            label="Categoria Pai"
        ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-btn @click="save" color="primary" class="mr-5" v-if="mode === 'save'">Salvar</v-btn>
        <v-btn @click="remove" color="red" class="mr-5 white--text" v-if="mode === 'remove'">Excluir</v-btn>
        <v-btn color="grey" class="white--text">Cancelar</v-btn>
      </v-row>
    </v-form>
    <v-data-table
      :headers="headers"
      :items="categories"
      class="elevation-1 mt-6"
    >
      <template v-slot:top>
        <v-toolbar flat color="#ECEFF1">
          <v-toolbar-title class="blue-grey--text title">Lista de categorias e subcategorias</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="loadCategory(item, 'save')"
        >
          edit
        </v-icon>
        <v-icon
          small
          class="mr-2"
          @click="loadCategory(item, 'remove')"
        >
          del
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
export default {
    name: 'CategorieAdmin',
    data: () => {
      return {
        name: null,
        mode: 'save',
        category: {},
        categories: [],
        rules: {
          required: value => !!value || 'Campo Obrigatorio!'
        },
        headers: [
          { text: 'Codigo', value: 'id' },
          { text: 'Nome', value: 'name' },
          { text: 'Caminho', value: 'path' },
          { text: 'Ações', value: 'action', sortable: false }
        ],
      }
    },
    methods: {
      reset() {
        this.mode = 'save'
        this.category = {}
        this.loadCategories()
      },
      save() {
        const method = this.category.id ? 'put' : 'post'
        const id = this.category.id ? `/${this.category.id}` : ''
        axios[method](`${baseApiUrl}/categories${id}`, this.category)
          .then(() => {
            this.reset()
          }) 
      },
      remove() {
        const id = this.category.id
        axios.delete(`${baseApiUrl}/categories/${id}`)
          .then(() => {
            this.reset()
          })
      },
      loadCategories() {
        const url = `${baseApiUrl}/categories`
        axios.get(url).then(res => {
          // this.categories = res.data
          this.categories = res.data.map(category => {
            return { ...category, value: category.id, text: category.path }
          })
        })

      },
      loadCategory(category, mode = 'save') {
        this. mode = mode
        this.category = { ...category }
      }
    },
    mounted() {
      this.loadCategories()
    }
}
</script>

<style>

</style>