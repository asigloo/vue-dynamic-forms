<template>
  <div class="console">
    <ul class="console__buttons">
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
import { computed, defineComponent } from 'vue'

const props = {
  content: String,
}

export default defineComponent({
  name: 'console',
  props,
  setup(props) {
    const jsonValues = computed(() => JSON.stringify(props.content))
    return {
      jsonValues,
    }
  },
})
</script>

<style>
.console {
  @apply bg-marine text-white text-xs p-2 rounded-md relative;
}

.console__buttons {
  @apply absolute top-0 left-0 pl-2 m-0;
}
</style>
