<template>
  <div class="container md:mt-24">
    <div v-if="shopId" class="mb-3">
      <button
        class="arrow-l mt-3 icon-l p-0"
        @click="$router.push(`/${shopId}`)"
      >
        <icon name="arrow-back-outline" /> {{ $t('back') }}
      </button>
    </div>
    <div class="card">
      <div class="flex flex-wrap justify-between items-baseline">
        <h1 v-if="shop.components" class="flex">
          {{ $t(`components.type.${shop.components[0]}`) }}
        </h1>
        <span
          v-if="shop.name"
          class="leading-snug font-bold text-sm select-none"
          >{{ shop.name }}</span
        >
      </div>
      <!-- Categories -->
      <category-list
        :shop-id="shopId"
        :active-category="activeCategory"
        :pending="pending"
        @loadArticles="loadArticles"
      />

      <!-- Articles -->
      <product-list :articles="articles" />
      <!-- Empty State
      <empty-state v-if="categories.count === 0" />
      -->
    </div>
  </div>
</template>
<script>
import { isEmpty } from 'lodash'
// import EmptyState from '~/components/elements/EmptyState'
import ProductList from '~/components/pageElements/shop/ProductList'
import CategoryList from '~/components/pageElements/shop/CategoryList'

export default {
  name: 'Products',
  components: {
    // EmptyState,
    ProductList,
    CategoryList,
  },
  asyncData({ $axios, query }) {
    return { shopId: query.shopId }
  },
  validate({ params, query, store }) {
    // Validate, if query exist
    if (!query.shopId) {
      return false
    }
    return true
  },
  data: () => ({
    isEmpty,
    pending: null,
    activeCategory: null,
    shop: {},
    articles: [],
    articlesQuery: {
      page: 1,
    },
  }),
  methods: {
    async loadArticles(category) {
      this.pending = category
      try {
        const { rows, shop } = await this.$axios.$get('/api/articles/public', {
          params: { ...this.articlesQuery, shopId: this.shopId, category },
        })
        this.shop = shop
        this.activeCategory = category
        this.pending = null
        this.articles = rows
      } catch (error) {
        this.pending = null
      }
    },
  },
}
</script>
<style lang="scss">
.article {
  &-grid {
    @apply gap-10 mx-auto max-w-full;
    columns: 1;
    @screen sm {
      columns: 2;
    }
  }
  &-item {
    @apply mt-2 w-full inline-block;
  }
}
</style>
