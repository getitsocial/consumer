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
      @position="viewChanged"
    />
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import Subnavigation from '~/components/layout/Subnavigation'
import MapDetail from '~/components/pageElements/map/Detail'

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
    ...mapActions({
      getShops: 'getShops',
    }),
    showDetails(shop) {
      this.selectedShop = shop
      this.showDetail = true
    },
    async viewChanged(position) {
      this.setPosition(position)
      try {
        await this.getShops()
      } catch (error) {
        console.log(error)
      }
    },
  },
  head() {
    return {
      title: 'get it! Marketplace',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Lokal einkaufen!',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://getit.market/img/mockup.png',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.VUE_APP_URL,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Lokal einkaufen!',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'get it! Marketplace',
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'fb:app_id',
          property: 'fb:app_id',
          content: '574950416384081',
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: process.env.VUE_APP_URL,
        },
        {
          hid: 'og:locale',
          property: 'og:locale',
          content: this.$store.state.locale,
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped></style>
