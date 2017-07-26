<template>
  <div class="view-container">
    <view-header v-if="!hideHeader" />
    <main class="view-content">
      <slot />
    </main>
  </div>
</template> 

<script>
  import ViewHeader from './ViewHeader'

  export default {
    components: { ViewHeader },
    props: {
      hideHeader: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="stylus">
  @import '~@styles/helpers'

  view-header = {
    height: 120px
  }

  .view-container
    clearfix()
    height: 100%

    > .view-header
      height: view-header.height

    > .view-content
      position: relative
      overflow: auto
      width: 100%
      min-height: 100%

      @media screen and (min-width: 768px)
        height: 100%
        min-height: auto

      @media screen and (min-width: 1280px)
        width: 1280px
        margin-right: auto
        margin-left: @margin-right

    > .view-header ~ .view-content
      min-height: 'calc(100% - %s)' % view-header.height

      @media screen and (min-width: 768px)
        height: 'calc(100% - %s)' % view-header.height
        min-height: auto
</style>
