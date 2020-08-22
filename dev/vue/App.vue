<template>
  <div id="app">
    <div class="page container">
      <h1 class="title m-4">{{ title }}</h1>
      <div class="flex justify-between">
        <div class="card p-6">
          <dynamic-form :form="form" @submited="handleSubmit" />
          <button
            class="btn bg-teal-500 text-white hover:bg-teal-700 mt-4"
            submit="true"
            :form="form?.id"
          >
            Submit Form
          </button>
        </div>
        <div class="card p-6">
          <pre>{{ form }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, Ref } from 'vue';
import {
  TextInput,
  SelectInput,
  DynamicForm,
  EmailInput,
} from '../../src/index';

export default defineComponent({
  name: 'app',
  setup() {
    const title = ref('Vue Dynamic Forms');
    const form = reactive<DynamicForm>({
      id: 'example-form',
      fields: [
        new TextInput({
          label: 'Name',
          value: 'Awiwi',
        }),
        new EmailInput({
          label: 'Email',
        }),
        new SelectInput<string>({
          label: 'Games',
          customClass: 'w-1/2',
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
    function handleSubmit(values) {
      console.log('Values Submitted', values);
    }
    onMounted(() =>
      setTimeout(() => {
        form.fields[0].label = 'RockNRoll';
        form.fields[0].value = 'James Bond';
      }, 2000),
    );
    return {
      title,
      form,
      handleSubmit,
    };
  },
});
</script>
<style lang="scss"></style>
