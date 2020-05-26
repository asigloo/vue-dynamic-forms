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
        Please change the value to see the validation working 👆🏻
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
  email,
} from '../../../dist/as-dynamic-forms.common';

export default {
  name: 'ValidationEmailDemo',
  components: {
    DynamicForm,
  },
  data: () => ({
    formData: null,
    testForm: {
      id: 'validation-email-demo',
      fields: [
        new FormField({
          type: 'email',
          label: 'Email',
          name: 'email',
          value: 'awesome_avocad',
          validations: [
            new FormValidation(email, 'Format of email is incorrect'),
          ],
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
