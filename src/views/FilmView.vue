<script setup>
import MainBlock from "@/components/MainBlock.vue"

// import BookMarkView from "@/components/BookMarkView.vue"

import { useFilmStore } from "@/stores/FilmStore"
import { useLocalStore } from "@/stores/LocalStore"

const LocalStore = useLocalStore()
const Films = useFilmStore()

import { ref } from "vue"

const isBackgroundLoaded = ref(false)
const backgroundImageUrl = Films.selectedFilmInfo[0].poster.url

const image = new Image()
image.src = backgroundImageUrl
image.onload = () => {
    isBackgroundLoaded.value = true
}



</script>

<template>
    <main-block>
        <template #header></template>
        <template #container>
            <div
                v-if="isBackgroundLoaded"
                class="film_container bg-image"
                :style="{
                    backgroundImage: `url(${Films.selectedFilmInfo[0].poster.url})`,
                }"
            >
                <div class="film_poster">
                    <img
                        :src="Films.selectedFilmInfo[0].poster.previewUrl"
                        class="movie__cover"
                    />
                    <div
                        class="movie__average"
                         @click="LocalStore.toggleBookmark(Films.selectedFilmInfo[0].externalId._id)"
                        :style="{
                            backgroundColor: LocalStore.bookmarks_ids.includes(Films.selectedFilmInfo[0].externalId._id) ? 'red' : 'transparent',
                        }"
                    ></div>
                </div>

                <div
                    class="film_text"
                    style="background-color: rgb(234, 149, 52); color: #fff"
                >
                    <div>
                        {{ Films.selectedFilmInfo[0].name }}
                    </div>
                    <div>{{ Films.selectedFilmInfo[0].description }}</div>
                    <div>{{ Films.selectedFilmInfo[0].year }}</div>
                    <div>{{ Films.selectedFilmInfo[0].alternativeName }}</div>
                    <div>{{ Films.selectedFilmInfo[0].movieLength }}</div>
                    <div>{{ Films.selectedFilmInfo[0].rating.imdb }}</div>

                    <!-- мои оценки и закладки -->
                </div>
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
.bg-image {
    /* Установите URL фонового изображения */
    /* background-size: cover; */
    background-size: auto 100%;
    background-repeat: no-repeat;
    opacity: 0.8;
    background-position: right center;
}

/* здесь нужно настроить абсолютно вск марджины и размеры, а то все плохо)))) */
.bg-image::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(
        0,
        0,
        0,
        0.5
    ); /* Цвет фона с прозрачностью - попробуй подобавлять цвет с картнки для 100 фильмов) */
    backdrop-filter: blur(10px); /* Размытие фона */
    z-index: -1;
}
.film_container {
    display: flex;
    align-items: center;
    background-color: bisque;
    height: 95vh;
    left: 0;
    right: 0;
    overflow-y: inherit;
    flex-direction: row;
}

.film_container .film_poster {
    background-color: aquamarine;
    height: 360px;
    width: 240px;
    min-height: 360px;
    min-width: 240px;
    position: relative;
    margin-left: 10vw;
    margin-right: 42px;
}

.film_container .film_text {
    background-color: rgb(15, 2, 72);
    max-height: 360px;
    width: 40vw;
    height: 100%;
}

.movie__cover {
    max-width: 100%;
    height: 100%;
}

.movie__average {
    position: absolute;
    top: 10px;
    left: 10px;
    /* border-radius: 50%; */
    width: 30px;
    height: 30px;
    color: azure;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("@/assets/bookmark.svg");
    background-repeat: none;
    cursor: pointer;
}

/* .film_card{
    align-self: center;
    width: 300px;
    height: 450px;
    background-color: blue;
} */
</style>
