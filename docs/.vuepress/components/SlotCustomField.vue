<template>
  <div class="form-composition library-example">
    <div class="col" v-if="testForm">
      <dynamic-form
        :id="testForm.id"
        :fields="testForm.fields"
        :options="testForm.options"
        @change="updateForm"
      >
        <template slot="avocado-field" slot-scope="props">
          <div class="avocado-field">
            <input
              v-if="props.control"
              class="form-control"
              v-model="props.control.value"
              :type="props.control.type"
              :name="props.control.name"
              @change="props.valueChange()"
              @focus="props.onFocus()"
              @blur="props.onBlur()"
            />
            <i>🥑</i>
          </div>
        </template>
      </dynamic-form>
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
} from '../../../dist/as-dynamic-forms.esm';

export default {
  name: 'SlotCustomField',
  components: {
    DynamicForm,
  },
  data: () => ({
    formData: null,
    testForm: {
      id: 'slot-custom-demo',
      fields: [
        new FormField({
          type: 'custom-field',
          label: 'My Avocado Field',
          name: 'avocado-field',
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
.avocado-field {
  position: relative;

  .form-control {
    border-color: #aec64c;
    background-color: #e2eb5d52;
    border-radius: 16px;
  }

  i {
    position: absolute;
    top: 11px;
    right: 0;
  }
}
</style>
