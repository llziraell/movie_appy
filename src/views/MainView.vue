<script setup>
import MainBlock from "@/components/MainBlock.vue"
import MovieCard from "@/components/MovieCard.vue"

import { useFilmStore } from "@/stores/FilmStore"
const Films = useFilmStore()

import { ref, computed, watch, onBeforeMount } from "vue"

const currentPage = ref(1)

onBeforeMount(() => {
  Films.fetchData(); //запрос данных происходит до отрисовки компонента
});

const paginatedFilms = computed(() => {
    if (Films.films){   //если фильмы загружены
    const start = (currentPage.value - 1) * Films.perPage
    const end = start + Films.perPage
    return Films.films.slice(start, end)
    }else{
        return []
    }
})

watch(currentPage, (newPage) => {  //обновляем страницу
    Films.currentPage = newPage
})
</script>

<template>
    <main-block>
        <template #header></template>
        <template #container>
            <div class="movies overflow-auto">
                <movie-card 
                v-if = "Films.films"
                    debounce="500"
                    v-for="(movie, index) in paginatedFilms"
                    :key="index"
                    :movieData="movie"
                />
            </div>
        </template>
        <template #footer>
            <b-pagination
                v-model="currentPage"
                :total-rows="Films.totalFilms"
                :per-page="Films.perPage"
                first-number
                last-number
            ></b-pagination>
        </template>
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
