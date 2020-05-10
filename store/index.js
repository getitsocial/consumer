import geohash from 'ngeohash'

export const state = () => ({
  position: {
    selectedMapPosition: {
      latitude: 52.268874,
      longitude: 10.52677,
      geohash: 'u1r3rd9r4t6',
      zoom: 12,
      gps: false,
    },
  },
  locales: [
    {
      code: 'en',
      name: 'English',
    },
  ],
  shops: [],
  locale: 'en',
})

export const mutations = {
  setLang(state, locale) {
    if (state.locales.find((el) => el.code === locale)) {
      state.locale = locale
    }
  },
  setPosition(state, { latitude, longitude }) {
    const userGeohash = geohash.encode(latitude, longitude)
    state.position.selectedMapPosition = {
      latitude,
      longitude,
      geohash: userGeohash,
    }
  },
  setShops(state, shops) {
    state.shops = shops
  },
}

export const actions = {
  /**
   * nuxtServerInit start on initial loading
   * token and user validation
   */
  async nuxtServerInit({ commit, dispatch, state }, { app }) {},

  async nuxtClientInit({ commit }, context) {
    const { coords } = await this.$geolocation.getCurrentPosition()
    commit('setPosition', coords)
  },

  async getShops({ commit, dispatch, state }, params) {
    const { position } = state
    const shops = await this.$axios.$get(
      `/api/shops/near/${position?.selectedMapPosition?.geohash}`,
      {
        params,
      }
    )
    commit('setShops', shops)
  },
}

export const getters = {
  shops: (state) => state.shops,
}
