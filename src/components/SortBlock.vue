<script setup>
import { ref } from "vue"

import { useSortFilmStore } from "@/stores/SortFilmStore"
import { useFilmStore } from "@/stores/FilmStore"
import { useLocalStore } from "@/stores/LocalStore"

const SortFilms = useSortFilmStore()
const Films = useFilmStore()
const LocalStore = useLocalStore()

const status1 = ref(false)
const status2 = ref(false)
const status3 = ref(false)

const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
</script>

<template style="position: relative">
    <div>
        <b-button @click="SortFilms.updateOpenSortMenu()">Фильтры</b-button>
        {{ SortFilms.getSortParameters() }}
        <div
            v-if="SortFilms.openSortMenu"
            class="dropdown"
        >
            <div class="dropdown_item">
                <b-form-checkbox
                    id="checkbox-1"
                    v-model="status1"
                    name="checkbox-1"
                    >Год: {{ value1 }}
                </b-form-checkbox>
                <b-form-input
                    :disabled="!status1"
                    id="range-1"
                    v-model="value1"
                    type="range"
                    :min="SortFilms.minYear"
                    :max="SortFilms.maxYear"
                />
            </div>
            <div class="dropdown_item">
                <b-form-checkbox
                    id="checkbox-1"
                    v-model="status2"
                    name="checkbox-1"
                    >Рейтинг: {{ value2 }}
                </b-form-checkbox>
                <b-form-input
                    :disabled="!status2"
                    id="range-2"
                    v-model="value2"
                    type="range"
                    :min="SortFilms.minMark"
                    :max="SortFilms.maxMark"
                />
            </div>
            <div class="dropdown_item">
                <b-form-checkbox
                    id="checkbox-1"
                    v-model="status3"
                    name="checkbox-1"
                    >Хронометраж: менее {{ value3 }} минут
                </b-form-checkbox>
                <b-form-input
                    :disabled="!status3"
                    id="range-3"
                    v-model="value3"
                    type="range"
                    :min="SortFilms.minTime > 10 ? 30 : 10"
                    :max="SortFilms.maxTime"
                    :step="20"
                />
            </div>
            <b-button
                v-if="Films.currentView === 0"
                @click="
                    SortFilms.sortFilms(value1, value2, value3, Films.films)
                "
                :openSortMenu="openSortMenu"
            >
                Найти
            </b-button>
            <b-button
                v-else-if="Films.currentView === 1"
                @click="
                    SortFilms.sortFilms(
                        value1,
                        value2,
                        value3,
                        LocalStore.marks
                    )
                "
                :openSortMenu="openSortMenu"
            >
                Найти
            </b-button>
            <b-button
                v-else-if="Films.currentView === 3"
                @click="
                    SortFilms.sortFilms(
                        value1,
                        value2,
                        value3,
                        LocalStore.bookmarks
                    )
                "
                :openSortMenu="openSortMenu"
            >
                Найти
            </b-button>
        </div>
        <b-button
            @click="
                SortFilms.hadSorted = false,
                status1 = false,
                value1 = ' ',
                status2 = false,
                value2 = ' ',
                status3 = false,
                value3 = ' '
            "
            >Сбросить</b-button
        >
    </div>
</template>

<style lang="scss">
@import "@/assets/main.scss";

.dropdown {
    position: absolute;
    z-index: 1;
    background-color: $default-text-color;
    border: 1px solid #ccc;
    padding: 10px;
    top: 100%;
    border-radius: 10px;
    width: 500px;
}

.dropdown_item {
    margin-top: 10px;
}
</style>
