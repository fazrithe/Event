export default function ({ redirect, store }) {
  // const usuer =
  const isAuthenticated = store.state.auth.user.length > 0 ? true : false
  if (!isAuthenticated) {
    // redirect({ path: '/login' })
  }
}
