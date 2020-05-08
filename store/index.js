export const state = () => ({
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
}

export const actions = {
  /**
   * nuxtServerInit start on initial loading
   * token and user validation
   */
  async nuxtServerInit({ commit, dispatch, state }, { app }) {},
}
