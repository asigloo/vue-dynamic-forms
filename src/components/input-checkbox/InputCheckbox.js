import FormControl from '@/core/utils/form-control.model.js';

const props = {
  formControl: {
    default: () => new FormControl(),
    type: Object,
  },
};

const InputCheckbox = {
  name: 'asInputCheckbox',
  props,
};

export default InputCheckbox;
