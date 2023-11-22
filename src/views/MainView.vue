<script setup>
import MainBlock from "@/components/MainBlock.vue"
import MovieCard from "@/components/MovieCard.vue"
import NavBar from "@/components/NavBar.vue"

import { useFilmStore } from "@/stores/FilmStore"
const Films = useFilmStore()
import { useLocalStore } from "@/stores/LocalStore"
const LocalStore = useLocalStore()
import { useSortFilmStore } from "@/stores/SortFilmStore"
const SortFilmStore = useSortFilmStore()

import { ref, computed, onBeforeMount, onMounted } from "vue"

const currentPage = ref(1)
const openAllFilms = ref(true)

onBeforeMount(() => {
    Films.fetchData() //запрос данных происходит до отрисовки компонента
    LocalStore.getFilms()
})

onMounted(() => {
    Films.currentView = 0
})

const paginatedFilms = computed(() => {
    return (selectedStore) => {
        const start = (currentPage.value - 1) * selectedStore.perPage
        const end = start + selectedStore.perPage
        if (selectedStore.sortedFilms) {
            return selectedStore.sortedFilms.slice(start, end)
        } else if (selectedStore.films) {
            return selectedStore.films.slice(start, end)
        } else {
            return []
        }
    }
})
</script>

<template>
    <main-block>
        <template #header>
            <nav-bar></nav-bar>
        </template>
        <template #container>
            <div v-if="SortFilmStore.hadSorted">
                <div class="movies overflow-auto">
                    <movie-card
                        v-for="movie in paginatedFilms(SortFilmStore)"
                        :movieData="movie"
                    ></movie-card>
                </div>
            </div>
            <div v-else>
                <div
                    class="selected_movie"
                    v-if="Films.selectedName !== ''"
                >
                    <movie-card :movieData="Films.selectedFilm"></movie-card>
                    <div class="title-line">
                        <span :openAllFilms="true">Другие</span>
                    </div>
                </div>
                <div class="movies overflow-auto">
                    <movie-card
                        v-if="Films.films && openAllFilms"
                        debounce="500"
                        v-for="(movie, index) in paginatedFilms(Films)"
                        :key="index"
                        :movieData="movie"
                    />
                </div>
            </div>
        </template>
        <template #footer>
            <div style="display: flex; justify-content: center;">
                <b-pagination
                class="custom-pagination"
                    v-if="SortFilmStore.hadSorted"
                    v-model="currentPage"
                    :total-rows="SortFilmStore.totalFilms"
                    :per-page="SortFilmStore.perPage"
                    first-number
                    last-number
                ></b-pagination>
                <b-pagination
                class="custom-pagination"
                    v-else
                    v-model="currentPage"
                    :total-rows="Films.totalFilms"
                    :per-page="Films.perPage"
                    first-number
                    last-number
                ></b-pagination>
            </div>
        </template>
    </main-block>
</template>

<style>

.custom-pagination .page-item.active .page-link {
    background-color: yellow; 
    border-color: rgb(0, 0, 0); 
    color: rgb(0, 0, 0);
}

.custom-pagination .page-item .page-link {
    background-color: #1a191f;
    border-color: rgb(0, 0, 0);
    color: white;
}

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
