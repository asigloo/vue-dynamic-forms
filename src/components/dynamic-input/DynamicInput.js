const data = () => ({});

const components = {};

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
  valueChange() {
    this.$emit('value changed', this.formControl.value);
  },
  onFocus() {
    this.$emit('input focused');
  },
  onBlur() {
    this.$emit('input blur');
    this.formControl.touched = true;
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
      const validKeys = Object.keys(validation) || [];
      control.errors = validation;
      control.valid = validKeys.length === 0;
    }
  },
};

const watch = {
  'formControl.value': {
    handler() {
      this.formControl.dirty = true;
      this.validate();
      this.$emit('value changed', this.formControl.value);
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
  data,
  components,
  watch,
  props,
  computed,
  methods,
  mounted() {},
};

export default DynamicInput;
