<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.name"
            :rules="[rules.required]"
            label="Name"
            :disabled="mode === 'remove'"
            placeholder="Informe seu Nome..."
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
            :disabled="mode === 'remove'"
            placeholder="Informe seu E-mail..."
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-checkbox
            v-model="user.admin"
            :disabled="mode === 'remove'"
            label="Administrador?"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.password"
            :rules="[rules.required]"
            label="Senha"
            :disabled="mode === 'remove'"
            placeholder="Digite uma senha..."
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.confirmPassword"
            :rules="[rules.required]"
            label="Confirmar Senha"
            :disabled="mode === 'remove'"
            placeholder="Confirme sua senha..."
          ></v-text-field>
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
      :items="users"
      class="elevation-1 mt-6"
    >
      <template v-slot:top>
        <v-toolbar flat color="#ECEFF1">
          <v-toolbar-title class="blue-grey--text title">Lista de Usuarios</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="loadUser(item, 'save')"
        >
          edit
        </v-icon>
        <v-icon
          small
          class="mr-2"
          @click="loadUser(item, 'remove')"
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
  name: 'UserAdmin',
  data: () => {
    return {
      mode: 'save',
      user: {},
      users: [],
      headers: [
        { text: 'Codigo', value: 'id' },
        { text: 'Nome', value: 'name' },
        { text: 'E-mail', value: 'email' },
        { text: 'Administrador', value: 'admin', formatter: value => value ? 'Sim' : 'Não' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      rules: {
        required: value => !!value || 'Campo Obrigatorio!',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail invalido'
        }
      },
    }
  },
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users`
      axios.get(url).then(res => {
        this.users = res.data
      })
    },
    reset() {
        this.mode = 'save'
        this.user = {}
        this.loadUsers()
    },
    save(event) {
      const method = this.user.id ? 'put' : 'post'
      const id = this.user.id ? `/${this.user.id}` : ''
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          event.preventDefault()
          this.reset()
        })
    },
    remove() {
      const id = this.user.id
      axios.delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.reset()
          console.log('Apagou usuario!')
        })
    },
    loadUser(user, mode = 'save') {
      this.mode = mode
      this.user = { ...user }
    }

  },
  mounted() {
    this.loadUsers()
  } 
}
</script>

<style>

</style>