<template>
  <div ref="outside" class="flex flex-wrap">
    <div class="w-full">
      <div class="subnavigation">
        <ul class="w-full flex items-center">
          <li class="w-full">
            <ValidationObserver ref="shop" v-slot="{ handleSubmit }" slim>
              <!--<form @submit.prevent="handleSubmit(updateShop)">-->
              <form @submit.prevent="handleSubmit(submit)">
                <!-- userLocation INPUT -->
                <label>
                  <autocomplete
                    name="Strasse"
                    :value="userLocation"
                    endpoint="maps/geocode"
                    queryname="query"
                    display-name="label"
                    placeholder="Sesamstrasse 12"
                    class="w-full"
                    @selection="selectLocation"
                  />
                </label></form
            ></ValidationObserver>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import Autocomplete from '~/components/elements/Autocomplete'

/**
 * Default top navigation for desktop view.
 */
export default {
  name: 'Subnavigation',
  components: {
    Autocomplete,
  },
  data: () => ({
    location: {},
    userLocation: '',
  }),
  methods: {
    ...mapMutations({
      setPosition: 'setPosition',
    }),
    ...mapActions({
      getShops: 'getShops',
    }),
    async selectLocation({ locationId }) {
      try {
        if (!locationId) return
        const { displayPosition } = await this.$axios.$get('/api/maps/detail', {
          params: { locationid: locationId },
        })
        this.setPosition({ ...displayPosition, gps: false })
        await this.getShops()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang="scss">
.subnavigation {
  @apply relative flex items-center bg-white rounded-lg antialiased shadow p-2;

  ul {
    @apply list-none overflow-hidden;
  }

  li {
    @apply float-left;

    a {
      @apply flex items-center;
      @apply text-primary px-3 py-2 mx-0 rounded-lg uppercase text-xs font-bold tracking-wider no-underline;
      @apply transition duration-300 ease-in-out;

      &:hover {
        @apply text-tertiary;
      }

      @screen sm {
        @apply mx-2 text-sm;
      }
    }
    .nuxt-link-active {
      @apply bg-info text-white no-underline;
    }
  }
}
</style>
