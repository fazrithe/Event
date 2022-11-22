<script>
import PointItem from '~/components/point/PointItem.vue'
export default {
  components: { PointItem },
  name: 'point',
  target: 'static',
  data() {
    return {
      total: 0,
      max: 1500,
      activity: [],
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
    try {
      let resp = await this.$axios.$get('/point')
      let point = resp.data
      this.total = point.total
      this.max = point.max
      this.activity = point.activity
      this.$cookies.set('point', point.total)
    } catch (error) {
      console.log(error)
    }
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
        <nuxt-link
          to="/"
          class="w-7 h-7 p-1 text-sm inline-block rounded-full bg-blue-500 text-white text-center"
        >
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </nuxt-link>

        <!-- point -->
        <div class="text-xl text-gray-800 mt-3">Mission</div>
        <div class="flex gap-2 mt-1 pr-2">
          <div class="flex-none">
            <div class="rounded-full bg-green-500 text-white px-3 py-1 text-sm">
              My point = {{ total }}
            </div>
          </div>
          <div class="flex-none">
            <div
              class="rounded-full bg-yellow-500 text-white px-3 py-1 text-sm"
            >
              Max point = {{ max }}
            </div>
          </div>
          <div class="flex-auto text-right">
            <nuxt-link
              to="/store"
              class="rounded-md px-4 py-2 bg-blue-600 text-white"
            >
              Exchange your point
              <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
            </nuxt-link>
          </div>
        </div>
        <!-- // -->
        <div class="overflow-y-auto pr-2 mt-5 point">
          <point-item v-for="act in activity" :act="act" :key="act.id" />
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

.point {
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
