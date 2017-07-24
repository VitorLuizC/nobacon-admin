<template>
  <div class="ui-card">
    <h3 v-if="title" class="title">{{ title }}</h3>
    <div class="content">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="footer">
      <slot name="footer" />
    </footer>
  </div>
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
  @import '~@styles/helpers'

  .ui-card
    box-sizing: border-box
    box-shadow: 4px 20px 50px -5px rgba(#000, .25)
    border-radius: 25px

    & > .footer
    & > .title
    & > .content
      padding: 20px

    & > .title
      margin: 0
      font-size: 25px
      font-weight: 300

    & > .footer
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-top: 1px solid #999;

    &.-filled > .content
      padding: 0

    &.-center
      position: absolute
      top: 50%
      left: 50%
      transform: translateY(-50%) translateX(-50%)
</style>
