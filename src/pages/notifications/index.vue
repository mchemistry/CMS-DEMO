<template>
  <NeumorphismCard>
    <div class="notifications" v-if="!loadingNotifications" style="width: 100%">
      <div v-if="!totalNotifications || totalNotifications === 0" class="empty-notification is-flex is-justify-content-center is-flex-direction-column is-align-items-center">
         <b-icon icon="database-off" size="is-medium"></b-icon>
      <p class="is-size-6">Không có dữ liệu !!!</p>
      </div>
      <notification-item
        v-for="notification in displayNotifications"
        :key="notification.id"
        :is-page="true"
        :notification-item="notification"
      />

      <section class="is-flex is-justify-content-center" v-if="totalNotifications > perPage">
          <b-pagination
            class="mt-3"
            :total="totalNotifications"
            v-model="current"
            :range-before="1"
            :range-after="1"
            order="is-centered"
            size="is-small"
            :rounded="true"
            :per-page="perPage">

            <template #default="props">

              <b-pagination-button
                :page="props.page"
                :id="`page${props.page.number}`"
                >
                {{ props.page.number }}
              </b-pagination-button>
            </template>

            <template #previous="props">
              <b-pagination-button
                :page="props.page"
                @click="current--">
                <b-icon icon="chevron-left"></b-icon>
              </b-pagination-button>
            </template>

            <template #next="props">
              <b-pagination-button
                :page="props.page"
                @click="current++">
                <b-icon icon="chevron-right"></b-icon>
              </b-pagination-button>
            </template>

          </b-pagination>
      </section>
    </div>
    <div v-else class="notification-page-loading is-flex is-justify-content-center is-flex-direction-column is-align-items-center">
      <b-icon icon="autorenew" custom-class="spin" size="is-medium"></b-icon>
      <p class="is-size-6">Đang tải dữ liệu ...</p>
    </div>
  </NeumorphismCard>
</template>

<script lang="ts">
import NotificationItem from '@/components/Notification/NotificationItem.vue'
import NeumorphismCard from '@/components/NeumorphismCard/index.vue'
import { Component, Vue } from 'vue-property-decorator'
import { BNotificationConfig } from 'buefy/types/components'
import { NotificationItemType } from '@/types/config'
const URL_API = 'http://localhost:3000/notifications'

@Component({
  name: 'Notifications',
  components: {
    NotificationItem,
    NeumorphismCard
  }
})
export default class extends Vue {
  private current = 1 // page index
  private totalNotifications!: number
  private notifications!: Array<NotificationItemType>
  private perPage = 10
  private loadingNotifications = true

  get displayNotifications() {
    return this.paginate(this.notifications)
  }

  private getNotifications(): void {
    fetch(`${URL_API}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        this.notifications = [...data]
        this.totalNotifications = this.notifications.length
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

  private paginate(notifications: Array<NotificationItemType>) {
    const page = this.current
    const perPage = this.perPage
    const fromNotificationIndex = (page * perPage) - perPage
    const toNotificationIndex = page * perPage
    return notifications.slice(fromNotificationIndex, toNotificationIndex)
  }

  created() {
    this.getNotifications()
  }
}
</script>

<style lang="sass">
.notification-page-loading
  color: $secondary
.empty-notification
  color: $secondary
</style>
