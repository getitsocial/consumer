<template>
  <div class="flex flex-col min-h-screen">
    <toast />

    <modal :show="showModal" centered></modal>
    <navigation
      class="hidden md:block fixed w-full top-0 inset-x-0 justify-center z-30"
    />
    <nuxt class="w-full flex-1 mx-auto" />
    <navbar class="block md:hidden fixed bottom-0 w-full" />
    <footer-bar class="px-8 pt-2 pb-18 md:pb-5 md:pt-5" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Navigation from '~/components/layout/Navigation'
import Navbar from '~/components/layout/Navbar'
import FooterBar from '~/components/layout/FooterBar'
import Toast from '~/components/elements/Toast'
import Modal from '~/components/elements/Modal'

export default {
  components: {
    Navigation,
    Navbar,
    FooterBar,
    Toast,
    Modal,
  },
  computed: {
    ...mapGetters('modal', {
      showModal: 'showModal',
    }),
  },
}
</script>
