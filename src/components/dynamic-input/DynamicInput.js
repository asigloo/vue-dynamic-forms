import { FormControl } from '@/core/utils/form-control.model.js';

const InputText = () => import('@/components/input-text/InputText.vue');
const InputTextarea = () =>
  import('@/components/input-textarea/InputTextarea.vue');
const InputSelect = () => import('@/components/input-select/InputSelect.vue');
const InputCheckbox = () =>
  import('@/components/input-checkbox/InputCheckbox.vue');
const InputRadio = () => import('@/components/input-radio/InputRadio.vue');

const components = {
  InputText,
  InputTextarea,
  InputSelect,
  InputCheckbox,
  InputRadio,
};

const props = {
  formControl: {
    default: () => new FormControl(),
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
      const validation = control.validations.reduce((prev, curr) => {
        const val =
          typeof curr.validator === 'function' ? curr.validator(control) : null;
        if (val !== null) {
          const [key, value] = Object.entries(val)[0];
          const obj = {};
          obj[key] = {
            value,
            text: curr.text,
          };
          return {
            ...prev,
            ...obj,
          };
        }
        return {
          ...prev,
        };
      }, {});
      control.errors = validation;
      control.valid = Object.keys(validation).length === 0;
    }
  },
};

const watch = {
  'formControl.value': {
    handler(_after) {
      this.formControl.dirty = true;
      this.validate();
      this.$emit('change', _after);
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
    return (
      this.formControl.errors && Object.keys(this.formControl.errors).length > 0
    );
  },
  errorMessages() {
    const errors = Object.entries(this.formControl.errors);
    if (errors.length > 0) {
      return errors.map(([_key, value]) => value.text);
    }
    return [];
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
