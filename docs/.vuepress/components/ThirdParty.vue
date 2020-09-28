<template>
  <div class="library-example">
    <div v-if="testForm">
      <dynamic-form
        :id="testForm.id"
        :fields="testForm.fields"
        :options="testForm.options"
        @change="updateForm"
      >
        <template slot="third-party" slot-scope="props">
          <div class="third-party">
            <v-select
              v-model="props.control.value"
              :options="props.control.options"
              :name="props.control.name"
              @input="props.valueChange()"
              @search:focus="props.onFocus()"
              @search:blur="props.onBlur()"
            ></v-select>
          </div>
        </template>
      </dynamic-form>
    </div>
    <pre>{{ formData }}</pre>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import { DynamicForm, FormField } from '../../../dist/as-dynamic-forms.esm';
import BOOKS from '../data/books';

export default {
  name: 'Thirdparty',
  components: {
    DynamicForm,
    'v-select': vSelect,
  },
  data: () => ({
    formData: null,
    testForm: {
      id: 'test-form',
      fields: [
        new FormField({
          type: 'custom-field',
          label: 'V-Select',
          name: 'third-party',
          customClass: 'col-6',
          options: ['Arduino', 'Pinguino'],
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

.vs__dropdown-toggle {
  background: white;
}
</style>
