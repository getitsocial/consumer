<template>
  <div class="flex flex-wrap my-2">
    <div
      class="w-full text-center"
      :class="{ 'spinner-dark': !categories.length }"
    />
    <div v-for="category in categories" :key="category._id" class="mt-2">
      <button
        class="border mr-2 hover:text-light"
        :class="[
          category._id === activeCategory ? 'bg-tertiary' : '',
          category._id === pending ? 'spinner-dark' : '',
        ]"
        @click="actionCategory(category)"
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
    activeCategory: {
      type: String,
      default: '',
    },
    shopId: {
      type: String,
      default: null,
    },
    pending: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    categoryPending: false,
    categories: {},
    categoriesQuery: {
      page: 1,
    },
  }),
  mounted() {
    this.loadCategories()
  },
  methods: {
    async actionCategory({ _id }) {
      await this.$emit('loadArticles', _id)
    },
    async loadCategories(categoryId) {
      try {
        this.categoryPending = true
        const { rows } = await this.$axios.$get('/api/categories/public', {
          params: { ...this.categoriesQuery, shopId: this.shopId },
        })
        this.categories = rows
        if (!this.activeCategory) {
          await this.actionCategory(this.categories[0])
        }
        this.categoryPending = false
      } catch (error) {
        this.categoryPending = false
        console.log(error)
      }
    },
  },
}
</script>
