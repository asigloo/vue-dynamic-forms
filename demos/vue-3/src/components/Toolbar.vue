<template>
  <header
    class="toolbar flex justify-between px-8 py-4 border-b border-gray-100"
  >
    <div class="left-nav flex align-center">
      <img src="../assets/logo.svg" class="logo mr-8" />
      <h1 class="text-bg text-xl font-bold font-display text-gray-700">
        {{ title }}
      </h1>
    </div>
    <div class="right-nav">
      <ul class="flex align-center text-xl">
        <li class="ml-4">
          <a
            href="https://github.com/asigloo/vue-dynamic-forms"
            class="text-gray-500 hover:text-green-400 transition-colors"
          >
            <codicon-github />
          </a>
        </li>
        <li class="ml-4">
          <a
            href="https://vue-dynamic-forms.alvarosaburido.dev/"
            class="text-gray-500 hover:text-green-400 transition-colors"
          >
            <ion-document-text-outline />
          </a>
        </li>
      </ul>
    </div>
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
