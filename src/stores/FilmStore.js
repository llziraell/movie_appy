import { defineStore } from "pinia"
import { computed } from "vue"
import { useFetch} from "@vueuse/core"

const url = computed(() => {
    return `http://localhost:3001/docs`
})


const { isFetching, error, data } = useFetch(url, {
    refetch: true, //автоматический повторный запрос
}).json()

export const useFilmStore = defineStore("film", {
    state: () => ({
        films: data,
    }),
    actions: {
    },
})
