<template>
  <div class="card-neumorphism is-flex is-justify-content-center is-align-items-center" :style="neumorphismCardStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'card'
})

export default class extends Vue {
  @Prop({}) private width!: number | string
  @Prop({}) private height!: number | string

  get neumorphismCardStyle() {
    const style = {} as HTMLElement['style']
    style.width = `${this.width}px`
    style.height = this.height ? `${this.height}px` : '100%'
    return style
  }
}
</script>

<style lang="sass" scoped>
.card-neumorphism
  padding: 0.5rem
  @include neu-style
</style>
