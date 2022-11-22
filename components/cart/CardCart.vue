<script>
import { imgPath } from '~/global/constants'
export default {
  name: 'cardCart',
  target: 'static',
  props: ['id', 'products', 'onDrop'],
  data() {
    return {
      product: {},
      available: true,
      imgPath: imgPath,
    }
  },
  beforeCreate() {},
  mounted() {
    if (this.products != null) {
      this.product = this.products.filter((x) => x.id === this.id)[0]
      this.available = this.product.stock > 0
    }
  },
  beforeUpdate() {
    if (this.products != null) {
      this.product = this.products.filter((x) => x.id === this.id)[0]
      this.available = this.product.stock > 0
    }
  },
}
</script>

<template>
  <div
    class="rounded-lg p-3 mt-3"
    :class="!available ? 'bg-gray-200' : 'bg-blue-100 '"
  >
    <div v-if="!available" class="text-red-500">
      this product is out of stock
    </div>
    <div class="flex gap-3">
      <div class="flex-none flex">
        <button
          v-if="onDrop !== false"
          @click="onDrop(product.id)"
          class="w-5 h-5 text-center rounded-sm bg-red-500 my-auto text-white opacity-100 flex"
        >
          <i class="fa fa-minus m-auto my-auto" aria-hidden="true"></i>
        </button>
      </div>
      <div class="flex-none w-24 h-16 flex overflow-hidden">
        <img
          :src="imgPath + product.photo"
          class="object-cover my-auto"
          :class="!available ? 'opacity-50' : ''"
          alt=""
        />
      </div>
      <div class="flex-auto flex">
        <div class="my-auto">
          <div :class="!available ? 'opacity-50' : ''">
            {{ product != null ? product.name : '' }}
          </div>
          <div
            class="font-light text-gray-500"
            :class="!available ? 'opacity-50' : ''"
          >
            {{ product.price }} point
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
