<script>
export default {
  name: 'password-confirm',
  target: 'static',
  auth: false,
  asyncData({ params }) {
    const id = params.id

    return { id }
  },
  data() {
    return {
      password: null,
      password_confirm: null,
    }
  },
  beforeCreate() {
    this.$auth.refreshTokens()
    this.$axios.defaults.headers.common = {
      Accept: 'application/json',
    }
  },
  methods: {
    async confirmPwd() {
      if (this.password.length < 8 || this.password_confirm.length < 8) {
        this.$toast.error('Password Min 8 Characters!')
        return false
      }

      if(this.password!= this.password_confirm){
        this.$toast.error('password does not match ')
        return false
      }

      let data = {
        password: this.password,
        password_confirmation: this.password_confirm,
        id: this.id,
      }
      try {
        let resp = await this.$axios.$post('/confirm/password', data)
        if (resp.status) {
          this.$router.push('/login')
          this.$toast.success(resp.message)
        } else {
          this.$toast.error(resp.message)
        }
      } catch (error) {
        const { response } = error
        this.$toast.error(response.data.message)
      }
    },
  },
}
</script>

<template>
  <div class="min-h-screen bg-gray-600 home">
    <div class="min-h-screen max-w-sm mx-auto flex">
      <div
        class="my-auto flex-auto bg-white rounded-xl py-8 pl-8 pr-6 relative"
      >
        <!--  -->
        <nuxt-link
          to="/profil"
          class="w-6 h-6 p-1 text-xs inline-block rounded-full bg-red-500 text-white text-center absolute right-3 top-3"
        >
          <i class="fa fa-times my-auto" aria-hidden="true"></i>
        </nuxt-link>
        <!--  -->

        <div class="rounded-lg p-6">
          <div class="text-2xl font-bold text-gray-800">
            Create your password
          </div>
          <div class="text-gray-700">
            <div class="mt-5">
              password
              <input
                v-model="password"
                minlength="8"
                type="password"
                class="w-full border border-gray-500 rounded-md px-2 py-1"
                placeholder="********"
              />
            </div>
            <div class="mt-5">
              confirm password
              <input
                v-model="password_confirm"
                minlength="8"
                type="password"
                class="w-full border border-gray-500 rounded-md px-2 py-1"
                placeholder="********"
              />
            </div>

            <div class="mt-8">
              <button
                @click="confirmPwd()"
                type="button"
                class="w-full rounded-lg bg-blue-500 text-white border-0 py-2"
              >
                Save
              </button>
            </div>
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
</style>
