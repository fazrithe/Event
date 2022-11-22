<script>
import CardCart from '~/components/cart/CardCart.vue'
// import {recaptcha} from '@nuxtjs/recaptcha'

export default {
  auth: false,
  middleware: 'auth',
  target: 'static',
  components: { CardCart },
  name: 'cart',
  data() {
    return {
      email: '',
      password: '',
      captcha: '',
      count: 0,
      message: null,
      timerCount: sessionStorage.getItem('timerLog'),
      timerLog: sessionStorage.getItem('timerLog'),
    }
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--
          }, 1000)
          sessionStorage.setItem('timerLog', this.timerCount)
          let countLogGet = sessionStorage.getItem('countLog')
          if (countLogGet == 5) {
            sessionStorage.setItem('countLog', this.timerCount)
            this.message = `Wait for 1 minutes`
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    async login() {
      try {
        let captcha = await this.$recaptcha.getResponse()
        this.captcha = captcha
        this.message = null
      } catch (error) {
        this.message = `Invalid captcha code`

        return false
      }

      let data = {
        email: this.email,
        password: this.password,
        captcha: this.captcha,
      }
      this.count += 1
      if (this.count > 5) {
        sessionStorage.setItem('timerLog', 60)
        sessionStorage.setItem('countLog', 5)
        window.location.reload()
      }
      try {
        let resp = await this.$auth.loginWith('laravelSanctum', { data: data })
        // console.log(resp)
        if (resp.data.token != undefined) {
          let token = resp.data.token
          let user = resp.data.user
          this.$auth.$storage.setCookie('loggedIn', 'true')
          this.$auth.$storage.setCookie('user', user, true)
          this.$auth.$storage.setCookie('token', token)
          this.$auth.setUser(user)
          this.$auth.setUserToken(token)

          this.$router.push('/')
          this.message = null
        } else this.message = resp.message
      } catch (error) {
        const { response } = error
        const { request, ...errorObject } = response
        if (errorObject.status == 401)
          this.message = 'Invalid Email or password!'
      }
      await this.$recaptcha.reset()
    },
  },
  beforeMount() {
    if (this.$auth.loggedIn) this.$router.push('/')
  },
  beforeCreate() {},
}
</script>

<template>
  <div class="min-h-screen bg-gray-600 home">
    <div class="min-h-screen max-w-md mx-auto lg:ml-40 p-2 flex">
      <div class="bg-white rounded-xl p-10 max w-full mx my-auto lg:mt-60">
        <h1 class="text-4xl">Welcome.</h1>
        <div class="text-gray-500 mt-1 pl-0 text-lg">
          Log in below to access your account.
        </div>

        <div class="text-red-500 my-2" v-if="timerCount > 0">
          {{ message }} {{ timerCount }}
        </div>
        <!-- form -->
        <div class="mt-7">
          <label class="text-gray-600">Email</label>
          <div>
            <input
              v-model="email"
              type="text"
              class="w-full px-2 py-1 border border-gray-400 rounded-lg"
            />
          </div>
        </div>
        <div class="mt-5">
          <label class="text-gray-600">Password</label>
          <div>
            <input
              v-model="password"
              type="password"
              class="w-full px-2 py-1 border border-gray-400 rounded-lg"
            />
          </div>
        </div>
        <div class="mt-5">
          <recaptcha />
        </div>
        <div class="text-red-500 my-2" v-if="message != null">
          {{ message }}
        </div>
        <div class="my-5">
          <div v-if="timerCount > 1">
            <button
              type="button"
              class="w-full rounded-lg py-2 bg-blue-600 text-white hover:bg-blue-500 transition duration-300"
            >
              Login
            </button>
          </div>
          <div v-if="timerCount < 1">
            <button
              type="button"
              @click="login"
              class="w-full rounded-lg py-2 bg-blue-600 text-white hover:bg-blue-500 transition duration-300"
            >
              Login
            </button>
          </div>

          <div class="text-center mt-4">
            <nuxt-link to="/forgot-password" class="text-blue-500"
              >Forgot Password?</nuxt-link
            >
          </div>

          <div class="text-center mt-4 font-light text-gray-700">
            Don't have an account?
            <nuxt-link
              to="/sign-up"
              class="text-blue-500 text-base font-normal"
            >
              Sign up
            </nuxt-link>
          </div>
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

@media (max-width: 720px) {
  .home {
    background-image: url(~/assets/img/home.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
