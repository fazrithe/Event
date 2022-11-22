import { imgPath } from '~/global/constants'
export const state = () => ({
  filePath: imgPath,
  point: 0,
  creditPoint: 0,
  cart: [],
})

export const mutations = {
  setPoint(state, point) {
    state.point = point
  },
  setCreditPoint(state, point) {
    state.creditPoint = point
  },
  addCart(state, product) {
    state.cart.push(product)
  },
  dropCart(state, product) {
    state.cart.splice(state.cart.indexOf(product), 1)
  },
}
