<template>
  <div id="default-layout" class="is-flex is-flex-direction-row">
    <side-bar/>
    <div id="aside-right">
      <nav-bar/>
      <main id="main-layout" class="p-4" :style="mainLayoutStyle">
        <transition name="zoom" mode="out-in">
          <router-view class="z1" />
        </transition>
      </main>
      <roll-call></roll-call>
    </div>
  </div>
</template>

<script lang="ts">
import { AppModule } from '@/store/modules/app'
import { SideBarStatusType } from '@/enums/appEnum'
import { sideBar, navBar, rollCall } from './components'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'default-layout',
  components: {
    sideBar,
    navBar,
    rollCall
  }
})

export default class extends Vue {
  get mainLayoutStyle() {
    const widthComplement =
        AppModule.getSideBarStatus === SideBarStatusType.HIDDEN
          ? 0
          : AppModule.getSideBarStatus === SideBarStatusType.EXPANDED
            ? 80
            : 200
    return {
      marginLeft: `${widthComplement}px`
    } as HTMLElement['style']
  }
}

</script>

<style lang="sass">
#default-layout
  overflow: auto !important
  background: $base-background-color
  @include full-viewport
  #aside-right
    width: 100%
    #main-layout
      transition: margin $base-animation-timer-default
      margin-top: 3.75rem
</style>
