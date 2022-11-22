<script>
export default {
  name: 'cardModal',
  target: 'static',
  props: {
    showing: {
      required: true,
      type: Boolean,
    },
  },
  watch: {
    showing(value) {
      if (value) {
        return document.querySelector('body').classList.add('overflow-hidden')
      }

      document.querySelector('body').classList.remove('overflow-hidden')
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="showing"
      class="fixed inset-0 max-w-4xl mx-auto h-screen flex items-center justify-center bg-semi-75"
      @click.self="close"
    >
      <div
        class="relative w-full max-w-5xl bg-white shadow-lg rounded-lg py-8 pl-8 pr-6"
      >
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
