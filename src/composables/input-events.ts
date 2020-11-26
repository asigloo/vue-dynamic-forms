import { computed, watch } from 'vue';
import { hasValue, isArray, isObject } from '../core/utils/helpers';

import { useInputValidation } from '@/composables/use-validation';
import { BindingObject } from '..';

export function useInputEvents(props: any, emit: any) {
  const { validate } = useInputValidation(props, emit);

  function onChange($event): void {
    if (props.control && hasValue($event.target.value)) {
      $event.stopImmediatePropagation();

      validate();
      emit('change', {
        name: props.control.name,
        value: $event.target.value,
      });
    }
  }
  function onCheck($event): void {
    if (props.control) {
      $event.stopImmediatePropagation();

      emit('change', {
        name: props.control.name,
        value: $event.target.checked,
      });
    }
  }
  function onFocus(): void {
    emit('focus', { name: props.control.name });
  }
  function onBlur(): void {
    emit('blur', { name: props.control.name });
    validate();
  }

  const getClasses = computed(() => {
    const classes = ['form-control'];
    if (isArray(props.control.customClass)) {
      return [...classes, ...(props.control.customClass as BindingObject[])];
    }
    if (isObject(props.control.customClass)) {
      return [...classes, props.control.customClass];
    }
    return [classes, props.control.customClass];
  });

  watch(
    () => props?.control?.value,
    (curr, prev) => {
      if (prev === undefined && hasValue(curr)) {
        emit('change', {
          name: props.control.name,
          value: props.control.value,
        });
      }
    },
  );

  return {
    onFocus,
    onChange,
    onBlur,
    onCheck,
    getClasses,
  };
}
