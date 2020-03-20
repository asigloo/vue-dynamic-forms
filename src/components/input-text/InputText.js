import { FormControl } from '@/core/utils/form-control.model.js';

const props = {
  formControl: {
    default: () => new FormControl(),
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
