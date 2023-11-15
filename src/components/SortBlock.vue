<script setup>
import { ref , onMounted} from "vue"

import { useSortFilmStore } from "@/stores/SortFilmStore"
const SortFilms = useSortFilmStore()

import { useFilmStore } from "@/stores/FilmStore"
const Films = useFilmStore()

import { useLocalStore } from "@/stores/LocalStore"
const LocalStore = useLocalStore()

import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'

const status1 = ref(false)
const status2 = ref(false)
const status3 = ref(false)

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

const value11 = ref(0);
const value22 = ref(100);

// onMounted(() => {
//   const slider = ref.value;
//   noUiSlider.create(slider, {
//     start: [0, 100],
//     connect: true,
//     range: {
//       'min': 0,
//       'max': 100,
//     },
// });

// slider.noUiSlider.on('update', (values, handle) => {
//     if (handle === 0) {
//       value11.value = values[0];
//     } else if (handle === 1) {
//       value22.value = values[1];
//     }
//   });
// });



</script>

<template style="position: relative">
    <div>
        <b-button @click="SortFilms.updateOpenSortMenu()"
            >Фильтры</b-button
        >
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
                <div id="slider">

                </div>
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
                    >Хронометраж: менее {{ value3 }} минут
                </b-form-checkbox>
                <b-form-input
                    :disabled="!status3"
                    id="range-3"
                    v-model="value3"
                    type="range"
                    :min = "SortFilms.minTime > 10? 30:10" 
                    :max = SortFilms.maxTime
                    :step="20"
                ></b-form-input>
            </div>
            <b-button v-if = "Films.currentView === 0" @click = "SortFilms.sortFilms(value1, value2, value3, Films.films)" :openSortMenu="openSortMenu" > Найти </b-button>
            <b-button v-else-if = "Films.currentView === 1" @click = "SortFilms.sortFilms(value1, value2, value3, LocalStore.marks)" :openSortMenu="openSortMenu" > Найти </b-button>

        </div>
        <b-button @click = "SortFilms.hadSorted = false">Сбросить</b-button>
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
