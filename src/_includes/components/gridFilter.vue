<template>
  <div class="tags">
    <div
      class="tag"
      v-for="tag in includedTags"
      @click="changeInclude(tag)"
      :class="{ notIncluded: !tag.include }"
    >
      <span>
        {{ tag.name }}
      </span>
      <div class="counter">{{ tag.count }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['tags']);
const emits = defineEmits(['tagsFilter']);
const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const changeInclude = (tag) => {
  tag.include = !tag.include;
  emits('tagsFilter', includedTags.value);
};

const countTags = (tag) => {
  return props.tags.reduce((a, v) => (v === tag ? a + 1 : a), 0);
};

const includedTags = ref([]);
includedTags.value = props.tags
  .filter((tag) => tag != 'posts')
  .filter(unique)
  .map((tag) => ({
    include: true,
    name: tag,
    count: countTags(tag),
  }));
</script>

<style lang="sass" scoped>
.tags
    display: flex
    flex-wrap: wrap
    gap: 1rem
    justify-content: flex-start
    align-items: center
    margin: 2rem
    .counter
        position: absolute
        color: var(--primary)
        border-radius: 50%
        background: var(--color-6)
        width: 1rem
        height: 1rem
        text-align: center
        right: 0rem
        top: -.5rem
    span
        cursor: pointer
        background: var(--color-9)
        border: 1px solid var(--color-6)
        border-radius: 1.5rem
        padding: .5rem
    .notIncluded
        filter: saturate(25%)
        color: var(--color-4)
</style>
