<template>
  <header class="topnav h-54px p-2 border-b-2 border-gray-200">
    <div class="container mx-auto flex justify-between items-center">
      <div class="right flex justify-start items-center">
        <Logo class="w-8 h-8 mr-3" />
        <h1 class="text-lg font-bold text-gray-700">{{ title }}</h1>
      </div>
    </div>
  </header>
</template>

<script>
const data = () => ({
  title: 'Nuxt Dynamic Forms',
})

const computed = {}

export default {
  name: 'Header',
  data,
  computed,
}
</script>

<style></style>
