<template>
  <router-link v-if="to" class="ui-button" :to="to">
    <span class="text">
      <slot />
    </span>
  </router-link>
  <button v-else class="ui-button">
    <span class="text">
      <slot />
    </span>
  </button>
</template>

<script>
  export default {
    props: {
      to: {
        type: String,
        default: null
      }
    }
  }
</script>

<style lang="stylus">
  .ui-button
    display: inline-block
    box-sizing: border-box
    width: 120px
    height: 44px
    padding: 0
    border: 0
    border-radius: (@height / 2)
    line-height: @height
    text-align: center
    text-decoration: none
    background-color: #960074
    background-image: linear-gradient(180deg, @background-color, rgba(#fff, .25))
    cursor: pointer
    outline: none
    transition: transform .6s ease

    > .text
      line-height: 1
      text-transform: uppercase
      font-weight: 700
      color: #fff
      transition: color .6s ease

    &:hover
    &:active
      tranform: scale(1.1)
      /**
       * TODO: Adicionar uma transição com o "transform".
       */

      > .text
        color: #fff

    &.-block
      width: 100%
</style>
