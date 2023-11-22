<template>
    <div>
        <header>
            <slot name="header"> </slot>
        </header>
        <div class="container">
            <slot name="container"></slot>
        </div>
        <footer class="footer">
            <slot name="footer"> </slot>
        </footer>
    </div>
</template>

<style lang="scss">
@import '@/assets/main.scss';

.container {
    background-color: $main-bg-color;
    max-width: 100vw;
    margin: 0 auto;
}

.footer {
    background-color: $main-bg-color;
}
</style>
