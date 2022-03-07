<template>
  <div class="mat HC">
    <img src="/images/letter-j.svg" alt="" />
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit nam ad
      explicabo aperiam laborum harum placeat nisi tenetur obcaecati officia
      deleniti sit ipsam quisquamimi temporibus nemo delectus dolor?
    </p>
  </div>
</template>

<style lang="sass">
.mat
    display: flex
    justify-content: center
    flex-direction: column
    align-items: center

    margin: 10rem auto
    width: 90vw
    min-height: 50vh
    backdrop-filter: blur(5px)


    img
        max-width: 25rem
        filter: drop-shadow(var(--box-shadow-lifted))
    p
      background: white
      box-shadow: var(--box-shadow-lifted)
      padding: 2rem
</style>
