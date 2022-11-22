<script>
export default {
  target: 'static',
  name: 'play',
  data() {
    return {
      url: this.$cookies.get('gameUrl'),
    }
  },
  beforeCreate() {
    this.$auth.refreshTokens()
    this.$axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$auth.$storage.getCookie('token')}`,
      Acsept: 'application/json',
    }
  },
  mounted() {
    let data = {
      activity_id: 6,
      description: 'game url: ' + this.url,
    }

    setTimeout(async () => {
      let resp = await this.$axios.$post('/point', data)
    }, 3000)
  },
}
</script>

<template>
  <iframe
    :src="url"
    width="100%"
    height="100%"
    class="min-h-screen"
    frameborder="0"
  ></iframe>
</template>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

#content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0px;
}
</style>
