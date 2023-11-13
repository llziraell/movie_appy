<script setup>
import MainBlock from "@/components/MainBlock.vue"
import NavBar from "@/components/NavBar.vue"
import MovieCard from "@/components/MovieCard.vue"

import { useLocalStore } from "@/stores/LocalStore"

import { ref, watch } from "vue"
const LocalStore = useLocalStore()

const currentPage = ref(1)

watch(currentPage, (newPage) => {
    //обновляем страницу
    currentPage = newPage
})

const selectNav = ref('bookmarks')

// onBeforeMount(() => {
//     Films.fetchData() //запрос данных происходит до отрисовки компонента
//     LocalStore.getFilms()
// })

// const paginatedFilms = computed(() => {
//     if (Films.films) {
//         //если фильмы загружены
//         const start = (currentPage.value - 1) * Films.perPage
//         const end = start + Films.perPage
//         return Films.films.slice(start, end)
//     } else {
//         return []
//     }
// })

// watch(currentPage, (newPage) => {
//     //обновляем страницу
//     Films.currentPage = newPage
// })
</script>

<template>
    <main-block>
        <template #header>
            <nav-bar></nav-bar>
        </template>
        <template #container>
            <div>
                <b-nav tabs > 
                    <b-nav-item @click="selectNav = 'bookmarks'" :active = "selectNav = 'bookmarks'">Закладки</b-nav-item>
                    <b-nav-item @click="selectNav = 'favourite'" >Вам понравилось</b-nav-item>
                </b-nav>
            </div>
            <div>
                <div class="movies overflow-auto" v-if = "selectNav === 'bookmarks'">
                    <movie-card
                        debounce="500"
                        v-for="(movie, index) in LocalStore.bookmarks"
                        :key="index"
                        :movieData="movie"
                    />
                </div>
                <div v-else class="movies overflow-auto">
                    <movie-card
                        debounce="500"
                        v-for="(movie, index) in LocalStore.marks"
                        :key="index"
                        :movieData="movie"
                       
                    />
                </div>
            </div>
        </template>
    </main-block>
</template>

<style scoped></style>
