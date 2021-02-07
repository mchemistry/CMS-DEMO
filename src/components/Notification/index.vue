<template>
  <transition name="upper" :duration="{leave: 0}" mode="out-in">
    <div class="notifications__card" v-if="isShowNotificationCard">
      <div
        class="notifications__card-title is-flex is-justify-content-space-between pb-2 is-align-items-center"
      >
        <p class="pl-1">Thông báo</p>
        <a
          v-if="totalMessageUnread && !markAllAsReadLoading && !loadingNotifications"
          class="is-size-7 link mt-1 mr-1 has-text-weight-semibold pr-1"
          @click.stop="onMarkAllMessageAsRead"
          >Đánh dấu tất cả đã đọc >>
        </a>
        <three-dot-loading v-if="markAllAsReadLoading" class="mr-4"/>
      </div>
      <div
        v-if="loadingNotifications"
        class="notifications__card__list-sync pt-5 pb-5 is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
      >
        <b-icon icon="autorenew" custom-class="spin"></b-icon>
        <p class="is-size-7">Đang tải dữ liệu ...</p>
      </div>
      <!-- Notifications Base -->
      <div v-if="!loadingNotifications" class="notifications__card__list-show pt-1">
        <notification-item
          v-for="notification in notifications"
          :key="notification.id + notification.unRead.toString()  /* Trick: Vue only reactive with element changed id */"
          :notification-item='notification'
        ></notification-item>
      </div>

      <!--  -->
      <div class="is-flex is-justify-content-center pb-1 pt-2" @click.stop="toggleNotiCard">
        <router-link
          v-if="!loadingNotifications"
          to="/notifications"
          class="is-size-7 link has-text-weight-semibold notifications__card-link"
          >Xem tất cả >></router-link
      >
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import NotificationItem from './NotificationItem.vue'
import { threeDotLoading } from '../Loading'
import { Component, Vue } from 'vue-property-decorator'
import { NotificationItemType } from '@/types/config'
import { BNotificationConfig } from 'buefy/types/components'
import { AppModule } from '@/store/modules/app'

const URL_API = 'http://localhost:3000/notifications'
@Component({
  name: 'notification',
  components: {
    NotificationItem,
    threeDotLoading
  }
})

export default class extends Vue {
  private totalNotifications!: number
  private notifications!: Array<NotificationItemType>
  private loadingNotifications = true
  private markAllAsReadLoading = false
  private totalMessageUnread = 0

  get isShowNotificationCard() {
    return AppModule.isShowNotificationCard
  }

  private toggleNotiCard() {
    return AppModule.commitToggleNotificationCard()
  }

  private getNotifications(): void {
    fetch(`${URL_API}`)
      .then(res => res.json())
      .then(data => {
        this.totalNotifications = data.length
        this.totalMessageUnread = data.filter((el: NotificationItemType) => el.unRead === true).length
        this.notifications = this.totalNotifications > 10
          ? data.slice(0, 10)
          : data.slice(0, this.totalNotifications)
        // console.log(this.totalNotifications)
      })
      .catch(error => {
        this.$buefy.toast.open({
          duration: 2500,
          message: `${error}`,
          type: 'is-error'
        } as BNotificationConfig)
      })
      .finally(() => {
        this.loadingNotifications = false
      })
  }

  private onMarkAllMessageAsRead() {
    this.markAllAsReadLoading = true
    setTimeout(() => {
      this.markAllAsReadLoading = false
      this.totalMessageUnread = 0
      this.notifications = this.notifications.map(subNotification => {
        subNotification.unRead = false
        return subNotification
      })
    }, 3000)
  }

  created() {
    this.getNotifications()
  }
}
</script>

<style lang="sass" scoped>
.notifications__card
  position: absolute
  cursor: default
  min-height: 100px
  width: 320px
  height: auto
  padding: 0.5rem 0
  transition: transform $base-animation-timer-default
  top: 4.5rem
  @include neu-style
  &-title
    font-size: $base-default-font-size
    font-weight: 600
    color: $secondary
    line-height: 1.3
  &__list-show
    max-height: 250px
    overflow: auto
      // box-shadow: $base-small-neumorphism-inset-shadow
    @include border-light
    @include base-border(top, bottom)
  &__list-sync
    color: $secondary
    @include border-light
    @include base-border(top, bottom)
</style>
