const props = {
  formControl: {
    default: () => ({
      type: null,
      value: null,
      validations: [],
      label: null,
      name: null,
      options: [],
      placeholder: null,
      errors: {},
    }),
    type: Object,
  },
};

const InputSelect = {
  name: 'asInputSelect',
  props,
};

export default InputSelect;
