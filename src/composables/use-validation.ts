/* eslint-disable */

import { computed } from 'vue';

export function useInputValidation(props: any, emit: any) {
    const isRequired = computed(() => {
        return props.control.validations.some(validation => validation.type === 'required')
    });

    const requiresValidation = computed(() => {
        return props.control.validations.length > 0;
    });

  function validate(): void {
    if ((props.control.touched || props.control.dirty) && requiresValidation.value) {
      const validation = props.control.validations.reduce((prev, curr) => {
        const val =
          typeof curr.validator === 'function'
            ? curr.validator(props.control.value)
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
          requiresValidation.value &&
          props.control.valid &&
          props.control.dirty &&
          props.control.touched,
      },
      {
        'form-control--error': !props.control.valid,
      },
    ];

  });

  return {
    validate,
    getValidationClasses,
    isRequired,
    requiresValidation,
  };
}
