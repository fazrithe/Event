<script>
export default {
  name: 'games',
  target: 'static',
  data() {
    return {
      user: null,
      games: {
        a: 'https://games.crazygames.com/id_ID/ships-3d/index.html',
        b: 'https://games.crazygames.com/id_ID/survival-game-squid-game/index.html',
      },
    }
  },
  methods: {
    play(link) {
      this.$cookies.set('gameUrl', link)
      this.$router.push('/play')
    },
  },
  beforeMount() {
    this.$auth.refreshTokens()
    this.user = this.$auth.user
    this.$axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$auth.$storage.getCookie('token')}`,
      Acsept: 'application/json',
    }
  },
  mounted() {},
}
</script>

<template>
  <div class="min-h-screen bg-gray-600 home">
    <div class="min-h-screen max-w-lg mx-auto flex">
      <div class="my-auto flex-auto bg-white p-7 rounded-xl relative">
        <div class="absolute left-5 top-3">
          Play the games below to earn points
        </div>
        <nuxt-link
          to="/"
          class="w-5 h-5 text-sm inline-block rounded-full bg-red-500 text-white text-center absolute right-3 top-3"
        >
          <i class="fa fa-times my-auto" aria-hidden="true"></i>
        </nuxt-link>

        <div class="bg-white w-full p-4 mt-6 rounded-lg gap-4 my-auto">
          <div class="bg-blue-50 rounded-xl py-3 px-5 flex gap-4 w-full">
            <div class="flex-auto flex">
              <span class="my-auto"> Ships 3D </span>
            </div>
            <button
              class="text-white py-2 px-6 bg-blue-600 rounded-md"
              @click="play(games.a)"
            >
              Play <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
            </button>
          </div>

          <div class="bg-blue-50 rounded-xl py-3 px-5 flex gap-4 w-full mt-5">
            <div class="flex-auto flex">
              <span class="my-auto"> Squid Game </span>
            </div>
            <button
              class="text-white py-2 px-6 bg-blue-600 rounded-md"
              @click="play(games.b)"
            >
              Play <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
