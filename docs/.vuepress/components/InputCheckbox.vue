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
  FormOptions,
} from '../../../dist/as-dynamic-forms.esm';

export default {
  name: 'InputCheckbox',
  components: {
    DynamicForm,
  },
  data: () => ({
    formData: null,
    testForm: {
      id: 'form-checkbox-demo',
      fields: [
        new FormField({
          type: 'checkbox',
          label: 'Accept the conditions',
          name: 'policies',
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
