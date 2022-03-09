<template>
  <div>
    <button @click="setColorArray(colors[0].ghost, colorString)">Ghost</button>
    <button @click="setColorArray(colors[1].white, colorString)">White</button>
    <button @click="setColorArray(colors[2].multiorange, colorString)">
      Multi
    </button>
    <button @click="setColorArray(colors[3].greens, colorString)">Green</button>
    <button @click="setColorArray(colors[4].yellows, colorString)">
      Yellow
    </button>
    <button @click="setColorArray(colors[5].darks, colorString)">Dark</button>
    <button @click="setColorArray(colors[6].purples, colorString)">Teal</button>
    <button @click="currentColor = invertStyleArray(currentColor, colorString)">
      Invert
    </button>
    <button @click="resetSVG('#FF0000')">bg</button>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

import triggerContrast from '/@root/scripts/highContrast.js';
import { addProperties } from '/@root/scripts/color.js';

onMounted(() => {
  // els = [...document.querySelectorAll('.HC')]; // get all HC elements (high contrasts)
  // console.log(els);
  myStorage = window.localStorage;
  currentColor.value = JSON.parse(myStorage.getItem('color'));
});

let els = [];
const currentColor = ref([]);

let myStorage;

const colorString = '--color-';

const colors = [
  {
    ghost: [
      '#000000ff',
      '#00000000',
      '#00000000',
      '#00000000',
      '#00000000',
      '#00000000',
      '#ffffffff',
      '#00000000',
      '#00000000',
      '#00000000',
    ],
  },
  {
    white: [
      '#ffffffff',
      '#ffffffff',
      '#ffffffff',
      '#FF0000ff',
      '#ffffffff',
      '#ffffffff',
      '#000000ff',
      '#ffffffff',
      '#ffffffff',
      '#ffffffff',
    ],
  },
  {
    multiorange: [
      '#54478cff',
      '#2c699aff',
      '#048ba8ff',
      '#0db39eff',
      '#16db93ff',
      '#83e377ff',
      '#b9e769ff',
      '#efea5aff',
      '#f1c453ff',
      '#f29e4cff',
    ],
  },
  {
    greens: [
      '#007f5fff',
      '#2b9348ff',
      '#55a630ff',
      '#80b918ff',
      '#aacc00ff',
      '#bfd200ff',
      '#d4d700ff',
      '#dddf00ff',
      '#eeef20ff',
      '#ffff3fff',
    ],
  },
  {
    yellows: [
      '#ff7b00ff',
      '#ff8800ff',
      '#ff9500ff',
      '#ffa200ff',
      '#ffaa00ff',
      '#ffb700ff',
      '#ffc300ff',
      '#ffd000ff',
      '#ffdd00ff',
      '#ffea00ff',
    ],
  },
  {
    darks: [
      '#006466ff',
      '#065a60ff',
      '#0b525bff',
      '#144552ff',
      '#1b3a4bff',
      '#212f45ff',
      '#272640ff',
      '#312244ff',
      '#3e1f47ff',
      '#4d194dff',
    ],
  },
  {
    purples: [
      '#7400b8ff',
      '#6930c3ff',
      '#5e60ceff',
      '#5390d9ff',
      '#4ea8deff',
      '#48bfe3ff',
      '#56cfe1ff',
      '#64dfdfff',
      '#72efddff',
      '#80ffdbff',
    ],
  },
];

watch(currentColor, (val) => {
  addProperties(val);
  triggerContrast(els);
  saveStateLocally();
});

const saveStateLocally = () => {
  if (myStorage) {
    myStorage.setItem('color', JSON.stringify(currentColor.value));
  }
};

const setColorArray = (colors, code) => {
  currentColor.value = makeStyleArray(colors, code);
};

const makeStyleArray = (colorArray, code) => {
  return colorArray.map((e, i) => {
    return code + i + ': ' + e;
  });
};

const invertStyleArray = (colorArray, code) => {
  let tmp = [...colorArray].reverse();
  return colorArray.map((e, i) => {
    return code + i + ': ' + tmp[i].split(':')[1];
  });
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
button
    background: var(--primary)
</style>
