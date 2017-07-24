<template>
  <header class="view-header">
    <div class="view-header-content">
      <router-link class="view-header-logo" to="/home">
        <img
          class="image"
          src="~@images/logo.png"
          alt="NoBacon Store"
          title="NoBacon Store" />
      </router-link>

      <ui-button @click.native="logout">Sair</ui-button>
    </div>
  </header>
</template>

<script>
  import * as types from '@store/types'
  import UiButton from './UiButton'

  export default {
    components: { UiButton },
    methods: {
      logout: async function () {
        await this.$store.dispatch(types.USER_LOGOUT)
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="stylus">
  .view-header
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    box-shadow: 0 0 10px rgba(#000, .25)

  .view-header-content
    width: 100%
    height: 100%

    @media screen and (min-width: 1280px)
      width: 1280px

  .view-header-logo
    height: 100%;

    & > .image
      height: calc(100% - 20px)
      margin-top: 10px
      margin-bottom: @margin-top
</style>
