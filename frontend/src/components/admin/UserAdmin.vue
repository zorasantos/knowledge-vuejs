<template>
  <v-container>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.name"
              :rules="[rules.required]"
              label="Name"
              placeholder="Informe seu Nome..."
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.email"
              :rules="[rules.required, rules.email]"
              label="E-mail"
              placeholder="Informe seu E-mail..."
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-checkbox
              v-model="user.admin"
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
              placeholder="Digite uma senha..."
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.confirmPassword"
              :rules="[rules.required]"
              label="Confirmar Senha"
              placeholder="Confirme sua senha..."
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn @click="save" color="primary" class="mr-5" v-if="mode === 'save'">Salvar</v-btn>
          <v-btn color="red" class="mr-5 white--text" v-if="mode === 'remove'">Excluir</v-btn>
          <v-btn color="grey" class="white--text">Cancelar</v-btn>
        </v-row>
      </v-container>
    </v-form>  
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
            <tr>
            <th class="text-left">Codigo</th>
            <th class="text-left">Nome</th>
            <th class="text-left">E-mail</th>
            <th class="text-left">Admin</th>
            <th class="text-left">Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in users" :key="item.name">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.admin | formatter}}</td>
            <td>
              <template slot="actions" slot-scope="data">
                <v-btn @click="loadUser(data.item)" fab width="30" height="30" color="yellow" class="mr-3 white-text">ED</v-btn>
                <v-btn @click="loadUser(data.item, 'remove')" fab width="30" height="30" color="red" class="white-text">EX</v-btn>
              </template>
            </td>
            </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
export default {
    name: 'UserAdmin',
    data: () => {
        return {
            name: null,
            email: null,
            password: null,
            confirmPassword: null,
            admin: null,
            rules: {
                required: value => !!value || 'Campo Obrigatorio!',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'E-mail invalido'
                }
            },
            mode: 'save',
            user: {},
            users: []
        }
    },
    filters: {
        formatter: value => value ? 'Sim' : 'Não'
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
        save() {
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            axios[method](`${baseApiUrl}/users${id}`, this.user)
                .then(() => {
                    this.reset()
                })
        },
        remove() {
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users${id}`)
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