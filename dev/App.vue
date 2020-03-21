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
          <div class="row d-flex justify-content-end p-4">
            <button submit="true" :form="testForm.id" class="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
        <div class="col-6">
          <pre>{{ formData }}</pre>
          <pre>{{ testForm }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  FormField,
  FormValidation,
  required,
  email,
  pattern,
  /* } from '../dist/as-dynamic-forms.common'; */
} from '../src/main';

const data = () => ({
  formData: {},
  testForm: {
    id: 'test-form',
    fields: [
      new FormField({
        type: 'text',
        label: 'Name',
        name: 'name',
      }),
      new FormField({
        type: 'email',
        label: 'Email',
        name: 'email',
        validations: [
          new FormValidation(required, 'This field is required'),
          new FormValidation(email, 'Format of email is incorrect'),
        ],
      }),
      new FormField({
        type: 'password',
        label: 'Password',
        name: 'password',
        validations: [
          new FormValidation(required, 'This field is required'),
          new FormValidation(
            pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$',
            ),
            'Password must contain at least 1 Uppercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
          ),
        ],

        value: 'sdsdsd',
      }),
      new FormField({
        type: 'textarea',
        label: 'Bio',
        name: 'bio',
        cols: 30,
        rows: 5,
      }),
      new FormField({
        type: 'select',
        label: 'Category',
        name: 'category',
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'arduino', text: 'Arduino' },
          { value: 'transistors', text: 'Transistors' },
        ],
      }),
      new FormField({
        type: 'checkbox',
        label: 'Read the conditions',
        name: 'conditions',
        inline: false,
      }),
      new FormField({
        type: 'radio',
        label: 'Prefered Animal',
        name: 'animal',
        inline: true,
        options: [
          { text: 'Dogs', value: 'dogs' },
          { text: 'Cats', value: 'cats' },
          { text: 'Others', value: 'others' },
        ],
      }),
      new FormField({
        type: 'number',
        label: 'Number',
        name: 'number',
        value: 0,
      }),
    ],
  },
});

const methods = {
  valuesChanged(values) {
    this.$forceUpdate(); // this is only to refresh the fields on the <pre> tags, not necessary for other purpouses
    this.formData = {
      ...this.formData,
      ...values,
    };
    console.log('Values', values);
  },
};

export default {
  name: 'app',
  data,
  methods,
};
</script>
