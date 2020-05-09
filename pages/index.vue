<template>
  <div class="flex items-stretch">
    <subnavigation
      class="fixed w-full top-0 mt-3 md:mt-16 inset-x-0 py-2 container max-w-md justify-center px-2 z-30"
    />
    <maps
      styling="block min-h-full w-full"
      :points="shops"
      :position="selectedPosition"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { isEmpty } from 'lodash'
import Subnavigation from '~/components/layout/Subnavigation'
export default {
  components: {
    Subnavigation,
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
  computed: {
    ...mapState({
      selectedPosition: (state) =>
        isEmpty(state.position.selectedMapPosition)
          ? {
              latitude: 52.268874,
              longitude: 10.52677,
            }
          : state.position.selectedMapPosition,
    }),
  },
}
</script>
<style lang="scss" scoped></style>
