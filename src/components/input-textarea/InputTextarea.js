const props = {
  formControl: {
    default: () => ({
      type: null,
      value: null,
      validations: [],
      label: null,
      name: null,
      cols: 30,
      rows: 3,
      placeholder: null,
      errors: {},
    }),
    type: Object,
  },
};

const InputTextarea = {
  name: 'asInputTextarea',
  props,
};

export default InputTextarea;
