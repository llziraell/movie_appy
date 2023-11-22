import { createApp } from "vue"
import App from "./App.vue"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue-next/dist/bootstrap-vue-next.css"

import { BootstrapVueNext } from "bootstrap-vue-next"
import { createPinia } from "pinia"

import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(BootstrapVueNext)

app.mount("#app")
