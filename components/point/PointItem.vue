<script>
export default {
  name: 'pontItem',
  target: 'static',
  props: ['act'],
  data() {
    return {
      progress: (this.act.total_point / this.act.max_point).toFixed(3),
    }
  },
  mounted() {},
}
</script>

<template>
  <div
    class="grid grid-cols-2 gap-4 bg-blue-50 rounded-xl p-6 my-3 hover:bg-blue-100 transition duration-300"
  >
    <div class="">
      <div class="text-lg text-gray-800">{{ act.name }}</div>
      <div class="text-gray-500">{{ act.point }} Point</div>
      <div class="text-gray-500">Max point = {{ act.max_point }} point</div>
    </div>
    <div class="ml-4">
      <div class="text-gray-800">Progress</div>
      <div class="my-1 h-6 w-full bg-gray-300 rounded-full">
        <div
          class="h-6 bg-blue-500 rounded-full"
          :style="{ width: progress * 100 + '%' }"
        ></div>
      </div>
      <div class="text-gray-500 text-sm">
        {{ act.total_point }} point | {{ (progress * 100).toFixed(1) }}%
      </div>
    </div>
  </div>
</template>
