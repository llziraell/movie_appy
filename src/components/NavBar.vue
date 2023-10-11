<script setup>
import SearchBlock from "@/components/SearchBlock.vue";
import { useFilmStore } from "@/stores/FilmStore"
import {ref} from 'vue'
const Films = useFilmStore()

</script>

<template>
    <b-navbar
        toggleable="lg"
        sticky="top"
        class="bg-dark"
    >
        <b-navbar-nav>
            <b-navbar-brand
                href="#"
                class="text-white"
                >MovieApp</b-navbar-brand
            >
            <b-nav-item @click.prevent="$router.push(`${'bookmark'}`)">
                Избранное
            </b-nav-item>
        </b-navbar-nav>
        <search-block></search-block>
    </b-navbar>
</template>
