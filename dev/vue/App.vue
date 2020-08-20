<template>
  <div id="app">
    <div class="page container">
      <h1 class="title m-4">{{ title }}</h1>
      <div class="flex justify-between">
        <div class="card p-6">
          <dynamic-form :form="form" />
        </div>
        <div class="card p-6">
          <pre>{{ form }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { TextInput, SelectInput, DynamicForm } from '../../src/index';

export default defineComponent({
  name: 'app',
  setup() {
    const title = ref('Vue Dynamic Forms');
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
      title,
      form,
    };
  },
});
</script>
<style lang="scss"></style>
