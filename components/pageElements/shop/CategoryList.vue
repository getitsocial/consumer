<template>
  <div class="flex flex-wrap my-3">
    <div v-for="category in categories" :key="category._id" class="mt-1">
      <button
        class="border mr-3"
        :class="[
          category._id === activeCategory ? 'bg-primary text-white' : '',
        ]"
        @click="$emit('load', category._id)"
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
  },
}
</script>
