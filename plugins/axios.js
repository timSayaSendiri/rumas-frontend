export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['apikey'] = 'FMTYqeTayozJiH2PNcN3Y2nTqGfVKKoK'
    if (store.state.token) {
      // config.headers.common['Authorization'] = `Bearer ${store.state.token}`
    }
  })
}