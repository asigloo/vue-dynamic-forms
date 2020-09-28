<template>
  <div class="form-composition library-example">
    <div class="col">
      <dynamic-form
        :id="testForm.id"
        :fields="testForm.fields"
        :options="testForm.options"
        @change="updateForm"
      />
      <p class="hint">
        Please change the value and press enter (blur) to see the validation
        working 👆🏻
      </p>
    </div>
    <div class="col">
      <pre>{{ formData }}</pre>
    </div>
  </div>
</template>

<script>
import {
  DynamicForm,
  FormField,
  FormOptions,
  FormValidation,
  pattern,
} from '../../../dist/as-dynamic-forms.esm';

export default {
  name: 'ValidationPatternDemo',
  components: {
    DynamicForm,
  },
  data: () => ({
    formData: null,
    testForm: {
      id: 'validation-pattern-demo',
      fields: [
        new FormField({
          type: 'password',
          label: 'Password',
          name: 'password',
          customClass: 'col-12',
          validations: [
            new FormValidation(
              pattern(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$',
              ),
              'Password must contain at least 1 Uppercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
            ),
          ],

          value: 'sdsdsd',
        }),
      ],
      options: new FormOptions({ autoValidate: true }),
    },
  }),
  methods: {
    updateForm(values) {
      this.formData = values;
    },
  },
};
</script>

<style lang="scss">
@import '../styles/styles.scss';

.form-composition {
  display: flex;
  justify-content: space-between;
}
.col {
  width: 45%;
}
pre {
  color: white;
  font-size: 12px;
}
</style>
