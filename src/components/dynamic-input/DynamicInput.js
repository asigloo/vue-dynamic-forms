const InputText = () => import('@/components/input-text/InputText.vue');
const InputTextarea = () =>
  import('@/components/input-textarea/InputTextarea.vue');
const InputSelect = () => import('@/components/input-select/InputSelect.vue');

const components = {
  InputText,
  InputTextarea,
  InputSelect,
};

const props = {
  formControl: {
    default: () => ({
      type: null,
      value: null,
      validations: [],
      label: null,
      name: null,
      placeholder: null,
      errors: {},
    }),
    type: Object,
  },
};

const methods = {
  valueChange(val) {
    this.$emit('change', val);
  },
  validate() {
    const control = this.formControl;
    if (control.validations && control.validations.length > 0) {
      const newValidations = [];
      const validation = control.validations.reduce((prev, curr) => {
        const val = typeof curr === 'function' ? curr(control) : null;
        newValidations.push(val);
        return {
          ...prev,
          ...val,
        };
      }, {});
      control.errors = validation;
      control.valid = Object.keys(validation).length === 0;
    }
  },
};

const watch = {
  'formControl.value': {
    handler() {
      this.formControl.dirty = true;
      this.validate();
      this.$emit('change', this.formControl.value);
    },
    deep: true,
  },
  'formControl.submited': {
    handler() {
      this.validate();
    },
    deep: true,
  },
};

const computed = {
  hasValue() {
    const { value } = this.formControl;
    return value !== null && value !== undefined;
  },
  hasErrors() {
    if (this.formControl.errors) {
      return (
        Object.keys(this.formControl.errors).length > 0 &&
        this.formControl.submited
      );
    }
    return false;
  },
  errorMessages() {
    const errors = Object.entries(this.formControl.errors);
    if (errors.length > 0) {
      return errors.reduce((prev, curr) => {
        const [key, value] = curr;
        const obj = {};
        let msg = this.formControl.errorTexts[key];
        if (msg.includes('%')) {
          msg = msg.replace('%', value[key]);
        }
        obj[key] = msg;
        return {
          ...prev,
          ...obj,
        };
      }, {});
    }
  },
};

const DynamicInput = {
  name: 'asDynamicInput',
  components,
  watch,
  props,
  computed,
  methods,
};

export default DynamicInput;
