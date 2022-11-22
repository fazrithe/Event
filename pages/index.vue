<template>
  <div class="bg-gray-600 home">
    <Home></Home>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Home from '~/components/Home.vue'
export default {
  name: 'IndexPage',
  target: 'static',
  middleware: 'auth',
  components: { Home },
  beforeMount() {},
  mounted() {
    let scHeight = window.screen.height
    let scWidth = window.screen.width
    if (scHeight > scWidth) {
      Swal.fire({
        icon: 'info',
        text: 'Please rotate your device to enjoy the best experience!',
        showConfirmButton: false,
      })
    }
  },
}
</script>

<style>
.home {
  background-image: url(~/assets/img/home.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
