<script setup>
import MainBlock from "@/components/MainBlock.vue"
import NavBar from "@/components/NavBar.vue"
import MovieCard from "@/components/MovieCard.vue"
</script>

<template>
    <main-block>
        <template #header>
            <nav-bar></nav-bar>
        </template>
        <template #container>
            <div>
                <b-carousel
                    v-model="slide"
                    :interval="4000"
                    controls
                    indicators
                    background="#ababab"
                   style = "width: 100%; height: 85vh;"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd"
                >
                    <b-carousel-slide
                        caption="Избранное"
                        style="color: #fff"
                        text="..."
                        
                    >

                </b-carousel-slide>
                    <b-carousel-slide
                        caption="Вы оценили"
                        text="..."
                    ></b-carousel-slide>
                </b-carousel>

            </div>
        </template>
        <template #footer> </template>
    </main-block>
</template>

<style scoped>

</style>
