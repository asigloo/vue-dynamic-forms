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
        Remove -1 character and blur to see the validation working 👆🏻
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
  minLength,
} from '../../../dist/as-dynamic-forms.common';

const MIN_VALUE = 7;

export default {
  name: 'ValidationMinDemo',
  components: {
    DynamicForm,
  },
  data: () => ({
    formData: null,
    testForm: {
      id: 'validation-min-length-demo',
      fields: [
        new FormField({
          type: 'text',
          label: 'Username',
          name: 'username',
          value: 'avocado',
          validations: [
            new FormValidation(
              minLength(MIN_VALUE),
              `Text length should be bigger than: ${MIN_VALUE}`,
            ),
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
