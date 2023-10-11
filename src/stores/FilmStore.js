import { defineStore } from "pinia"
import {ref} from 'vue'

export const useFilmStore = defineStore("film", {
    state: () => ({
        films: null,
        currentPage: 1,
        perPage: 25,
        totalFilms: 0,

        //для поиска:
        searchedFilms: [],
        selectedName: "",
        selectedFilm: null,
    }),
    actions: {
        async fetchData() {
            if (this.films === null) {
                try {
                    const url = "http://localhost:3001/docs"
                    const resp = await fetch(url)

                    if (resp.ok) {
                        const data = await resp.json() //ожидаем получения и присваиваем

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
            // Проверяем, есть ли строка поиска
            if (inputFilm.trim() === "") {
                this.searchedFilms = [] // Если строка пуста, очищаем результаты
                return
            }
            const searchFilms = inputFilm.toLowerCase()
            this.searchedFilms = this.films.filter((movie) =>
                movie.name.toLowerCase().includes(searchFilms)
            )
            // console.log(this.searchedFilms)
        },
        searchFilmName(searchName) {
            this.selectedName = ''
            const selectedFilm = this.searchedFilms.find(
                (movie) => movie.name === searchName
            )
            if (selectedFilm) {
                this.selectedFilm = selectedFilm
                this.selectedName = selectedFilm.name
            }         
        },
    },
})
