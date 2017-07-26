<template>
  <form class="ui-form">
    <header class="ui-form-header">
      <h1 v-if="title" class="title">{{ title }}</h1>
      <slot name="header" />
    </header>
    <form class="ui-form-content">
      <slot />
    </form>
    <footer v-if="$slots.footer" class="ui-form-footer">
      <slot name="footer" />
    </footer>
  </form>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: null
      }
    }
  }
</script>

<style lang="stylus">
  .ui-form
    display: flex
    flex-direction: column
    width: 100%

    & > .ui-form-header
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center
</style>
