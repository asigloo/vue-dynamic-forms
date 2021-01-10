/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { computed, ComputedRef, watch } from 'vue';
import { hasValue } from '../core/utils/helpers';

import { useInputValidation } from '@/composables/useValidation';
import { ValidationTriggerTypes } from '@/core/models';

interface InputEventsComposition {
  validate: (force: boolean) => void;
  onInput: ($event: Event) => void;
  onChange: ($event: Event) => void;
  onCheck: ($event: Event) => void;
  onFocus: () => void;
  onBlur: () => void;
  getClasses: ComputedRef<(string | { [key: string]: boolean })[]>;
  getCheckboxClasses: ComputedRef<(string | { [key: string]: boolean })[]>;
  getRadioClasses: ComputedRef<(string | { [key: string]: boolean })[]>;
}

export function useInputEvents(props, emit): InputEventsComposition {
  const {
    validate,
    getValidationClasses,
    getCheckboxValidationClasses,
    getRadioValidationClasses,
  } = useInputValidation(props, emit);

  function onInput($event: Event): void {
    const element = $event.target as HTMLInputElement;

    $event.stopImmediatePropagation();
    if (props.control && hasValue(element.value)) {
      if (
        (!props.control.valid &&
          props.control.validationTrigger.type ===
            ValidationTriggerTypes.BLUR) ||
        (props.control.validationTrigger.type ===
          ValidationTriggerTypes.CHANGE &&
          element.value.length >= props.control.validationTrigger.threshold)
      ) {
        validate();
      }
      emit('change', {
        name: props.control.name,
        value: element.value,
      });
    }
  }
  function onChange($event: Event): void {
    $event.stopImmediatePropagation();
    $event.preventDefault();
  }
  function onCheck($event: Event): void {
    const element = $event.target as HTMLInputElement;
    if (props.control) {
      $event.stopImmediatePropagation();

      emit('change', {
        name: props.control.name,
        value: element.checked,
      });
    }
  }
  function onFocus(): void {
    emit('focus', { name: props.control.name });
  }
  function onBlur(): void {
    emit('blur', { name: props.control.name });

    if (props.control.validationTrigger.type === ValidationTriggerTypes.BLUR) {
      validate();
    }
  }

  const getClasses: ComputedRef<
    (string | { [key: string]: boolean })[]
  > = computed(() => {
    return ['form-control', ...getValidationClasses.value];
  });

  const getCheckboxClasses: ComputedRef<
    (string | { [key: string]: boolean })[]
  > = computed(() => {
    return ['checkbox-group', ...getCheckboxValidationClasses.value];
  });

  const getRadioClasses: ComputedRef<
    (string | { [key: string]: boolean })[]
  > = computed(() => {
    return ['radio-group', ...getRadioValidationClasses.value];
  });

  watch(
    () => props?.control?.value,
    (curr, prev) => {
      if (hasValue(curr) && curr !== prev) {
        emit('change', {
          name: props.control.name,
          value: props.control.value,
        });
      }
    },
    {
      immediate: true,
    },
  );

  return {
    validate,
    onFocus,
    onInput,
    onChange,
    onBlur,
    onCheck,
    getClasses,
    getCheckboxClasses,
    getRadioClasses,
  };
}
