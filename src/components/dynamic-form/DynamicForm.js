import { debounce } from '@/core/utils/helpers';

const DynamicInput = () =>
  import('@/components/dynamic-input/DynamicInput.vue');

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
  feedbackText: {
    default: null,
    type: String,
  },
};

const methods = {
  mapControls() {
    this.controls = this.fields.map(field => ({
      ...field,
      valid: true,
      touched: false,
      dirty: false,
      errors: {},
      submited: this.submited,
    }));
  },
  updateControls() {
    this.controls = this.controls.map(field => ({
      ...field,
      submited: this.submited,
    }));
  },
  handleSubmit() {
    this.submited = true;
    this.updateControls();
    this.$nextTick(() => {
      if (this.isValid) {
        this.$emit('submit', this.values);
        this.showFeedback = true;
        setTimeout(() => {
          this.showFeedback = false;
        }, 4000);
        this.resetForm();
      } else {
        this.$emit('form error', this.allErrors);
      }
    }, 100);
  },
  resetForm() {
    this.submited = false;
    this.controls = this.fields.map(field => ({
      ...field,
      valid: true,
      value: null,
      touched: false,
      dirty: false,
      errors: {},
      submited: this.submited,
    }));
  },
};

const computed = {
  isValid() {
    const control = this.controls.find(control => !control.valid);
    return control ? control.valid : true;
  },
  allErrors() {
    return this.controls.reduce((prev, curr) => {
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
    }, {});
  },
  values() {
    return this.controls.reduce((prev, curr) => {
      const obj = {};
      obj[curr.name] = curr.value;
      return {
        ...prev,
        ...obj,
      };
    }, {});
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
    handler: debounce(function() {
      this.$emit('changed', this.values);
    }, 400),
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
};

export default DynamicForm;
