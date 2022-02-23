<template>
  <nav>
    <div class="wrap">
      <h1 class="groovy">JacobMilhorn.com</h1>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style lang="sass">
nav
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
  font-size: 12rem
  color: black
  line-height: 6rem
  font-family: 'Atkinson'
  background: -webkit-linear-gradient(315deg,var(--color-3) 25%, var(--color-4))
  background-clip: text
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
</style>
