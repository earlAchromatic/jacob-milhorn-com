<template>
  <div>
    <button @click="setColorArray(colors[0].ghost, colorString)">
      Monochrome
    </button>
    <button @click="setColorArray(colors[1].white, colorString)">
      Baseline
    </button>
    <button @click="setColorArray(colors[2].multiorange, colorString)">
      Jacob's Choice
    </button>
    <button @click="setColorArray(colors[3].greens, colorString)">
      Tractor
    </button>
    <button @click="setColorArray(colors[4].yellows, colorString)">
      Gas Giant
    </button>
    <button @click="setColorArray(colors[5].darks, colorString)">Deep</button>
    <button @click="setColorArray(colors[6].purples, colorString)">
      Tonic
    </button>
    <button @click="setColorArray(colors[7].blue, colorString)">Iceberg</button>
    <button @click="setColorArray(colors[8].sand, colorString)">Sand</button>
    <button @click="currentColor = invertStyleArray(currentColor, colorString)">
      Invert
    </button>
    <!-- <button @click="resetSVG('#FF0000')">bg</button> -->
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
  currentColor.value = currentColor.value ?? colors[1].white;
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
      '#a4a4a4e0',
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
      '#353535e8',
      '#ffffffff',
      '#ffffffff',
      '#ffffffff',
    ],
  },

  {
    multiorange: [
      '#f29e4cff',
      '#f1c453ff',
      '#efea5aff',
      '#b9e769ff',
      '#83e377ff',
      '#16db93ff',
      '#0db39eff',
      '#048ba8ff',
      '#2c699aff',
      '#54478cff',
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
  {
    blue: [
      '#E3F2FD',
      '#BBDEFB',
      '#90CAF9',
      '#64B5F6',
      '#42A5F5',
      '#2196F3',
      '#1E88E5',
      '#1976D2',
      '#1565C0',
      '#0D47A1',
    ],
  },
  {
    sand: [
      '#CCD5AE',
      '#DBE1BC',
      '#E9EDC9',
      '#F4F4D5',
      '#FEFAE0',
      '#FCF4D7',
      '#FAEDCD',
      '#E7C8A0',
      '#DEB68A',
      '#D4A373',
    ],
  },
];

watch(currentColor, (val) => {
  addProperties(val);
  triggerContrast(window.els);
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
    background: transparent
    border: none
    margin-right: 0.5rem
    &:hover
      background: var(--primary)
      color: #cbcbcb
</style>
