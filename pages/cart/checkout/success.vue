<script>
import CardCart from '~/components/cart/CardCart.vue'
export default {
  components: { CardCart },
  name: 'cart',
  target: 'static',
  data() {
    return {
      timer:null
    }
  },
  mounted() {
    let s = 0
    this.timer =  setInterval(() => {
      s++
      if (s == 5) this.$router.push('/')
    }, 1000)
  },

  methods: {
    survey(){
      clearInterval(this.timer)
      this.$router.push('/survey')
    }
  },
}
</script>

<template>
  <div class="min-h-screen bg-gray-600 home">
    <div class="min-h-screen max-w-sm mx-auto flex">
      <div class="bg-white rounded-xl p-8 max w-full mx m-auto">
        <div class="text-center">
          <img src="~/assets/img/success.gif" class="mx-auto w-28" alt="" />
        </div>
        <div class="mt-6 text-gray-800 text-xl text-center">
          Thank you. Your Order has been processed
        </div>
        <div class="mt-2 text-gray-600 text-center">
          Don't forget to check your email
        </div>
        <div class="text-center mt-5">
          <button class="text-blue-600" @click="survey">
            Fill in the survey
          </button>
        </div>
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

.mx {
  max-height: 20em;
}
</style>
