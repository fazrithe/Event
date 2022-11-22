<script>
export default {
  name: 'Comment',
  target: 'static',
  props: ['comment', 'reply', 'idt', 'formComment', 'postComment'],
  data() {
    return {
      time: null,
      photo: null,
      initial: null,
      showReply: false,
    }
  },
  beforeMount() {
    this.$auth.refreshTokens()
    this.$axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$auth.$storage.getCookie('token')}`,
      Acsept: 'application/json',
    }
  },
  methods: {
    inisial() {
      let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')
      let name = this.comment.user.name
      let initials = [...name.matchAll(rgx)] || []

      initials = (
        (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
      ).toUpperCase()
      return initials
    },
  },
  mounted() {
    let d = new Date(this.comment.created_at)
    this.time =
      String(d.getHours()).padStart(2, '0') +
      ':' +
      String(d.getMinutes()).padStart(2, '0')
    this.photo = this.comment.user.photo
  },
}
</script>

<template>
  <div class="my-2">
    <div class="flex gap-3 bg-gray-100 rounded-xl p-3">
      <div class="flex-none">
        <div class="w-12 h-12 bg-teal-200 rounded-full text-center flex">
          <img :src="photo" v-if="photo != null" alt="" />
          <span class="m-auto font-bold text-teal-400" v-if="photo == null">{{
            inisial()
          }}</span>
        </div>
      </div>
      <div class="flex-auto">
        <div class="flex gap-4">
          <div class="flex-auto text-gray-800 font-bold">
            {{ comment.user.name }}
          </div>
          <div class="flex-none text-gray-500 font-light text-sm">
            {{ time }}
          </div>
        </div>
        <div class="mt-1 text-gray-700">
          {{ comment.comment }}
        </div>
      </div>
    </div>

    <button
      class="text-gray-600 font-light text-sm mt-1"
      v-if="reply == true"
      @click="showReply = !showReply"
    >
      Reply
    </button>
    <div class="flex gap-2" v-if="showReply">
      <input
        type="text"
        class="rounded-md p-2 border-gray-400 w-full flex-auto"
        v-model="formComment.commentChild"
      />
      <!-- <input type="hidden" :value="comment.id" v-model="formComment.parent"> -->
      <button
        @click="
          postComment(comment.id)
          showReply = false
        "
        class="bg-white border border-blue-500 text-center my-auto rounded-full w-8 h-8 text-white"
      >
        <img src="~/assets/icon/send.svg" class="mx-auto" alt="" />
      </button>
    </div>
  </div>
</template>
