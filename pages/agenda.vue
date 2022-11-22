<script>
import agendaItem from '~/components/agenda/agendaItem.vue'
export default {
  components: { agendaItem },
  name: 'agenda',
  target: 'static',
  data() {
    return {
      agenda: null,
    }
  },
  async beforeMount() {
    this.$auth.refreshTokens()
    this.$axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$auth.$storage.getCookie('token')}`,
      Acsept: 'application/json',
    }
  },
  async mounted() {
    try {
      let agenda = await this.$axios.$get('/agenda')
      this.agenda = agenda.data
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<template>
  <div class="min-h-screen bg-gray-600 home transition-all duration-500">
    <div class="min-h-screen max-w-3xl mx-auto flex">
      <div
        class="my-auto flex-auto bg-white rounded-xl py-6 pl-6 pr-4 relative"
      >
        <!--  -->
        <nuxt-link
          to="/"
          class="w-6 h-6 rounded-full bg-red-500 text-white text-center absolute right-4 top-3"
        >
          <i class="fa fa-times" aria-hidden="true"></i>
        </nuxt-link>

        <!-- Agenda -->
        <div class="text-gray-900 mb-2">23 November 2022</div>
        <div class="overflow-y-auto agenda pr-2">
          <agenda-item
            v-for="item in agenda"
            :key="item.id"
            :name="item.name"
            :photo="item.photo"
            :time="item.time"
          >
            {{ item.description }}
          </agenda-item>
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

.agenda {
  max-height: 37em;
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
