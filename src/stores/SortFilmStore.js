import { defineStore } from "pinia"
import { ref } from "vue"

import { useFilmStore } from "./FilmStore"

export const useSortFilmStore = defineStore("SortFilms", {
    state: () => ({
        films: [],
        sortedFilms: [],
        hadSorted: false,
        minYear: 0,
        maxYear: 0,
        minMark: 0,
        maxMark: 10,
        minTime: 0,
        maxTime: 0,
        openSortMenu: false
    }),
    actions: {
        updateOpenSortMenu(){
            this.openSortMenu = !this.openSortMenu
        },
        getSortParameters() {
            const Films = useFilmStore()
            this.films = Films.films

            if (Films.films) {
                //год
                const minYear = this.films.reduce((min, cur) => {
                    return cur.year < min.year ? cur : min
                }, this.films[0])
                this.minYear = minYear.year

                const maxYear = this.films.reduce((max, cur) => {
                    return cur.year > max.year ? cur : max
                }, this.films[0])
                this.maxYear = maxYear.year

                //хроно
                const minTime = this.films.reduce((min, cur) => {
                    return cur.movieLength < min.movieLength ? cur : min
                }, this.films[0])
                this.minTime = minTime.movieLength

                const maxTime = this.films.reduce((max, cur) => {
                    return cur.movieLength > max.movieLength ? cur : max
                }, this.films[0])
                this.maxTime = maxTime.movieLength
            }
        },
        sortFilms(year, mark, time) {
            if (year || mark || time) {
                if (year) {
                    const sortedByYear = this.films.filter((movie) => {
                        return movie.year === Number(year)
                    })
                    this.sortedFilms = sortedByYear
                }
                if (mark) {
                    const sortedByMark = this.films.filter((movie) => {
                        return (
                            movie.rating.imdb <= mark &&
                            movie.rating.imdb >= mark - 1
                        )
                    })
                    this.sortedFilms = sortedByMark
                }
                if (time) {
                    const sortedByTime = this.films.filter((movie) => {
                        return (
                            movie.movieLength <= time + 10 &&
                            movie.movieLength >= time - 10
                        )
                    })
                    this.sortedFilms = sortedByTime
                }
            } else {
                this.sortedFilms = this.films
                alert('По вашим фильтрам не удалось ничего нафти! =(')
            }
            this.openSortMenu = ! this.openSortMenu
            this.hadSorted  = true
            console.log( this.sortedFilms)
        },
    },
})
