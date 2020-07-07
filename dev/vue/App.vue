<template>
  <div id="app">
    <div class="container">
      <h1 class="title text-center">Dynamic Forms Example</h1>
      <div class="row mt-5">
        <div class="col-6">
          <dynamic-form
            :id="testForm.id"
            :fields="testForm.fields"
            :options="testForm.options"
            @change="valuesChanged"
          >
            <template
              slot="custom-field-1"
              slot-scope="{ control, valueChange, onFocus, onBlur }"
            >
              <div class="avocado-field">
                <input
                  v-if="control"
                  class="form-control"
                  v-model="control.value"
                  :type="control.type"
                  :name="control.name"
                  @change="valueChange()"
                  @focus="onFocus()"
                  @blur="onBlur()"
                />
                <i>🥑</i>
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
  maxLength,
  url,
  /* } from '../dist/as-dynamic-forms.common'; */
} from '../../src/index';

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
        rows: 10,
        customClass: 'col-12',
        value:
          'Prism whatever occupy, stumptown polaroid butcher activated charcoal seitan cornhole direct trade coloring book offal sriracha. 8-bit pitchfork kitsch crucifix chartreuse, tumblr adaptogen brunch stumptown. Drinking vinegar yuccie echo park lo-fi, poutine unicorn raclette adaptogen kale chips chia. Deep v austin fam organic kickstarter hexagon hell of wolf pour-over YOLO. 8-bit glossier lyft authentic, selfies aesthetic kinfolk prism tattooed irony quinoa distillery pug slow-carb post-ironic.',
        validations: [
          new FormValidation(
            maxLength(100),
            `This field should be less than 100 characters`,
          ),
        ],
      }),
      new FormField({
        type: 'url',
        label: 'Website',
        name: 'website',
        customClass: 'col-12',
        helper: 'Pstt... psst,  this is a hint',
        validations: [new FormValidation(url, `Format of Url is incorrect`)],
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
        id: 'number-custom-id',
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
    options: {
      autoValidate: true,
      customClass: 'row',
      netlify: true,
    },
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
  mounted() {
    console.log(this.$formUtils);
  },
};
</script>
<style lang="scss">
.avocado-field {
  position: relative;

  .form-control {
    border-color: #aec64c;
    background-color: #e2eb5d52;
    border-radius: 16px;
  }

  i {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>
