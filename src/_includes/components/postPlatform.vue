<template>
  <div class="wrap">
    <div class="blocks">
      <div
        v-for="(num, j) in nums"
        class="block"
        :style="{
          background: `var(--bg), var(--color-${
            nums - j
          }); background-position-x: ${j * 30}px`,
        }"
      ></div>
    </div>
    <div class="platform">
      <slot></slot>
    </div>

    <div class="blocks">
      <div
        v-for="(num, j) in nums"
        class="block"
        :style="{
          background: `var(--bg), var(--color-${
            nums - j
          }); background-position-y: ${j * 60}px`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const nums = ref(9);
</script>

<style lang="sass">
.platform
  margin: 0 auto
  width: 70vw
  background: rgba(255,255 ,255 , 0.95)
  box-shadow: var(--box-shadow-lifted)
  padding: 2rem
  margin-top: 7rem
.wrap
  display: flex
  flex-direction: row


figure
    padding: 1rem
    img
        margin: 0 auto
        box-shadow: var(--box-shadow)
.blocks

  display: flex
  flex-direction: column
  margin-top: 10rem
  align-items: center

  .block
    width: 5rem
    height: 5rem
    margin: 2rem
    //box-shadow: var(--box-shadow)

  .block
    position: sticky
    top: 10rem
</style>
