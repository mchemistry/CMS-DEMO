<template>
  <div>
    <img :src="srcImg" alt="avatar" class="is-rounded" :style="avatarStyle" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'avatar'
})

export default class extends Vue {
  @Prop({ default: 24 }) private size!: number
  @Prop() private includeNeumorphism?: boolean
  @Prop({
    default:
  'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
  }) private srcImg!: string

  @Prop() private includeCursorPointer?: boolean
  @Prop() private isRounded?: boolean

  get avatarStyle() {
    return {
      width: `${this.size}px`,
      height: `${this.size}px`,
      boxShadow: this.includeNeumorphism
        ? ' 0.125rem 0.125rem 0.3125rem #b8b9be, -0.125rem -0.125rem 0.3125rem #fff'
        : 'none',
      padding: this.includeNeumorphism ? '6px' : 0,
      borderRadius: this.isRounded ? `${this.size / 2}px` : 'none',
      objectFit: 'cover',
      cursor: this.includeCursorPointer ? 'pointer' : 'default'
    } as HTMLElement['style']
  }
}
</script>
