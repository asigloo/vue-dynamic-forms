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
    this.$emit('change', this.formControl.value);
  },
  onFocus() {
    this.$emit('focus');
  },
  onBlur() {
    this.$emit('blur');
    this.formControl.touched = true;
  },
};

const InputText = {
  name: 'asInputText',
  props,
  methods,
};

export default InputText;
