<template>
  <div class="form-composition library-example">
    <div class="col" v-if="testForm">
      <dynamic-form
        :id="testForm.id"
        :fields="testForm.fields"
        :options="testForm.options"
        @change="updateForm"
      />
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
  FormValidation,
  email,
  FormOptions,
} from '../../../dist/as-dynamic-forms.common';

export default {
  name: 'InputSelect',
  components: {
    DynamicForm,
  },
  data: () => ({
    formData: null,
    testForm: {
      id: 'form-number-demo',
      fields: [
        new FormField({
          type: 'select',
          label: 'Category',
          name: 'category',
          options: [
            { value: null, text: 'Please select an option' },
            { value: 'arduino', text: 'Arduino' },
            { value: 'transistors', text: 'Transistors' },
            { value: 'resistors', text: 'Resistors', disabled: true },
          ],
        }),
      ],
    },
  }),
  methods: {
    updateForm(values) {
      this.$forceUpdate();
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
