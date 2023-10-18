import { defineStore } from "pinia"
import { ref } from "vue"

import { useFilmStore } from "./FilmStore"

export const useLocalStore = defineStore("localStore", {
    state: () => ({
        films: [],
        bookmarks: [],
        marks: [],
        bookmarks_ids: [],
    }),
    actions: {
        getFilms() {
            const Films = useFilmStore()
            this.films = Films.films
        },
        getMarks() {},

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
            console.log('sdsds')
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

        toggleBookmark(film_id){
            this.getFilms()
            const index = this.bookmarks_ids.indexOf(film_id);
          
            if (index === -1) {
              this.addBookMarks(film_id);
            } else {
              this.popBookMarks(film_id);
            }
        }
    },
})
