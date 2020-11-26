/* eslint-disable */

import { computed } from 'vue';

export function useInputValidation(props: any, emit: any) {
  function validate(): void {
    if (props.control.touched || props.control.dirty) {
      const validation = props.control.validations.reduce((prev, curr) => {
        const val =
          typeof curr.validator === 'function'
            ? curr.validator(props.control)
            : null;
        if (val !== null) {
          const [key, value] = Object.entries(val)[0];
          const obj = {};
          obj[key] = {
            value,
            text: curr.text,
          };
          return {
            ...prev,
            ...obj,
          };
        }
        return {
          ...prev,
        };
      }, {});
      emit('validate', {
        name: props.control.name,
        errors: validation,
        valid: Object.keys(validation).length === 0,
      });
    }
  }


  const getValidationClasses = computed(() => {
    return [
      {
        'form-control--success':
          props.control.valid &&
          props.control.dirty &&
          props.control.touched,
      },
      {
        'form-control--error': !props.control.valid,
      },
    ];

  });

  const isRequired = computed(() => {
      return props.control.validations.some(validation => validation.type === 'required')
  })

  return {
    validate,
    getValidationClasses,
    isRequired,
  };
}
