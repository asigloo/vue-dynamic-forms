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
  name: 'InputEmail',
  components: {
    DynamicForm,
  },
  data: () => ({
    formData: null,
    testForm: {
      id: 'form-email-demo',
      fields: [
        new FormField({
          type: 'email',
          label: 'Email',
          name: 'email',
          validations: [new FormValidation(email, 'Email format is incorrect')],
        }),
      ],
      options: new FormOptions({ autoValidate: true }),
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
