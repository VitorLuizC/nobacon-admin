import Vue from 'vue'
import Vuex from 'vuex'
import products from '@store/modules/products'
import user from '@store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    user
  }
})
