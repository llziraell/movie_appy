<script setup>
import SearchBlock from "@/components/SearchBlock.vue"
import SortBlock from "./SortBlock.vue"

</script>

<template>
    <b-navbar
        toggleable="lg"
        sticky="top"
        style="background-color: rgb(30, 30, 37)"
    >
        <b-navbar-nav>
            <b-navbar-brand
                href="#"
                class="text-white"
                @click="$router.push(`${'/'}`)"
                style="margin-top: 6px"
                >ПоискКино</b-navbar-brand
            >
            <b-nav-item @click="$router.push(`${'bookmark'}`)">
                <b-nav-text style="color: gold">Избранное</b-nav-text>
            </b-nav-item>
            <b-nav-item>{{ $route.params.componentName }}</b-nav-item>
        </b-navbar-nav>
        <SortBlock></SortBlock>
        <SearchBlock></SearchBlock>
    </b-navbar>
</template>
