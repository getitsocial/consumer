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
        <n-link class="button" to="/"
          ><icon name="map-outline" width="25" height="25"
        /></n-link>
      </div>
    </div>

    <div class="w-full max-w-lg mx-auto mt-20 md:mt-36 px-2">
      <div
        v-for="shop in shops"
        :key="shop._id"
        v-scroll-reveal.reset="{ delay: 300 }"
        class="px-4 py-5 sm:p-6 shadow bg-white rounded-lg my-3 v-scroll-reveal"
      >
        <h3 class="text-xl leading-6 font-bold text-primary">
          {{ shop.name }}
        </h3>
        <div v-if="shop.deliveryOptions" class="flex flex-wrap justify-start">
          <div
            v-for="(deliveryOption, index) in shop.deliveryOptions"
            :key="index"
            class="mt-2"
          >
            <span v-if="deliveryOption === 'LD'" class="tag mr-1">
              Lokale Lieferung
            </span>
            <span v-if="deliveryOption === 'PU'" class="tag mr-1">
              Abholung
            </span>
            <span v-if="deliveryOption === 'MU'" class="tag mr-1">
              Postversand
            </span>
          </div>
        </div>
        <div class="mt-5">
          <div
            class="bg-grey px-6 py-5 sm:flex sm:items-start sm:justify-between"
          >
            <div class="sm:flex sm:items-start">
              <div class="sm:flex-shrink-0">
                <img
                  :src="shop.logo.url"
                  alt=""
                  width="50"
                  @error="(e) => (e.target.src = '/img/placeholder.png')"
                />
              </div>
              <div
                v-if="shop.address.locationId"
                class="flex flex-col text-sm mt-3 sm:mt-0 sm:ml-4"
              >
                <div>
                  {{ shop.address.street }} {{ shop.address.houseNumber }}
                </div>
                <div>
                  {{ shop.address.postalCode }} {{ shop.address.city }}
                  {{
                    shop.address.district === shop.address.city
                      ? ''
                      : shop.address.district
                  }}
                </div>
              </div>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
              <span class="inline-flex rounded-md shadow-sm">
                <a
                  :href="`tel:${shop.contact.phone}`"
                  class="button primary icon-r"
                  ><icon name="phone" /> {{ $t('call') }}</a
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import Subnavigation from '~/components/layout/Subnavigation'
export default {
  components: {
    Subnavigation,
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
  },
}
</script>
<style lang="scss" scoped></style>
