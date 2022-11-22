<script>
import CardCart from '~/components/cart/CardCart.vue'
export default {
  components: { CardCart },
  name: 'cart',
  target: 'static',
  data() {
    return {
      cart: this.$cookies.get('cart') ?? [],
      products: this.$cookies.get('products') ?? [],
      address: this.$cookies.get('address'),
      available: true,
    }
  },
  async beforeCreate() {
    this.$auth.refreshTokens()
    this.$axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$auth.$storage.getCookie('token')}`,
      Acsept: 'application/json',
    }
    let resp = await this.$axios.$get('/product')
    this.products = resp.data
    this.$cookies.set('products', resp.data)
    this.isAvailable()
  },
  beforeMount() {
    if (this.cart.length == 0) this.$router.push('/')
    this.isAvailable()
  },
  mounted() {
    this.isAvailable()
  },

  methods: {
    isAvailable() {
      this.cart.map((v) => {
        this.product = this.products.filter((x) => x.id === v)[0]
        if (this.product.stock == 0) this.available = false
      })
    },
    async finish() {
      let data = {
        product_ids: this.cart,
        address: this.address,
      }

      let resp = await this.$axios.$post('/checkout', data)
      // console.log(resp)
      if (resp.status) {
        this.$cookies.set('products', resp.product)
        this.$cookies.set('point', resp.point)
        this.$cookies.set('creditPoint', 0)
        this.$cookies.set('cart', [])
        this.$router.push('/cart/checkout/success')
        this.$toast.success('request product has been submit successfully!')
      } else {
        if (resp.message == 'Not enough point') {
          this.$cookies.set('products', resp.product)
          this.$cookies.set('point', resp.point)
        }
        this.$toast.error('Erro: ' + resp.message)
      }
    },
  },
}
</script>

<template>
  <div class="min-h-screen bg-gray-600 home">
    <div class="min-h-screen max-w-xl mx-auto flex">
      <div
        class="my-auto flex-auto bg-white rounded-xl py-8 pl-8 pr-6 relative"
      >
        <!--  -->
        <div class="flex">
          <div class="flex-auto flex">
            <nuxt-link
              to="/cart"
              class="w-7 h-7 p-1 text-sm inline-block rounded-full bg-blue-500 text-white text-center my-auto"
            >
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </nuxt-link>
          </div>
        </div>

        <!-- cart -->
        <dir class="text-xl text-gray-900 mt-4 mb-0 pl-0">
          Review your order
        </dir>

        <div class="mt-4 cart overflow-y-auto pr-2">
          <div class="text-gray-600">Alamat pengiriman:</div>
          <div class="text-gray-800">{{ $auth.user.name }} | {{ address }}</div>

          <card-cart
            v-for="id in cart"
            :key="id"
            :id="id"
            :products="products"
            :onDrop="false"
          />

          <button
            class="w-full p-2 text-white rounded-md mt-7"
            :class="available ? 'bg-blue-500' : 'bg-gray-500'"
            @click="finish()"
            :disabled="!available"
          >
            <i class="fa fa-check-circle" aria-hidden="true"></i>
            Finish Order
          </button>
        </div>
        <!--  -->
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

.cart {
  max-height: 30em;
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
