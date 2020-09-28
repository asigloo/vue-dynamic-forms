import { FormControl } from '@/core/models';

export function useInputEvents(
  control: FormControl<any> | undefined,
  emit: any,
) {
  function onChange($event: any): void {
    if (control) {
      control.value = $event.target.value;
      control.dirty = true;
    }
    emit('changed', $event.target.value);
  }
  function onCheck($event: any): void {
    if (control) {
      control.value = $event.target.checked;
      control.dirty = true;
    }
    emit('changed', $event.target.checked);
  }
  function onFocus(): void {
    emit('focus');
  }
  function onBlur(): void {
    emit('blur');
    if (control) {
      control.touched = true;
    }
  }
  return {
    onFocus,
    onChange,
    onBlur,
    onCheck,
  };
}
