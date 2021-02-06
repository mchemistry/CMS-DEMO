<template>
    <div class="auth-page is-flex is-justify-content-center is-align-items-center">
      <p class="auth-page-title">{{ name }}</p>
      <ValidationObserver ref="observer" class="login-card">
        <form class="form-login">
          <p
            slot="title"
            class="has-text-centered is-size-4 mb-6 text-primary has-text-weight-regular"
          >
            Đăng nhập
          </p>

          <BInputWithValidation
            v-model="username"
            rules="required"
            type="username"
            label="Tên tài khoản"
            icon="account"
            :disabled="loading"
            rounded
            placeholder="Nhập vào tên tài khoản ..."
            class="pb-3"
          />

          <BInputWithValidation
            v-model="password"
            rules="required"
            type="password"
            label="Mật khẩu"
            rounded
            vid="password"
            :disabled="loading"
            icon="lock"
            placeholder="Nhập vào mật khẩu ..."
            password-reveal
          />
          <div class="handle-base mt-5">
            <b-button
              expanded
              rounded
              :loading="loading"
              :disabled="loading"
              type="is-primary"
              @click="onLogin"
              >Đăng nhập</b-button
            >
          </div>
        </form>
    </ValidationObserver>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Ref } from 'vue-property-decorator'
import { BInputWithValidation } from '@/components/Inputs'
import { BNotificationConfig } from 'buefy/types/components'
import { VForm } from '@/types/config'
@Component({
  name: 'auth',
  components: {
    BInputWithValidation
  }
})

export default class extends Vue {
  private name: String = 'FADI CMS'
  private username: String = ''
  private password: String = ''
  private loading: Boolean = false

  @Ref('observer') readonly form!: VForm
  private async onLogin() {
    this.loading = true
    const result = await this.form.validate()
    // eslint-disable-next-line no-useless-return
    if (!result) {
      this.loading = false
      return
    }
    setTimeout(() => {
      this.$buefy.toast.open({
        duration: 2500,
        message: 'Đăng nhập thành công~ 😎!',
        type: 'is-success'
      } as BNotificationConfig)
      this.loading = false
      this.$router.push('/')
    }, 3000)
  }
}
</script>

<style lang="sass">
.auth-page
  background-color: $base-background-color
  @include full-viewport
  .auth-page-title
    font-size: 32px
    font-weight: 600
    color: $primary
    top: 4rem
    @include center(absolute, x)
  .login-card
    @include neu-style
    .form-login
      padding: 1.5rem
</style>
