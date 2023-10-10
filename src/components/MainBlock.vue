<script setup>
</script>

<template>
    <div >
        <header>
            <slot name="header">
            </slot>
        </header>
        <div class = "container">
            <slot name="container"></slot>
        </div>
        <footer>
            <slot name="footer">
            </slot>
        </footer>
    </div>
</template>

<style >
.container{
    background-color: #1a191f;
    max-width: 100vw;
    margin: 0 auto;
}
</style>