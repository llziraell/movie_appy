import { defineStore } from "pinia"
import { useSortFilmStore } from "./SortFilmStore"

export const useFilmStore = defineStore("film", {
    state: () => ({
        films: null,
        currentPage: 1,
        perPage: 25,
        totalFilms: 0,

        searchedFilms: [],
        selectedName: "",
        selectedFilm: null,
        selectedFilmInfo: [],

        currentView: 1,
        recommendFilms: [],
    }),
    actions: {
        async fetchData() {
            if (this.films === null) {
                try {
                    const url = "http://localhost:3001/docs"
                    const resp = await fetch(url)

                    if (resp.ok) {
                        const data = await resp.json()
                        if (Array.isArray(data)) {
                            this.films = data
                            this.totalFilms = data.length
                        }
                    } else {
                        console.error("Ошибка загрузки данных:", resp.status)
                    }
                } catch (error) {
                    console.error("Ошибка загрузки данных", error)
                }
            }
        },
        searchFilms(inputFilm) {
            if (inputFilm.trim() === "") {
                this.searchedFilms = []
                return
            }
            const searchFilms = inputFilm.toLowerCase()
            this.searchedFilms = this.films.filter((movie) =>
                movie.name.toLowerCase().includes(searchFilms)
            )
        },
        searchFilmName(searchName) {
            this.selectedName = ""
            const selectedFilm = this.searchedFilms.find(
                (movie) => movie.name === searchName
            )
            if (selectedFilm) {
                this.selectedFilm = selectedFilm
                this.selectedName = selectedFilm.name
            }
            this.visibleselectedFilm = true

            // чтобы сортировка не сбивала поиск
            const FilmStore = useSortFilmStore()
            FilmStore.hadSorted = false
        },
        getFilmId(selectedFilmId) {
            this.selectedFilmInfo = this.films.filter((movie) => {
                return movie.id === selectedFilmId
            })
        },
        getrecommendFilms(film) {
            this.recommendFilms = this.films.filter((movie) => {
                let nonRepeat = movie.externalId._id !== film.externalId._id
                let byMark =
                    parseInt(film.rating.imdb) >= movie.rating.imdb &&
                    parseInt(film.rating.imdb) < parseInt(movie.rating.imdb) + 1
                let byType = film.type === movie.type
                return byType && byMark && nonRepeat
            })
            if (this.recommendFilms.length >= 5) {
                this.recommendFilms = this.recommendFilms.slice(0, 5)
            }
        },
    },
})
