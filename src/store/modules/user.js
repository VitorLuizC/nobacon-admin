import * as types from '@store/types'
import app from '../../lib/app'

const state = {
  checked: false,
  user: null
}

const getters = {
  [types.USER]: state => {
    return state.user
  },
  [types.USER_CHECKED]: state => {
    return state.checked
  }
}

const mutations = {
  [types.USER]: (state, payload) => {
    state.user = payload
  },
  [types.USER_CHECKED]: (state, payload) => {
    state.checked = payload
  }
}

const actions = {
  [types.USER_LOGIN]: async (context, payload) => {
    const { commit } = context
    const auth = app.auth()

    const user = await auth.signInWithEmailAndPassword(
      payload.email,
      payload.password
    )
    commit(types.USER, user)
  },
  [types.USER_LOGOUT]: async ({ commit }) => {
    const auth = app.auth()
    await auth.signOut()
    commit(types.USER, null)
  },
  [types.USER_CHECK]: async ({ commit, getters }) => {
    const auth = app.auth()
    const isChecked = getters[types.USER_CHECKED]

    if (isChecked) {
      return !!getters[types.USER]
    } else {
      const check = () => new Promise((resolve, reject) => {
        commit(types.USER_CHECKED, true)

        auth.onAuthStateChanged((user, error) => {
          if (isChecked) {
            return
          }

          return (error)
            ? reject(error)
            : resolve(user)
        })
      })
      const user = await check()
      commit(types.USER, user)
      return !!user
    }
  }
}

export default { state, getters, mutations, actions }
