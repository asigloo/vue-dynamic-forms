/* eslint-disable */

import { watch } from 'vue';
import { hasValue } from '../core/utils/helpers';

export function useInputEvents(props: any, emit: any) {
  function onChange($event): void {
    if (props.control && hasValue($event.target.value)) {
      $event.stopImmediatePropagation();

      emit('change', {
        name: props.control.name,
        value: props.control.type === 'checkbox'
        ? $event.target.checked
        : $event.target.value,
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
    emit('focus');
  }
  function onBlur(): void {
    emit('blur');
  }

  watch(() => props?.control?.value, (curr, prev) => {
    if(prev === undefined && hasValue(curr)) {
      emit('change', {
        name: props.control.name,
        value: props.control.value
      });
    }
  })

  return {
    onFocus,
    onChange,
    onBlur,
    onCheck,
  };
}
