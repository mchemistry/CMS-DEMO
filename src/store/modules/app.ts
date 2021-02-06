import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators'
import { DeviceType, SideBarStatusType } from '@/enums/appEnum'
import store from '@/store'
interface LayoutSizeType {
  width: Number
  height: Number
}

export interface IAppState {
  device: DeviceType
  sidebarStatus: String
  layoutSize: LayoutSizeType
}

const NAME = 'app'

@Module({ name: NAME, store, dynamic: true })
class App extends VuexModule implements IAppState {
  sidebarStatus = SideBarStatusType.HIDDEN
  device = DeviceType.DESKTOP
  layoutSize = <LayoutSizeType>{}

  get getSideBarStatus() {
    return this.sidebarStatus
  }

  get getLayoutSize() {
    return this.layoutSize
  }

  @Mutation
  commitToggleSideBar() {
    this.sidebarStatus =
      this.sidebarStatus === SideBarStatusType.OPENED
        ? SideBarStatusType.EXPANDED
        : SideBarStatusType.OPENED
  }

  @Mutation
  commitSetLayoutSize() {
    this.layoutSize.width = window.innerWidth
    this.layoutSize.height = window.innerHeight
  }
}

export const AppModule = getModule(App)
