<script setup>
import MainBlock from "@/components/MainBlock.vue"
import MovieCard from "@/components/MovieCard.vue"
import NavBar from "@/components/NavBar.vue"

import { useFilmStore } from "@/stores/FilmStore"
const Films = useFilmStore()
import { useLocalStore } from "@/stores/LocalStore"
const LocalStore = useLocalStore()

import { ref, computed, watch, onBeforeMount } from "vue"

const currentPage = ref(1)
const openAllFilms = ref(true)

onBeforeMount(() => {
    Films.fetchData() //запрос данных происходит до отрисовки компонента
    LocalStore.getFilms()
})

const paginatedFilms = computed(() => {
    if (Films.films) {
        //если фильмы загружены
        const start = (currentPage.value - 1) * Films.perPage
        const end = start + Films.perPage
        return Films.films.slice(start, end)
    } else {
        return []
    }
})

watch(currentPage, (newPage) => {
    //обновляем страницу
    Films.currentPage = newPage
})
</script>

<template>
    <main-block>
        <template #header>
            <nav-bar></nav-bar>
        </template>
        <template #container>
            <div class="selected_movie"  v-if="Films.selectedName !== ''">
                <movie-card
                    :movieData="Films.selectedFilm"
                ></movie-card>
                <div class="title-line">
                    <span :openAllFilms = true>Другие</span>
                </div>
            </div>
            <div class="movies overflow-auto">
                <movie-card
                    v-if="Films.films && openAllFilms"
                    debounce="500"
                    v-for="(movie, index) in paginatedFilms"
                    :key="index"
                    :movieData="movie"
                />
            </div>
            <!-- <div
                class="selected_movie"
                v-if="Films.selectedName !== ''"
            >
                <movie-card :movieData="Films.selectedFilm"></movie-card>
                <div class="title-line">
                    <span :openAllFilms="true">Другие</span>
                </div>
                <movie-card
                    v-if="Films.films && openAllFilms"
                    debounce="500"
                    v-for="(movie, index) in paginatedFilms"
                    :movieData="movie"
                />
            </div> -->
            <!-- <div class="movies overflow-auto">
                <movie-card
                    this.hadSorted="true"
                    v-for="(movie, index) in Films.sortedFilms"
                    debounce="500"
                    :key="index"
                    :movieData="movie"
                ></movie-card>
                <movie-card
                    v-if="Films.films && openAllFilms"
                    debounce="500"
                    v-for="(movie, index) in paginatedFilms"
                    :movieData="movie"
                />
            </div> -->
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

<style>
.movies {
    display: flex;
    flex-wrap: wrap; /*чтоб переходили по строчкам */
    justify-content: space-around;
    padding-top: 15px;
    padding-bottom: 15px;
}

.selected_movie {
    display: flex;
    flex-direction: column; /*чтоб переходили по строчкам */
    padding-top: 15px;
    padding-bottom: 15px;
}

.title-line {
    font-size: 15px;
    color: rgb(50, 50, 50);
    text-transform: uppercase;
    line-height: 1.5;
    text-align: center;
    position: relative;
}

.title-line span {
    background: #1a191f;
    color: #fff;
    display: inline-block;
    padding: 0 15px;
    position: relative;
}

.title-line:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    border-top: 2px solid #fff;
}
</style>
