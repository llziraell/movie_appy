import { defineStore } from "pinia"
import { useFilmStore } from "./FilmStore"

export const useLocalStore = defineStore("localStore", {
    state: () => ({
        films: [],
        bookmarks: [],
        marks: [],
        bookmarks_ids: [],
        maxRating: 10,
        rates: null,
    }),
    actions: {
        getFilms() {
            const Films = useFilmStore()
            this.films = Films.films
        },
        getMarks(film_id) {
            if (this.rates !== null) {
                const ratingObj = this.rates.find(
                    (rate) => Object.keys(rate)[0] === film_id
                )
                return ratingObj ? ratingObj[film_id] : 0
            }
        },
        addMarks(film_id, rate) {
            this.getFilms()
            this.rates = JSON.parse(localStorage.getItem("rates"))

            const mark = {
                [film_id]: rate,
            }

            if (this.rates.length !== 0) {
                const exist_film_id = this.rates.find((item) => item[film_id])
                if (exist_film_id) {
                    this.rates = this.rates.filter(
                        (item) => Object.keys(item)[0] !== film_id
                    )
                    if (exist_film_id[film_id] === rate) {
                        this.rates = this.rates.filter(
                            (obj) => obj[film_id] !== rate
                        )
                    } else {
                        const mark = {
                            [film_id]: rate,
                        }
                        this.rates.push(mark)
                    }
                } else {
                    this.rates.push(mark)
                }
            } else {
                this.rates.push(mark)
            }
            localStorage.setItem("rates", JSON.stringify(this.rates))
        },
        getMarkedFilms() {
            if (this.rates !== null) {
                const filmIds = this.rates.map((item) => Object.keys(item)[0])

                this.marks = this.films.filter((film) =>
                    filmIds.some((id) => film.externalId._id === id)
                )
                return this.marks
            }
        },
        addBookMarks(film_id) {
            if (!this.bookmarks_ids.includes(film_id)) {
                this.bookmarks_ids.push(film_id)
                localStorage.setItem(
                    "film_id",
                    JSON.stringify(this.bookmarks_ids)
                )
            }
            const film = this.films.find(
                (movie) => movie.externalId._id === film_id
            )

            if (!this.bookmarks.includes(film)) {
                film.isChecked = true
                this.bookmarks.push(film)
            }
        },
        popBookMarks(film_id) {
            const index = this.bookmarks_ids.indexOf(film_id)
            if (index > -1) {
                this.bookmarks_ids.splice(index, 1)
                localStorage.setItem(
                    "film_id",
                    JSON.stringify(this.bookmarks_ids)
                )
            }
            const filmIndex = this.bookmarks.findIndex(
                (movie) => movie.externalId._id === film_id
            )
            if (filmIndex > -1) {
                this.bookmarks.splice(filmIndex, 1)
            }
        },
        toggleBookmark(film_id) {
            this.getFilms()
            const index = this.bookmarks_ids.indexOf(film_id)

            if (index === -1) {
                this.addBookMarks(film_id)
            } else {
                this.popBookMarks(film_id)
            }
        },
    },
})
