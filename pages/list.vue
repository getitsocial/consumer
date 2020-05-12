<template>
  <div class="flex items-stretch">
    <map-detail
      v-if="showDetail"
      :shop="selectedShop"
      @close="showDetail = false"
    />
    <div
      class="flex items-start fixed w-full top-0 mt-3 md:mt-20 inset-x-0 py-2 container max-w-lg justify-center px-2 z-30"
    >
      <subnavigation class="w-full" />
      <div class="ml-2 py-2 bg-white shadow rounded-lg">
        <n-link class="button" to="/"
          ><icon name="map-outline" width="25" height="25"
        /></n-link>
      </div>
    </div>

    <div class="w-full max-w-lg mx-auto mt-20 md:mt-36 px-2">
      <shop-card
        v-for="shop in shops"
        :key="shop._id"
        v-scroll-reveal.reset
        :shop="shop"
      />
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import Subnavigation from '~/components/layout/Subnavigation'
import ShopCard from '~/components/pageElements/map/ShopCard'

export default {
  components: {
    Subnavigation,
    ShopCard,
  },
  async fetch({ store, params }) {
    await store.dispatch('getShops', params)
  },
  data: () => ({
    showDetail: false,
    selectedShop: {},
  }),
  computed: {
    ...mapGetters({
      shops: 'shops',
    }),
  },
  methods: {
    ...mapMutations({
      setPosition: 'setPosition',
    }),
  },
}
</script>
<style lang="scss" scoped></style>
