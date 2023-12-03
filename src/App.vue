<script setup>
import { RouterView } from "vue-router"
import { onMounted } from "vue"

// зачем здесь очищение локал стореджа? - специально вроде было 
const clearLocalStorage = () => {
    localStorage.clear()
    localStorage.setItem("rates", JSON.stringify([]))
}
onMounted(clearLocalStorage)
</script>

<template>
    <div class="app">
        <RouterView />
    </div>
</template>
