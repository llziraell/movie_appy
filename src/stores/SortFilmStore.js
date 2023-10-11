import { defineStore } from "pinia"
import { ref } from "vue"

import { useFilmStore } from "./FilmStore"

//const FilmStore = piniaStore.FilmStore

export const useSortFilmStore = defineStore("SortFilms", {
    state: () => ({
        sortedFilms: [],
        minYear: 0,
        maxYear: 0,
        minMark: 0,
        maxMark: 10,
        minTime: 0,
        maxTime: 0,
    }),
    actions: {
        getSortParameters() {
            const Films = useFilmStore()
            this.sortedFilms = Films.films

            if (Films.films) {

                //год
                const minYear = this.sortedFilms.reduce((min, cur) => {
                    return cur.year < min.year ? cur : min
                }, this.sortedFilms[0])
                this.minYear = minYear.year

                const maxYear = this.sortedFilms.reduce((max, cur) => {
                    return cur.year > max.year ? cur : max
                }, this.sortedFilms[0])
                this.maxYear = maxYear.year

                //хроно
                const minTime = this.sortedFilms.reduce((min, cur) => {
                    return cur.movieLength < min.movieLength ? cur : min
                }, this.sortedFilms[0])
                this.minTime = minTime.movieLength

                const maxTime = this.sortedFilms.reduce((max, cur) => {
                    return cur.movieLength > max.movieLength ? cur : max
                }, this.sortedFilms[0])
                this.maxTime = maxTime.movieLength
            }
        },
    },
})
