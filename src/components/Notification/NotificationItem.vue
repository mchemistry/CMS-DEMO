<template>
  <div
    class="notification-item is-flex"
    :class="unRead && 'unread'"
    :style="itemStyleInPage"
  >
    <div
      class="notification-item__avatar is-flex is-justify-content-center is-align-items-center"
    >
      <avatar :size="42" :src-img="userThumbnailSrc" />
    </div>
    <div
      class="notification-item__content is-flex is-flex-direction-column is-justify-content-space-evenly"
    >
      <div class="notification-item__content__username pl-1">
        <p :style="textContentStyleInPage">
          <span style="color: #5d3284; font-weight: 600">@{{ userName }}</span>
          &nbsp;&#8211;&nbsp;
          <span v-if="isimportantMessage" class="important-message">Quan trọng</span>
          {{isimportantMessage ? '&nbsp;&#8211;&nbsp;' : ''}}
          {{ isPage ? message : convertMessage }}
        </p>
      </div>
      <div
        class="notification-item__content__date is-flex is-align-items-center"
        style="z-index: 0 !important"
      >
        <b-icon icon="clock" size="is-small"></b-icon>
        <p>27 septembre 2019 at 23:14</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Avatar from '../Avatar/index.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'NotificationItem',
  components: {
    avatar: Avatar
  }
})

export default class extends Vue {
  @Prop() private isPage?: boolean
  @Prop() private unRead?: boolean
  @Prop() private isimportantMessage!: boolean
  @Prop({ default: 'Username' }) private userName!: string
  @Prop({
    default:
      'https://i.ibb.co/mDhwrnP/icon-facebook-ong-110448635.png'
  }) private userThumbnailSrc!: boolean

  @Prop({
    default: `Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Non quae culpa eveniet,
          doloremque beatae perferendis esse quia quo, exercitationem saepe
          consequuntur. Hic doloribus, incidunt optio itaque consequatur
          quisquam maiores natus. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Cupiditate magnam natus quis, perferendis officia
          explicabo, eum, sapiente pariatur alias voluptate iusto id!
          Blanditiis, aperiam. Reprehenderit accusantium autem magni debitis
          deserunt.`
  }) private message!: string

  get itemStyleInPage() {
    return {
      height: this.isPage ? '80px' : '60px'
    } as HTMLElement['style']
  }

  get textContentStyleInPage() {
    return {
      fontSize: this.isPage ? '14px' : '12px',
      fontWeight: this.unRead ? '700 !important' : '500 !important'
    } as HTMLElement['style']
  }

  get convertMessage() {
    return this.message.length > 72
      ? (this.isimportantMessage ? `${this.message.slice(0, 65)} ....` : `${this.message.slice(0, 72)} ....`)
      : this.message
  }
}
</script>

<style lang="sass" scoped>
.notification-item
    margin-bottom: 1px
    height: 60px
    position: relative
    max-width: 100%
    cursor: pointer
    transition: background-color $base-animation-timer-default
    @include base-border(bottom, top)
    &.unread
        background-color: rgba($link, 0.1)
    &:hover
      background-color: rgba($secondary, 0.2)
    #{&}__avatar
        width: 5rem
        img
            object-fit: cover !important
            width: 2.8rem
            height: 2.8rem
            border-radius: 50%
    #{&}__content
        overflow: hidden
        width: 100%
        &__username
            word-wrap: break-word
            text-overflow: ellipsis
            height: 40px
            overflow: hidden
            .important-message
              background-color: $danger
              border-radius: 12px
              width: 24px
              height: 16px
              font-size: 10px
              padding: 0.1rem 0.3rem
              color: $white
              font-weight: 500 !important
        &__date
            height: 15px
            position: relative
            bottom: 0
            font-size: 11px
    #{&}__level
      width: 60px
      height: 100%
    .icon--impact-avatar
      border-radius: 50%
      border: 3px solid #e6e7ee
      background-color: #e6e7ee
      @include center(absolute, 'y')
</style>
