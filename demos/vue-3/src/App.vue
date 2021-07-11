<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'app',
});
</script>

<template>
  <div id="app">
    <Toolbar />
    <router-view />
  </div>
</template>
