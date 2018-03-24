export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['apikey'] = 'FMTYqeTayozJiH2PNcN3Y2nTqGfVKKoK'
    config.headers['Access-Control-Allow-Origin'] = '*'
    if (store.state.token) {
      // config.headers.common['Authorization'] = `Bearer ${store.state.token}`
    }
  })
}