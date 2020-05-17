<template>
  <div class="article-grid">
    <div
      v-for="article in articles"
      :key="article._id"
      class="article-item border-b py-2"
    >
      <img
        :src="article.picture.url"
        :alt="article.name"
        class="block mx-auto"
        @error="(e) => (e.target.src = '/img/placeholder.png')"
      />
      <div class="flex items-center">
        <h3 class="mt-2 leading-snug">{{ article.name }}</h3>
        <div class="text-light ml-auto mt-2">{{ article.price }} €</div>
      </div>
      <div
        v-if="article.description"
        class="text-light text-sm break-all"
        v-html="article.description"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductList',
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
