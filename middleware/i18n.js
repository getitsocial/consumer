export default function ({
  isHMR,
  app: { i18n, $cookies },
  store,
  route,
  params,
  req,
  error,
  redirect,
}) {
  if (isHMR) {
    // ignore if called from hot module replacement
    return
  }
  if (req) {
    if (route.name) {
      // Get locale from cookie or from useragend
      let locale = 'en'
      locale =
        $cookies.get('locale') ||
        req.headers['accept-language']
          .split(',')[0]
          .toLocaleLowerCase()
          .substring(0, 2)

      // Test Issue on meta tags
      // https://github.com/nuxt/nuxt.js/issues/2034
      if (req.headers['accept-language'] !== undefined) {
        locale =
          req.headers['accept-language']
            .split(',')[0]
            .split('-')[0]
            .toLocaleLowerCase() || 'en'
      }

      store.commit('setLang', locale)
      i18n.locale = store.state.locale
    }
  }
}
