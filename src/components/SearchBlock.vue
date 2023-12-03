<script setup>
import { ref } from "vue"
import { useFilmStore } from "@/stores/FilmStore"
const Films = useFilmStore()

const inputFilm = ref("")
</script>

<template>
    <b-nav-form style="margin-left: 15px">
        <b-dropdown
            toggle-class="text-decoration-none"
            no-caret
        >
            <template #button-content>
                <b-form-input
                    type="text"
                    v-model="inputFilm"
                    style="margin-right: 5px; width: 25vw"
                    size="sm"
                    placeholder="Ищу фильм..."
                    @input="Films.searchFilms(inputFilm)"
                ></b-form-input>
            </template>
            <b-dropdown-item
                v-for="filmName in Films.searchedFilms"
                @click="Films.searchFilmName(filmName.name)"
                >{{ filmName.name }}</b-dropdown-item
            >
        </b-dropdown>
        <b-button
            class="search_btn"
            @click="(inputFilm = ''), (Films.selectedName = '')"
            >x</b-button
        >
    </b-nav-form>
</template>

<style scoped>
.search_btn {
    margin-left: 5px;
    text-align: center;
}
.dropdown-container {
    max-height: 200px;
    overflow-y: auto;
}
</style>
