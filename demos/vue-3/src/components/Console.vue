<template>
  <div class="console bg-marine text-white text-xs p-4 rounded-md relative">
    <ul class="absolute top-1 left-2">
      <li class="rounded w-2 h-2 bg-salmon inline-block mr-1"></li>
      <li class="rounded w-2 h-2 bg-yellow-300 inline-block mr-1"></li>
      <li class="rounded w-2 h-2 bg-green-500 inline-block"></li>
    </ul>
    <pre data-cy="form-values" class="pt-4" :data-formValues="jsonValues">{{
      content
    }}</pre>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

const props = {
  content: String,
};

export default defineComponent({
  name: 'console',
  props,
  setup(props) {
    const jsonValues = computed(() => JSON.stringify(props.content));
    return {
      jsonValues,
    };
  },
});
</script>
