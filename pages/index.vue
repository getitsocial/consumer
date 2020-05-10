<template>
  <div class="flex items-stretch">
    <map-detail
      v-if="showDetail"
      :shop="selectedShop"
      @close="showDetail = false"
    />
    <div
      class="flex items-start fixed w-full top-0 mt-3 md:mt-16 inset-x-0 py-2 container max-w-lg justify-center px-2 z-30"
    >
      <subnavigation class="w-full" />
      <div class="ml-2 py-2 bg-white shadow rounded-lg">
        <n-link class="button" to="/list">
          <icon name="list-outline" width="25" height="25" />
        </n-link>
      </div>
    </div>
    <maps
      styling="block min-h-full w-full"
      :points="shops"
      :position="selectedPosition"
      @tap="showDetails"
    />
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import Subnavigation from '~/components/layout/Subnavigation'
import MapDetail from '~/components/pageElements/map/detail'
export default {
  components: {
    Subnavigation,
    MapDetail,
  },
  async fetch({ store, params }) {
    await store.dispatch('getShops', params)
  },
  data: () => ({
    showDetail: false,
    selectedShop: {},
  }),
  computed: {
    ...mapState({
      selectedPosition: (state) => state.position.selectedMapPosition,
    }),
    ...mapGetters({
      shops: 'shops',
    }),
  },
  methods: {
    ...mapMutations({
      setPosition: 'setPosition',
    }),
    showDetails(shop) {
      this.selectedShop = shop
      this.showDetail = true
    },
  },
}
</script>
<style lang="scss" scoped></style>
