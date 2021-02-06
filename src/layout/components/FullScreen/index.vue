<template>
  <div>
    <b-icon
      v-if="!isFullScreen"
      class="btn-fullscreen"
      icon="arrow-expand-all"
      :style="btnFullScreenStyle"
      @click.native="toggleScreen"
    > </b-icon>
    <b-icon
      v-else
      class="btn-fullscreen"
      icon="arrow-collapse-all"
      :style="btnFullScreenStyle"
      @click.native="toggleScreen"
    > </b-icon>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FullScreen } from '@/utils/event'

const fs = FullScreen

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

  private isFullScreen = false

  get btnFullScreenStyle() {
    return {
      position: `${this.position} !important`,
      top: `${this.top}px !important` && this.top,
      left: `${this.left}px !important` && this.left,
      right: `${this.right}px !important` && this.right,
      bottom: `${this.bottom}px !important` && this.bottom
    } as HTMLElement['style']
  }

  private toggleStatusOfScreen() {
    this.isFullScreen = !this.isFullScreen
  }

  private toggleScreen() {
    return fs.toggleFullScreen(this.elementId)
  }

  beforeMount() {
    fs.getFullScreenStatus(this.toggleStatusOfScreen)
  }

  beforeDestroy() {
    fs.destroyFullScreenEvent(this.toggleScreen)
  }
}
</script>
