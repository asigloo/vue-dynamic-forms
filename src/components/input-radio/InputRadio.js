import FormControl from '@/core/utils/form-control.model.js';

const props = {
  formControl: {
    default: () => new FormControl(),
    type: Object,
  },
};

const InputRadio = {
  name: 'asInputRadio',
  props,
};

export default InputRadio;
