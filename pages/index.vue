<template>
  <div class="flex items-stretch">
    <map-detail
      v-if="showDetail"
      :shop="selectedShop"
      @close="showDetail = false"
    />
    <subnavigation
      class="fixed w-full top-0 mt-3 md:mt-16 inset-x-0 py-2 container max-w-md justify-center px-2 z-30"
    />
    <maps
      styling="block min-h-full w-full"
      :points="shops"
      :position="selectedPosition"
      @tap="showDetails"
    />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Subnavigation from '~/components/layout/Subnavigation'
import MapDetail from '~/components/pageElements/map/detail'
export default {
  components: {
    Subnavigation,
    MapDetail,
  },
  async asyncData({ $axios, query, redirect, store }) {
    try {
      const shops = await $axios.$get('/api/shops/near/u1r3re32782dk', {
        params: query,
      })
      return { shops }
    } catch (e) {
      return { shops: [] }
    }
  },
  data: () => ({
    showDetail: false,
    selectedShop: {},
  }),
  computed: {
    ...mapState({
      selectedPosition: (state) => state.position.selectedMapPosition,
    }),
  },
  async mounted() {
    try {
      const { coords } = await this.$geolocation.getCurrentPosition()
      this.setPosition(coords)
    } catch (error) {
      console.log(error)
      console.log('no')
    }
  },
  methods: {
    ...mapMutations({
      setPosition: 'setPosition',
    }),
    showDetails(shop) {
      console.log('details')
      this.selectedShop = shop
      this.showDetail = true
    },
  },
}
</script>
<style lang="scss" scoped></style>
