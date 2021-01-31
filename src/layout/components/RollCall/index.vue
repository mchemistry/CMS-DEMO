<template>
  <transition name="rollcall" mode="out-in">
    <div
      class="roll-call"
      :class="result && 'remove-shadow'"
      @click="result ? () => null : onRollCall()"
    >
      <transition
        name="icon-zoom"
        mode="out-in"
        :duration="{
          leave: 0
        }"
      >
        <b-icon
          v-if="loading && !result"
          key="1"
          icon="loading"
          custom-class="loading"
        />
        <b-icon v-else-if="!result" key="2" icon="calendar-check" />
        <b-icon
          v-else
          key="3"
          icon="check-bold"
          style="color: #18634e"
        ></b-icon>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'RollCall'
})

export default class extends Vue {
  @Prop({}) private isCalledRoll?: boolean

  private loading = false
  private result = false

  private onRollCall() {
    this.loading = true
    setTimeout(() => {
      this.loading = false
      this.result = true
    }, 3000)
  }
}
</script>

<style lang="sass" scoped>
.roll-call
    position: fixed
    right: 0.75rem
    bottom: 0.75rem
    width: 2.5rem
    height: 2.5rem
    border-radius: 1.25rem
    cursor: pointer
    box-shadow: $base-neumorphism-shadow
    background-color: $base-background-color
    transition: transform 0.3s ease-in-out
    color: $secondary
    @include border-light
    @include base-border
    @include items-center
    &:active
      box-shadow: $base-small-neumorphism-inset-shadow
    &.remove-shadow
      box-shadow: none
      cursor: default
</style>
