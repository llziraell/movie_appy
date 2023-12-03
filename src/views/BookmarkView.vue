<script setup>
import { ref, watch, onMounted } from "vue"

import MainBlock from "@/components/MainBlock.vue"
import NavBar from "@/components/NavBar.vue"
import MovieCard from "@/components/MovieCard.vue"

import { useLocalStore } from "@/stores/LocalStore"
import { useFilmStore } from "@/stores/FilmStore"
import { useSortFilmStore } from "@/stores/SortFilmStore"

const LocalStore = useLocalStore()
const Films = useFilmStore()
const SortFilms = useSortFilmStore()

const selectNav = ref("")
const currentPage = ref(1)

//возможно даже убрать)
// watch(currentPage, (newPage) => {
//     currentPage = newPage
// })

onMounted(() => {
    Films.currentView = 1
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
                        @click="
                            ;(selectNav = 'bookmarks'),
                                (Films.currentView = 3),
                                (SortFilms.hadSorted = false)
                        "
                        >Закладки</b-nav-item
                    >
                    <b-nav-item
                        @click="
                            ;(selectNav = 'favourite'),
                                (Films.currentView = 1),
                                (SortFilms.hadSorted = false)
                        "
                        >Вам понравилось</b-nav-item
                    >
                </b-nav>
            </div>
            <div>
                <div
                    class="movies overflow-auto pusto"
                    v-if="selectNav === 'bookmarks'"
                >
                    <movie-card
                        v-if="SortFilms.hadSorted"
                        v-for="movie in SortFilms.sortedFilms"
                        :movieData="movie"
                    ></movie-card>
                    <movie-card
                        v-else
                        v-for="(movie, index) in LocalStore.bookmarks"
                        :key="index"
                        :movieData="movie"
                    />
                </div>
                <div
                    v-else-if="selectNav === 'favourite'"
                    class="movies overflow-auto pusto"
                >
                    <movie-card
                        v-if="SortFilms.hadSorted"
                        v-for="movie in SortFilms.sortedFilms"
                        :movieData="movie"
                    ></movie-card>
                    <movie-card
                        v-else
                        v-for="(movie, index) in LocalStore.getMarkedFilms()"
                        :key="index"
                        :movieData="movie"
                    />
                </div>
                <div
                    v-else
                    class="movies overflow-auto pusto"
                >
                    <h4 class="text_bookmarks_view">
                        Отмечай фильмы в закладки и наслаждайся просмотром!
                        <br /><br />
                        Оценивай просмотренные картины - это поможет нам
                        подбирать рекомендации лучше!)))
                    </h4>
                </div>
            </div>
        </template>
    </main-block>
</template>

<style lang = "scss">
@import '@/assets/main.scss';

.pusto {
    height: 100vh;
}

.text_bookmarks_view {
    color:  $default-text-color;
    text-align: center;
    width: 800px;
    margin-top: 50px;
}
</style>
