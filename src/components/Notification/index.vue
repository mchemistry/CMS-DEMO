<template>
  <transition name="upper" :duration="{leave: 0}" mode="out-in">
    <div class="notifications__card" v-show="show">
      <div
        class="notifications__card-title is-flex is-justify-content-space-between pb-2 is-align-items-center"
      >
        <p class="pl-1">Thông báo</p>
        <a
          v-if="totalMessageUnread && !markAllAsReadLoading"
          class="is-size-7 link mt-1 mr-1 has-text-weight-semibold pr-1"
          @click.stop="onMarkAllMessageAsRead"
          >Đánh dấu tất cả đã đọc >>
        </a>
        <thee-dot-loading v-if="markAllAsReadLoading" class="mr-4"/>
      </div>
      <div
        v-if="loading"
        class="notifications__card__list-sync pt-5 pb-5 is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
      >
        <b-icon icon="autorenew" custom-class="spin"></b-icon>
        <p class="is-size-7">Đang tải dữ liệu ...</p>
      </div>
      <keep-alive>
        <div v-if="!loading" class="notifications__card__list-show pt-1">
          <notification-item
            v-for="n in 10"
            :key="n"
            :un-read="totalMessageUnread > 0 && n % 2 !== 0"
            :is-important-message="n % 2 !== 0"
          ></notification-item>
        </div>
      </keep-alive>
      <router-link
        v-if="!loading"
        to="/notifications"
        class="is-size-7 link is-flex is-justify-content-center pb-1 pt-2 has-text-weight-semibold notifications__card-link"
        >Xem tất cả >></router-link
      >
    </div>
  </transition>
</template>

<script lang="ts">
import NotificationItem from './NotificationItem.vue'
import { theeDotLoading } from '../Loading'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'notification',
  components: {
    NotificationItem,
    theeDotLoading
  }
})

export default class extends Vue {
  @Prop({}) private show?: boolean

  private loading = false
  private markAllAsReadLoading = false
  // private totalMessageUnread?: number
  private totalMessageUnread = 10

  private onMarkAllMessageAsRead() {
    this.markAllAsReadLoading = true
    setTimeout(() => {
      this.markAllAsReadLoading = false
      this.totalMessageUnread = 0
    }, 3000)
  }

  mouted() {
    if (this.show) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 3000)
    }
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
