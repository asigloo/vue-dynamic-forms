<template>
  <div id="app">
    <Toolbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toolbar from './components/Toolbar.vue';

const components = {
  Toolbar,
};

export default defineComponent({
  name: 'app',
  components,
});
</script>
