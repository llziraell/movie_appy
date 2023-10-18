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
        selectedFilmInfo: []
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
            this.selectedName = ''
            const selectedFilm = this.searchedFilms.find(
                (movie) => movie.name === searchName
            )
            if (selectedFilm) {
                this.selectedFilm = selectedFilm
                this.selectedName = selectedFilm.name
            }     
            this.visibleselectedFilm = true    
        },
        getFilmId(selectedFilmId){
            console.log(selectedFilmId)
            this.selectedFilmInfo = this.films.filter((movie)=>{
                return movie.id === selectedFilmId
            })
            console.log(this.films)
            console.log(this.selectedFilmInfo)
        },
    },
})
