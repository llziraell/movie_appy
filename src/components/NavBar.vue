<script setup>
import SearchBlock from "@/components/SearchBlock.vue"
import SortBlock from "./SortBlock.vue"

props: ['selectNav']


</script>

<template>
    <b-navbar
        toggleable="lg"
        sticky="top"
        style = "background-color: rgb(30, 30, 37);"
    >
        <b-navbar-nav>
            <b-navbar-brand
                href="#"
                class="text-white"
                @click.prevent="$router.push(`${'/'}`)"
                style = "margin-top: 6px;"
                >ПоискКино</b-navbar-brand
            >
            <b-nav-item
                @click.prevent="$router.push(`${'bookmark'}`)"
            >
               <b-nav-text style = "color: yellow;">Избранное</b-nav-text>
            </b-nav-item>
            <b-nav-item>{{ $route.params.componentName }}</b-nav-item>
        </b-navbar-nav>
        <sort-block :selectNav = "selectNav"></sort-block>
        <search-block></search-block>
    </b-navbar>
</template>

