<template>
  <transition name="upper" :duration="{leave: 0}" mode="out-in">
    <div v-if="show" class="notifications__card">
      <div
        class="notifications__card-title is-flex is-justify-content-space-between pb-2"
      >
        <p class="pl-1">Thông báo</p>
        <router-link
          to="/"
          class="is-size-7 link mt-1 mr-1 has-text-weight-regular pr-1"
          >Đánh dấu tất cả đã đọc >></router-link
        >
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
            :un-read="n % 2 !== 0"
            :important-level="n % 3"
          ></notification-item>
        </div>
      </keep-alive>
      <router-link
        v-if="!loading"
        to="/notifications"
        class="is-size-7 link is-flex is-justify-content-center pb-1 pt-2 has-text-weight-regurlar notifications__card-link"
        >Xem tất cả >></router-link
      >
    </div>
  </transition>
</template>

<script lang="ts">
import NotificationItem from './NotificationItem.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'notification',
  components: {
    NotificationItem
  }
})

export default class extends Vue {
  @Prop({}) private show?: boolean

  private loading = false

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
    width: 300px
    height: auto
    padding: 0.5rem 0
    transition: transform $base-animation-timer-default
    top: 4.5rem
    @include neu-style
    &-title
        font-size: $base-default-font-size
        font-weight: bold
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
