<script setup>
import { ref, onMounted, computed } from "vue"

import MainBlock from "@/components/MainBlock.vue"
import MovieRecommend from "@/components/MovieRecommend.vue"

import { useFilmStore } from "@/stores/FilmStore"
import { useLocalStore } from "@/stores/LocalStore"

const Films = useFilmStore()
const LocalStore = useLocalStore()

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
                <span class="return"  @click="$router.push(`${'/'}`)">&lt;-</span>
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
                    <h5 style="color: gold">
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
                        {{ Films.getrecommendFilms(Films.selectedFilmInfo[0]) }}
                        <h4 v-if="Films.recommendFilms.length !== 0">
                            Смотреть похожие:
                        </h4>
                        <div class="film_circles">
                            <movie-recommend
                                debounce="500"
                                v-for="(movie, index) in Films.recommendFilms"
                                :key="index"
                                :movieData="movie"
                            ></movie-recommend>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </main-block>
</template>

<style lang = "scss">
@import '@/assets/main.scss';

.return {
    background-color: $default_bg_color;
    height: 40px;
    width: 40px;
    color: $default-text-color;
    border-radius: 50%;
    @include flexy;
    margin-left: 30px;
    cursor: pointer;
}
.bg-image {
    background-size: cover;
    background-size: auto 100%;
    opacity: 0.8;
    background-position: right center;
}

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
    );
    backdrop-filter: blur(10px);
    z-index: -1;
}
.film_container {
    display: flex;
    align-items: center;
    min-height: 95vh;
    height: 100vh;
    left: 0;
    right: 0;
    overflow-y: scroll;
    flex-direction: row;
}

.film_container .film_poster {
    background-color: $default_bg_color;
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
    @include movie__average;
    right: 10px;
    width: 30px;
    height: 30px;
    background-image: url("@/assets/bookmark.png");
    background-repeat: none;
    cursor: pointer;
}

.rated {
    color: $rated;
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
