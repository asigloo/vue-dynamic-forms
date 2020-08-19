import { FormControl } from '@/core/utils';

const props = {
  formControl: {
    default: () => new FormControl({}),
    type: Object,
  },
};

const InputRadio = {
  name: 'asInputRadio',
  props,
};

export default InputRadio;
