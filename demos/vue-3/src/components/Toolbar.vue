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
      <ul class="flex align-center">
        <li v-for="nav in navs" :key="nav.name" class="ml-4">
          <a :href="nav.href" class="hover:text-green-400 transition-colors">
            <Icon :name="nav.icon" :alt="nav.name" />
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Icon from './Icon.vue';
import { useRoute } from 'vue-router';

const components = {
  Icon,
};

export default defineComponent({
  name: 'toolbar',
  components,
  setup() {
    const route = useRoute();
    const title = computed(() => route.meta.title || 'Vue Dynamic Forms');

    const navs = ref([
      {
        icon: 'github',
        name: 'Repo',
        href: 'https://github.com/asigloo/vue-dynamic-forms',
      },
      {
        icon: 'docs',
        name: 'Docs',
        href: 'https://vue-dynamic-forms.alvarosaburido.dev/',
      },
    ]);

    return { title, navs };
  },
});
</script>

<style>
.logo {
  width: 32px;
  height: 32px;
}
</style>
