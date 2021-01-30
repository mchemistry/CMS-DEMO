<template>
    <b-button
      class="btn-fullscreen"
      icon-right="fullscreen"
      size="is-large"
      :style="btnFullScreenStyle"
      @click="toggleScreen"
    />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { toggleFullScreen } from '@/utils/full-screen'

@Component({
  name: 'FullScreen'
})

export default class extends Vue {
  @Prop({ default: 'default-layout' }) private elementId!: string
  @Prop({
    default: 'relative',
    validator: (val: string) => ['fixed', 'relative', 'static', 'absolute'].includes(val)
  }) private position!: string

  @Prop({ default: null }) private top!: string | number
  @Prop({ default: null }) private right!: string | number
  @Prop({ default: null }) private bottom!: string | number
  @Prop({ default: null }) private left!: string | number

  get btnFullScreenStyle() {
    return {
      position: `${this.position} !important`,
      top: `${this.top}px !important` && this.top,
      left: `${this.left}px !important` && this.left,
      right: `${this.right}px !important` && this.right,
      bottom: `${this.bottom}px !important` && this.bottom
    } as HTMLElement['style']
  }

  private toggleScreen() {
    return toggleFullScreen(this.elementId)
  }
}
</script>
