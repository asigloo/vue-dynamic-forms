<template>
  <header class="toolbar flex px-8 py-4 border-b border-gray-100">
    <img src="../assets/logo.svg" class="logo mr-8" />
    <h1 class="text-bg text-xl font-bold font-display text-gray-700">
      {{ title }}
    </h1>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'toolbar',
  setup() {
    const route = useRoute();
    const title = computed(() => route.meta.title || 'Vue Dynamic Forms');

    return { title };
  },
});
</script>

<style>
.logo {
  width: 32px;
  height: 32px;
}
</style>
