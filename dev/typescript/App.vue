<template>
  <div id="app">
    <div class="page container">
      <h1 class="title m-4">{{ title }}</h1>
      <div class="flex justify-between">
        <div class="card p-6 mr-4">
          <dynamic-form
            :form="form"
            @submited="handleSubmit"
            @changed="valueChanged"
            @error="handleError"
          />
          <button
            class="btn bg-teal-500 text-white hover:bg-teal-700 mt-4"
            submit="true"
            :form="form?.id"
          >
            Submit Form
          </button>
        </div>
        <div class="card p-6">
          <pre>{{ formValues }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import {
  TextInput,
  SelectInput,
  EmailInput,
  FormValidation,
  PasswordInput,
  TextAreaInput,
  CheckboxInput,
  RadioInput,
} from '../../src';
import { email, pattern } from '@/core/utils';

export default defineComponent({
  name: 'app',
  setup() {
    const title = ref('Vue Dynamic Forms');
    const formValues = reactive({});
    const form = reactive<any>({
      id: 'example-form',
      fields: [
        new TextInput({
          label: 'Name',
          value: 'Alvaro',
        }),
        new EmailInput({
          label: 'Email',
          validations: [new FormValidation(email, 'Email format is incorrect')],
        }),
        new PasswordInput({
          label: 'Password',
          validations: [
            new FormValidation(
              pattern(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{8,10}$',
              ),
              'Password must contain at least 1 Uppercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
            ),
          ],
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
        new TextAreaInput({
          label: 'Bio',
          cols: 20,
          rows: 5,
        }),
        new CheckboxInput({
          label: "Check  if you're awesome",
          name: 'awesomness',
        }),
        new RadioInput({
          label: 'Select one option',
          name: 'character',
          options: [
            {
              key: 'mario',
              value: 'Mario',
            },
            {
              key: 'crash-bandicoot',
              value: 'Crash Bandicoot',
            },
            {
              key: 'sonic',
              value: 'Sonic',
            },
            {
              key: 'banjo-kazooie',
              value: 'Banjo Kazooie',
              disabled: true,
            },
          ],
        }),
      ],
    });
    function handleSubmit(values) {
      console.log('Values Submitted', values);
    }
    function valueChanged(values) {
      Object.assign(formValues, values);
    }
    function handleError(errors) {
      console.error(errors);
    }

    return {
      title,
      form,
      handleSubmit,
      valueChanged,
      formValues,
      handleError,
    };
  },
});
</script>
<style lang="scss"></style>
