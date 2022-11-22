<template>
  <main class="min-h-screen w-full flex">
    <div class="m-auto min-h-screen" id="meetingSDKElement"></div>
  </main>
</template>

<script>
import ZoomMtgEmbedded from '@zoomus/websdk/embedded'
import { apiBase, zoomConf } from '~/global/constants'

export default {
  name: 'zoom',
  created() {},
  data() {
    return {
      user: this.$auth.user,
      client: ZoomMtgEmbedded.createClient(),
      sdkKey: 'jl7OeIfxey4jVHZysYDUugHga980mKbbDlIX',
      meetingNumber: zoomConf.id,
      passWord: zoomConf.pwd,
      role: 0,
      signatureEndpoint: apiBase + '/zoom',
      userEmail: '',
      registrantToken: '',
      signature: null,
    }
  },
  async mounted() {
    this.$auth.refreshTokens()
    this.$axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$auth.$storage.getCookie('token')}`,
      Acsept: 'application/json',
    }
    let res = await this.$axios.$post('/zoom', {
      meetingNumber: this.meetingNumber,
      role: this.role,
    })
    this.signature = res.signature
    let data = {
      activity_id: 4,
      description: 'Watch grand final',
    }

    setTimeout(async () => {
      let resp = await this.$axios.$post('/point', data)
    }, 3000)
  },
  created() {
    setTimeout(() => {
      this.startMeeting(this.signature)
      console.log('starting zoom')
    }, 1500)
  },
  methods: {
    async getSignature() {},
    startMeeting(signature) {
      let meetingSDKElement = document.getElementById('meetingSDKElement')

      this.client.init({
        debug: true,
        zoomAppRoot: meetingSDKElement,
        language: 'en-US',
        customize: {
          meetingInfo: [
            'topic',
            'host',
            'mn',
            'pwd',
            'telPwd',
            'invite',
            'participant',
            'dc',
            'enctype',
          ],
          toolbar: {
            buttons: [
              {
                text: 'Custom Button',
                className: 'CustomButton',
                onClick: () => {
                  console.log('custom button')
                },
              },
            ],
          },
          video: {
            isResizable: true,
            viewSizes: {
              default: {
                width: 1280,
                height: 720,
              },
              ribbon: {
                width: 300,
                height: 700,
              },
            },
          },
        },
      })

      this.client.join({
        sdkKey: this.sdkKey,
        signature: signature,
        meetingNumber: this.meetingNumber,
        password: this.passWord,
        userName: this.user.name,
        userEmail: this.user.email,
        tk: this.registrantToken,
      })
    },
  },
}
</script>
