<script>
export default {
  name: 'change-password',
  target: 'static',
  data() {
    return {
      user: this.$auth.user,
      oldPassword: null,
      newPassword: null,
    }
  },
  beforeCreate() {
    this.$auth.refreshTokens()
    this.$axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$auth.$storage.getCookie('token')}`,
      Acsept: 'application/json',
    }
  },
  beforeMount() {},
  mounted() {},
  methods: {
    async changePwd() {
      if (this.oldPassword.length < 8 || this.newPassword.length < 8) {
        this.$toast.error('Password Min 8 Characters!')
        return false
      }

      let data = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      }
      try {
        let resp = await this.$axios.$post('/change-password', data)
        if (resp.status) {
          this.$router.push('/profil')
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
          <div class="text-2xl font-bold text-gray-800">Change Password.</div>
          <div class="text-gray-700">
            <div class="mt-5">
              Old password
              <input
                v-model="oldPassword"
                type="password"
                class="w-full border border-gray-500 rounded-md px-2 py-1"
                placeholder="********"
              />
            </div>
            <div class="mt-5">
              New password
              <input
                v-model="newPassword"
                type="password"
                class="w-full border border-gray-500 rounded-md px-2 py-1"
                placeholder="********"
              />
            </div>

            <div class="mt-8">
              <button
                @click="changePwd()"
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
