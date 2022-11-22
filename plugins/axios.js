export default ({ $axios, $auth, store }) => {
  // console.log(store.state.auth._token);
  $axios.onRequest((config) => {
    config.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: store.state.auth.tokenlocal, // refers to nuxt.config.js->auth.token
    }
  })
}
