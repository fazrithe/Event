<script>
import BoothName from '~/components/booth/BoothName.vue'
import Team from '~/components/booth/Team.vue'
import CardModal from '~/components/global/CardModal.vue'
import chat from '~/components/chat.vue'
import { aes_key } from '~/global/constants'
import CryptoJS from 'crypto-js'
export default {
  target: 'static',
  components: { CardModal, BoothName, Team, chat },
  asyncData({ params }) {
    let key = aes_key //Key, agreed by both front and back end in advance
    let string = params.id //Offset, the front and back sides agreed in advance, this parameter is not needed in ecb mode
    let ckey = CryptoJS.enc.Utf8.parse(key)
    let encrypted = CryptoJS.AES.encrypt(string, ckey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    })

    const id = encrypted.ciphertext.toString()
    // const id = params.id
    const booth = params.id
    return { id, booth }
  },
  data() {
    return {
      showing: false,
      showChat: false,
      admin: [],
      leftMode: ['1', '2', '7', '8', '9', '10'],
      leftBtn: null,
      rightBtn: 'top:46%; right:23%',
    }
  },

  async beforeCreate() {
    this.$auth.refreshTokens()
    this.$axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$auth.$storage.getCookie('token')}`,
      Acsept: 'application/json',
    }
  },
  async created() {
    this.leftBtn = `top:46%; left: ${this.booth=='8' || this.booth=='9' ? 26 : 23}%`
    let resp = await this.$axios.$get('/team/admin/' + this.id)
    this.admin = resp.data
  },

  async mounted() {},

  methods: {
    toggleChat() {
      this.showChat = !this.showChat
      this.scBtm()
    },
    scBtm() {
      let elChat = document.getElementById('msgChat')
      if (elChat != null) elChat.scrollTop = elChat.scrollHeight
    },
  },
}
</script>

<template>
  <div
    class="min-h-screen bg-gray-600 camp"
    :style="
      'background-image: url(' +
      require(`~/assets/img/booth/${booth}.jpg`) +
      ');'
    "
  >
    <div class="max-w-screen-2xl min-h-screen mx-auto h-full flex relative">
      <nuxt-link
        to="/booth"
        class="px-4 py-1 rounded-md bg-blue-600 text-white absolute top-20 ml-28"
      >
        <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
      </nuxt-link>

      <button
        class="elipse absolute"
        :style="leftMode.includes(booth) ? leftBtn : rightBtn"
        @click="showing = true"
      >
        <div class="child"></div>
      </button>
    </div>

    <card-modal :showing="showing" class="realative">
      <button
        class="rounded-full w-6 h-6 bg-red-600 text-white absolute right-2 top-2"
        @click="showing = false"
      >
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
      <team :idt="id" :booth="booth" />
    </card-modal>

    <button
      @click="toggleChat()"
      class="w-16 h-16 rounded-full text-center bg-blue-500 absolute"
      style="bottom: 5%; right: 5%"
    >
      <img
        src="~/assets/icon/chat.svg"
        v-show="!showChat"
        class="inline"
        alt=""
      />
      <img
        src="~/assets/icon/down.svg"
        v-show="showChat"
        class="inline"
        alt=""
      />
    </button>

    <chat
      v-if="admin.length > 0"
      v-show="showChat"
      :idt="id"
      :admin="admin[0]"
    />
  </div>
</template>

<style scoped>
.camp {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.elipse {
  text-align: center;
  width: 62px;
  height: 62px;

  background: radial-gradient(
        63.11% 63.11% at 31.97% 19.67%,
        rgba(255, 255, 255, 0.7) 0%,
        rgba(255, 255, 255, 0) 69.79%,
        rgba(255, 255, 255, 0) 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
    #e2e2e2;
  box-shadow: 4px 38px 62px rgba(0, 0, 0, 0.5);
  border-radius: 100%;
}

.elipse > .child {
  margin: auto;
  width: 38.58px;
  height: 38.58px;

  background: radial-gradient(
        92.09% 85.42% at 86.3% 87.5%,
        rgba(0, 0, 0, 0.23) 0%,
        rgba(0, 0, 0, 0) 86.18%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
    radial-gradient(
        65.28% 65.28% at 26.39% 20.83%,
        rgba(255, 255, 255, 0.413) 0%,
        rgba(255, 255, 255, 0) 69.79%,
        rgba(255, 255, 255, 0) 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
    #0060af;
  box-shadow: 4px 38px 62px rgba(0, 0, 0, 0.5);
  border-radius: 100%;
}

@media (max-height:31em) {
  .elipse {
    height: 32px;
    width: 32px;
  }

  .elipse > .child {
  width: 20px;
  height: 20px;
  }
}
</style>
