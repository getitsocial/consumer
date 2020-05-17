<template>
  <div class="flex flex-wrap my-2">
    <div v-for="category in categories" :key="category._id" class="mt-2">
      <button
        class="border mr-2 hover:text-light"
        :class="[
          category._id === activeCategory ? 'bg-tertiary' : '',
          category._id === pending ? 'spinner-dark' : '',
        ]"
        @click="$emit('loadArticles', category._id)"
      >
        {{ category.name }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CategoryList',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    activeCategory: {
      type: String,
      default: '',
    },
    pending: {
      type: String,
      default: null,
    },
  },
}
</script>
