<template>
  <div class="threed-dot-loading">
    <div
      class="threed-dot-loading--bounce1"
      :style="threeDotLoadingStyle"
    ></div>
    <div
      class="threed-dot-loading--bounce2"
      :style="threeDotLoadingStyle"
    ></div>
    <div
      class="threed-dot-loading--bounce3"
      :style="threeDotLoadingStyle"
    ></div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'threeDotLoading'
})
export default class extends Vue {
  @Prop() private size?: number;

  get threeDotLoadingStyle() {
    return (
      this.size &&
      ({
        width: `${this.size}px !important`,
        height: `${this.size}px !important`
      } as HTMLElement['style'])
    )
  }
}
</script>

<style lang="sass" scoped>
.threed-dot-loading
  display: flex
  div
    width: 0.5rem
    height: 0.5rem
    margin-right: 0.4rem
    border-radius: 100%
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out both
    animation: bouncedelay 1.2s infinite ease-in-out both
  &--bounce1
    background-color: $primary
    -webkit-animation-delay: -0.32s !important
    animation-delay: -0.32s !important
  &--bounce2
    background-color: $secondary
    -webkit-animation-delay: -0.16s !important
    animation-delay: -0.16s !important
  &--bounce3
    background-color: $success
</style>
