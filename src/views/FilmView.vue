<script setup>
import MainBlock from "@/components/MainBlock.vue"

import { useFilmStore } from "@/stores/FilmStore"
import { useLocalStore } from "@/stores/LocalStore"

import MovieCircle from "@/components/MovieCircle.vue"

const LocalStore = useLocalStore()
const Films = useFilmStore()

import { ref, onMounted, computed } from "vue"

const isBackgroundLoaded = ref(false)
const backgroundImageUrl = Films.selectedFilmInfo[0].poster.url

const image = new Image()
image.src = backgroundImageUrl
image.onload = () => {
    isBackgroundLoaded.value = true
}

onMounted(() => {
    Films.currentView = 2
})

const toggleBookmark = computed(() => {
    return LocalStore.bookmarks_ids.includes(
        Films.selectedFilmInfo[0].externalId._id
    )
        ? "movie__average_0 add_bookmark"
        : "movie__average_0 pop_bookmark"
})

const rate = ref(0)
</script>

<template>
    <main-block>
        <template #header> </template>
        <template #container>
            <div
                v-if="isBackgroundLoaded"
                class="film_container bg-image"
                :style="{
                    backgroundImage: `url(${Films.selectedFilmInfo[0].poster.url})`,
                }"
            >
                <span class="return"  @click.prevent="$router.push(`${'/'}`)">&lt;-</span>
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
                                ? 'yellow'
                                : 'transparent',
                        }"
                    ></div>
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
                        :class="{
                            rated:
                                rating <=
                                LocalStore.getMarks(
                                    Films.selectedFilmInfo[0].externalId._id
                                ),
                        }"
                        >★</span
                    >
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
                    <div class="recommand">
                        {{ Films.getRecommandFilms(Films.selectedFilmInfo[0]) }}
                        <h4 v-if="Films.recommandFilms.length !== 0">
                            Смотреть похожие:
                        </h4>
                        <div class="film_circles">
                            <movie-circle
                                debounce="500"
                                v-for="(movie, index) in Films.recommandFilms"
                                :key="index"
                                :movieData="movie"
                            ></movie-circle>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </main-block>
</template>

<style scoped>
.return {
    background-color: #000000;
    height: 40px;
    width: 40px;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 30px;
    cursor: pointer;
}
.bg-image {
    /* Установите URL фонового изображения */
    background-size: cover;
    background-size: auto 100%;
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
    min-height: 95vh;
    height: 100vh;
    margin: auto;
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
    min-height: 95vh;
    height: 100vh;
    left: 0;
    right: 0;
    overflow-y: scroll;
    flex-direction: row;
}

.film_container .film_poster {
    background-color: rgb(0, 0, 0);
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
}

.movie__cover {
    max-width: 100%;
    height: 100%;
}

.movie__average_0 {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    color: azure;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("@/assets/bookmark.png");
    background-repeat: none;
    cursor: pointer;
}

.movie__average_0 .pop_bookmark {
    background-image: url("@/assets/bookmark.png") !important;
}

.movie__average_0 .add_bookmark {
    background-image: url("@/assets/bookmark_push.png") !important;
}

.rated {
    color: gold;
}

.recommand {
    margin-top: 40px;
    width: 100%;
    position: relative;
}

.film_circles {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
</style>
