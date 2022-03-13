<template>
  <div>
    <div class="button-cluster">
      <button @click="setColorArray(colors[0], colorString)">Monochrome</button>
      <button @click="setColorArray(colors[1], colorString)">Baseline</button>
      <button @click="setColorArray(colors[2], colorString)">
        Jacob's Choice
      </button>
      <button @click="setColorArray(colors[3], colorString)">Tractor</button>
      <button @click="setColorArray(colors[4], colorString)">Gas Giant</button>
      <button @click="setColorArray(colors[5], colorString)">Deep</button>
      <button @click="setColorArray(colors[6], colorString)">Tonic</button>
      <button @click="setColorArray(colors[7], colorString)">Iceberg</button>
      <button @click="setColorArray(colors[8], colorString)">Sand</button>
    </div>

    <button
      class="invert"
      @click="currentColor = invertStyleArray(currentColor, colorString)"
    >
      Invert
    </button>
    <!-- <button @click="invertFontColor">Invert Text Color</button> -->
    <!-- <button @click="resetSVG('#FF0000')">bg</button> -->
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

import { addProperties, colors } from '/@root/scripts/color.js';

onMounted(() => {
  // els = [...document.querySelectorAll('.HC')]; // get all HC elements (high contrasts)
  // console.log(els);
  myStorage = window.localStorage;
  currentColor.value = JSON.parse(myStorage.getItem('color'));
  currentColor.value = currentColor.value ?? colors[1].white;
  currentColorName.value = myStorage.getItem('colorName');
  currentColorIndex.value = getCurrentColorIndex(currentColorName.value);
  console.log(currentColorIndex.value);
  setTextColors(colors[currentColorIndex.value]);
  setFontColor(colors[currentColorIndex.value]);
});

const currentColor = ref([]);
const textColors = ref({});
const currentColorName = ref('');
const currentColorIndex = ref(0);

const invert = ref(false);

let myStorage;

const colorString = '--color-';

watch(currentColor, (val) => {
  addProperties(val);
  saveStateLocally();
});

const saveStateLocally = () => {
  if (myStorage) {
    myStorage.setItem('color', JSON.stringify(currentColor.value));
    myStorage.setItem('colorName', currentColorName.value);
  }
};

const getCurrentColorIndex = (getColor) => {
  let index;
  colors.forEach((color, i) => {
    if (Object.keys(color)[0] === getColor) {
      index = i;
    }
  });
  return index;
};

const setFontColor = (colors) => {
  document.documentElement.style.setProperty('--font-color', colors.textColor);
};

const setTextColors = (colors) => {
  textColors.value = {
    textColor: colors.textColor,
    invertColor: colors.invertColor,
  };
};

const newInvertColors = () => {
  if (invert.value) {
    document.documentElement.style.setProperty(
      '--font-color',
      textColors.value.invertColor
    );
  } else {
    document.documentElement.style.setProperty(
      '--font-color',
      textColors.value.textColor
    );
  }

  invert.value = !invert.value;
};

const invertFontColor = () => {
  let root = getComputedStyle(document.documentElement);

  if (root.getPropertyValue('--font-color') === 'black') {
    document.documentElement.style.setProperty('--font-color', 'white');
  } else {
    document.documentElement.style.setProperty('--font-color', 'black');
  }
};

const setColorArray = (colors, code) => {
  let colorArr = Object.values(colors)[0];
  currentColor.value = makeStyleArray(colorArr, code);
  setFontColor(colors);
  setTextColors(colors);
  currentColorName.value = Object.keys(colors)[0];
  console.log(currentColorName.value);
};

const makeStyleArray = (colorArray, code) => {
  return colorArray.map((e, i) => {
    return code + i + ': ' + e;
  });
};

const invertStyleArray = (colorArray, code) => {
  let tmp = [...colorArray].reverse();
  newInvertColors();
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
.invert
  height: 70%
  background: var(--color-4)
  box-shadow: var(--box-shadow)
</style>
