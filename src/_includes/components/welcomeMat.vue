<template>
  <div class="mat HC">
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
      jacob@hyperionweb.dev |
      <a href="https://github.com/earlAchromatic" nofollow
        >github.com/earlAchromatic</a
      >| Discord: hyperguy#1660
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
</style>
