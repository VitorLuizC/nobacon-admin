import * as types from '../types'
import { database } from '../../app'

const state = {
  products: []
}

const getters = {
  [types.PRODUCTS]: state => {
    return state.products
  }
}

const actions = {
  [types.PRODUCTS_FETCH]: async ({ commit }, payload) => {
    const reference = await database.ref('products/')
    const products = await reference.once('value')
    commit(types.PRODUCTS, products)
  }
}

export default { state, getters, actions }
