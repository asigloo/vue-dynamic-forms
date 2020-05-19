<template>
  <div id="app">
    <div class="container">
      <h1 class="title text-center">Dynamic Forms Example</h1>
      <div class="row mt-5">
        <div class="col-6">
          <dynamic-form
            :id="testForm.id"
            :fields="testForm.fields"
            :customClass="'row'"
            @change="valuesChanged"
          >
            <template slot="custom-field-1" slot-scope="props">
              <div class="pika-field">
                <input
                  v-if="props.field"
                  class="form-control"
                  v-model="props.field.value"
                  :type="props.field.type"
                  :name="props.field.name"
                  @change="props.valueChange()"
                  @focus="props.onFocus()"
                  @blur="props.onBlur()"
                />
                <img src="./assets/pika.png" alt="" />
              </div>
            </template>
          </dynamic-form>
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
        customClass: 'col-12',
      }),
      new FormField({
        type: 'email',
        label: 'Email',
        name: 'email',
        customClass: 'col-12',
        validations: [
          new FormValidation(required, 'This field is required'),
          new FormValidation(email, 'Format of email is incorrect'),
        ],
      }),
      new FormField({
        type: 'password',
        label: 'Password',
        name: 'password',
        customClass: 'col-12',
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
        customClass: 'col-12',
      }),
      new FormField({
        type: 'select',
        label: 'Category',
        name: 'category',
        customClass: 'col-12',
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'arduino', text: 'Arduino' },
          { value: 'transistors', text: 'Transistors' },
          { value: 'resistors', text: 'Resistors', disabled: true },
        ],
      }),
      new FormField({
        type: 'checkbox',
        label: 'Read the conditions',
        name: 'conditions',
        inline: false,
        customClass: 'col-12',
      }),
      new FormField({
        type: 'checkbox',
        label: 'Disabled',
        name: 'disabled',
        value: true,
        disabled: true,
        customClass: 'col-12',
      }),
      new FormField({
        type: 'radio',
        label: 'Prefered Animal',
        name: 'animal',
        inline: true,
        customClass: 'col-12',
        options: [
          { text: 'Dogs', value: 'dogs' },
          { text: 'Cats', value: 'cats' },
          { text: 'Others', value: 'others' },
        ],
      }),
      new FormField({
        type: 'custom-field',
        label: 'Custom Field 1',
        name: 'custom-field-1',
        customClass: 'col-12',
      }),
      new FormField({
        type: 'number',
        label: 'Number',
        name: 'number',
        value: 0,
        customClass: 'col-12 col-md-6',
      }),
      new FormField({
        type: 'number',
        label: 'Number 2',
        name: 'number2',
        value: 50,
        customClass: 'col-12 col-md-6',
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
  },
};

export default {
  name: 'app',
  data,
  methods,
};
</script>
<style lang="scss">
.pika-field {
  position: relative;

  img {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>
