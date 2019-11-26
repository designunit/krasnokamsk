const withCss = require('@zeit/next-css')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = withCss({
    env: {
        API_WS_URL: isProduction
            ? 'wss://uray.tmshv.com/api/'
            : 'ws://tmshv.local:8000',
        API_BASE_URL: isProduction
            ? 'https://uray.tmshv.com/api'
            : 'http://tmshv.local:8000',
        MAPBOX_TOKEN: 'pk.eyJ1IjoidG1zaHYiLCJhIjoiM3BMLVc2MCJ9.PM9ukwAm-YUGlrBqt4V6vw',
        APP_ACCESS_MODE: 'readonly',
    },
})
