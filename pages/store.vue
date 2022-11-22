<script>
import CardStore from '~/components/store/CardStore.vue'
export default {
  components: { CardStore },
  name: 'store',
  target: 'static',
  data() {
    return {
      products: [],
      cart: this.$cookies.get('cart') ?? [],
      point: this.$cookies.get('point'),
      creditPoint: this.$cookies.get('creditPoint') ?parseInt(this.$cookies.get('creditPoint')): 0,
      balancePoint: this.point - this.creditPoint,
    }
  },
  beforeMount() {
    this.$auth.refreshTokens()
    this.$axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$auth.$storage.getCookie('token')}`,
      Acsept: 'application/json',
    }
  },
  async mounted() {
    let point = this.$cookies.get('point')
    let creditPoint = this.$cookies.get('creditPoint') ?? 0
    this.balancePoint = point - creditPoint

    let resp = await this.$axios.$get('/product')
    this.products = resp.data
    this.$cookies.set('products', resp.data)
  },
  methods: {
    addCart(product_id) {
      let prod = this.products.filter((x) => x.id === product_id)[0]
      if (this.balancePoint >= prod.price) {
        this.cart.push(product_id)
        this.$cookies.set('cart', this.cart)
        this.creditPoint += parseInt(prod.price)
        this.$cookies.set('creditPoint', this.creditPoint)
        this.balancePoint = this.point - this.creditPoint
      }
    },
  },
}
</script>

<template>
  <div class="min-h-screen bg-gray-600 home overflow-y-auto">
    <div class="min-h-screen max-w-3xl mx-auto flex">
      <div
        class="my-auto flex-auto bg-white rounded-xl py-6 pl-6 pr-4 relative h-auto"
      >
        <!--  -->
        <div class="flex">
          <div class="flex-auto flex">
            <nuxt-link
              to="/point"
              class="w-7 h-7 p-1 text-sm inline-block rounded-full bg-blue-500 text-white text-center my-auto"
            >
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </nuxt-link>
          </div>
          <div class="flex-none flex">
            <div
              class="flex-none bg-green-600 text-white rounded-full text-xs py-1 px-3 my-auto"
            >
              My point = {{ balancePoint }}
            </div>
          </div>
          <nuxt-link to="/cart" class="flex-none mr-2 ml-4 relative">
            <div
              v-if="cart.length > 0"
              class="w-4 h-4 bg-red-500 text-white rounded-full text-xs absolute top-0 right-0 flex"
            >
              <span class="m-auto">{{ cart.length }}</span>
            </div>
            <div class="text-xl text-blue-600 m-2">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </div>
          </nuxt-link>
        </div>

        <div class="mt-3 text-xl text-gray-800">
          Exchange your point for rewards
        </div>

        <!-- store -->
        <div class="lg:overflow-y-auto mt-3 content">
          <div class="grid grid-cols-3 gap-6 py-2">
            <card-store
              v-for="product in products"
              :key="product.id"
              :data="product"
              :click="addCart"
              :disabled="cart.includes(product.id)"
              :notenough="balancePoint < product.price"
              class="bg-white"
            />
          </div>
        </div>
        <!-- end -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  background-image: url(~/assets/img/home.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.content {
  max-height: 30em;
}
@media (max-height: 30em) {
  .content {
    height: auto;
  }
}
</style>

<style>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  opacity: 60%;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgb(207, 207, 207);
}

::-webkit-scrollbar-thumb:hover {
  border-radius: 3px;
  background: rgb(179, 179, 179);
}
</style>
