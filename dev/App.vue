<template>
  <div id="app">
    <div class="container">
      <h1 class="title text-center">Dynamic Forms Example</h1>
      <div class="row mt-5">
        <div class="col-6">
          <dynamic-form
            :id="testForm.id"
            :fields="testForm.fields"
            @change="valuesChanged"
          />
        </div>
        <div class="col-6">
          <pre>{{ testForm }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required, pattern } from '../src/core/utils/validators';

const DynamicForm = () => import('@/components/dynamic-form/DynamicForm.vue');

const data = () => ({
  testForm: {
    id: 'test-form',
    fields: [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
      },
      {
        type: 'email',
        label: 'Email',
        name: 'email',
        validations: [required, email],
        errorTexts: ['This field is required', 'Format of email is incorrect'],
      },
      {
        type: 'password',
        label: 'Password',
        name: 'password',
        validations: [
          required,
          pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$',
          ),
        ],
        errorTexts: [
          'This field is required',
          'Password must contain at least 1 Upercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
        ],
      },
      {
        type: 'textarea',
        label: 'Bio',
        name: 'bio',
        cols: 30,
        rows: 5,
        validations: [required],
        errorTexts: ['This field is required'],
      },
      {
        type: 'select',
        label: 'Category',
        name: 'category',
        options: [],
        validations: [],
        value: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'arduino', text: 'Arduino' },
          { value: 'transistors', text: 'Transistors' },
        ],
      },
    ],
  },
});

const components = {
  DynamicForm,
};

const methods = {
  valuesChanged(values) {
    this.$forceUpdate(); // this is only to refresh the fields on the <pre> tags, not necessary for other purpouses
    console.log('Values', values);
  },
};

export default {
  name: 'app',
  data,
  components,
  methods,
};
</script>

<style lang="scss"></style>
