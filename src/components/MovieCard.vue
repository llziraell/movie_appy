<script setup>
import { defineProps } from "vue"
const { props } = defineProps(["movieData"])
</script>

<template>
    <div class="movie" @click.prevent="$router.push(`${'film'}`)">
        <div class="movie__cover-inner">
            <img
                :src="movieData.poster.previewUrl"
                class="movie__cover"
            />
            <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
            <div class="movie__title">{{ movieData.name }}</div>
            <div class="movie__category">{{ movieData.year }}</div>
            <div class="movie__average movie__average--green">
                {{ movieData.rating.imdb }}
            </div>
        </div>
    </div>
</template>

<style>
.movie {
    width: 240px;
    margin: 10px;
    position: relative;
}

.movie__cover-inner {
    position: relative;
    height: 360px;
}

.movie__cover {
    max-width: 100%;
    height: 100%;
}

.movie__cover--darkened {
    background-color: #000;
    opacity: 0.1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    max-width: 100%;
    height: 100%;
    z-index: 1;
}

.movie__cover--darkened:hover {
    background-color: grey;
    cursor: pointer;
}

.movie__info {
    padding: 10px 0px;
}

.movie__title {
    font-size: 16px;
    color: #fff;
}

.movie__category {
    font-size: 14px;
    color: #ffd80e;
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
}

.movie__average--green {
    border: 1px solid green;
}

.movie__average--orange {
    border: 1px solid orange;
}

.movie__average--red {
    border: 1px solid red;
}
</style>
