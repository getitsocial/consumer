<template>
  <div class="container max-w-4xl mt-0 px-2 md:mt-20 mb-5 mb-12">
    <button class="arrow-l mt-3 icon-l" @click="$router.push('/list')">
      <icon name="arrow-back-outline" /> {{ $t('action.shop_overview') }}
    </button>
    <div
      class="hero-wrap h-48 my-3"
      :style="{
        backgroundImage: `url('${shop.picture.url}')`,
      }"
    ></div>
    <div class="flex items-center md:ml-10 mb-2">
      <div class="p-2 bg-white rounded shadow-sm">
        <img
          :src="shop.logo.url"
          alt=""
          class="object-center w-24"
          @error="(e) => (e.target.src = '/img/placeholder.png')"
        />
      </div>
      <div class="ml-2 select-none truncate">
        <h3>{{ shop.name }}</h3>
        <div v-if="shop.address" class="text-light">
          {{ shop.address.city }}
        </div>
        <div class="hidden md:block mt-2">
          <a :href="`tel:${shop.contact.phone}`">{{ shop.contact.phone }}</a>
        </div>
      </div>
    </div>
    <div class="flex md:ml-10 justify-end">
      <div class="flex items-center mr-auto">
        <div class="md:hidden inline-block w-full">
          <a
            :href="`tel:${shop.contact.phone}`"
            class="button cta bg-tertiary icon-r"
            ><icon name="phone" /> {{ $t('action.call') }}</a
          >
        </div>
        <div v-if="$device.isMobileOrTablet" class="ml-3">
          <button class="link" @click="shareWith">
            <icon name="share-outline" width="28" height="28" />
          </button>
        </div>
      </div>
      <div>
        <button class="text-primary icon" @click="openTab = 1">
          <icon
            :name="openTab === 1 ? 'info' : 'info-outline'"
            class="mx-1"
            :height="iconSize"
            :width="iconSize"
          />
        </button>
      </div>
      <div>
        <button class="text-primary icon pr-0" @click="openTab = 2">
          <icon
            :name="openTab === 2 ? 'pin' : 'pin-outline'"
            class="mx-1"
            :height="iconSize"
            :width="iconSize"
          />
        </button>
      </div>
    </div>
    <div class="mt-2 select-none">
      <div class="col-span-1"><!-- Todo: Opening Times here --></div>
      <div v-if="openTab === 1" class="card col-span-4">
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
        <!-- Content -->
        <div v-if="!shop.description" class="mt-5 text-light">
          {{ $t('no_description') }}
        </div>
        <div v-else>
          <hr class="my-5" />
          <div v-html="shop.description"></div>
        </div>
        <div v-if="shop.components.length"></div>
        <div v-if="shop.contact" class="flex justify-end">
          <ul class="flex items-end">
            <li class="mx-2">
              <a
                v-if="shop.contact.instagram"
                :href="shop.contact.instagram"
                target="_blank"
              >
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </a>
            </li>
            <li class="mx-2">
              <a
                v-if="shop.contact.facebook"
                :href="shop.contact.facebook"
                target="_blank"
              >
                <icon name="facebook-outline" />
              </a>
            </li>
            <li class="mx-2">
              <a
                v-if="shop.contact.website"
                :href="shop.contact.website"
                target="_blank"
              >
                {{ $t('enter_website') }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="openTab === 2">
        <div class="grid md:grid-cols-3 gap-2">
          <div class="card text-center md:text-left select-none">
            <div
              v-for="(weekDay, name) in shop.openingHours"
              :key="name"
              class="my-2"
            >
              <span class="font-bold text-primary"
                >{{ $t(`delivery_options.days_long.${name}`) }}
              </span>
              <div class="text-light">
                {{ weekDay.length ? '' : 'Geschlossen' }}
                <div v-for="(time, index) in weekDay" :key="index">
                  <span v-if="time.allDayOpen">Ganztätig geöffnet</span>
                  <span v-else>{{ time.open }} - {{ time.close }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card md:col-span-2">
            <div class="flex flex-col">
              <div
                v-if="shop.address.locationId"
                class="text-sm text-light flex flex-col mb-2"
              >
                <div class="leading-tight">
                  {{ shop.address.street }} {{ shop.address.houseNumber }}
                </div>
                <div class="leading-tight">
                  {{ shop.address.postalCode }} {{ shop.address.city }}
                  {{
                    shop.address.district === shop.address.city
                      ? ''
                      : shop.address.district
                  }}
                </div>
              </div>
              <!-- Map -->
              <here-map
                :position="shop.displayPosition"
                :polygon="shop.polygonCoordinates"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="shop.components.length" class="flex justify-end mt-3">
        <n-link
          :to="`/products?shopId=${shop.shopId}`"
          class="button cta bg-tertiary w-full md:w-auto mx-8 md:mx-0"
        >
          {{ $t(`components.type.${shop.components[0]}`) }}
        </n-link>
      </div>
    </div>
  </div>
</template>
<script>
import HereMap from '~/components/elements/MapSvg'

export default {
  name: 'Shop',
  middleware: 'authenticated',
  components: {
    HereMap,
  },
  async asyncData({ $axios, params, error, seo, store, route }) {
    try {
      const shop = await $axios.$get(`/api/shops/${params.id}`)
      /*
      seo({
        name: shop.name,
        title: 'lokal auf get it!',
        templateTitle: '%name% - %title%',
        description: 'Lokal einkaufen!',
        openGraph: {
          title: shop.name,
          description: 'Lokal einkaufen!',
          type: 'website',
          image: shop.picture.url,
          locale: store.state.locale,
          site_name: process.env.VUE_APP_URL,
          url: process.env.VUE_APP_URL + route.path,
        },
        facebook: {
          app_id: '574950416384081',
        },
      })
      */
      return { shop }
    } catch (err) {
      console.error(err)
      error({ statusCode: 404, message: 'Shop not found' })
    }
  },
  data: () => ({
    iconSize: 22,
    openTab: 1,
    appUrl: process.env.VUE_APP_URL,
  }),
  methods: {
    async shareWith() {
      const resultPara = document.querySelector('.result')
      try {
        await navigator.share({
          title: 'get it!',
          text: 'Schau dir diesen Shop an',
          url: `${this.appUrl}/${this.shop.shopId}`,
          description: 'Lokal auf www.getit.market',
        })
        resultPara.textContent = 'Geteilt!'
      } catch (error) {
        console.log(error)
      }
    },
  },
  head() {
    return {
      title: `${this.shop.name} - lokal auf get it!`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Lokal einkaufen!',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.shop.picture.url,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.VUE_APP_URL + this.$router.currentRoute.path,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Lokal einkaufen!',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.shop.name} - lokal auf get it!`,
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
          content: 'getit.market',
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

<style lang="scss" scoped>
.hero {
  &-wrap {
    @apply flex flex-col justify-between rounded-lg text-white;
    @apply bg-cover bg-center bg-primary;

    @screen md {
      height: 23rem;
    }
  }
  &-info {
    background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      theme('colors.primary')
    );
  }
}
</style>
