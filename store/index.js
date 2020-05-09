export const state = () => ({
  position: {
    selectedMapPosition: {
      latitude: 52.268874,
      longitude: 10.52677,
      zoom: 12,
    },
  },
  locales: [
    {
      code: 'en',
      name: 'English',
    },
  ],
  locale: 'en',
})

export const mutations = {
  setLang(state, locale) {
    if (state.locales.find((el) => el.code === locale)) {
      state.locale = locale
    }
  },
  setPosition(state, position) {
    state.position.selectedMapPosition = position
  },
}

export const actions = {
  /**
   * nuxtServerInit start on initial loading
   * token and user validation
   */
  async nuxtServerInit({ commit, dispatch, state }, { app }) {},
}
