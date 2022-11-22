<script>
import BoothName from '~/components/booth/BoothName.vue'
export default {
  components: { BoothName },
  name: 'booth',
  target: 'static',
  data() {
    return {
      team: [],
    }
  },
  async beforeCreate() {
    this.$auth.refreshTokens()
    this.$axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$auth.$storage.getCookie('token')}`,
      Acsept: 'application/json',
    }
    let resp = await this.$axios.$get('/team')
    this.team = resp.data
  },
  async created() {},
}
</script>

<template>
  <div class="min-h-screen bg-gray-600 stand">
    <div class="max-w-screen-3xl min-h-screen mx-auto h-full flex relative">
      <nuxt-link
        to="/"
        class="px-4 py-1 rounded-md bg-blue-600 text-white absolute top-20 ml-28 z-20"
      >
        <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
      </nuxt-link>

      <div class="mx-auto">
        <div
          class="relative min-h-screen"
          style="width: 92vw"
          v-if="team.length > 0"
        >
          <div class="absolute w-full" style="top: 52%">
            <div class="flex gap-2 mx-auto" style="width: 50%">
              <booth-name
                class="booth flex-1"
                :boothName="team[8].name"
                url="/booth/9"
              ></booth-name>
              <booth-name
                class="booth flex-1 mr-4"
                :boothName="team[9].name"
                url="/booth/10"
              ></booth-name>
              <booth-name
                class="booth flex-1 ml-4"
                :boothName="team[10].name"
                url="/booth/11"
              ></booth-name>
              <booth-name
                class="booth flex-1"
                :boothName="team[11].name"
                url="/booth/12"
              ></booth-name>
            </div>
          </div>
          <div class="absolute w-full" style="top: 61%">
            <div class="flex gap-2 mx-auto" style="width: 70%">
              <booth-name
                class="booth flex-1"
                :boothName="team[7].name"
                url="/booth/8"
              ></booth-name>
              <booth-name
                class="booth flex-1 mr-3"
                :boothName="team[6].name"
                url="/booth/7"
              ></booth-name>
              <booth-name
                class="booth flex-1 ml-3"
                :boothName="team[5].name"
                url="/booth/6"
              ></booth-name>
              <booth-name
                class="booth flex-1"
                :boothName="team[4].name"
                url="/booth/5"
              ></booth-name>
            </div>
          </div>
          <div class="absolute w-full" style="top: 74%">
            <div class="flex gap-2 mx-auto" style="width: 100%">
              <booth-name
                class="booth flex-1"
                :boothName="team[0].name"
                url="/booth/1"
              ></booth-name>
              <booth-name
                class="booth flex-1"
                :boothName="team[1].name"
                url="/booth/2"
              ></booth-name>
              <booth-name
                class="booth flex-1"
                :boothName="team[2].name"
                url="/booth/3"
              ></booth-name>
              <booth-name
                class="booth flex-1"
                :boothName="team[3].name"
                url="/booth/4"
              ></booth-name>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stand {
  background-image: url(~/assets/img/booth.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.booth {
  font-size: 1.2vh !important;
  font-family: sans-serif;
}

@media (max-height: 540px) {
  .booth {
    font-size: 1.1vw !important;
    font-family: sans-serif;
  }
}
</style>
