<script setup>
import MainBlock from "@/components/MainBlock.vue"
import MovieCard from "@/components/MovieCard.vue"

import { useFilmStore } from "@/stores/FilmStore"
const Films = useFilmStore()
</script>

<template>
    <main-block>
        <template #header></template>
        <template #container>
            <div class="movies overflow-auto">
                <movie-card  v-if="Films.films"
                    debounce="500"
                    v-for="(movie, index) in Films.films"
                    :key="index"
                    :movieData="movie"
                />
            </div>
        </template>
        <template #footer> </template>
    </main-block>
</template>

<style scoped>
.movies {
    display: flex;
    flex-wrap: wrap; /*чтоб переходили по строчкам */
    justify-content: space-around;
    padding-top: 15px;
    padding-bottom: 15px;
}
</style>
