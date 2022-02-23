<template>
  <div>
    <button @click="setColorArray(colors[0].multiorange, colorString)">
      Multi
    </button>
    <button @click="setColorArray(colors[1].greens, colorString)">Green</button>
    <button @click="setColorArray(colors[2].yellows, colorString)">
      Yellow
    </button>
    <button @click="setColorArray(colors[3].darks, colorString)">Dark</button>
    <button @click="setColorArray(colors[4].purples, colorString)">Teal</button>
    <button @click="currentColor = invertStyleArray(currentColor, colorString)">
      Invert
    </button>
    <button @click="resetSVG('#FF0000')">bg</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const currentColor = ref([]);

const colorString = '--color-';

const colors = [
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

watch(currentColor, (val) => addProperties(val));

const setColorArray = (colors, code) => {
  currentColor.value = makeStyleArray(colors, code);
};

const makeStyleArray = (colorArray, code) => {
  return colorArray.map((e, i) => {
    return code + i + ': ' + e;
  });
};

const addProperties = (styleArray) => {
  let root = document.documentElement;
  styleArray.forEach((e) => {
    root.style.setProperty(e.split(':')[0], e.split(':')[1]);
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
  console.log(rand);
  let root = document.documentElement;
  let bg = window.getComputedStyle(root).backgroundImage;

  bg = bg.split('),')[0] + ')';
  console.log(bg);
  let search = new RegExp(/fill=\'.*?\'/g);
  bg = bg.replace(search, `fill='${rand.replace('#', '%23')}'`);

  console.log(bg);
  let el = document.querySelector('html');
  el.style.setProperty(
    'background',
    bg + ', linear-gradient(var(--primary), var(--color-5))'
  );
  let a = window.getComputedStyle(el).background;
  console.log(a);
};
</script>

<style lang="sass" scoped>
div
    position: fixed
    top: 10rem
</style>
