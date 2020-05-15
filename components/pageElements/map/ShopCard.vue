<template>
  <div class="px-4 py-5 sm:p-6 shadow bg-white rounded-lg my-3 v-scroll-reveal">
    <slot />
    <div class="flex items-center">
      <div class="sm:flex-shrink-0 mb-3">
        <img
          :src="shop.logo.url"
          alt=""
          width="70"
          @error="(e) => (e.target.src = '/img/placeholder.png')"
        />
      </div>

      <span
        v-if="!shop.isOpen"
        class="text-xs bg-warning px-1 ml-1 rounded text-white ml-auto select-none"
        >{{ $t('shop.close') }}</span
      >
      <span
        v-else
        class="text-xs bg-success px-1 ml-1 rounded text-white ml-auto select-none"
        >{{ $t('shop.open') }}</span
      >
    </div>

    <div class="flex flex-col">
      <div class="w-full truncate">
        <h3 class="text-xl text-light truncate">
          {{ shop.name }}
        </h3>
        <div>
          <div v-if="shop.address.locationId" class="flex flex-col">
            <div>{{ shop.address.street }} {{ shop.address.houseNumber }}</div>
            <div>
              {{ shop.address.postalCode }} {{ shop.address.city }}
              {{
                shop.address.district === shop.address.city
                  ? ''
                  : shop.address.district
              }}
            </div>
            <div class="hidden md:block">
              <a :href="`tel:${shop.contact.phone}`">{{
                shop.contact.phone
              }}</a>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="shop.deliveryOptions"
        class="flex flex-wrap justify-start select-none mt-3 text-right"
      >
        <div
          v-for="(deliveryOption, index) in shop.deliveryOptions"
          :key="index"
          class="mt-2"
        >
          <span
            v-if="deliveryOption === 'LD'"
            class="tag mr-1 whitespace-no-wrap"
          >
            Lokale Lieferung
          </span>
          <span
            v-if="deliveryOption === 'PU'"
            class="tag mr-1 whitespace-no-wrap"
          >
            Abholung
          </span>
          <span
            v-if="deliveryOption === 'MU'"
            class="tag mr-1 whitespace-no-wrap"
          >
            Postversand
          </span>
        </div>
        <div></div>
      </div>
    </div>
    <div class="flex mt-5 border-t">
      <span class="md:hidden inline-flex mt-5">
        <a
          :href="`tel:${shop.contact.phone}`"
          class="button cta bg-tertiary icon-r"
          ><icon name="phone" /> {{ $t('action.call') }}</a
        >
      </span>
      <span class="inline-flex ml-auto mt-5">
        <a :href="`/${shop.shopId}`" class="button primary icon-r">{{
          $t('action.detail')
        }}</a>
      </span>
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
