<script>
export default {
  name: 'profil',
  target: 'static',
  data() {
    return {
      user: {},
      name: null,
      email: null,
      company: null,
      address: null,
      phone: null,
      nip: null,
    }
  },
  methods: {
    async logout() {
      cookieStore.getAll().then((cookies) =>
        cookies.forEach((cookie) => {
          // console.log('Cookie deleted:', cookie)
          cookieStore.delete(cookie.name)
        })
      )
      await this.$auth.logout()
      this.$cookies.remove('cart')
      this.$cookies.remove('products')
      this.$cookies.remove('survey')
      this.$cookies.remove('address')
      this.$cookies.remove('creditPoint')
      this.$auth.$storage.removeCookie('user')
      this.$auth.$storage.removeCookie('token')
    },
    async update() {
      let data = {
        id: this.user.id,
        name: this.name,
        company: this.company,
        address: this.address,
        phone: this.phone,
      }
      try {
        let resp = await this.$axios.$post('/user/update', data)
        this.$auth.$storage.setCookie('user', resp.data, true)
        this.$toast.success('profil has been saved successfully!')
      } catch (error) {
        this.$toast.error('Error while saving data')
      }
    },
    inisial(name) {
      let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')
      let initials = [...name.matchAll(rgx)] || []

      initials = (
        (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
      ).toUpperCase()
      return initials
    },
    changePP() {
      document.getElementById('input-photo').click()
    },
  },
  beforeMount() {
    this.$auth.refreshTokens()
    let user = this.$auth.user
    this.user = user
    this.name = user.name
    this.email = user.email
    this.company = user.company
    this.address = user.address
    this.phone = user.phone
    this.nip = user.nip

    this.$axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$auth.$storage.getCookie('token')}`,
      Acsept: 'application/json',
    }
  },
  mounted() {
    // document.getElementById('input-photo').addEventListener('click', function(){
    //   document.getElementById('form-photo').submit()
    // })
  },
}
</script>

<template>
  <div class="min-h-screen bg-gray-600 home">
    <div class="min-h-screen max-w-md mx-auto flex">
      <div
        class="my-auto flex-auto bg-white bg-opacity-80 p-5 rounded-xl relative"
      >
        <div class="font-bold absolute left-5 top-3">Profile</div>
        <nuxt-link
          to="/"
          class="w-5 h-5 text-sm inline-block rounded-full bg-red-500 text-white text-center absolute right-3 top-3"
        >
          <i class="fa fa-times my-auto" aria-hidden="true"></i>
        </nuxt-link>

        <div class="bg-white w-full p-4 mt-6 rounded-lg flex gap-4 my-auto">
          <div
            class="text-white bg-indigo-600 w-16 h-16 rounded-full flex-none flex relative"
          >
            <img
              :src="$store.state.filePath + user.photo"
              v-if="user.photo != null"
              class="object-cover h-16"
              alt=""
            />
            <span
              class="m-auto font-bold text-white text-3xl"
              v-if="user.photo == null"
              >{{ inisial(user.name) }}</span
            >
          </div>

          <div class="flex-auto flex">
            <div class="my-auto">
              <div class="text-gray-800 text-lg font-bold">{{ name }}</div>
              <div class="text-gray-800 text-base">{{ nip }}</div>
              <div class="text-gray-800 font-light text-sm">{{ email }}</div>
            </div>
          </div>
        </div>

        <nuxt-link
          to="/change-password"
          class="text-white bg-indigo-500 border border-indigo-500 text-center block mt-4 py-1 rounded-full"
        >
          Change password
        </nuxt-link>

        <button
          @click="logout"
          class="mt-3 w-full rounded-full py-1 text-red-500 bg-white border border-red-500 shadow-sm hover:shadow-md transition duration-300"
        >
          Logout
        </button>

        <!--

        <div class="bg-gray-100 rounded-lg p-6 mt-3">
          <div class="flex gap-5">
            <div
              class="bg-white text-blue-400 w-16 h-16 rounded-full flex-none flex relative"
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
              <button
                @click="changePP()"
                class="w-5 h-5 rounded-full bg-blue-600 text-white text-xs text-center absolute right-0 top-0"
              >
                <i class="fa fa-pencil-alt" aria-hidden="true"></i>
              </button>
              <form action="http://localhost:8000/api/change-photo" method="POST" id="form-photo" enctype="multipart/form-data">
                <input
                style="display:none"
                  type="file"
                  accept="image/*"
                  id="input-photo"
                  name="photo"
                />
              </form>
            </div>
            <div class="flex-auto flex">
              <div class="my-auto">
                <div class="text-gray-900">{{ name }}</div>
                <div class="text-gray-500">{{ company }}</div>
              </div>
            </div>
          </div>

          <form id="profil">
            <div class="mt-6">
              <label for="" class="text-gray-700 text-sm">Name</label>
              <input
                type="text"
                class="w-full px-2 py-1 rounded-md border border-gray-300"
                v-model="name"
              />
            </div>
            <div class="mt-4">
              <label for="" class="text-gray-700 text-sm">Email</label>
              <input
                type="text"
                class="w-full px-2 py-1 rounded-md border bg-gray-100 border-gray-300"
                v-model="email"
                disabled
              />
            </div>
            <div class="mt-4">
              <label for="" class="text-gray-700 text-sm">Office</label>
              <input
                type="text"
                class="w-full px-2 py-1 rounded-md border border-gray-300"
                v-model="company"
              />
            </div>
            <div class="mt-4">
              <label for="" class="text-gray-700 text-sm">Address</label>
              <input
                type="text"
                class="w-full px-2 py-1 rounded-md border border-gray-300"
                v-model="address"
              />
            </div>
            <div class="mt-4">
              <label for="" class="text-gray-700 text-sm">Phone</label>
              <input
                type="text"
                class="w-full px-2 py-1 rounded-md border border-gray-300"
                v-model="phone"
              />
            </div>
          </form>
          <button
            class="mt-7 w-full rounded-md py-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
            @click="update"
          >
            Save
          </button>
          <button
            @click="logout"
            class="mt-5 w-full rounded-md py-2 text-gray-700 bg-white shadow-sm hover:shadow-md transition duration-300"
          >
            Logout
          </button>
          <div class="text-center mt-6">

          <nuxt-link to="/change-password" class="text-blue-500">
            Change password
          </nuxt-link>
          </div>
        </div>
    -->
      </div>
    </div>
  </div>
</template>
