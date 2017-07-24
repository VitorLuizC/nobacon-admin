<template>
  <div class="ui-select">
    <p
      class="selected"
      type="text"
      @click="open = !open"
      disabled>
      {{ selected ? selected[label] : null }}
      <i class="icon -char">{{ open ? '&#9650;' : '&#9660;' }}</i>
    </p>
    <transition
      enter-active-class="fadeInDown"
      leave-active-class="fadeOutUp">
      <ui-card v-if="open" class="card">
        <ul class="ui-select-options">
          <li
            :class="['option', (selected === option) ? '-active' : '']"
            v-for="(option, index) in options"
            :key="index"
            @click="input(option)"
            >{{ option[label] }}</li>
        </ul>
      </ui-card>
    </transition>
  </div>
</template>

<script>
  import UiCard from './UiCard'

  export default {
    components: { UiCard },
    data () {
      return {
        selected: null,
        open: false
      }
    },
    props: {
      label: {
        type: String,
        default: 'label'
      },
      options: {
        type: Array,
        required: true
      }
    },
    methods: {
      input (option) {
        this.selected = option
        this.open = false
        this.$emit('input', option)
      }
    },
    mounted () {
      this.input(this.options[0])
    }
  }
</script>

<style lang="stylus">
  .ui-select
    position: relative

    & > .selected
      cursor: pointer

    & > .card
      position: absolute
      top: calc(100% - 10px)
      right: -10px
      background-color: #fff
      z-index: 1

  .ui-select-options
    display: flex7
    flex-direction: column
    list-style: none
    margin: 0 -20px

    & > .option
      padding: 0 20px
      white-space: nowrap
      cursor: pointer
      transition: background-color .5s ease,
                  color .5s ease

      &.-active
        color: #960074

      &:hover
        background-color: rgba(#999, .3)
</style>
