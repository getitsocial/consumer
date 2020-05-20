<template>
  <div class="shadow bg-white rounded-lg">
    <slot />
    <div
      class="bg-cover bg-no-repeat bg-center h-48"
      :class="[hasDefaultSlot ? '' : 'rounded-t-lg']"
      :style="{
        backgroundImage: `url('${shop.picture.url}')`,
      }"
    ></div>
    <div class="px-4 py-3 v-scroll-reveal">
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
            <div
              v-if="shop.address.locationId"
              class="flex flex-col text-light"
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
          class="flex flex-wrap justify-start select-none text-right"
        >
          <div
            v-for="(deliveryOption, index) in shop.deliveryOptions"
            :key="index"
            class="mr-3 my-4"
          >
            <span v-if="deliveryOption === 'LD'">
              <icon name="car-outline" width="23" height="23" />
            </span>
            <span v-if="deliveryOption === 'PU'">
              <icon name="shopping-bag-outline" width="23" height="23" />
            </span>
            <span v-if="deliveryOption === 'MU'">
              <icon name="cube-outline" width="23" height="23" />
            </span>
          </div>
          <div></div>
        </div>
      </div>
      <div class="flex border-t">
        <span class="mt-2">
          <a
            :href="`tel:${shop.contact.phone}`"
            class="button cta bg-tertiary icon-r"
            ><icon name="phone" /> {{ $t('action.call') }}</a
          >
        </span>
        <span class="inline-flex ml-auto mt-3">
          <a :href="`/${shop.shopId}`" class="button primary icon-r">{{
            $t('action.detail')
          }}</a>
        </span>
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
  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default
    },
  },
}
</script>
