import Vue from 'vue'
import Router from 'vue-router'
import Login from '@containers/Login'
import Home from '@containers/Home'
import * as types from '@store/types'
import store from '@store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const hasUser = await store.dispatch(types.USER_CHECK)

  if (to.path === '/login' && hasUser) {
    next('/home')
  } else if (to.path !== '/login' && !hasUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
