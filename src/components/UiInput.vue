<template>
  <div class="ui-input">
    <label v-if="label" class="label">{{ label }}</label>
    <input class="input" :value="value" @input="event => $emit('input', event.target.value)">
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        required: true
      },
      label: {
        type: String,
        default: null
      }
    }
  }
</script>

<style lang="stylus">
  .ui-input
    display: block

    & > .label
    & > .input
      display: block
</style>
