<script setup></script>

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
        <b-navbar-nav>
            <b-dropdown-item href="#">год</b-dropdown-item>
            <b-dropdown-item href="#">рейтинг</b-dropdown-item>
            <b-dropdown-item href="#">хронометраж</b-dropdown-item>
            <search-block></search-block>
        </b-navbar-nav>
    </b-navbar>
</template>
