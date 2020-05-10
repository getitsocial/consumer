<template>
  <div>
    <div
      v-show="show"
      class="modal-bg"
      @click="closeModal"
      @keyup.esc="closeModal"
    ></div>
    <transition name="modalAnimation">
      <div v-show="show" class="modal-wrapper">
        <div class="modal">
          <div class="modal-body p-6 sm:p-8 w-full max-w-xl">
            <div>
              <slot name="header"></slot>
            </div>
            <div v-if="shop" class="mb-6 mt-3">
              <h3>{{ shop.name }}</h3>
              <div
                v-if="shop.address.locationId"
                class="flex flex-col bg-white text-info"
              >
                <div class="leading-tight text-light">
                  {{ shop.address.street }} {{ shop.address.houseNumber }}
                </div>
                <div class="leading-tight text-light">
                  {{ shop.address.postalCode }} {{ shop.address.city }}
                  {{
                    shop.address.district === shop.address.city
                      ? ''
                      : shop.address.district
                  }}
                </div>
              </div>

              <div
                v-if="shop.deliveryOptions"
                class="flex flex-wrap justify-start"
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
              </div>

              <div
                v-if="!shop.isOpen"
                class="rounded-md bg-warning opacity-75 p-4 mt-5"
              >
                <div class="flex">
                  <div class="flex-shrink-0 text-black">
                    <icon name="info-outline" />
                  </div>
                  <div class="ml-3 flex-1 md:flex md:justify-between">
                    <p class="text-sm leading-5 text-black">
                      {{ $t('shop.close_text') }}
                    </p>
                  </div>
                </div>
              </div>

              <slot />
            </div>
            <div class="flex">
              <a :href="`tel:${shop.contact.phone}`" class="button icon-r mr-4"
                ><icon name="phone" /> {{ $t('action.call') }}</a
              >
              <button class="primary w-auto ml-auto" @click="closeModal">
                {{ $t('action.close') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MapDetail',
  props: {
    shop: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  data: () => ({
    show: false,
  }),
  watch: {
    // Show Browser Scrollbar
    show(newValue, oldValue) {
      const rootBody = document.getElementsByTagName('body')[0]
      if (newValue) rootBody.classList.add('overflow-hidden')
      else rootBody.classList.remove('overflow-hidden')
    },
  },
  mounted() {
    this.show = true
  },
  // Hide Browser Scrollbar
  beforeDestroy() {
    const rootBody = document.getElementsByTagName('body')[0]
    rootBody.classList.remove('overflow-hidden')
    this.show = false
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
/*
 * Top Modal Item Animation
 */
.modalAnimation-item {
  display: inline-block;
}

.modalAnimation-enter-active,
.modalAnimation-leave-active {
  transition: all 0.5s;
}

.modalAnimation-enter,
.modalAnimation-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}

.modal {
  @apply h-screen w-full absolute flex items-center justify-center;
  &-wrapper {
    @apply z-50 fixed top-0 left-0 bottom-0 right-0 bg-transparent shadow;
  }
  &-bg {
    @apply z-50 fixed top-0 left-0 h-screen w-full bg-light opacity-75;
  }
  &-body {
    @apply bg-white m-3 max-h-full text-secondary rounded-lg;
  }
}
</style>
