import { defineStore } from "pinia"
import { ref } from "vue"

import { useFilmStore } from "./FilmStore"

//const FilmStore = piniaStore.FilmStore

export const useSortFilmStore = defineStore("SortFilms", {
    state: () => ({
        films: [],
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
            if (year) {
                console.log(this.films)
                const sortedByYear = this.films.filter((movie) =>{ 
                    movie.year === Number(year)
                })
                //console.log(typeof(Number(year)))
                if (sortedByYear) {
                    this.sortedFilms = sortedByYear
                console.log(this.sortedFilms)
                }     
            }
            if (mark) {
                const sortedByMark = this.films.filter((movie) =>{ 
                    movie.rating.imdb <= (mark) && movie.rating.imdb >= (mark - 1)
                })
                this.sortedFilms = sortedByMark
            }
            if (time) {
                const sortedByTime = this.films.filter((movie) =>{ 
                    movie.movieLength <= (time+10) && movie.movieLength >= (time - 10)
                })
                this.sortedFilms = sortedByTime
            }

        },
    },
})
