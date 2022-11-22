<script>
import CardCart from '~/components/cart/CardCart.vue'
export default {
  components: { CardCart },
  name: 'cart',
  target: 'static',
  data() {
    return {
      user: this.$auth.user,
      cart: this.$cookies.get('cart') ?? [],
      products: this.$cookies.get('products') ?? {},
      address: this.$cookies.get('address') ?? '',
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

    this.cart.map((v) => {
      this.product = this.products.filter((x) => x.id === v)[0]
      if (this.product.stock == 0) this.available = false
    })
  },
  beforeMount() {
    let kosong = this.products.filter((x) => x.stock === 0)
    this.available = kosong.length === 0
  },
  async mounted() {},

  methods: {
    removeCart(value) {
      this.cart = this.cart.filter((item) => item !== value)
      this.$cookies.set('cart', this.cart)
      let prod = this.products.filter((x) => x.id === value)[0]
      let creditPoint = this.$cookies.get('creditPoint')
      creditPoint = creditPoint - prod.price < 0 ? 0 : creditPoint - prod.price
      this.$cookies.set('creditPoint', creditPoint)
    },
    checkout() {
      this.$cookies.set('address', this.address)
      this.$router.push('/cart/checkout')
    },
    inisial(name) {
      let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')
      let initials = [...name.matchAll(rgx)] || []

      initials = (
        (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
      ).toUpperCase()
      return initials
    },
  },
}
</script>

<template>
  <div class="min-h-screen bg-gray-600 home">
    <div class="min-h-screen max-w-3xl mx-auto flex">
      <div
        class="my-auto flex-auto bg-white rounded-xl py-6 pl-6 pr-4 relative"
      >
        <!--  -->
        <div class="flex">
          <div class="flex-auto flex">
            <nuxt-link
              to="/store"
              class="w-7 h-7 p-1 text-sm inline-block rounded-full bg-blue-500 text-white text-center my-auto"
            >
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </nuxt-link>
          </div>
        </div>

        <!-- cart -->
        <dir class="text-xl text-gray-900 mt-4 mb-0 pl-0">Checkout</dir>

        <div class="mt-0 cart overflow-y-auto pr-2">
          <div class="flex gap-3">
            <div class="w-3/5">
              <card-cart
                v-for="c in cart"
                :key="c"
                :id="c"
                :products="products"
                :onDrop="removeCart"
              />
              <div v-if="cart.length == 0" class="mt-5 text-gray-600 italic">
                No product in cart
              </div>
            </div>
            <div class="flex-auto mt-3">
              <div class="bg-blue-50 p-3 flex gap-3 rounded-lg">
                <div class="flex-none">
                  <div
                    class="h-16 w-16 rounded-full bg-gray-100 ml-auto border border-gray-400 overflow-hidden shadow-md flex"
                  >
                    <img
                      :src="$store.state.filePath + user.photo"
                      v-if="user.photo != null"
                      class="object-cover h-16"
                      alt=""
                    />
                    <span
                      class="m-auto font-bold text-blue-400 text-3xl"
                      v-if="user.photo == null"
                      >{{ inisial(user.name) }}</span
                    >
                  </div>
                </div>
                <div class="my-auto">
                  <div>{{ $auth.user.name }}</div>
                  <div class="text-gray-500 text-sm">
                    {{ $auth.user.company }}
                  </div>
                  <div class="text-gray-500 text-xs">
                    {{ $cookies.get('point') }}
                    point
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-3/5 mt-4">
            <div class="text-gray-800">Enter office address</div>
            <textarea
              name=""
              rows="4"
              class="w-full border border-gray-400 p-2 rounded-md"
              placeholder="Input here"
              v-model="address"
            ></textarea>
            <div class="text-sm text-gray-500 mb-3">*required</div>
            <!-- <nuxt-link v-if="cart.length>0"
              to="cart/checkout"
              class="py-2 w-full bg-blue-600 text-white rounded-md mt-4 inline-block text-center mb-4"
            >
              Continue
              <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
            </nuxt-link> -->
            <button
              @click="checkout()"
              class="py-2 w-full text-white rounded-md mt-4 inline-block text-center mb-4"
              :class="
                cart.length == 0 || address == ''
                  ? 'bg-gray-400'
                  : 'bg-blue-600'
              "
              :disabled="cart.length == 0 || address == ''"
            >
              Continue
              <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
            </button>
          </div>
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
