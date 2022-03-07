<template>
  <ul v-for="contributor in contributors">
    <li>
      <a :href="contributor.ghProfile">{{ contributor.name }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['contributors'],
  frontMatter: {
    layout: 'layouts/post.njk',
  },
};
</script>
