import { defineStore } from "pinia"

export const useFilmStore = defineStore("film", {
    state: () => ({
        films: null,
        currentPage: 1,
        perPage: 25,
        totalFilms: 0,
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
    },
})
