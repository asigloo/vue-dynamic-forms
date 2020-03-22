import { FormControl } from '@/core/utils';

const props = {
  formControl: {
    default: () => new FormControl({}),
    type: Object,
  },
};

const InputCheckbox = {
  name: 'asInputCheckbox',
  props,
};

export default InputCheckbox;
