import { FormControl } from '@/core/utils';

const props = {
  formControl: {
    default: () => new FormControl({}),
    type: Object,
  },
};

const InputTextarea = {
  name: 'asInputTextarea',
  props,
};

export default InputTextarea;
