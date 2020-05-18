<template>
  <v-card color="transparent" flat class="page-title">
    <v-card-title class="font-weight-black display-1"><v-icon v-if="icon" :class="icon"></v-icon>{{ main }}</v-card-title>
    <v-card-subtitle class="font-weight-bold">{{ sub }}</v-card-subtitle>
    <hr />
  </v-card>
</template>

<script>
export default {
  name: 'PageTitle',
  props: ['icon', 'main', 'sub']
}
</script>

<style>
</style>