<template>
  <v-container>
    <h1>Carregando a aplicação</h1>
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-container>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style>

</style>