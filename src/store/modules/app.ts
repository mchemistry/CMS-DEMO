import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators'
import { DeviceType, SideBarStatusType, ElementStatusType } from '@/enums/appEnum'
import store from '@/store'
import { NotificationItemType } from '@/types/config'
interface LayoutSizeType {
  width: Number
  height: Number
}

export interface IAppState {
  device: DeviceType
  sidebarStatus: String
  layoutSize: LayoutSizeType
  notificationCardStatus: ElementStatusType
}

const NAME = 'app'

@Module({ name: NAME, store, dynamic: true })
class App extends VuexModule implements IAppState {
  sidebarStatus = SideBarStatusType.HIDDEN
  device = DeviceType.DESKTOP
  layoutSize = <LayoutSizeType>{}
  notificationCardStatus = ElementStatusType.HIDDEN

  get getSideBarStatus() {
    return this.sidebarStatus
  }

  get getLayoutSize() {
    return this.layoutSize
  }

  get getNotificationCardStatus() {
    return this.notificationCardStatus
  }

  get isShowNotificationCard() {
    return this.notificationCardStatus === ElementStatusType.SHOW
  }

  @Mutation
  commitToggleSideBar() {
    this.sidebarStatus =
      this.sidebarStatus === SideBarStatusType.OPENED
        ? SideBarStatusType.EXPANDED
        : SideBarStatusType.OPENED
  }

  @Mutation
  commitToggleNotificationCard() {
    this.notificationCardStatus =
      this.notificationCardStatus === ElementStatusType.HIDDEN
        ? ElementStatusType.SHOW
        : ElementStatusType.HIDDEN
  }

  @Mutation
  commitSetLayoutSize() {
    this.layoutSize.width = window.innerWidth
    this.layoutSize.height = window.innerHeight
  }

  @Mutation
  commitCloseNotificationCard() {
    this.notificationCardStatus = ElementStatusType.HIDDEN
  }

  // @Mutation
  // commitSetAllNotificationsAsUnread(notifications: Array<NotificationItemType>, fieldsToUpdate: Partial<NotificationItemType>) {
  //   const result = []
  //   for (const t of notifications) { result.push({ ...t, ...fieldsToUpdate }) }
  //   console.log(result)
  //   return result
  // }
}

export const AppModule = getModule(App)
