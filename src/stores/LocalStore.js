import { defineStore } from "pinia"
import { ref } from "vue"

import { useFilmStore } from "./FilmStore"

export const useLocalStore = defineStore("localStore", {
    state: () => ({
        films: [],
        bookmarks: [],
        marks_ids: [],
        marks: [],
        bookmarks_ids: [],
        maxRating: 10,
    }),
    actions: {
        getFilms() {
            const Films = useFilmStore()
            this.films = Films.films
        },
        getMarks(film_id) {
            this.getFilms()
            let rates = JSON.parse(localStorage.getItem("rates"))
            if (rates.length !== 0){
                const exist_film_id = rates.find((item) => item[film_id])
                if (exist_film_id)
                    return exist_film_id[film_id]
                return 0
            }
        },
        addMarks(film_id, rate) {
            this.getFilms()

            let rates = JSON.parse(localStorage.getItem("rates"))

            if (rates.length !== 0) {
                const exist_film_id = rates.some((item) => item[film_id])
                if (exist_film_id) {
                    rates = rates.filter((item) => {
                        item.film_id !== film_id
                    })
                }
            }
            const mark = {
                [film_id]: rate,
            }
            rates.push(mark)
            console.log(rates)
            localStorage.setItem("rates", JSON.stringify(rates))

            // для раскраски звезд
            if (rate === this.currentRating) {
                this.currentRating = 0
            } else {
                this.currentRating = rate
            }

            const film = this.films.find(
                (movie) => movie.externalId._id === film_id
            )

            if (!this.marks.includes(film)) {
                film.rate = rate
                this.marks.push(film)
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
            console.log("sdsds")
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
    getters: {},
})
