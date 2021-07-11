/* eslint-disable */

import { ErrorMessage } from '/@/core/models';
import { removeEmpty } from '/@/core/utils/helpers';
import { computed, ref, watch } from 'vue';

export function useInputValidation(props: any, emit: any) {
  const isPendingValidation = ref(false);

  const isRequired = computed(() => {
    return props.control.validations.some(
      validation => validation.type === 'required',
    );
  });

  const requiresValidation = computed(() => {
    return props.control.validations.length > 0;
  });

  async function validate(force = false): Promise<void> {
    if (
      force ||
      ((props.control.touched || props.control.dirty) &&
        requiresValidation.value)
    ) {
      let errors = {};
      const syncValidations = [];
      const asyncValidations = [];
      props.control.validations.forEach(element => {
        const validation = element.validator(props.control.value);
        if (validation.constructor.name === 'Promise') {
          asyncValidations.push({
            validation: element.validator,
            text: element.text,
          });
        } else {
          syncValidations.push({ validation, text: element.text });
        }
      });

      if (asyncValidations.length > 0) {
        isPendingValidation.value = true;

        Promise.all(
          asyncValidations.map(async ({ validation, text }) => ({
            validation: await validation(props.control.value),
            text,
          })),
        ).then(errorsArr => {
          errorsArr.forEach(({ validation, text }) => {
            const [key, value] = Object.entries(validation)[0];
            errors[key] = value
              ? {
                  value,
                  text,
                }
              : null;
          });
          isPendingValidation.value = false;
          emit('validate', {
            name: props.control.name,
            errors,
            valid: Object.keys(removeEmpty(errors)).length === 0,
          });
        });
      }
      syncValidations.forEach(({ validation, text }) => {
        if (validation) {
          const [key, value] = Object.entries(validation)[0];
          errors[key] = value
            ? {
                value,
                text,
              }
            : null;
        }
      });

      emit('validate', {
        name: props.control.name,
        errors,
        valid: Object.keys(removeEmpty(errors)).length === 0,
      });
    }
  }

  const errorMessages = computed(() => {
    const errors: ErrorMessage[] = Object.values(props.control?.errors || {});
    if (errors.length > 0) {
      return errors.map(error => error.text);
    }
    return [];
  });

  const getValidationClasses = computed(() => {
    return [
      {
        'form-control--success':
          !isPendingValidation.value &&
          requiresValidation.value &&
          props.control.errors &&
          props.control.valid &&
          props.control.dirty &&
          props.control.touched,
      },
      {
        'form-control--error':
          !isPendingValidation.value && !props.control.valid,
        'form-control--validating': isPendingValidation.value,
      },
    ];
  });

  const getCheckboxValidationClasses = computed(() => {
    return [
      {
        'checkbox-group--success':
          !isPendingValidation.value &&
          requiresValidation.value &&
          props.control.errors &&
          props.control.valid &&
          props.control.dirty &&
          props.control.touched,
      },
      {
        'checkbox-group--error':
          !isPendingValidation.value && !props.control.valid,
        'checkbox-group--validating': isPendingValidation.value,
      },
    ];
  });

  const getRadioValidationClasses = computed(() => {
    return [
      {
        'radio-group--success':
          !isPendingValidation.value &&
          requiresValidation.value &&
          props.control.errors &&
          props.control.valid &&
          props.control.dirty &&
          props.control.touched,
      },
      {
        'radio-group--error':
          !isPendingValidation.value && !props.control.valid,
        'radio-group--validating': isPendingValidation.value,
      },
    ];
  });

  watch(
    () => props.forceValidation,
    value => {
      if (value) {
        validate(value);
      }
    },
  );

  return {
    isPendingValidation,
    validate,
    getValidationClasses,
    getCheckboxValidationClasses,
    getRadioValidationClasses,
    isRequired,
    requiresValidation,
    errorMessages,
  };
}
