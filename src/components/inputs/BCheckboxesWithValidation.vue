<template>
  <ValidationProvider :vid="vid" :name="$attrs.label" :rules="rules">
    <div slot-scope="{errors}" class="block">
      <slot />
      <p class="has-text-danger">{{ errors[0] }}</p>
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    vid: {
      type: String,
      default: null
    },
    rules: {
      type: [Object, String],
      default: ''
    }
  }
}
</script>
