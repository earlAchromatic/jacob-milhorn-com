<template>
  <div class="wrap">
    <div class="blocks">
      <div
        v-for="(num, j) in nums"
        class="block holo-overlay"
        :style="{
          background: `var(--bg), var(--color-${
            nums - j
          }); background-position-x: ${j * 30}px`,
        }"
      ></div>
    </div>
    <div class="platform">
      <slot></slot>
      <hr />
      <h2>Comments</h2>
      <p>
        I'm always open to thoughts on the subject matter, new ideas, relevant
        criticisms, and different ways of looking at things. Have one of these?
        Write it in the comments below.
      </p>
      <div
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="d35a22ce-787d-431e-8b9b-92e7d415787f"
        :data-page-id="postUrl"
      ></div>
    </div>

    <div class="blocks">
      <div
        v-for="(num, j) in nums"
        class="block holo-overlay"
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
const props = defineProps(['postUrl']);
</script>

<style lang="sass">
#cusdis_thread
  bottom: 0
  position: relative
  //clip-path: inset(0 0 3% 0)
  max-width: var(--measure)
  iframe
    box-shadow: none

    border-radius: 0
    left: 0
    position: relative
    .underline
      display: none

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
  width: 90vw

figure
    padding: 1rem
    img
        max-width: 25rem
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
    margin: 2rem auto
    //box-shadow: var(--box-shadow)

  .block
    position: sticky
    top: 10rem

@media screen and ( max-width: 800px )
  .holo-overlay
    &::after
        box-shadow: inset 1px 1px 2px cyan
</style>
