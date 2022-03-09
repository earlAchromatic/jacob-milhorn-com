<template>
  <div class="blog">
    <h2>Blog</h2>
    <gridFilter :tags="tags" @tags-filter="filterByTag" />

    <div
      class="grid"
      v-show="
        !dynamicPostlist.every((post) =>
          post.tags.some((tag) => tag.include === false)
        )
      "
    >
      <template v-for="(post, j) in dynamicPostlist">
        <Transition>
          <div
            :style="{
              background: `linear-gradient(135deg, var(--color-${
                colorNum - j
              }), var(--color-${colorNum - j - 2} ))`,
            }"
            v-if="!post.tags.some((tags) => tags.include !== true)"
          >
            <h1>{{ post.title }}</h1>

            <tag-render :tags="post.tags"></tag-render>
            <hr />
            <p>{{ post.excerpt }}</p>
            <a class="button" :href="post.url">Read</a>
          </div>
        </Transition>
      </template>
    </div>

    <img
      v-show="
        dynamicPostlist.every((post) =>
          post.tags.some((tag) => tag.include === false)
        )
      "
      src="/images/404.svg"
      alt=""
    />
  </div>
</template>

<script setup>
import Section from './section.vue';
import TagRender from './TagRender.vue';
import gridFilter from './gridFilter.vue';
import { ref, computed } from 'vue';
const colorNum = ref(9);

const props = defineProps(['posts']);

let propsJSON = props.posts.replace('\n', '');
propsJSON = JSON.parse(propsJSON);

const tags = ref([]);
propsJSON.forEach((post) => {
  post.tags
    .filter((tag) => tag !== 'posts')
    .forEach((tag) => tags.value.push(tag));
});

const tagList = ref([
  ...tags.value.map((tag) => ({ include: true, name: tag })),
]);

const dynamicPostlist = computed(() => {
  return propsJSON.map((post) => ({
    ...post,
    tags: mapIncomingTags(post),
  }));
});

const mapIncomingTags = (post) => {
  return post.tags
    .filter((tag) => tag !== 'posts')
    .map((tag) => {
      let newTag;
      tagList.value.forEach((incomingTag) => {
        if (incomingTag.name === tag) {
          newTag = incomingTag;
        }
      });
      return newTag;
    });
};

const filterByTag = (event) => {
  tagList.value = event;
};
</script>

<script>
export default {};
</script>

<style scoped lang="sass">
.blog
  margin-top: 2rem
  width: 70vw
  min-height: 100vh
  display: flex
  flex-direction: column

  img
    max-width: 15rem
    margin: 0 auto
  h2
    text-align: center
.grid
  display: grid
  grid-gap: 1rem

  transition: all 1s ease
  &>*
    box-shadow: var(--box-shadow-lifted)
    padding: 1rem
    display: flex
    flex-direction: column
    justify-content: space-evenly
    transition: all 1s
    h1
      font-size: var(--s0)
      line-height: var(--s0)

@supports (width: min(250px, 100%))
  .grid
    grid-template-columns: repeat(auto-fill, minmax(min(250px, 50%), 1fr))

.v-enter-active,
.v-leave-active
  transition: opacity 0.5s ease


.v-enter-from,
.v-leave-to
  opacity: 0
</style>
