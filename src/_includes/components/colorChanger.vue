<template>
  <div>
    <div class="button-cluster">
      <button @click="currentColor = colors[0]">Monochrome</button>
      <button @click="currentColor = colors[1]">Baseline</button>
      <button @click="currentColor = colors[2]">Jacob's Choice</button>
      <button @click="currentColor = colors[3]">Tractor</button>
      <button @click="currentColor = colors[4]">Gas Giant</button>
      <button @click="currentColor = colors[5]">Deep</button>
      <button @click="currentColor = colors[6]">Tonic</button>
      <button @click="currentColor = colors[7]">Iceberg</button>
      <button @click="currentColor = colors[8]">Sand</button>
    </div>

    <button class="invert" @click="invert = !invert" :disabled="invertDisabled">
      Invert
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

import { addProperties, colors, setFontColor } from '/@root/scripts/color.js';

onMounted(() => {
  myStorage = window.localStorage;
  currentColor.value = JSON.parse(myStorage.getItem('color'));
  currentColor.value = currentColor.value ?? colors[1];
  invert.value = currentColor.value.inverted;
  invertDisabled.value = currentColor.value.disableInvert;
});

const currentColor = ref({});
const invertDisabled = ref();
const invert = ref();

let myStorage;

watch(currentColor, (val) => {
  addProperties(val, currentColor.value.inverted);
  invert.value = currentColor.value.inverted;
  invertDisabled.value = currentColor.value.disableInvert;
  saveStateLocally();
});

watch(invert, (val) => {
  addProperties(currentColor.value, val);
  currentColor.value.inverted = val;
  saveStateLocally();
});

const saveStateLocally = () => {
  if (myStorage) {
    myStorage.setItem('color', JSON.stringify(currentColor.value));
  }
};

const resetSVG = (hexColor) => {
  let rand = Math.floor(Math.random() * 16777215).toString(16);
  rand = '#' + rand;

  let root = document.querySelector('.block');
  let bg = window.getComputedStyle(root).background;

  bg = bg.split('),')[0] + ')';

  let search = new RegExp(/fill=\'.*?\'/g);
  bg = bg.replace(search, `fill='${rand.replace('#', '%23')}'`);

  let el = document.querySelectorAll('.block');
  console.log(el);
  el.forEach((e, i) => {
    e.style.setProperty('background', bg + `, var(--color-${e.length - i}`);

    e.style.setProperty('background-position-x', `${i * 30}px`);
    console.log(e.style.background);
  });
};
</script>

<style lang="sass" scoped>

.button-cluster
  display: flex
  flex-wrap: wrap
  align-content: space-around
  justify-content: left
  width: 50%
hr
  width: 1px
  margin-right: 1rem
button
    background: transparent
    border: none
    margin-right: 0.5rem
    &:hover
      background: var(--primary)
      color: #cbcbcb
    &[disabled]
      filter: saturate(0.2)
      &:hover
        background: none
        cursor: not-allowed
.invert
  height: 70%
  background: var(--color-4)
  box-shadow: var(--box-shadow)
</style>
