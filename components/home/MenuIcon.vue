<script>
import 'flowbite'

export default {
  name: 'menuIcon',
  target: 'static',
  props: ['icon', 'tooltip', 'idx', 'goto', 'external'],
  methods: {
    zoom() {
      let data = {
        activity_id: 4,
        description: 'Watch grand final',
      }
      this.$axios.$post('/point', data)
      window.location.href = this.goto
    },
  },
}
</script>

<template>
  <div>
    <NuxtLink :to="goto" v-if="!external">
      <img
        :src="icon"
        class="mx-auto w-24 h-24 menu"
        alt
        :data-tooltip-target="'menu' + idx"
      />
      <div
        :id="'menu' + idx"
        role="tooltip"
        class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 tooltip"
      >
        {{ tooltip }}
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </NuxtLink>
    <button @click="zoom" v-if="external">
      <img
        :src="icon"
        class="mx-auto w-24 h-24 menu"
        alt
        :data-tooltip-target="'menu' + idx"
      />
      <div
        :id="'menu' + idx"
        role="tooltip"
        class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 tooltip"
      >
        {{ tooltip }}
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </button>
  </div>
</template>

<style scoped>
.menu {
  height: 6rem;
  width: 6rem;
}
@media (max-height: 540px) {
  .menu {
    width: 4rem;
    height: 4rem;
  }
}
</style>
