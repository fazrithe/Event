<script>
import agendaItem from '~/components/agenda/agendaItem.vue'
export default {
  components: { agendaItem },
  name: 'survey',
  target: 'static',
  data() {
    return {
      survey: this.$cookies.get('survey') ?? [
        {
          question:
            'Secara umum, apakah Anda puas mengikuti acara BCA Innovation Convention 2022?',
          answer: null,
        },
        {
          question:
            'Berikan pesan dan kesan Anda terkait pelaksanaan BIC di BCA.',
          answer: null,
        },
      ],
      surveyed: this.$cookies.get('surveyed') ?? false,
      answ1: ['Sangat puas', 'Puas', 'Tidak puas', 'Sangat tidak puas'],
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
    let resp = await await this.$axios.$get('/survey')
    if (resp.data != null) {
      let survey = JSON.parse(resp.data.survey)
      this.survey = survey
      this.surveyed = true
    }
  },
  methods: {
    async submit() {
      if (this.survey[0].answer != null && this.survey[1].answer != null)
        try {
          if (!this.surveyed) await this.$axios.$post('/survey', this.survey)
          this.$cookies.set('survey', this.survey)
          this.$cookies.set('surveyed', true)
          this.surveyed = true
          this.$toast.success('Survey has been saved successfully!')
        } catch (error) {
          this.$toast.error('Error while submiting survey')
        }
    },
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

        <!-- Survey -->
        <div class="overflow-y-auto survey pr-2 mt-4">
          <div class="text-gray-800 mb-4">Survey</div>
          <!--  -->
          <div class="my-2 py-4 px-5 text-gray-700 bg-gray-100 rounded-xl">
            <div class="flex gap-2">
              <div class="flex-none">1.</div>
              <div class="flex-auto">
                Secara umum, apakah Anda puas mengikuti acara BCA Innovation
                Convention 2022?
              </div>
            </div>
            <div class="ml-4 mt-2" v-for="(val, i) in answ1" :key="i">
              <label class="mb-1 block">
                <input
                  type="radio"
                  name="answer"
                  class="mr-2"
                  :value="val"
                  :checked="val == survey[0].answer"
                  :disabled="surveyed"
                  @change="survey[0].answer = val"
                />
                {{ val }}
              </label>
            </div>
          </div>

          <div class="my-2 py-4 px-5 text-gray-700 bg-gray-100 rounded-xl">
            <div class="flex gap-2">
              <div class="flex-none">2.</div>
              <div class="flex-auto">
                Berikan pesan dan kesan Anda terkait pelaksanaan BIC di BCA.
              </div>
            </div>

            <div class="ml-4 mt-2">
              <textarea
                v-model="survey[1].answer"
                class="w-full border border-gray-400 rounded-lg disabled:bg-gray-50"
                rows="4"
                placeholder="Tulis disini..."
                :disabled="surveyed"
              ></textarea>
            </div>
          </div>
          <!--  -->

          <div class="mt-5 text-center">
            <button
              @click="submit()"
              :disabled="surveyed"
              class="px-6 py-2 bg-blue-500 text-white rounded-md disabled:bg-slate-400 transition duration-300"
            >
              {{ surveyed ? 'Submited' : 'Submit' }}
            </button>
          </div>
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

.survey {
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
