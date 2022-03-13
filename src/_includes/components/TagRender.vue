<template>
  <div class="tags">
    <span class="mytag" v-for="tag in tags.filter((tag) => tag != 'posts')">{{
      tag.name
    }}</span>
  </div>
</template>

<script setup>
const props = defineProps(['tags']);
</script>

<style lang="sass">
.tags
    display: flex
    flex-wrap: wrap
    gap: 1rem
    justify-content: flex-start
    align-items: center
    margin-left: 0.25rem
    margin-right: 0.25rem
    span
        background: var(--color-9)
        border: 1px solid var(--color-6)
        border-radius: 1.5rem
        padding: .5rem
        color: inherit
</style>
