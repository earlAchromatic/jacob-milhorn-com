<template>
  <Section>
    <div class="grid">
      <div
        v-for="(post, j) in posts"
        :style="{
          background: `var(--color-${colorNum - j})`,
        }"
      >
        <h1>{{ post.data.title }}</h1>
        <hr />
        <p>{{ post.data.excerpt }}</p>
        <a class="button" :href="post.url">Read</a>
      </div>
    </div>
  </Section>
</template>

<script setup>
import Section from './section.vue';
import { ref } from 'vue';
const colorNum = ref(9);
</script>

<script>
export default {
  props: ['posts'],
  frontMatter: {
    hydrate: {
      mode: 'eager',
      // the result of this function
      // will be passed to your component as props
      props({ collections }) {
        return {
          postUrls: collections.posts.map((e) => e.page.url),
        };
      },
    },
  },
};
</script>

<style scoped lang="sass">
.grid
  display: grid
  grid-gap: 1rem
  width: 90vw
  &>*
    box-shadow: var(--box-shadow-lifted)
    padding: 1rem
    display: flex
    flex-direction: column
    h1
      font-size: var(--s0)
      line-height: var(--s0)




@supports (width: min(250px, 100%))
  .grid
    grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr))
</style>
