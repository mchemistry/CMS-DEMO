<template>
  <aside id="side-bar" :style="sidebarStyle">
    <div class="site-logo">
      <img
        src="https://i.ibb.co/2PgyBLm/logo.png"
        alt="Logo FADI CMS"
        class="logo"
        :style="logoStyleWhenSideBarExpanded"
      />
    </div>
    <b-menu class="ml-1 mt-5">
      <b-menu-list label="Menu">
        <b-menu-item
          icon="information-outline"
          :label="sidebarStatus === 'opened' ? 'Info' : ''"
        ></b-menu-item>
        <b-menu-item icon="cog" :active="isActive" expanded class="menu-expand">
          <template #label="props">
            {{ sidebarStatus === 'opened' ? 'My Account' : '' }}
            <b-icon
              class="is-pulled-right pb-1"
              icon="menu-right"
              :class="props.expanded && 'rotate-90'"
            ></b-icon>
          </template>
          <b-menu-item
            icon="account"
            :label="sidebarStatus === 'opened' ? 'Users' : ''"
            tag="router-link"
            to="/test/chart/barchart"
          ></b-menu-item>
          <b-menu-item
            icon="cellphone-link"
            :label="sidebarStatus === 'opened' ? 'Devices' : ''"
            tag="router-link"
            to="/test/chart/linechart"
          >
          </b-menu-item>
          <b-menu-item
            icon="cash-multiple"
            :label="sidebarStatus === 'opened' ? 'Payments' : ''"
            disabled
          ></b-menu-item>
        </b-menu-item>
        <b-menu-item icon="cog" class="menu-expand">
          <template #label="props">
            {{ sidebarStatus === 'opened' ? 'My Account' : '' }}
            <b-icon
              class="is-pulled-right pb-1"
              icon="menu-right"
              :class="props.expanded && 'rotate-90'"
            ></b-icon>
          </template>
          <b-menu-item
            :label="sidebarStatus === 'opened' ? 'Account data' : ''"
          ></b-menu-item>
          <b-menu-item
            :label="sidebarStatus === 'opened' ? 'Addresses' : ''"
          ></b-menu-item>
        </b-menu-item>
      </b-menu-list>
      <b-menu-list>
        <b-menu-item
          :label="sidebarStatus === 'opened' ? 'Expo' : ''"
          icon="link"
          tag="router-link"
          target="_blank"
          to="/expo"
        ></b-menu-item>
      </b-menu-list>
      <b-menu-list label="Actions">
        <b-icon
          v-if="loading"
          :class="sidebarStatus === 'expanded' ? 'ml-5' : 'ml-6'"
          style="color: #ff5200"
          icon="loading"
          custom-class="loading"
          size="is-small"
        ></b-icon>
        <b-menu-item
          v-else
          icon="logout"
          :label="sidebarStatus === 'opened' ? 'Logout' : ''"
          @click="onLogout"
        ></b-menu-item>
      </b-menu-list>
    </b-menu>
  </aside>
</template>

<script lang="ts">
import { SideBarStatusType } from '@/enums/appEnum'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { BNotificationConfig } from 'buefy/types/components'

@Component({
  name: 'Sidebar'
})

export default class extends Vue {
  @Prop({
    default: 'relative',
    validator: (val: string) => ['fixed', 'relative', 'static', 'absolute'].includes(val)
  }) private position!: string

  @Prop({ default: 200 }) private width!: string | number
  @Prop({ default: 0 }) private height!: string | number
  @Prop({ default: null }) private fullWidth!: boolean
  @Prop({ default: true }) private fullHeight!: string | number

  private loading = false
  private isActive = true

  get sidebarStatus() {
    return AppModule.sidebarStatus
  }

  get sidebarStyle() {
    const style = {} as HTMLElement['style']
    style.width = style['min-width' as any] =
        this.sidebarStatus === SideBarStatusType.EXPANDED
          ? '5rem !important'
          : this.sidebarStatus === 'hidden'
            ? '0rem !important'
            : this.fullWidth
              ? '100vw !important'
              : `${this.width}px !important`
    style.height = this.fullHeight
      ? '100% !important'
      : `${this.height}px !important`
    style.position = this.position
    style.visibility =
        this.sidebarStatus === SideBarStatusType.HIDDEN ? 'hidden' : 'visible'
    return style
  }

  get logoStyleWhenSideBarExpanded() {
    const style = {} as HTMLElement['style']
    style.width =
        this.sidebarStatus === SideBarStatusType.EXPANDED
          ? '4.75rem !important'
          : '6.75rem !important'
    return style
  }

  private onLogout() {
    this.loading = true
    setTimeout(() => {
      this.$router.push('/login')
      this.$buefy.notification.open({
        duration: 4500,
        message: 'Đã đăng xuất hệ thống 😎!',
        type: 'is-success',
        hasIcon: true,
        animation: 'slide-left'
      } as BNotificationConfig)
      this.loading = false
    }, 3000)
  }
}
</script>

<style lang="sass">
#side-bar
  z-index: 99
  overflow-y: auto !important
  overflow-x: hidden !important
  background: $base-background-color
  box-shadow: $base-small-neumorphism-shadow
  transition: all $base-animation-timer-default
  @include border-light
  @include base-border(right)
  .site-logo
    height: 4rem
    width: 100%
    position: relative
    top: 0
    .logo
      transition: visibility $base-animation-timer-default, width $base-animation-timer-default
      @include center(relative, null)
  .menu-list-title
    font-size: 0.8125rem
    font-weight: 400
    color: rgba($base-text-primary-color, 0.7)
</style>
