import { defineStore } from "pinia"
import { useFilmStore } from "./FilmStore"

export const useSortFilmStore = defineStore("SortFilms", {
    state: () => ({
        films: [],
        sortedFilms: null,
        hadSorted: false,
        minYear: 0,
        maxYear: 0,
        minMark: 0,
        maxMark: 10,
        minTime: 0,
        maxTime: 0,
        openSortMenu: false,

        currentPage: 1,
        perPage: 25,
        totalFilms: 0,
    }),
    actions: {
        updateOpenSortMenu() {
            this.openSortMenu = !this.openSortMenu
        },
        getSortParameters() {
            const Films = useFilmStore()
            this.films = Films.films

            if (Films.films) {
                const minYear = this.films.reduce((min, cur) => {
                    return cur.year < min.year ? cur : min
                }, this.films[0])
                this.minYear = minYear.year

                const maxYear = this.films.reduce((max, cur) => {
                    return cur.year > max.year ? cur : max
                }, this.films[0])
                this.maxYear = maxYear.year

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
        sortFilms(year, mark, time, films) {
            if (year || mark || time) {
                this.sortedFilms = films.filter((film) => {
                    let byYear =
                        !year ||
                        (parseInt(film.year) >= parseInt(year) - 10 &&
                            parseInt(film.year) < parseInt(year) + 10)
                    let byMark =
                        !mark ||
                        (parseInt(film.rating.imdb) >= mark &&
                            parseInt(film.rating.imdb) < parseInt(mark) + 1)
                    let byTime = !time || film.movieLength < time
                    return byYear && byMark && byTime
                })
            } else {
                this.sortedFilms = films
                alert("фильтр не найден =(")
            }
            if (this.sortedFilms.length === 0) {
                this.sortedFilms = films
                alert("фильтр не смог найти ничего подобного")
            }
            this.totalFilms = this.sortedFilms.length
            this.openSortMenu = !this.openSortMenu
            this.hadSorted = true
        },
    },
})
