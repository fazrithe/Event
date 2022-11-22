<script>
import moment from 'moment'
import MenuIcon from './home/MenuIcon.vue'
export default {
  name: 'home',
  target: 'static',
  components: { MenuIcon },
  data() {
    return {
      user: this.$auth.user,
      menuItem: [
        {
          img: '01.png',
          tooltip: 'Watch Grand Final',
          uri: 'https://bca-co-id.zoom.us/j/92948157642?pwd=OXQvVGNjUDJLa0FMMkp4eU56TytQZz09',
        },
        {
          img: '02.png',
          tooltip: 'Innovation Booth',
          uri: '/booth',
        },
        {
          img: '03.png',
          tooltip: 'Agenda',
          uri: '/agenda',
        },
        {
          img: '04.png',
          tooltip: 'Mini Games',
          uri: '/games',
        },
        {
          img: '05.png',
          tooltip: 'Point',
          uri: '/point',
        },
        {
          img: '06.png',
          tooltip: 'Survey',
          uri: '/survey',
        },
      ],
      countDown: {
        day: '00',
        hour: '00',
        minute: '00',
        second: '00',
      },
      showCountDown:false,
    }
  },
  created() {
    let eventTime = moment('2022-11-23 09:00:00')
    let currTime = moment.now()
    if (eventTime - currTime > 0){
      setInterval(() => {
        this.counterDown()
      }, 1000)
      this.showCountDown=true
    }
  },
  methods: {
    counterDown() {
      let eventTime = moment('2022-11-23 09:00:00')
      let currTime = moment.now()
      let diftime = eventTime - currTime
      let duration
      let interval = 1000

      duration = moment.duration(diftime - interval, 'milliseconds')
      this.countDown = {
        day: duration.days(),
        hour: duration.hours(),
        minute: duration.minutes(),
        second: duration.seconds(),
      }
    },
    img(file) {
      return require('~/assets/img/' + file)
    },
    inisial(name) {
      let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')
      let initials = [...name.matchAll(rgx)] || []

      initials = (
        (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
      ).toUpperCase()
      return initials
    },
    ucFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
}
</script>

<template>
  <div class="mx-auto min-h-screen relative">
    <nuxt-link to="/profil">
      <div
        class="lg:h-16 lg:w-16 w-14 h-14 rounded-full bg-gray-100 ml-auto cursor-pointer border border-gray-400 overflow-hidden shadow-md flex absolute"
        style="top: 5%; right: 15%"
      >
        <img
          :src="$store.state.filePath + user.photo"
          v-if="user.photo != null"
          class="object-cover h-16"
          alt=""
        />
        <span
          class="m-auto font-bold text-blue-400 lg:text-3xl text-xl"
          v-if="user.photo == null"
          >{{ inisial(user.name) }}</span
        >
      </div>
    </nuxt-link>

    <div class="absolute w-full" style="top: 40%" v-if="false">
      <div
        class="max-w-xl mx-auto px-12 py-10 bg-black bg-opacity-75 rounded-lg text-white"
      >
        <div class="mb-5 text-xl text-center">
          Menu pada Website BIC dapat diakses dalam
        </div>
        <div class="flex gap-3">
          <div
            class="flex-1 text-center"
            v-for="(item, index) in countDown"
            :key="index"
          >
            <div class="text-5xl pb-2 border-b-2 border-white">
              {{ item }}
            </div>
            <div class="mt-1 text-2xl">{{ ucFirst(index) }}s</div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute w-full" style="bottom: 8%">
      <div class="flex gap-2 mx-auto w-1/2">
        <MenuIcon
          :external="v.img == '01.png'"
          v-for="(v, p, index) in menuItem"
          :key="index"
          v-tooltip="{
            content: v.tooltip,
            classes: 'bg-white px-3 py-1 mb-2 rounded-md',
          }"
          :icon="img(v.img)"
          :idx="index"
          :goto="v.uri"
          class="flex-1"
          @click="zoom(index)"
        ></MenuIcon>

      </div>
    </div>
  </div>
</template>

<style>
.tooltip-arrow {
  top: 27px;
}
</style>
