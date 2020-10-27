/* eslint-disable */

import { watch } from 'vue';

export function useInputEvents(props: any, emit: any) {
  function onChange($event): void {
    if (props.control) {
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
    if (props.control) {
      props.control.touched = true;
    }
  }

  watch(props, (form: any) => {
    if (form?.control && !form?.control?.dirty) {
      form.control.dirty = true;
      emit('change', form.control.value);
    }
  });

  return {
    onFocus,
    onChange,
    onBlur,
    onCheck,
  };
}
