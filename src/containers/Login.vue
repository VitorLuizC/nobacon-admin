<template>
  <view-container hide-header>
    <ui-card class="-center" title="Login">
      <form id="login" @submit.prevent="login()">
        <ui-input v-model="email" label="E-Mail" />
        <ui-input v-model="password" label="Senha" />
      </form>
      <ui-button slot="footer" form="login">Entrar</ui-button>
    </ui-card>
  </view-container>
</template>

<script>
  import * as types from '@store/types'
  import UiButton from '@components/UiButton'
  import UiCard from '@components/UiCard'
  import UiInput from '@components/UiInput'
  import ViewContainer from '@components/ViewContainer'

  export default {
    components: {
      UiButton,
      UiCard,
      UiInput,
      ViewContainer
    },
    data: () => ({
      email: '',
      password: ''
    }),
    methods: {
      login: async function () {
        await this.$store.dispatch(types.USER_LOGIN, {
          email: this.email,
          password: this.password
        })
        this.$router.push('/home')
      }
    }
  }
</script>
