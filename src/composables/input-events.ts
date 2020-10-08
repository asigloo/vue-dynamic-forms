/* eslint-disable */

import { watch } from 'vue';

export function useInputEvents(props: any, emit: any) {
  function onChange($event): void {
    if (props.control) {
      props.control.dirty = true;
    }
  }
  function onCheck($event): void {
    if (props.control) {
      props.control.dirty = true;
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
