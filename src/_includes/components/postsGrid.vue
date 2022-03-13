<template>
  <div class="blog">
    <h2>Blog</h2>
    <gridFilter :tags="tags" @tags-filter="filterByTag" />
    <div
      class="grid"
      v-show="
        dynamicPostlist.some((post) =>
          post.tags.some((tag) => tag.include === true)
        )
      "
    >
      <template v-for="(post, j) in dynamicPostlist">
        <Transition>
          <div
            class="HC"
            :style="{
              background: `linear-gradient(135deg, var(--color-${
                colorNum - j >= 0 ? colorNum - j : colorNum
              }), var(--color-${
                colorNum - j >= 2 ? colorNum - j - 2 : colorNum - 2
              } ))`,
            }"
            v-if="post.tags.some((tags) => tags.include === true)"
          >
            <h1>{{ post.title }}</h1>
            <tag-render :tags="post.tags"></tag-render>
            <div v-if="post.feature_image" class="holo-overlay">
              <img :src="post.feature_image" alt="" />
            </div>

            <p>{{ post.excerpt }}</p>
            <a class="button" :href="post.url">Read</a>
          </div>
        </Transition>
      </template>
    </div>

    <img
      src="/images/404.svg"
      alt=""
      v-show="
        dynamicPostlist.every((post) =>
          post.tags.every((tag) => tag.include === false)
        )
      "
    />
  </div>
</template>

<script setup>
import Section from './section.vue';
import TagRender from './TagRender.vue';
import gridFilter from './gridFilter.vue';
import { ref, computed, onMounted } from 'vue';
const colorNum = ref(9);

onMounted(() => {
  turnOnHolo();
});

const turnOnHolo = () => {
  setTimeout(() => {
    document.querySelector('.grid').classList.add('holo');
  }, 1200);
};

const props = defineProps(['posts']);

let propsJSON = props.posts.replace(/\n/g, '');
// let propsJSON = JSON.stringify(props.posts).replace(/\\n/g, '');

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
  margin-bottom: 2rem
  & *
    color: var(--font-color)
  img
    max-width: 15rem
    margin: 0 auto
  h2
    text-align: center
.grid
  display: grid
  grid-gap: 1rem
  transition: all 1s ease
  padding: 2rem
  img
    object-fit: cover
    margin: 0
    max-height: 10rem
    width: 100%
    max-width: none

  p
    background: rgba(255,255,255,0.75)
    padding: 0.5rem
    margin: 0
    color: rgb(1,1 ,1,0.95 )

  &>*
    box-shadow: var(--box-shadow-lifted)
    //padding: 1rem
    display: flex
    flex-direction: column
    justify-content: space-between
    transition: all 1s
    h1
      font-size: var(--s0)
      line-height: var(--s0)
      margin: 1rem
      margin-bottom: 0

    hr
      width: 90%

@supports (width: min(250px, 100%))
  .grid
    grid-template-columns: repeat(auto-fill, minmax(min(250px, 50%), 1fr))

.v-enter-active,
.v-leave-active
  transition: opacity 0.5s ease


.v-enter-from,
.v-leave-to
  opacity: 0

@media screen and ( max-width: 800px )
  .blog
    width: 90vw
</style>
