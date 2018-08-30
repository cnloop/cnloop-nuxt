module.exports = {

  head: {
    title: 'CNLOOP',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  generate: {
    routes: [
      'category/general',
      'category/help',
      'category/vue',
      'category/css',
      'category/js',
      'category/node'
    ]
  },
  loading: {
    color: '#3B8070'
  },
  build: {
    filenames: {
      manifest: 'manifest.app.[hash].js',
      vendor: 'vendor.app.[chunkhash].js',
      app: 'app.app.[chunkhash].js'
    },
    loaders: [{
      test: /\.less$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "less-loader" // compiles Less to CSS
      }]
    }],
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  vendor: ['vue-avatar', '~/plugins/http.js', '~/plugins/nuxt-mavon-editor.js'],
  plugins: [{
    src: '~/plugins/nuxt-mavon-editor.js',
    ssr: false
  }, {
    src: '~/plugins/http.js'
  }],
  css: [
    'mavon-editor/dist/css/index.css'
  ]
}
