import { FormControl } from '@/core/utils';

import DynamicInput from '@/components/dynamic-input/DynamicInput.vue';

const data = () => ({
  submited: false,
  controls: [],
  showFeedback: false,
});

const components = {
  DynamicInput,
};

const props = {
  id: {
    default: null,
    type: String,
  },
  method: {
    default: 'POST',
    type: String,
  },
  classes: {
    default: null,
    type: String,
  },
  fields: {
    type: Array,
  },
};

const methods = {
  mapControls() {
    this.controls =
      this.fields &&
      this.fields.map(
        field =>
          new FormControl({
            ...field,
          }),
      );
  },
  updateControls() {
    this.controls = this.controls.map(
      field =>
        new FormControl({
          ...field,
        }),
    );
  },
  handleSubmit() {
    this.submited = true;
    this.updateControls();
    this.$nextTick(() => {
      if (this.isValid) {
        this.$emit('submit', this.values);
        this.resetForm();
      } else {
        this.$emit('form-error', this.allErrors);
      }
    }, 100);
  },
  resetForm() {
    this.submited = false;
    this.controls = this.fields.map(
      field =>
        new FormControl({
          ...field,
          valid: true,
          value: null,
          touched: false,
          dirty: false,
          errors: {},
        }),
    );
  },
};

const computed = {
  isValid() {
    const control = this.controls.find(control => !control.valid);
    return control ? control.valid : true;
  },
  allErrors() {
    return this.controls
      ? this.controls.reduce((prev, curr) => {
          const errors = Object.keys(curr.errors) || [];
          if (errors.length > 0) {
            const error = {};
            error[curr.name] = curr.errors;
            return {
              ...prev,
              ...error,
            };
          }
          return prev;
        }, {})
      : {};
  },
  values() {
    return this.controls
      ? this.controls.reduce((prev, curr) => {
          const obj = {};
          obj[curr.name] = curr.value;
          return {
            ...prev,
            ...obj,
          };
        }, {})
      : {};
  },
};

const watch = {
  fields: {
    handler: function() {
      this.mapControls();
    },
    deep: true,
  },
  values: {
    handler: function() {
      this.$emit('change', this.values);
    },
    deep: true,
  },
};

const DynamicForm = {
  name: 'asDynamicForm',
  components,
  data,
  methods,
  props,
  watch,
  computed,
  mounted() {
    this.mapControls();
  },
};

export default DynamicForm;
