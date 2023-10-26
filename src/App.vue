<script setup>
import {RouterView } from 'vue-router'
import { onMounted } from 'vue'

const clearLocalStorage = ()=>{
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

<style scoped>

</style>
