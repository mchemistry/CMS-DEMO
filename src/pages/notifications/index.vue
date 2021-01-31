<template>
  <div class="notification-page">
    <notification-item
      v-for="n in 10"
      :key="n"
      :un-read="n % 2 !== 0"
      :is-page="true"
      :important-level="n % 3"
    ></notification-item>
  </div>
</template>

<script lang="ts">
import NotificationItem from '@/components/Notification/NotificationItem.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Notifications',
  components: {
    NotificationItem
  }
})

export default class extends Vue {}
</script>

<style lang="sass" scoped>
.notification-page
  padding: 1px
  border-radius: $base-sm-border-radius
  box-shadow: $base-neumorphism-shadow
  @include border-light
  @include base-border
</style>
