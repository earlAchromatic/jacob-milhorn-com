<template>
  <div class="mother">
    <Transition @enter="onAfterEnter">
      <div id="generated" v-if="show">
        <keep-alive>
          <colorChanger />
        </keep-alive></div
    ></Transition>

    <div id="generator" @click="show = !show">
      <img v-show="!show" src="/images/holo-off.png" alt="" />
      <img v-show="show" src="/images/holo-on.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import colorChanger from './colorChanger.vue';

const show = ref(false);

const onAfterEnter = (env) => {
  env.style.width = '100%';
};
</script>

<style lang="sass">
.mother
    cursor: pointer
    display: flex
    position: fixed
    top: 5rem
    z-index: 100
#generator
    width: 3rem
    height: 3rem
    position: relative
    right: 0
    img
      width: 5rem
      position: absolute
      top: -4px

    //background: var(--color-3)
    //box-shadow: var(--box-shadow-lifted)
#generated
    position: fixed
    width: 100%
    background: aqua
    height: 3rem
    background-color: rgba(123, 208,246 , 0.5)
    background: url('/@root/public/images/signal.svg')
    animation: slider 1s infinite forwards
    box-shadow: inset 1px 1px 25px rgba(123, 208,246  )
    display: flex
    justify-content: center
    flex-wrap: nowrap
    margin-left: 3rem
    backdrop-filter: blur(10px)
    clip-path: polygon(25px 0%, 100% 0%, 100% 100%, 25px 100%, 0 50%)
    &>*
        margin-left: -3rem
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active
  transition: all 0.5s ease
  width: 100%

.v-enter-from,
.v-leave-to
  width: 0!important
  opacity: 0


@keyframes slider
    0%
        background-position-x: 0
    100%
        background-position-x: 100%
</style>
