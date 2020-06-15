/*
 ** Access to ENV variables
 */

require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1.0',
      },
      {
        hid: 'description',
        property: 'description',
        content: 'Lokal einkaufen!',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://getit.market/img/mockup.png',
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: '1024',
      },
      {
        hid: 'og:image:width',
        property: 'og:image:height',
        content: '683',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.VUE_APP_URL,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Lokal einkaufen!',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'get it! Marketplace',
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
        content: process.env.VUE_APP_URL,
      },
      {
        hid: 'og:locale',
        property: 'og:locale',
        content: 'de',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://js.api.here.com/v3/3.1/mapsjs-ui.css',
      },
    ],
  },

  /**
   * Vue configuration
   */
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },

  /**
   * ENV Variables passing to nuxt project
   */
  env: {
    VUE_APP_GOOGLE_ID: process.env.VUE_APP_GOOGLE_ID,
    VUE_APP_FACEBOOK_ID: process.env.VUE_APP_FACEBOOK_ID,
    VUE_APP_MASTER_KEY: process.env.VUE_APP_MASTER_KEY,
    VUE_APP_URL: process.env.VUE_APP_URL,
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    VUE_APP_HERE_ID: process.env.VUE_APP_HERE_ID,
    VUE_APP_HERE_CODE: process.env.VUE_APP_HERE_CODE,
    BUGSNAG_API_KEY: process.env.BUGSNAG_API_KEY,
  },

  /**
   * Customize the progress-bar color
   */
  loading: { color: '#2F615E' },

  /**
   * PWA configuration
   */
  pwa: {
    meta: {
      theme_color: '#01374c',
      name: 'get it!',
      author: 'tayfun guelcan',
      lang: 'de',
    },
  },

  /*
  // Options
  // TODO: Prepare Push Notifications
  oneSignal: {
    init: {
      appId: 'YOUR_APP_ID',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true,
      },
    },
  },
  */

  /**
   ** PurgeCSS configuration
   */
  purgeCSS: {
    whitelistPatterns: [
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!(|.*?:)cursor-move).+-move$/,
      /^nuxt-link(|-exact)-active$/,
    ],
  },

  /**
   * Tailwind config
   */
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    purgeCSSInDev: false,
    exposeConfig: false,
  },

  /**
   * Webfontloader
   */
  webfontloader: {
    google: {
      families: ['Muli:300,400,500,600,700,800,900&display=swap'],
    },
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/main'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/modules/axios',
    '~/plugins/modules/i18n',
    '~/plugins/mixins/components',
    { src: '~/plugins/modules/localstorage', mode: 'client' },
    { src: '~/plugins/modules/vue-scroll-reveal', mode: 'client' },
    { src: '~/plugins/modules/timeago', mode: 'client' },
    { src: '~/plugins/modules/validation', mode: 'client' },
    { src: '~/plugins/modules/socialAuthentication', mode: 'client' },
    { src: '~/plugins/modules/heremaps', mode: 'client' },
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // https://gitlab.com/broj42/nuxt-cookie-control#README
    [
      'nuxt-cookie-control',
      {
        controlButton: false,
        // default colors
        colors: {
          barTextColor: '#fff',
          modalOverlay: '#2F615E',
          barBackground: '#2F615E',
          barButtonColor: '#000000',
          modalTextColor: '#2F615E',
          modalBackground: '#fff',
          modalOverlayOpacity: 0.8,
          modalButtonColor: '#fff',
          modalUnsavedColor: '#fff',
          barButtonHoverColor: '#000000',
          barButtonBackground: '#FFE55F',
          modalButtonHoverColor: '#fff',
          modalButtonBackground: '#2F615E',
          controlButtonIconColor: '#2F615E',
          controlButtonBackground: '#fff',
          barButtonHoverBackground: '#FFC700',
          checkboxActiveBackground: '#2F615E',
          checkboxInactiveBackground: '#2F615E',
          modalButtonHoverBackground: '#FFC700',
          checkboxDisabledBackground: '#ddd',
          controlButtonIconHoverColor: '#fff',
          controlButtonHoverBackground: '#2F615E',
          checkboxActiveCircleBackground: '#fff',
          checkboxInactiveCircleBackground: '#fff',
          checkboxDisabledCircleBackground: '#fff',
        },
      },
    ],
    // https://github.com/TiagoDanin/Nuxt-SEO
    'nuxt-seo',
    // Doc: https://github.com/Developmint/nuxt-webfontloader#readme
    'nuxt-webfontloader',
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/markdownit
    '@nuxtjs/markdownit',
    // Doc: https://github.com/potato4d/nuxt-client-init-module
    'nuxt-client-init-module',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/device-module#readme
    '@nuxtjs/device',
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt#readme
    'cookie-universal-nuxt',
    // https://github.com/skyatura/vue-geolocation-api#readme
    'vue-geolocation-api/nuxt',
    // https://dm4t2.github.io/vue-currency-input/
    ['vue-currency-input/nuxt', { globalOptions: { currency: 'EUR' } }],
    // https://github.com/julianmar/nuxt-bugsnag#readme
    [
      'nuxt-bugsnag',
      {
        config: {
          apiKey: process.env.BUGSNAG_API_KEY,
          releaseStage: 'development',
          logger: null,
          notifyReleaseStages: ['production', 'staging'],
          enabledReleaseStages: ['production', 'staging'],
        },
      },
    ],
  ],
  /**
   ** SEO configuration
   */
  seo: {
    // Module options
    name: 'get it!',
    title: 'get it! Marketplace',
    templateTitle: 'get it! Marketplace',
    description: 'Lokal einkaufen!',
    openGraph: {
      title: 'get it! Marketplace',
      description: 'Lokal einkaufen!',
      type: 'website',
      image: 'https://getit.market/img/mockup.png',
      locale: 'de',
      site_name: process.env.VUE_APP_URL,
      url: process.env.VUE_APP_URL,
    },
    facebook: {
      app_id: '574950416384081',
    },
  },
  /**
   ** Markdown configuration
   */
  markdownit: {
    preset: 'default',
    breaks: true,
    injected: true,
  },
  /**
   ** Global Middleware configuration
   */
  router: {
    middleware: 'i18n',
  },

  /**
   ** Server Middleware configuration
   */
  serverMiddleware: ['redirect-ssl'],

  /**
   * Axios module configuration
   * See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },

  proxy: {
    '/api': { target: process.env.API_URL },
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },

  cookies: {
    necessary: [
      {
        // if multilanguage
        name: {
          en: 'Required cookies',
          de: 'Erforderliche Cookies',
        },

        // if multilanguage
        description: {
          en:
            'Required cookies help to make a website usable by enabling basic functions such as page navigation and access to secure areas of the website. The website cannot function properly without these cookies.',
          de:
            'Erforderliche Cookies helfen dabei, eine Website nutzbar zu machen, indem sie Grundfunktionen wie Seitennavigation und Zugriff auf sichere Bereiche der Website ermöglichen. Die Website kann ohne diese Cookies nicht richtig funktionieren.',
        },
        // else
        cookies: ['getit'],
      },
    ],
    optional: [
      {
        name: 'Google Analitycs',
        description: {
          de:
            'Diese Cookies werden genutzt, um Funktionen der Website zuzulassen, die Ihnen eine möglichst komfortable und auf Ihre Interessen zugeschnittene Nutzung ermöglichen. Des Weiteren hilft uns die Analyse des Nutzerverhaltens ebenfalls, die Qualität unserer Webseite fortlaufend zu verbessern.',
          en:
            'These cookies are used to allow functions of the website that enable you to use the website as conveniently as possible and tailored to your interests. Furthermore, the analysis of user behaviour also helps us to continuously improve the quality of our website.',
        },
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-161423817-1',
        async: true,
        cookies: ['_ga', '_gat', '_gid'],
        accepted: () => {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js',
          })
        },
        declined: () => {},
      },
    ],
  },
}
