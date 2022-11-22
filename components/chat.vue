<script>
import { io } from 'socket.io-client'
import { ioServer } from '~/global/constants'
export default {
  target: 'static',
  name: 'chat',
  props: ['idt', 'admin'],
  data() {
    return {
      user: this.$auth.user,
      _socket: null,
      message: null,
      messages: [],
      disableSend: false,
    }
  },

  beforeCreate() {
    this.$auth.refreshTokens()
    this.$axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$auth.$storage.getCookie('token')}`,
      Acsept: 'application/json',
    }
  },
  async mounted() {
    this._socket = io(ioServer)

    this._socket.emit('user_connected', this.user.id)

    this._socket.on('new_message', (data) => {
      this.fetch().then((x) => this.scBtm())
    })
    this._socket.on('send_message', (data) => {
      this.fetch().then((x) => this.scBtm())
    })
    this.fetch().then((x) => this.scBtm())
  },
  methods: {
    scBtm() {
      let elChat = document.getElementById('msgChat')
      if (elChat != null) elChat.scrollTop = elChat.scrollHeight
    },
    async fetch() {
      let resp = await this.$axios.$post('/chat-history', {
        receiver: this.admin.id,
      })
      this.messages = resp.data
    },
    send() {
      this.disableSend = true
      let msg = this.message
      if (msg != '') {
        let data = {
          sender: this.user.id,
          receiver: this.admin.id,
          message: msg,
        }
        this._socket.emit('send_message', data)

        this.message = ''
        this.fetch().then((x) => {
          this.disableSend = false
          this.scBtm()
        })
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
  },
}
</script>

<template>
  <div class="w-80 rounded-lg absolute bottom-40 right-4">
    <div class="py-3 px-5 bg-blue-600 rounded-t-xl flex gap-3">
      <div class="w-10 h-10 rounded-full bg-white flex-none text-center flex">
        <img
          :src="$store.state.filePath + admin.photo"
          v-if="admin.photo != null"
          class="object-cover h-16"
          alt=""
        />
        <span
          class="m-auto font-bold text-blue-400 text-xl"
          v-if="admin.photo == null"
          >{{ inisial(admin.name) }}</span
        >
      </div>
      <dir class="flex-auto text-left p-0 my-auto mx-0 text-white">{{admin.name}}</dir>
    </div>
    <div class="h-72 bg-gray-100 px-5 py-3 overflow-y-auto" id="msgChat">
      <div
        class="my-2"
        :class="m.sender == user.id ? 'text-right ' : 'text-left'"
        v-for="m in messages"
        :key="m.id"
      >
        <div
          class="px-3 py-2 font-light text-sm rounded-lg inline-block"
          :class="
            m.sender == user.id ? 'bg-blue-500 text-white' : 'bg-gray-300'
          "
        >
          {{ m.content }}
        </div>
      </div>
    </div>
    <div
      class="bg-gray-100 px-4 py-3 border-t border-t-gray-300 rounded-b-xl flex gap-2"
    >
      <input
        type="text"
        v-model="message"
        class="border-0 px-1 py-1 focus:border-0 focus:ring-0 bg-gray-100 w-64"
        @keyup.enter="send"
      />
      <button class="mr-1 text-blue-600" @click="send" :disabled="disableSend">
        <img src="~/assets/icon/send.svg" alt="" v-if="!disableSend" />
        <i
          class="fa fa-spinner fa-spin"
          aria-hidden="true"
          v-if="disableSend"
        ></i>
      </button>
    </div>
  </div>
</template>
