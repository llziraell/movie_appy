<script setup>
import { ref } from "vue"

import { useSortFilmStore } from "@/stores/SortFilmStore"
const SortFilms = useSortFilmStore()

const openSortMenu = ref(false)
const status1 = ref(false)
const status2 = ref(false)
const status3 = ref(false)

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

</script>

<template style="position: relative">
    <div>
        <b-button @click="openSortMenu = !openSortMenu"
            >Фильтры</b-button
        >
        {{ SortFilms.getSortParameters() }}
        <div
            v-if="openSortMenu"
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
                    :min = SortFilms.minYear
                    :max = SortFilms.maxYear
                ></b-form-input>
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
                    :min = SortFilms.minMark
                    :max = SortFilms.maxMark
                ></b-form-input>
            </div>
            <div class="dropdown_item">
                <b-form-checkbox
                    id="checkbox-1"
                    v-model="status3"
                    name="checkbox-1"
                    >Хронометраж: {{ value3 }}
                </b-form-checkbox>
                <b-form-input
                    :disabled="!status3"
                    id="range-3"
                    v-model="value3"
                    type="range"
                    :min = SortFilms.minTime
                    :max = SortFilms.maxTime
                ></b-form-input>
            </div>
            <b-button> Найти </b-button>
        </div>
    </div>
</template>

<style scoped>
.dropdown {
    position: absolute;
    z-index: 1;
    background-color: #fff;
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
