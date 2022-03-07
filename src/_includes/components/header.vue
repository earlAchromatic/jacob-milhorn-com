<template>
  <nav>
    <div class="wrap">
      <h1 class="groovy">JacobMilhorn.com</h1>
    </div>
  </nav>
  <marqueeBar />
</template>

<script setup>
import marqueeBar from './marqueeBar.vue';
import { ref } from 'vue';
</script>

<style lang="sass">
nav
  pointer-events: none
  box-shadow: var(--box-shadow-lifted)
  padding: 0
  margin: 0
  height: 5rem
  &>*
    display: flex
    justify-content: center

.wrap
  width: 100%
  height: 100%

.groovy

  font-size: 11rem
  color: black
  line-height: 4rem
  font-family: 'Atkinson'
  background: -webkit-linear-gradient(315deg,var(--color-6) 25%, var(--color-2))
  background-clip: text
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
</style>
