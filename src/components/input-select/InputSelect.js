import { FormControl } from '@/core/utils';

const props = {
  formControl: {
    default: () => new FormControl({}),
    type: Object,
  },
};

const InputSelect = {
  name: 'asInputSelect',
  props,
};

export default InputSelect;
