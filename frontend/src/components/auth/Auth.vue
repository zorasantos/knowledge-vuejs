<template>
  <v-container class="d-flex">
    <v-card width="400" class="mx-auto">
      <v-card-title>{{ showSignup ? 'Cadastro' : 'Login' }}</v-card-title>
      <v-col>
        <v-text-field
          v-model="user.name"
          label="Nome completo"
          type="text"
          outlined
          v-if="showSignup"
          placeholder="Insira seu nome... "
        />
        <v-text-field
          v-model="user.email"
          label="E-mail"
          type="email"
          outlined
          placeholder="Insira seu e-mail"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="user.password"
          label="Senha"
          type="password"
          outlined
          placeholder="Insira sua senha"
        />        
      </v-col>  
      <v-col>
        <v-text-field
          v-model="user.confirmPassword"
          label="Confirmar a senha"
          type="password"
          outlined
          v-if="showSignup"
          placeholder="Confirm a senha"
        />        
      </v-col>
      <v-row class="ml-12">
        <a @click.prevent="showSignup = !showSignup">
          <span v-if="showSignup">Ja tem cadastro? Acesse o login</span>
          <span v-else>Não tem cadastro? Cadastre-se aqui</span>
        </a>
      </v-row>
      <v-btn v-if="showSignup" @click="signup()">Registrar</v-btn>  
      <v-btn v-else @click="signin">Entrar</v-btn>  
    </v-card>
  </v-container>
</template>

<script>
import { baseApiUrl, userKey } from '@/global'
import axios from 'axios'
export default {
  name: 'Auth',
  data: () => {
    return {
      showSignup: false,
      user: {},
    }
  },
  methods: {
    signin() {
      axios.post(`${baseApiUrl}/signin`, this.user)
        .then(res => {
          this.$store.commit('setUser', res.data)
          localStorage.setItem(userKey, JSON.stringify(res.data))
          this.$router.push('/')
        })
    },
    signup() {
      axios.post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.user = {}
          this.showSignup = false
        })
    }
  }
}
</script>

<style>

</style>