<script setup>
import MainBlock from "@/components/MainBlock.vue"
import NavBar from "@/components/NavBar.vue"
import MovieCard from "@/components/MovieCard.vue"

import { useLocalStore } from "@/stores/LocalStore"
import { useFilmStore } from "@/stores/FilmStore"
import { useSortFilmStore } from "@/stores/SortFilmStore"
const SortFilms = useSortFilmStore()

import { ref, watch, onMounted } from "vue"
const LocalStore = useLocalStore()
const Films = useFilmStore()

const currentPage = ref(1)

watch(currentPage, (newPage) => {
    //обновляем страницу
    currentPage = newPage
})

const selectNav = ref("bookmarks")

onMounted(() => {
    Films.currentView = 1
    console.log(Films.currentView)
})

</script>

<template>
    <main-block>
        <template #header>
            <nav-bar></nav-bar>
        </template>
        <template #container>
            <div>
                <b-nav tabs>
                    <b-nav-item
                        @click="selectNav = 'bookmarks'"
                        :active="(selectNav = 'bookmarks')"
                        >Закладки</b-nav-item
                    >
                    <b-nav-item @click="selectNav = 'favourite'"
                        >Вам понравилось</b-nav-item
                    >
                </b-nav>
            </div>
            <div>
                <div
                    class="movies overflow-auto"
                    v-if="selectNav === 'bookmarks'"
                >
                    <movie-card
                        v-if="SortFilms.hadSorted"
                        v-for="movie in SortFilms.sortedFilms"
                        :movieData="movie"
                    ></movie-card>
                    <movie-card
                        v-else
                        debounce="500"
                        v-for="(movie, index) in LocalStore.bookmarks"
                        :key="index"
                        :movieData="movie"
                    />
                </div>
                <div
                    v-else
                    class="movies overflow-auto"
                >
                    <movie-card
                        v-if="SortFilms.hadSorted"
                        v-for="movie in SortFilms.sortedFilms"
                        :movieData="movie"
                    ></movie-card>
                    <movie-card
                        v-else
                        debounce="500"
                        v-for="(movie, index) in LocalStore.getMarkedFilms()"
                        :key="index"
                        :movieData="movie"
                    />
                </div>
            </div>
        </template>
    </main-block>
</template>

<style scoped></style>

