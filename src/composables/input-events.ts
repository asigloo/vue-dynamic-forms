/* eslint-disable */

import { watch } from 'vue';

export function useInputEvents(props: any, emit: any) {
  function onChange($event: any): void {
    const value =
      props.control.type === 'number'
        ? parseFloat(`${$event.target.value}`)
        : $event.target.value;
    if (props.control) {
      props.control.value = value;
      props.control.dirty = true;
    }
    emit('changed', value);
  }
  function onCheck($event: any): void {
    if (props.control) {
      props.control.value = $event.target.checked;
      props.control.dirty = true;
    }
    emit('changed', $event.target.checked);
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
    if (!form.control.dirty) {
      form.control.dirty = true;
      emit('changed', form.control.value);
    }
  });

  return {
    onFocus,
    onChange,
    onBlur,
    onCheck,
  };
}
