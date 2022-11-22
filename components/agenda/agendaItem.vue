<script>
import { imgPath } from '~/global/constants'
import moment from 'moment'

export default {
  name: 'agendaItem',
  target: 'static',
  props: ['name', 'time', 'photo'],
  data() {
    return {
      imgPath: imgPath,
      active: false,
    }
  },
  mounted() {
    let arrTime = this.time.split(' - ')
    let start = moment().format('YYYY-MM-DD ') + arrTime[0]
    let end = moment().format('YYYY-MM-DD ') + arrTime[1]

    // console.log(start)

    let currTime = moment()
    // console.log(moment(start).format('yy-M-D hh:mm'))
    if (currTime.isAfter(moment(start)) && currTime.isBefore(moment(end))) {
      this.active = true
    }
  },
}
</script>

<template>
  <div
    class="my-2 p-3 rounded-xl transition duration-500"
    :class="active ? 'bg-blue-200' : 'bg-gray-100'"
  >
    <div class="text-gray-600 text-sm">{{ time }}</div>
    <div>{{ name }}</div>
    <div class="mt-3 mb-2 flex gap-4">
      <div class="flex-none" v-if="photo != null">
        <div class="w-16 h-16 bg-blue-300 rounded-full overflow-hidden">
          <img :src="imgPath + photo" class="object-cover w-16 h-16" alt="" />
        </div>
      </div>
      <div class="flex-auto flex">
        <div class="my-auto w-full">
          <div class="text-gray-900 text-lg">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
