<script>
export default {
  name: 'boothName',
  target: 'static',
  props: ['boothName', 'url'],
}
</script>

<template>
  <div class="text-center">
    <NuxtLink :to="url">
      <div class="bg-white px-5 py-0.5 rounded-full inline-block shadow-md">
        {{ boothName }}
      </div>
    </NuxtLink>
  </div>
</template>
