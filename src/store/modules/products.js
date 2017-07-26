import * as types from '@store/types'
import database from '@lib/database'

const state = {
  product: {
    name: '',
    images: [],
    description: '',
    category: '',
    price: 0
  },
  products: []
}

const getters = {
  [types.PRODUCT]: state => {
    return state.product
  },
  [types.PRODUCTS]: state => {
    return Object.values(state.products) || []
  }
}

const mutations = {
  [types.PRODUCT]: (state, payload) => {
    const empty = {
      name: '',
      description: '',
      category: '',
      price: '',
      images: []
    }
    state.product = Object.assign({}, empty, payload || {})
  },
  [types.PRODUCTS]: (state, payload) => {
    state.products = payload
  }
}

const reference = database.ref('products/')

const actions = {
  [types.PRODUCT_SAVE]: async ({ commit, dispatch }, payload) => {
    await reference.child(payload.id).set(payload)
    await dispatch(types.PRODUCTS_FETCH)
    commit(types.PRODUCT, null)
  },
  [types.PRODUCTS_FETCH]: async ({ commit }, payload) => {
    const snapshot = await reference.once('value')
    const products = snapshot.val()
    commit(types.PRODUCTS, products)
  },
  [types.PRODUCTS_ADD]: ({ commit }, payload) => {
    const id = reference.push().key
    const product = {
      id
    }
    commit(types.PRODUCT, product)
  },
  [types.PRODUCTS_EDIT]: async ({ commit }, payload) => {
    commit(types.PRODUCT, payload)
  },
  [types.PRODUCTS_DELETE]: async ({ commit, dispatch, getters }, payload) => {
    if (getters[types.PRODUCT].id === payload.id) {
      commit(types.PRODUCT, null)
    }

    await reference.child(payload.id).set(null)
    await dispatch(types.PRODUCTS_FETCH)
  }
}

export default { state, mutations, getters, actions }
