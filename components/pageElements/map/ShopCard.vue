<template>
  <div class="px-4 py-5 sm:p-6 shadow bg-white rounded-lg my-3 v-scroll-reveal">
    <slot />
    <div class="flex items-center">
      <div class="sm:flex-shrink-0">
        <img
          :src="shop.logo.url"
          alt=""
          width="70"
          @error="(e) => (e.target.src = '/img/placeholder.png')"
        />
      </div>
      <h3 class="text-xl font-bold text-primary ml-2">
        {{ shop.name }}
      </h3>
      <span
        v-if="!shop.isOpen"
        class="text-xs bg-warning px-1 ml-1 rounded text-white ml-auto select-none"
        >{{ $t('shop.close') }}</span
      >
      <span
        v-else
        class="text-xs bg-success px-1 ml-1 rounded text-white select-none"
        >{{ $t('shop.open') }}</span
      >
    </div>

    <div
      v-if="shop.deliveryOptions"
      class="flex flex-wrap justify-start select-none mt-3"
    >
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
      <div></div>
    </div>
    <div class="mt-5">
      <div class="bg-grey px-3 py-4 sm:flex sm:items-start sm:justify-between">
        <div class="sm:flex sm:items-start">
          <div
            v-if="shop.address.locationId"
            class="flex flex-col text-sm mt-3 sm:mt-0 sm:ml-4"
          >
            <div>{{ shop.address.street }} {{ shop.address.houseNumber }}</div>
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
            <a :href="`tel:${shop.contact.phone}`" class="button primary icon-r"
              ><icon name="phone" /> {{ $t('action.call') }}</a
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    shop: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
}
</script>
