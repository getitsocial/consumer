<template>
  <div>
    <div v-show="show" class="modal-bg"></div>
    <transition name="modalAnimation">
      <div v-show="show" class="modal-wrapper">
        <div ref="modal" class="modal px-2">
          <shop-card :shop="shop" class="mx-2 w-full max-w-md"
            ><div class="flex justify-end">
              <button @click="closeModal">
                <icon name="close-outline" width="25" height="25" />
              </button></div
          ></shop-card>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ShopCard from '~/components/pageElements/map/ShopCard'

export default {
  name: 'MapDetail',
  components: { ShopCard },
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
    if (process.browser) {
      window.addEventListener('keyup', (event) =>
        event.key === 'Escape' ? this.$emit('close') : false
      )
    }
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
      this.show = false
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
  @apply h-screen w-full absolute flex flex-col items-center justify-center;

  &-wrapper {
    @apply z-50 fixed top-0 left-0 bottom-0 right-0 bg-transparent shadow;
  }
  &-bg {
    @apply z-50 fixed top-0 left-0 h-screen w-full bg-light opacity-75;
  }
  &-body {
    @apply bg-white m-3 max-h-full text-secondary rounded-lg;
    width: 40rem;
  }
}
</style>
