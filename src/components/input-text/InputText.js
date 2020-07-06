import { FormControl } from '@/core/utils';

const props = {
  formControl: {
    default: () => new FormControl({}),
    type: Object,
  },
};

const computed = {
  hasValue() {
    const { value } = this.formControl;
    return value !== null && value !== undefined;
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
  computed,
};

export default InputText;
