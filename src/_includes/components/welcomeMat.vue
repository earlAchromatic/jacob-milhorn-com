<template>
  <div class="mat">
    <img src="/images/letter-j.svg" alt="" />
    <div>
      <p>
        Hey there Fellow Human, I'm Jacob. I am a software engineer, creator,
        and designer.
      </p>
      <p>
        Thanks for visiting my personal site. It's a place where I experiment
        with new ideas, technology and occasionally ramble on about a topic or
        two that I care about.
      </p>

      <h2 class="text-center">Want to get in touch?</h2>
      <a href="mailto:jacob.milhorn@gmail.com">jacob.milhorn@gmail.com</a>
      |
      <a href="https://github.com/earlAchromatic" target="_blank"
        >github.com/earlAchromatic</a
      >
      |
      <a href="https://discordapp.com/users/hyperguy#1660/" target="_blank">
        Discord: hyperguy#1660</a
      >
      |
      <a href="/Jacob Milhorn Resume 2022.pdf">CV</a>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.mat
    display: flex
    justify-content: center
    flex-direction: column
    align-items: center

    margin: 8rem auto
    width: 90vw
    min-height: 50vh
    p
      padding-bottom: 1rem
    img
        max-width: 25rem
        filter: drop-shadow(var(--box-shadow-lifted))
    div
      background: white
      box-shadow: var(--box-shadow-lifted)
      padding: 2rem
    .text-center
      text-align: center
    a
      border-bottom-color: aqua
</style>
