<template>
  <div class="form-composition library-example">
    <div v-if="testForm">
      <dynamic-form
        :id="testForm.id"
        :fields="testForm.fields"
        :options="testForm.options"
        @change="updateForm"
      />
    </div>
    <pre>{{ formData }}</pre>
  </div>
</template>

<script>
import { DynamicForm, FormField } from '../../../dist/as-dynamic-forms.common';
import COUNTRY_CODES from '../data/countryCodes';

export default {
  name: 'PhonePrefix',
  components: {
    DynamicForm,
  },
  data: () => ({
    formData: null,
    testForm: {
      id: 'test-form',
      fields: [
        new FormField({
          type: 'select',
          label: 'Prefix',
          name: 'prefix',
          customClass: 'col-2',
          options: COUNTRY_CODES.map(({ label, code }) => ({
            text: `+${code}   ${label}`,
            value: `+ ${code}`,
          })),
          value: `+ 34`,
        }),
        new FormField({
          type: 'text',
          label: 'Area Code',
          name: 'areaCode',
          customClass: 'col-4',
          value: '922',
        }),
        new FormField({
          type: 'text',
          label: 'Phone',
          name: 'phone',
          customClass: 'col-6',
          value: '445-66',
        }),
      ],
      options: {
        customClass: 'row',
      },
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

pre {
  color: white;
  font-size: 12px;
}
</style>
