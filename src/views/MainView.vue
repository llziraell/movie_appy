<script setup>
import { ref, computed, onBeforeMount, onMounted } from "vue"

import MainBlock from "@/components/MainBlock.vue"
import MovieCard from "@/components/MovieCard.vue"
import NavBar from "@/components/NavBar.vue"

import { useFilmStore } from "@/stores/FilmStore"
import { useLocalStore } from "@/stores/LocalStore"
import { useSortFilmStore } from "@/stores/SortFilmStore"

const Films = useFilmStore()
const LocalStore = useLocalStore()
const SortFilmStore = useSortFilmStore()

const currentPage = ref(1)
const openAllFilms = ref(true)

onBeforeMount(() => {
    Films.fetchData()
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
    <MainBlock>
        <template #header>
            <NavBar />
        </template>
        <template #container>
            <div v-if="SortFilmStore.hadSorted">
                <div class="movies overflow-auto">
                    <MovieCard
                        v-for="movie in paginatedFilms(SortFilmStore)"
                        :movieData="movie"
                    />
                </div>
            </div>
            <div v-else>
                <div
                    class="selected_movie"
                    v-if="Films.selectedName !== ''"
                >
                    <MovieCard :movieData="Films.selectedFilm" />
                    <div class="title-line">
                        <span :openAllFilms="true">Другие</span>
                    </div>
                </div>
                <div class="movies overflow-auto">
                    <MovieCard
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
            <div class="pagination">
                <b-pagination
                    class="custom-pagination"
                    v-if="SortFilmStore.hadSorted"
                    v-model="currentPage"
                    :total-rows="SortFilmStore.totalFilms"
                    :per-page="SortFilmStore.perPage"
                    first-number
                    last-number
                />
                <b-pagination
                    class="custom-pagination"
                    v-else
                    v-model="currentPage"
                    :total-rows="Films.totalFilms"
                    :per-page="Films.perPage"
                    first-number
                    last-number
                />
            </div>
        </template>
    </MainBlock>
</template>

<style lang="scss">
@import "@/assets/main.scss";

.custom-pagination .page-item.active .page-link {
    background-color: $rated;
    border-color: $default_bg_color;
    color: $default_bg_color;
}

.custom-pagination .page-item .page-link {
    background-color: $main-bg-color;
    border-color: $default_bg_color;
    color: $default_text_color;
}

.movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-top: 15px;
    padding-bottom: 15px;
}

.selected_movie {
    display: flex;
    flex-direction: column;
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
    background: $main-bg-color;
    color: $default-text-color;
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
    border-top: 2px solid $default-text-color;
}

.pagination {
    display: flex;
    justify-content: center;
}
</style>
