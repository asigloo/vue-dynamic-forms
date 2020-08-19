<template>
  <div id="app">
    <dynamic-form :form="form" />
    <pre>{{ form }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { TextInput, SelectInput, DynamicForm } from '../../src/index';

export default defineComponent({
  name: 'app',
  setup() {
    const form = reactive<DynamicForm>({
      id: 'form',
      fields: [
        new TextInput({
          label: 'Name',
        }),
        new SelectInput<string>({
          label: 'Games',
          options: [
            {
              key: 'the-last-of-us',
              value: 'The Last of Us II',
            },
            {
              key: 'death-stranding',
              value: 'Death Stranding',
            },
            {
              key: 'nier-automata',
              value: 'Nier Automata',
            },
          ],
        }),
      ],
    });
    return {
      form,
    };
  },
});
</script>
<style lang="scss"></style>
