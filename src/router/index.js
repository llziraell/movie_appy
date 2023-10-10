import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import FilmView from '@/views/FilmView.vue'
import BookmarkView from '@/views/BookmarkView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'main',
        component: MainView
      },
      {
        path: '/film',
        name: 'film',
        component: FilmView
      },
      {
       path: '/bookmark',
       name: 'bookmark',
       component: BookmarkView}
    ]
  })

  export default router

