<template>
  <div class="mat HC">
    <img src="/images/letter-j.svg" alt="" />
    <p>
      Hey there, I'm Jacob. I am a software engineer, creator, and designer.
    </p>
    <p>
      Thanks for visiting my personal site. It's a place where I experiment with
      ideas and technology and ramble on about a few topics I care about.
    </p>
    <p>
      Want to get in touch? jacob@hyperionweb.dev | 740-641-7921 |
      github.com/earlAchromatic
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
