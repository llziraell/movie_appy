<script setup>
import MainBlock from "@/components/MainBlock.vue"

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

let currentRating = LocalStore.currentRating
// const setRating = (rating) => {
//     if (rating === currentRating.value) {
//         currentRating.value = 0
//     } else {
//         currentRating.value = rating
//     }
// }

const rate = ref(0)
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
                        class="movie__average_0"
                        @click="
                            LocalStore.toggleBookmark(
                                Films.selectedFilmInfo[0].externalId._id
                            )
                        "
                        :style="{
                            backgroundColor: LocalStore.bookmarks_ids.includes(
                                Films.selectedFilmInfo[0].externalId._id
                            )
                                ? 'red'
                                : 'transparent',
                        }"
                    ></div>
                    <!-- <div
                        class="movie__average movie__average--green"
                        {{ Films.selectedFilmInfo[0].rating.imdb }}
                    ></div> -->

                    <span
                        style="
                            margin-top: 10px;
                            margin-right: 7px;
                            position: center;
                            cursor: pointer;
                        "
                        v-for="rating in LocalStore.maxRating"
                        :key="rating"
                        @click="
                            LocalStore.addMarks(
                                Films.selectedFilmInfo[0].externalId._id,
                                rating
                            )
                        "
                        :class="{ rated: rating <= LocalStore.currentRating }"
                        >★</span
                    >
                    <h3>{{ currentRating }}</h3>
                    <div class="movie__average">
                        {{ Films.selectedFilmInfo[0].rating.imdb }}
                    </div>
                </div>

                <div
                    class="film_text"
                    style="color: #fff"
                >
                    <h1>
                        {{ Films.selectedFilmInfo[0].name }} -
                        {{ Films.selectedFilmInfo[0].alternativeName }}
                    </h1>
                    <h5 style="color: yellow">
                        {{ Films.selectedFilmInfo[0].year }}
                    </h5>
                    <div>{{ Films.selectedFilmInfo[0].description }}</div>
                    <div style="margin-top: 10px">
                        <img
                            src="@/assets/chrono.png"
                            style="filter: hue-rotate(90deg)"
                        />
                        {{ Films.selectedFilmInfo[0].movieLength }} минут
                    </div>
                </div>
            </div>
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
    max-height: 360px;
    width: 50vw;
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
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1a191f;
    color: #fff;
    font-size: 14px;
    border: 1px solid green;
}

.movie__average_0 {
    position: absolute;
    top: 10px;
    right: 10px;
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

.movie__average .bookmark {
    right: 10px;
    background-image: url("@/assets/bookmark.svg");
    background-repeat: none;
    cursor: pointer;
}

.rated {
    color: gold;
}

/* .film_card{
    align-self: center;
    width: 300px;
    height: 450px;
    background-color: blue;
} */
</style>
