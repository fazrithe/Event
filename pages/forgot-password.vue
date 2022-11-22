<script>
export default {
  auth: false,
  target: 'static',
  name: 'forgot-password',
  data() {
    return {
      email: '',
      nip: '',
    }
  },
  beforeCreate() {
    this.$auth.refreshTokens()
    this.$axios.defaults.headers.common = {
      Acsept: 'application/json',
    }
  },
  methods: {
    async reqPwd() {
      let data = {
        email: this.email,
        nip: this.nip,
      }
      let resp = await this.$axios.$post('/forgot-password', data)
      if (resp.status) {
        this.$toast.success(
          'Password has been reset successfully, Please check your email!'
        )
        this.$router.push('/login')
      } else {
        this.$router.push('/login')
        this.$toast.error(resp.message)
      }
    },
  },
  beforeMount() {
    if (this.$auth.loggedIn) this.$router.push('/')
  },
}
</script>

<template>
  <div class="min-h-screen bg-gray-600 home">
    <div class="min-h-screen max-w-md mx-auto lg:ml-40 p-2 flex">
      <div class="bg-white rounded-xl p-10 max w-full mx my-auto lg:mt-60">
        <h1 class="text-2xl">Forgot password</h1>
        <dir class="text-gray-500 mt-1 pl-0 text-lg">
          Input your email & password
        </dir>
        <!-- form -->
        <div class="mt-7">
          <label class="text-gray-700">Email</label>
          <div>
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full px-2 py-1 border border-gray-400 rounded-lg"
            />
          </div>
        </div>
        <div class="mt-5">
          <label class="text-gray-700">NIP</label>
          <div>
            <input
              v-model="nip"
              type="number"
              placeholder="Enter your NIP"
              class="w-full px-2 py-1 border border-gray-400 rounded-lg"
            />
          </div>
        </div>
        <div class="mt-7">
          <button
            type="button"
            @click="reqPwd"
            class="w-full rounded-lg py-2 bg-blue-600 text-white hover:bg-blue-500 transition duration-300"
          >
            Send
          </button>
        </div>
        <div class="mt-7 text-center text-gray-600 font-light">
          Have an account?
          <nuxt-link to="/login" class="text-blue-500 font-normal"
            >Sign in
          </nuxt-link>
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
</style>
