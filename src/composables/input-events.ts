import { watch } from 'vue';

export function useInputEvents(props: any, emit: any) {
  function onChange($event: any): void {
    if (props.control) {
      props.control.value = $event.target.value;
      props.control.dirty = true;
    }
    emit('changed', $event.target.value);
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

  watch(props, (value: any) => {
    emit('changed', value.control.value);
  });

  return {
    onFocus,
    onChange,
    onBlur,
    onCheck,
  };
}
