import { FormControl } from '@/core/models';

export function useInputEvents(control: FormControl<any> | undefined, emit) {
  function onChange($event) {
    if (control) {
      control.value = $event.target.value;
    }
    emit('changed', $event.target.value);
  }
  function onFocus() {
    emit('focus');
  }
  function onBlur() {
    emit('blur');
    if (control) {
      control.touched = true;
    }
  }
  return {
    onFocus,
    onChange,
    onBlur,
  };
}
