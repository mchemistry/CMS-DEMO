<template>
  <div
    class="notification-item is-flex"
    :class="notificationItem.unRead && 'unread'"
    :style="itemStyleInPage"
  >
    <div
      class="notification-item__avatar is-flex is-justify-content-center is-align-items-center"
    >
      <avatar :size="42" :src-img="notificationItem.userThumbnailSrc" :is-rounded="true"/>
    </div>
    <div
      class="notification-item__content is-flex is-flex-direction-column is-justify-content-space-evenly"
    >
      <div class="notification-item__content__username p-1 ">
        <p :style="textContentStyleInPage">
          <span style="color: #5d3284; font-weight: 600">@{{ notificationItem.username }}</span>
          &nbsp;&#8211;&nbsp;
          <span v-if="notificationItem.isImportant" class="important-message"
            >Quan trọng</span
          >
          {{ notificationItem.isImportant ? '&nbsp;&#8211;&nbsp;' : '' }}
          {{ isPage ? notificationItem.message : convertMessage }}
        </p>
      </div>
      <div
        class="notification-item__content__date is-flex is-align-items-center pb-1"
        style="z-index: 0 !important"
      >
        <b-icon icon="clock" size="is-small"></b-icon>
        <p>{{ notificationItem.createdAt}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Avatar from '../Avatar/index.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { NotificationItemType } from '@/types/config'
@Component({
  name: 'NotificationItem',
  components: {
    avatar: Avatar
  }
})
export default class extends Vue {
  @Prop() private notificationItem!: NotificationItemType
  @Prop() private isPage?: boolean

  get itemStyleInPage() {
    return {
      height: this.isPage ? 'auto' : '60px'
    } as HTMLElement['style']
  }

  get textContentStyleInPage() {
    return {
      fontSize: this.isPage ? '14px' : '12px',
      fontWeight: this.notificationItem.unRead ? '700 !important' : '500 !important'
    } as HTMLElement['style']
  }

  get convertMessage() {
    return this.notificationItem.message.length > 72
      ? this.notificationItem.isImportant
        ? `${this.notificationItem.message.slice(0, 65)} ....`
        : `${this.notificationItem.message.slice(0, 72)} ....`
      : this.notificationItem.message
  }
}
</script>

<style lang="sass" scoped>
.notification-item
  margin-bottom: 1px
  height: 60px
  position: relative
  max-width: 100%
  transition: background-color $base-animation-timer-default
  @include border-light
  @include base-border()
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
      // height: 40px
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
</style>
