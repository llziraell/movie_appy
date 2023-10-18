<script setup>
import MainBlock from "@/components/MainBlock.vue"
import NavBar from "@/components/NavBar.vue"
import MovieCard from "@/components/MovieCard.vue"

import { useLocalStore } from "@/stores/LocalStore"
const LocalStore = useLocalStore()

import { onBeforeMount } from "vue"

// onBeforeMount(() => {
//     LocalStore.getBookMarks()
//     LocalStore.getMarks()
// })
</script>

<template>
    <main-block>
        <template #header>
            <nav-bar></nav-bar>
        </template>
        <template #container>
            <div>
                        <div class="movies overflow-auto">
                            <movie-card
                                debounce="500"
                                v-for="(movie, index) in LocalStore.bookmarks"
                                :key="index"
                                :movieData="movie"
                            />
                        </div>
            </div>
        </template>
        <template #footer> </template>
    </main-block>
</template>

<style scoped></style>
