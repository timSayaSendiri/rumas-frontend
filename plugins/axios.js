export default function ({ $axios, store }) {
  $axios.setHeader('apikey', 'FMTYqeTayozJiH2PNcN3Y2nTqGfVKKoK')
  $axios.setHeader('Accept', 'application/json')
  $axios.setHeader('Content-Type', 'application/json')
  $axios.onRequest(config => {
    // config.headers['Content-Type'] = 'application/json'
    // config.headers['apikey'] = 'FMTYqeTayozJiH2PNcN3Y2nTqGfVKKoK'
    if (store.state.token) {
      // config.headers.common['Authorization'] = `Bearer ${store.state.token}`
    }
  })
}