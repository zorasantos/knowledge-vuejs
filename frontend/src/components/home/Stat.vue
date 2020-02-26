<template>
    <v-card width="400" class="mt-5 mr-5">
        <v-icon :class="icon" :style="style"></v-icon>
        <v-card-text>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-title>{{ value }}</v-card-title>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'Stat',
    props: ['title', 'value', 'icon', 'color'],
    computed: {
        style() {
            return "color: " + (this.color || "#000")
        }
    }
}
</script>

<style>

</style>