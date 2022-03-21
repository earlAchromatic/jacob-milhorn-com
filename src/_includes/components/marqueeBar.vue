<template>
  <div class="mother">
    <Transition :name="shouldTransition ? 'slide' : ''" @enter="onAfterEnter">
      <div id="generated" v-if="show">
        <div class="namer">
          Hey There 👋,
          <input
            type="text"
            v-model.trim="userName"
            @input="throttledStoreUserName"
            label="Name"
            placeholder="Enter Your Name"
          />
        </div>
        <colorChanger /></div
    ></Transition>

    <div id="generator" @click="showit">
      <img v-show="!show" src="/images/holo-off.png" alt="" />
      <img v-show="show" src="/images/holo-on.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import colorChanger from './colorChanger.vue';
import { debounce } from 'lodash';

onMounted(() => {
  myStorage = window.localStorage;
  let showBar = myStorage.getItem('bar');
  if (showBar == 'true') {
    shouldTransition.value = false;
    show.value = showBar == 'true';
    setTimeout(() => (shouldTransition.value = true), 500);
  }

  userName.value = myStorage.getItem('username');
  fellowHumanEls.value = getFellowHumanEls();
  if (userName.value !== '' && userName.value !== null) {
    replaceFellowHuman('Fellow Human');
    tempUsername.value = userName.value;
  } else {
    tempUsername.value = 'Fellow Human';
  }

  setTimeout(() => {
    if (!document.cookie.includes('popped')) {
      document.cookie = 'popped=true; path=/';
      show.value = !show.value;
    }
  }, 1500);
});

const shouldTransition = ref(true);
const show = ref();
const userName = ref('');
const tempUsername = ref('');
const fellowHumanEls = ref([]);

let myStorage;
const showit = () => {
  show.value = !show.value;
  if (myStorage) {
    myStorage.setItem('bar', show.value);
  }
};

const onAfterEnter = (env) => {
  env.style.width = '100%';
};

function replace(element, from, to) {
  if (element.childNodes.length) {
    element.childNodes.forEach((child) => replace(child, from, to));
  } else {
    const cont = element.textContent;
    if (cont) element.textContent = cont.replace(from, to);
  }
}

const getFellowHumanEls = () => {
  let humanEls = [];
  let els;
  if (document.querySelector('.mat')) {
    els = document.querySelector('.mat').querySelectorAll('p'); //total hack, okay.
  } else {
    els = document.querySelector('astro-fragment').querySelectorAll('*');
  }

  els.forEach((el) => {
    if (el.textContent.includes('Fellow Human')) {
      humanEls.push(el);
    }
  });
  console.log(humanEls);
  return humanEls;
};

const throttledStoreUserName = debounce(() => {
  Replace();
  myStorage.setItem('username', userName.value);
}, 1000);

const Replace = () => {
  if (tempUsername.value !== '' && userName.value != '') {
    console.log(`replacing ${tempUsername.value} with ${userName.value}`);
    replaceFellowHuman(tempUsername.value);
    tempUsername.value = userName.value;
  }
};

const replaceFellowHuman = (from) => {
  fellowHumanEls.value.forEach((el) => {
    replace(el, from, userName.value);
  });
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
    background-size: 0.5rem
    animation: var(--animation) 0.5s infinite forwards linear
    box-shadow: inset 1px 1px 25px rgba(123, 208,246  )
    display: flex
    justify-content: center
    align-items: center
    flex-wrap: nowrap
    margin-left: 3rem
    backdrop-filter: blur(10px) hue-rotate(45deg)
    clip-path: polygon(25px 0%, 100% 0%, 100% 100%, 25px 100%, 0 50%)

    button
          font-size: 0.8rem
    .invert
      color: var(--font-color)
    .accessibility
      height: 70%
      background: var(--color-4)
      box-shadow: var(--box-shadow)
      border: none
      display: flex
      flex-direction: column
      color: var(--font-color)
      span
        font-size: 0.6rem
        margin: 0
        color: inherit

      &:hover
        background: var(--primary)
        color: #cbcbcb
    &>*
        margin-left: -3rem
        display: flex
        flex-direction: row
        align-items: center
        justify-content: center

    input
      background: none
      border: none
      text-decoration: none

@supports not ( ( -webkit-backdrop-filter: blur(9px) ) or ( backdrop-filter: blur(9px) ) )
 #generated
   background: #00FFFFCF
/* we will explain what these classes do next! */
.slide-enter-active,
.slide-leave-active
  transition: all 0.5s ease
  width: 100%

.slide-enter-from,
.slide-leave-to
  width: 0!important
  opacity: 0

@media screen and ( max-width: 1100px )
  #generator img

    left: -18px
    width: 9rem
    top: -19px

  #generated
    height: 7rem
    flex-direction: column
    width: 90vw
    height: 15vh
    clip-path: none
    margin: 0
    padding: 1rem
    justify-content: space-evenly

  #generated .accessibility
    height: auto
</style>
