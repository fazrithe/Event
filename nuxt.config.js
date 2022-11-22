import { apiBase, rc_site } from './global/constants'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  generate: {
    routes: [
      '/booth/1',
      '/booth/2',
      '/booth/3',
      '/booth/4',
      '/booth/5',
      '/booth/6',
      '/booth/7',
      '/booth/8',
      '/booth/9',
      '/booth/10',
      '/booth/11',
      '/booth/12',
    ],
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'BIC 2022',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'assets/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-tooltip.js',
    '~/plugins/v-img.js',
    // '~/plugins/crypto.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    '@nuxtjs/recaptcha',
    'cookie-universal-nuxt',
    'nuxt-socket-io',
  ],

  // plugins: [
  //   '~/plugins/axios',
  // ],

  router: {
    middleware: ['auth'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/',
    baseURL: apiBase + '/api',
    withCredentials: true,
    credentials: true,
  },

  auth: {
    // plugins: ['~/plugins/auth.js'],
    // redirect: {
    //   login: '/login',
    //   logout: '/',
    //   callback: '/login',
    //   home: '/',
    // },
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        token: {
          property: 'data.token',
        },
        autoFetchUser: true,
        url: apiBase,
        endpoints: {
          login: {
            url: '/api/auth',
            method: 'post',
            propertyName: 'data.token',
          },
          logout: {
            url: '/api/auth/logout',
            method: 'post',
          },
          user: { url: '/api/user', method: 'get' },
          // logout: { url: '/api/auth/logout', method: 'post' },
        },
      },
    },
  },

  token: {
    prefix: '_token',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  toast: {
    duration: 5000,
    position: 'bottom-center',
    // action: {
    //   icon: 'close',
    //   onClick: (e, toastObject) => {
    //     toastObject.goAway(0)
    //   },
    // },
    // iconPack: 'mdi',
    // icon: 'info',
  },

  io: {
    sockets: [
      {
        name: 'main',
        url: 'http://localhost:1945',
      },
    ],
  },

  recaptcha: {
    siteKey: rc_site,
    version: 2,
  },
}
