<template>
  <div class="container md:mt-24">
    <div v-if="!isEmpty(shop)" class="mb-3">
      <button
        class="arrow-l mt-3 icon-l p-0"
        @click="$router.push(`/${shop.shopId}`)"
      >
        <icon name="arrow-back-outline" /> {{ $t('back') }}
      </button>
    </div>
    <div class="card">
      <h1 v-if="shop.components" class="flex md:mb-3">
        {{ $t(`components.type.${shop.components[0]}`) }}
      </h1>
      <!-- Categories -->
      <category-list
        :categories="categories.rows"
        :active-category="category"
        @load="loadArticles"
      />

      <product-list :articles="articles" />

      <empty-state v-if="categories.count === 0" />
      <!-- Articles -->
    </div>
  </div>
</template>
<script>
import { isEmpty } from 'lodash'
import EmptyState from '~/components/elements/EmptyState'
import ProductList from '~/components/pageElements/shop/ProductList'
import CategoryList from '~/components/pageElements/shop/CategoryList'

export default {
  name: 'Products',
  components: {
    EmptyState,
    ProductList,
    CategoryList,
  },

  async asyncData({ $axios, query }) {
    let categories
    try {
      categories = await $axios.$get('/api/categories/public', {
        params: {
          shopId: query.shopId,
        },
      })
      if (!query.category) {
        query.category = categories.rows[0]._id
      }
    } catch (error) {
      console.log(error)
    }

    const {
      count,
      rows,
      category,
      shop,
    } = await $axios.$get('/api/articles/public', { params: query })

    return { count, articles: rows, shop, category, categories }
  },
  data: () => ({
    isEmpty,
    categoriesQuery: {
      page: 1,
    },
  }),
  watchQuery: ['category'],
  methods: {
    loadArticles(categoryId) {
      this.$router.push({
        query: {
          ...this.$route.query,
          shopId: this.shop.shopId,
          category: categoryId,
        },
      })
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
