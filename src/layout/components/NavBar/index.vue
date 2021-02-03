<template>
  <nav
    id="navbar"
    class="pl-1 is-flex is-align-items-center navbar"
    :style="navbarStyle"
  >
    <div class="menu_wrapper ml-3" @click="toggleMenu">
      <span class="hamburger-menu"></span>
    </div>
    <div class="navbar__end">
      <div
        class="notifications mr-6 is-flex is-align-items-center"
      >
        <div @click.stop="showNoti = !showNoti" class="notifications__handler is-flex is-align-items-center">
          <b-icon icon="bell" class="notifications__handler-icon"/>
          <span
            v-if="totalNotificationsUnread"
            class="notifications__handler-counter is-flex is-align-items-center is-justify-content-center"
            >{{ totalNotificationsUnread | totalNotificationsConvert }}</span
          >
        </div>
        <notification class="notifications__card" :show="showNoti" v-click-outside="closeNotificationCard" />
      </div>
      <full-screen class="mr-6" />
      <div
        class="user mr-5 mt-1 is-flex is-align-items-center"
        @click.stop="showUserSetting = !showUserSetting"
      >
        <avatar :size="32" :includeCursorPointer="true"/>
        <b-icon
          class="is-pulled-right pb-1 ml-2 user__icon"
          icon="menu-right"
          :class="showUserSetting && `rotate-90`"
        ></b-icon>
        <transition name="upper" :duration="{leave: 0}" mode="out-in">
          <!-- User card dropdown -->
          <div
            v-click-outside="closeUserCard"
            v-show="showUserSetting"
            class="user__dropdown"
          >
            <p class="user__dropdown__title">@Tandv95</p>
            <div
              class="user__dropdown__menu-list py-2 is-flex is-flex-direction-column"
            >
              <router-link to="/" class="user__dropdown__menu-list__link">
                <b-icon
                  icon="account"
                  custom-size="mdi-18px"
                  class="mb-1"
                ></b-icon>
                <span>Tài khoản</span>
              </router-link>
              <router-link to="/" class="user__dropdown__menu-list__link">
                <b-icon icon="cog" custom-size="mdi-18px" class="mb-1"></b-icon>
                <span>Cài đặt</span>
              </router-link>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import FullScreen from '../FullScreen/index.vue'
import Notification from '@/components/Notification/index.vue'
import Avatar from '@/components/Avatar/index.vue'
import { SideBarStatusType } from '@/enums/appEnum'

import { AppModule } from '@/store/modules/app'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Navbar',
  components: {
    FullScreen,
    Notification,
    Avatar
  },
  filters: {
    totalNotificationsConvert: (value: Number) => {
      return value > 10 ? '10+' : value
    }
  }
})

export default class extends Vue {
  @Prop({
    default: 'fixed',
    validator: (val: string) => ['fixed', 'relative', 'static', 'absolute'].includes(val)
  }) private position!: string

  @Prop({
    default: 11
  }) private totalNotificationsUnread!: number

  private showNoti = false
  private showUserSetting = false

  get navbarStyle() {
    const widthComplement =
        AppModule.getSideBarStatus === SideBarStatusType.HIDDEN
          ? 0
          : AppModule.getSideBarStatus === SideBarStatusType.EXPANDED
            ? 80
            : 200
    return {
      width: `calc(100% - ${widthComplement}px)`,
      position: this.position
    } as HTMLElement['style']
  }

  private toggleMenu() {
    AppModule.commitToggleSideBar()
  }

  private closeNotificationCard() {
    this.showNoti = false
  }

  private closeUserCard() {
    this.showUserSetting = false
  }

  beforeMount() {
    window.addEventListener('resize', AppModule.commitSetLayoutSize)
  }

  beforeDestroy() {
    window.removeEventListener('resize', AppModule.commitSetLayoutSize)
  }
}
</script>

<style lang="sass" scoped>
.navbar
  width: $w-full
  z-index: 1
  height: 2.5rem
  right: 0
  transition: width $base-animation-timer-default
  justify-content: space-between
  background: $base-background-color
  box-shadow: 0.125rem 0.125rem 0.3125rem $base-shadow-impact-rb, -0.125rem -0.125rem 0.3125rem transparent
  @include border-light
  @include base-border(bottom)
  .menu_wrapper
    height: 1.75rem
    width: 1.875rem
    position: realtive
    cursor: pointer
    .hamburger-menu
      display: block
      width: $menu-hamburger-icon-width-medium
      height: $menu-hamburger-icon-height
      border-radius: 0.3125rem
      background: $secondary
      position: absolute
      top: 50%
      transform: translateY(-50%)
      transition: all $base-animation-timer-default $ease-in-out-back
      &::before, &::after
        position: absolute
        content: ""
        height: $menu-hamburger-icon-height
        background: $secondary
        border-radius: $base-sm-border-radius
        transition: all $base-animation-timer-default $ease-in-out-back
      &::before
        width: $menu-hamburger-icon-width
        top: -0.5rem
      &::after
        width: $menu-hamburger-icon-width-small
        bottom: -0.5rem
    &:hover
      .hamburger-menu
        width: $menu-hamburger-icon-width
        &::after
          width: $menu-hamburger-icon-width
  &__end
    display: flex
    align-items: center
    .notifications
      float: right
      right: 4rem
      &__handler
        cursor: pointer
        &-icon
          color: $secondary
          transition: color $base-animation-timer-default
          &:active
            color: rgba($secondary, 0.3)
        &-counter
          position: relative
          font-size: 9px
          font-weight: 500
          top: -1.2em
          left: -1.2em
          height: 22px
          width: 22px
          background-color:  $primary
          color: $base-background-color
          padding: 0.2em
          border: 0.2em solid $base-background-color
          border-radius: 50%
      &__card
        right: 8rem
    .user
      position: relative
      &__icon
        cursor: pointer
        color: $secondary
      &__dropdown
        width: 7.5rem
        height: auto
        right: 0
        top: 3.375rem
        position: absolute
        transition: transform $base-animation-timer-default
        @include neu-style
        &__title
          font-size: 14px
          text-align: center
          padding: 0.5rem
          color: rgba($secondary, 0.9)
          font-weight: weight(bold)
          @include border-light
          @include base-border(bottom)
        &__menu-list
          &__link
            height: 2rem
            display: flex
            align-items: center
            padding: 0.25rem
            color: $base-text-primary-color
            transition: all $base-animation-timer-default
            span
              font-size: 14px
              font-weight: 600 !important
            &:hover
              color: $secondary
              padding-left: 0.4rem
            &.active
              padding: 0.25rem !important
              color: $secondary
</style>
