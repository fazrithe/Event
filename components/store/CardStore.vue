<script>
import { imgPath } from '~/global/constants'
export default {
  name: 'cardVue',
  target: 'static',
  props: ['data', 'click', 'disabled', 'notenough'],
  data() {
    return {
      imgPath: imgPath,
    }
  },
  mounted() {},
  methods: {},
}
</script>

<template>
  <div
    class="rounded-md shadow-md border border-gray-300 overflow-hidden"
    :class="data.stock == 0 || disabled || notenough ? 'opacity-50' : ''"
  >
    <div class="h-40">
      <img
        :src="imgPath + data.photo"
        alt=""
        class="object-cover h-40 w-full"
      />
    </div>
    <div class="p-4">
      <div class="text-gray-900">{{ data.name }}</div>
      <div class="text-sm text-gray-600">{{ data.price }} Point</div>
      <button
        class="mt-3 w-full text-center py-1 rounded-md text-white"
        :class="
          data.stock == 0 || disabled || notenough
            ? ' bg-gray-500 '
            : 'bg-blue-500'
        "
        :disabled="data.stock == 0 || disabled || notenough"
        @click="click(data.id)"
      >
        {{
          data.stock == 0
            ? 'Out of Stock'
            : disabled
            ? 'Added to cart'
            : 'Add to cart'
        }}
      </button>
    </div>
  </div>
</template>
